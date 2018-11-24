
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
require('dotenv').config()

const Perspective = require('perspective-api-client');
const perspective = new Perspective({apiKey: process.env.PERSPECTIVE_API_KEY });

// app.get('/Room1', function (req, res) {
//   res.sendFile(__dirname + '/index.html');
// });

let debateRooms = []
let debateRoomObject = {}

function setDebateRoomDebator2(user, debateRoom) {

  debateRoom.debator2 = user
  const index = findDebateRoomById(debateRoom.id)
  debateRooms = [
    ...debateRooms.slice(0, index), debateRoom, ...debateRooms.slice(index + 1)
    ]

    console.log("DEBATE ROOMS AFTER SLICE ARE ", debateRooms)
}

function findDebateRoomById(id) {
  let roomIndex = debateRooms.findIndex(debateRoom => {
    return debateRoom.id == id
  })
  console.log("This is the find DEBATE ROOMBY id at index", roomIndex)
  return roomIndex
}

function destroyDebateRoom(id) {

    const index = findDebateRoomById(id)

     debateRooms = [
    ...debateRooms.slice(0, index), ...debateRooms.slice(index + 1)
    ]

}

class DebateRoom {
  constructor(debateRoom) {
      this.debateRoom = debateRoom,
      this.connectedUsers = {
        1: {username: debateRoom.debator1, state: "debator1", stance: debateRoom.debator1Stance, id: debateRoom.debator1Id}
        },
      this.messages = [{id:1, content:"hello", username:"TestUser1"}, {id:2, content:"hello back", username:"TestUser2"} ],
      this.debator1Liked = 0,
      this.debator2Liked = 0,
      this.shouldRedirect = false,
      this.debator1Switch = 0,
      this.debator2Switch = 0,
      this.userStance = null
  }
}

