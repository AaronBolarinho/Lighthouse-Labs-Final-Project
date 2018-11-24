
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
require('dotenv').config()

const Perspective = require('perspective-api-client');
const perspective = new Perspective({apiKey: process.env.PERSPECTIVE_API_KEY });

// app.get('/Room1', function (req, res) {
//   res.sendFile(__dirname + '/index.html');
// });

let debateRooms = [{id: 1, name: "Room1", proposedDebate:"Bananas are blue", debator1:"testUser1", debator2: null, debator1Stance: "Yea"}, {id: 2, name: "Room2", proposedDebate:"The sky is blue", debator1:"testUser3", debator2: null, debator1stance: "Nay"}, {id: 3, name: "Room3", proposedDebate:"The sky is green", debator1:"testUser3", debator2: "testUser4", debator1stance: "Nay"}]

function setDebateRoomDebator2(user, debateRoom) {

    debateRoom.debator2 = user
    const index = findDebateRoomById(debateRoom.id)
    console.log("index IS ", index)
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
// class DebateRoom {
//   constructor(debateRoom) {
//       this.debateRoom: debateRoom,
//       this.connectedUsers: {
//         debateRoom.debator1.id : {username: debateRoom.debator1, state: "debator1", stance: debateRoom.debator1Stance, id: debateRoom.debator1.id}
//         },
//       this.messages: [],
//       this.debator1Liked: 0,
//       this.debator2Liked: 0,
//   }
// }

const ClientManager = require('./ClientManager')
const ChatroomManager = require('./ChatroomManager')
const makeHandlers = require('./handlers')

const clientManager = ClientManager()
const chatroomManager = ChatroomManager()

io.on('connection', function (client) {
  const {
    handleJoin,
    handleLeave,
    handleMessage,
    handleGetChatrooms,
    handleDisconnect
  } = makeHandlers(client, clientManager, chatroomManager)

  console.log('client connected...', client.id)
  clientManager.addClient(client)

  client.on('getDebateRooms', function (data) {
    console.log("HELLO")
    client.emit('debateRooms', JSON.stringify(debateRooms))
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
  })

  client.on('message', function (data) {

    let incomingmsg = JSON.parse(data)

    checkMessage(incomingmsg.content).then(function(result){

      incomingmsg.content = incomingmsg.content + result.systemMessage;
      incomingmsg.flag = result.flag;
      console.log("RECIEVED : ", incomingmsg, "from", incomingmsg.roomName);
      io.in(incomingmsg.roomName).emit('message', JSON.stringify(incomingmsg))
      console.log("SENT ", incomingmsg, "To hopefully only", incomingmsg.roomName)
    })
  });


//WILL NEED TO ADD THE NEW ROOM TO SERVER ARRAY
  client.on('newRoom', function  (data) {
    console.log("RECIEVED newRoom", data)
    let incomingRoom = JSON.parse(data)
    //SOME CODE HERE WAS TRYING TO ADD DEBATOR 2 TO DEBATE ROOM LIKE NORMAL, ADD IT HERE SERVER SIDE TO SERVER DEBATE ROOM
    // let debator1ToBeAdded = {id:incomingRoom.debator1Id, username: incomingRoom.debator1, state: "debator1", stance: incomingRoom.debator1Stance}
    incomingRoom.name = "Room" + (debateRooms.length + 1)
    debateRooms.push(incomingRoom)
    io.emit('newRoom', JSON.stringify(incomingRoom))
    console.log("SERVRE DebateRooms are", debateRooms)
    console.log("incomingRoom", incomingRoom)
    client.emit('redirect', JSON.stringify(incomingRoom))
    // client.join(incomingRoom.name)
    // console.log("DEBATOR1 to be added", debator1ToBeAdded, "to room", incomingRoom.name)
    // io.in(incomingRoom.name).emit('addUser', JSON.stringify(debator1ToBeAdded))
  })

   client.on('joinDebate', function (data) {
    console.log("RECIEVED JOIN DEBATE", data)
    let incomingRoom = JSON.parse(data)
    client.emit('redirect', JSON.stringify(incomingRoom))
   })
//NEED TO ADD THIS VIEWER TO SERVER DEBATE ROOM CONNECTED USERS
   client.on('addViewer', function (data) {
    let incomingViewer = JSON.parse(data)
    let viewerToBeAdded = {id: incomingViewer.id, username: incomingViewer.username, state: "viewer", stance: null}
    io.in(incomingViewer.room).emit('addUser', JSON.stringify(viewerToBeAdded))
    console.log("ADD VIEEEEWER")
   })
//NEED TO ADD THIS DEBATOR 2 TO SERVER DEBATE ROOM CONNECTED USERS
   client.on('addDebator2', function (data) {
    let incomingDebator2 = JSON.parse(data)
    console.log("DEBATOR 2", incomingDebator2)
    let debator2ToBeAdded = {id: incomingDebator2.id, username: incomingDebator2.username, state: "debator2", stance: incomingDebator2.stance}
    let appDebator2 = {id: incomingDebator2.id, username: incomingDebator2.username, room: incomingDebator2.room}
    io.in(incomingDebator2.room.name).emit('addUser', JSON.stringify(debator2ToBeAdded))
    io.emit('addDebator2ToApp', JSON.stringify(appDebator2))
    console.log("appDebator2 is ", appDebator2)
    setDebateRoomDebator2(appDebator2.username, appDebator2.room)
   })
//MIGHT NEED TO DO SOMETHING SIMILAR TO THIS
  // client.on('chatrooms', handleGetChatrooms)

  client.on('disconnect', function () {
    console.log('client disconnect...', client.id)
    handleDisconnect()
  })

  client.on('likes', function (data) {
    //console.log('received timer', data)
    let incomingMsg = JSON.parse(data)
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