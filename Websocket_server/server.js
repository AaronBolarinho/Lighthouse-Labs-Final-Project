
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
require('dotenv').config()
const uuid = require('uuid/v4')

const Perspective = require('perspective-api-client');
const perspective = new Perspective({apiKey: process.env.PERSPECTIVE_API_KEY });

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);
let newsfeed = [];

newsapi.v2.topHeadlines({
  language: 'en',
  country: 'ca'
}).then(response => {
 // const data = JSON.parse(response)
  newsfeed = response.articles;
  //newsfeed.push(response.articles);
  //console.log(newsfeed)
  // newsfeed.forEach(feed =>{
  //    console.log(feed.title)
  // })
});
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
    //UPDATE DEBATE ROOM OBJECT WITH DEBATOR 2 AS WELL
    debateRoomObject[debateRoom.id].debateRoom.debator2 = user
    console.log("DEBATE OBJECT AFTER SLICE ARE ", debateRoomObject)
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
  let debateroom = debateRooms[index]
  console.log("debateRoomObject before", debateRoomObject)

  if (index !== -1) {
    console.log("RUNNING DESTROY SLICE")
    debateRooms = [...debateRooms.slice(0, index), ...debateRooms.slice(index + 1)]
    delete debateRoomObject[debateroom.id]
  }
  console.log("debateRoomObject after", debateRoomObject)
}

function updateLikedMessage(roomId, messageId) {
    console.log("UPDATING LIKED MESSAGE", messageId, "in room", roomId)
    console.log("MESSAGES BEFORE ARE", debateRoomObject[roomId].messages)
    const index = findMessageById(roomId, messageId)
    console.log("INDEX IS", index)
    let message = debateRoomObject[roomId].messages[index]
    console.log("MESSAGE TO BE PUT IN IS", message)
    message.liked = true

    debateRoomObject[roomId].messages = [
      ...debateRoomObject[roomId].messages.slice(0, index), message, ...debateRoomObject[roomId].messages.slice(index + 1)
      ]
    console.log("MEESAGE STATE IS NOW", debateRoomObject[roomId].messages)
  }

function findMessageById(roomId, messageId) {
    let messageIndex = debateRoomObject[roomId].messages.findIndex(message => {
      return message.id == messageId
    })
    return messageIndex
  }

class DebateRoom {
  constructor(debateRoom) {
    this.debateRoom = debateRoom,
    this.connectedUsers = {
      1: {username: debateRoom.debator1, state: "debator1", stance: debateRoom.debator1Stance, id: debateRoom.debator1Id}
      },
    this.messages = [ ],
    this.debator1Liked = 0,
    this.debator2Liked = 0,
    this.shouldRedirect = false,
    this.debator1Switch = 0,
    this.debator2Switch = 0,
    this.userStance = null,
    this.resultsTrigger = false,
    this.debator1LrnedNew = false,
    this.debator2LrnedNew = false,
    this.debator1TotalScore = 0,
    this.debator2TotalScore = 0,
    this.debator1win = "Keep Trying!",
    this.debator2win = "Keep Trying!"
  }
}