io.on('connection', function (client) {

  console.log('client connected...', client.id)

  client.on('getDebateRooms', function (data) {
    client.emit('debateRooms', JSON.stringify(debateRooms))
  })
  client.on('getInitialState', function (data) {
    console.log("RECIEVED GET INITIAL STATE FOR DEBATEROOM ", data)
    let parsedData = JSON.parse(data)
    let serverMsg = debateRoomObject[parsedData]
    console.log("SERVER MESSAGE TO SEND SHOULD BE STATE", serverMsg)
    client.emit('getInitialState', JSON.stringify(serverMsg))
  })

  client.on('subscribe', function (data) {
    console.log("RECIEVED Join for room: ", data, "by client", client.id)
    client.join(data)
  })

  client.on('leave', function (data) {
    console.log("RECIEVED leave for: ", data)
    client.leave(data)
  })

  client.on('debateEnded', function (data) {
    console.log("RECIEVED DebateEnded: ", data)
    io.in(data).emit('displayResultsTo:', data)
  })

  client.on('closeDebate', function (data) {
    console.log("RECIEVED closeDebate:", data)
    io.in(data).emit('GoBackHome', data)
    console.log("SENT GO BACK HOME TO", data)
    client.leave(data)
    console.log("LEFT ROOM", data)
    //THIS IS BEING SENT 1 time but RECEIVED TWICE AND I THINK CAUSING THE DISCREPANCY
    // io.emit('closeRoom', data)
  })

  client.on('destroyRoom', function (data) {
    // if( data !== "mainroom") {
    //   console.log("RECIEVED destroyRoom: ", data)
    //   // io.emit('destroyRoom', data)
    // }
    console.log("Does the server get the destroy COMMAND", data)
    io.emit('destroyRoom', data)
    destroyDebateRoom(data)
  })

  client.on('message', function (data) {

    let incomingmsg = JSON.parse(data)

    checkMessage(incomingmsg.content).then(function(result){

      incomingmsg.content = incomingmsg.content + result.systemMessage;
      incomingmsg.flag = result.flag;
      console.log("RECIEVED : ", incomingmsg, "from", incomingmsg.roomName);
      io.in(incomingmsg.roomName).emit('message', JSON.stringify(incomingmsg))
      debateRoomObject[incomingmsg.roomId].messages.push(incomingmsg)
      console.log("SENT ", incomingmsg, "To hopefully only", incomingmsg.roomName)
    })
  });


//WILL NEED TO ADD THE NEW ROOM TO SERVER ARRAY
  client.on('newRoom', function  (data) {
    console.log("RECIEVED newRoom", data)
    let incomingRoom = JSON.parse(data)
    incomingRoom.name = "Room" + (debateRooms.length + 1)
    debateRooms.push(incomingRoom)
    io.emit('newRoom', JSON.stringify(incomingRoom))
    client.emit('redirect', JSON.stringify(incomingRoom))
    //CREATE A NEW INSTANCE OF DEBATE ROOM CLASS SERVER SIDE
    debateRoomObject[incomingRoom.id] = new DebateRoom(incomingRoom)
  })

  client.on('joinDebate', function (data) {
    console.log("RECIEVED JOIN DEBATE", data)
    let incomingRoom = JSON.parse(data)
    client.emit('redirect', JSON.stringify(incomingRoom))
  })

  client.on('addViewer', function (data) {
    let incomingViewer = JSON.parse(data)
    let viewerToBeAdded = {id: incomingViewer.id, username: incomingViewer.username, state: "viewer", stance: null}
    io.in(incomingViewer.room).emit('addUser', JSON.stringify(viewerToBeAdded))
    console.log("ADD VIEEEEWER", incomingViewer)
    debateRoomObject[incomingViewer.roomId].connectedUsers[incomingViewer.id] = viewerToBeAdded
    console.log("CONNECTED USERS ARE ", debateRoomObject[incomingViewer.roomId].connectedUsers)
  })

   client.on('addDebator2', function (data) {
    let incomingDebator2 = JSON.parse(data)
    let debator2ToBeAdded = {id: incomingDebator2.id, username: incomingDebator2.username, state: "debator2", stance: incomingDebator2.stance}
    let appDebator2 = {id: incomingDebator2.id, username: incomingDebator2.username, room: incomingDebator2.room}
    io.in(incomingDebator2.room.name).emit('addUser', JSON.stringify(debator2ToBeAdded))
    io.emit('addDebator2ToApp', JSON.stringify(appDebator2))
    debateRoomObject[appDebator2.room.id].connectedUsers[appDebator2.id] = debator2ToBeAdded
    console.log("DID DEBATOR 2 GET ADDED is ", debateRoomObject[appDebator2.room.id].connectedUsers)
    setDebateRoomDebator2(appDebator2.username, appDebator2.room)
   })

  client.on('disconnect', function () {
    console.log('client disconnect...', client.id)
    // handleDisconnect()
  })

  client.on('likes', function (data) {
    console.log('received timer', data)
    let incomingMsg = JSON.parse(data)
    debateRoomObject[incomingMsg.roomId].debator1Liked = incomingMsg.debator1Liked
    debateRoomObject[incomingMsg.roomId].debator2Liked = incomingMsg.debator2Liked

    console.log("DID LIKES GET UPDATED ", debateRoomObject[incomingMsg.roomId])

   // console.log("this is the timer update data", incomingTimerUpdate)
    io.in(incomingMsg.room).emit('likes', JSON.stringify(incomingMsg))
  })

  client.on('timer', function (data) {
    let incomingTimerUpdate = JSON.parse(data)
    io.in(incomingTimerUpdate.room).emit('TimerUpdate', JSON.stringify(incomingTimerUpdate))
  })


  client.on('ResultsTimer', function (data) {
    let incomingResultsTimerUpdate = JSON.parse(data)
    console.log("Results timer update data", incomingResultsTimerUpdate)
    io.in(incomingResultsTimerUpdate.room).emit('ResultsTimerUpdate', JSON.stringify(incomingResultsTimerUpdate))
  })

  client.on('switch', function (data) {
    let incomingMsg = JSON.parse(data)   // console.log("this is the timer update data", incomingTimerUpdate)
    debateRoomObject[incomingMsg.roomId].debator1Switch = incomingMsg.debator1Switch
    debateRoomObject[incomingMsg.roomId].debator2Switch = incomingMsg.debator2Switch
    io.in(incomingMsg.room).emit('switch', JSON.stringify(incomingMsg))
    console.log("DID THE SWITCH UPDATE", debateRoomObject[incomingMsg.roomId] )
  })



  client.on('error', function (err) {
    console.log('received error from client:', client.id)
    console.log(err)
  })

  const checkMessage = async (text) => {
     // const text = incomingmsg.content;
      let message = {
                      systemMessage : "",
                      flag: false};
      const result = await perspective.analyze(text);
      const score = result.attributeScores.TOXICITY.summaryScore.value;
    //  console.log(score);
     // return score;
      if (score >= 0.9){
        message.systemMessage = "-- Message is offensive!"
        message.flag = true;
      }
      else if (score >= 0.7){
        message.systemMessage = "--Please watch your comment"
      }
     // console.log(systemMessage);
      return message;
   }

})

server.listen(3001, function (err) {
  if (err) throw err
  console.log('listening on port 3001')
})