io.on('connection', function (client) {
  console.log('client connected...', client.id)

  //client.emit('newsfeed', JSON.stringify(newsfeed))

  client.on('getNewsFeed', function (data) {
    client.emit('debateRooms', JSON.stringify(debateRooms))
  })


  client.on('getDebateRooms', function (data) {
    client.emit('newsfeed', JSON.stringify(newsfeed))
    client.emit('debateRooms', JSON.stringify(debateRooms))
  })

  client.on('getInitialState', function (data) {
    console.log("RECIEVED GET INITIAL STATE FOR DEBATEROOM ", data, "by", client.id)
    let parsedData = JSON.parse(data)
    let serverMsg = debateRoomObject[parsedData]
    client.emit('getInitialState', JSON.stringify(serverMsg))
  })

  client.on('subscribe', function (data) {
    console.log("RECIEVED Join for room: ", data, "by client", client.id)
    client.join(data)
  })

  client.on('leave', function (data) {
    let incomingLeave = JSON.parse(data)
    console.log("RECIEVED leave for: ", incomingLeave.room.id, "by", incomingLeave.currentUser)
    client.leave(incomingLeave.room.id)

    // console.log("CONNECTED USERS BEFORE DELETE" , debateRoomObject[incomingLeave.room.id].connectedUsers)

    if (incomingLeave.currentUser.state === 'debator1') {
      //THIS IS BECAUSE DEBATOR ONE ALWAYS GETS THE KEY 1 and other users get the key as their user id
      delete debateRoomObject[incomingLeave.room.id].connectedUsers[1]
    } else {
      delete debateRoomObject[incomingLeave.room.id].connectedUsers[incomingLeave.currentUser.id]
    }

    // console.log("CONNECTED USERS AFTER DELETE" , debateRoomObject[incomingLeave.room.id].connectedUsers)

    //IF THE PERSON WHO LEFT IS DEBATOR 1 or 2 trigger the results
    if (incomingLeave.currentUser.state === 'debator2' || incomingLeave.currentUser.state === 'debator1' ) {
      console.log("DEBATOR LEFT", incomingLeave.currentUser.state)
      io.in(incomingLeave.room.id).emit('displayResultsTo:',incomingLeave.room.id)
    }
  })

  client.on('debateEnded', function (data) {
    console.log("RECIEVED DebateEnded: ", data)
    // let roomId = JSON.parse(data)
    // let roomId = data
    // console.log(roomId)
    debateRoomObject[data].resultsTrigger = true
    io.in(data).emit('resultsTriggered', data)
    io.in(data).emit('resultsTimerTriggered', data)
    console.log("UPDATED DEBATE ROOM OBJECT", debateRoomObject[data])

    client.emit('resultsTriggered', data)
  })

  client.on('closeDebate', function (data) {
    console.log("RECIEVED closeDebate:", data)
    io.in(data).emit('GoBackHome', data)
    console.log("SENT GO BACK HOME TO", data)
    client.leave(data)
    console.log("LEFT ROOM", data)
  })

  client.on('destroyRoom', function (data) {
    // if( data !== "mainroom") {
    //   console.log("RECIEVED destroyRoom: ", data)
    //   // io.emit('destroyRoom', data)
    // }
    console.log("Does the server get the destroy COMMAND", data)
    // io.emit('destroyRoom', data)
    destroyDebateRoom(data)
    io.emit('debateRooms', JSON.stringify(debateRooms))

  })

  client.on('message', function (data) {

    let incomingmsg = JSON.parse(data)


    checkMessage(incomingmsg.content).then(function(result){

      incomingmsg.content = incomingmsg.content + result.systemMessage;
      incomingmsg.flag = result.flag;
      console.log("RECIEVED : ", incomingmsg, "from", incomingmsg.roomName);
      io.in(incomingmsg.roomId).emit('message', JSON.stringify(incomingmsg))
      debateRoomObject[incomingmsg.roomId].messages.push(incomingmsg)
      console.log("SENT ", incomingmsg, "To", incomingmsg.roomId)
    })
  });


//WILL NEED TO ADD THE NEW ROOM TO SERVER ARRAY
  client.on('newRoom', function  (data) {
    console.log("RECIEVED newRoom", data)
    let incomingRoom = JSON.parse(data)
    incomingRoom.name = "Room" + incomingRoom.id
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
    console.log("VIEWER IS", incomingViewer)
    io.in(incomingViewer.roomId).emit('addUser', JSON.stringify(viewerToBeAdded))
    console.log("ADD VIEEEEWER", incomingViewer)
    debateRoomObject[incomingViewer.roomId].connectedUsers[incomingViewer.id] = viewerToBeAdded
    console.log("CONNECTED USERS ARE ", debateRoomObject[incomingViewer.roomId].connectedUsers)
  })

   client.on('addDebator2', function (data) {
    let incomingDebator2 = JSON.parse(data)
    let debator2ToBeAdded = {id: incomingDebator2.id, username: incomingDebator2.username, state: "debator2", stance: incomingDebator2.stance}
    let appDebator2 = {id: incomingDebator2.id, username: incomingDebator2.username, room: incomingDebator2.room}
    io.in(incomingDebator2.room.id).emit('addUser', JSON.stringify(debator2ToBeAdded))
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

    updateLikedMessage(incomingMsg.roomId,incomingMsg.messageId)
    console.log("DID LIKES GET UPDATED ", debateRoomObject[incomingMsg.roomId])

   // console.log("this is the timer update data", incomingTimerUpdate)
    io.in(incomingMsg.roomId).emit('likes', JSON.stringify(incomingMsg))
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
    let incomingMsg = JSON.parse(data)
    debateRoomObject[incomingMsg.roomId].debator1Switch = incomingMsg.debator1Switch
    debateRoomObject[incomingMsg.roomId].debator2Switch = incomingMsg.debator2Switch
    io.in(incomingMsg.roomId).emit('switch', JSON.stringify(incomingMsg))
    console.log("DID THE SWITCH UPDATE", debateRoomObject[incomingMsg.roomId] )
  })

  client.on('updateLrned', function (data) {
    console.log("DID THE updateLrned UPDATE", data )
    let update = JSON.parse(data)
    debateRoomObject[update.roomId].debator1LrnedNew = update.debator1LrnedNew
    debateRoomObject[update.roomId].debator2LrnedNew = update.debator2LrnedNew
    console.log("This is the lrnedNew update", update)
    console.log("DID the lrnedNew update", debateRoomObject[update.roomId])
    console.log("this is the new debate room Object", debateRoomObject)
    io.in(update.roomId).emit('lrnedNewServerUpdate', JSON.stringify(update))
  })

  client.on('updateTotalScore', function (data) {
     console.log("Server Recieved updateScoresUPDATE", data)
     let update = JSON.parse(data)
     debateRoomObject[update.roomId].debator1TotalScore = update.debator1TotalScore
     debateRoomObject[update.roomId].debator2TotalScore = update.debator2TotalScore
     debateRoomObject[update.roomId].debator1win = update.debator1win
     debateRoomObject[update.roomId].debator2win = update.debator2win
     io.in(update.roomId).emit('FinalTotalScoreServerUpdate', JSON.stringify(update))
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