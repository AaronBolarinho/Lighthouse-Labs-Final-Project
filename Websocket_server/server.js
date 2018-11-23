
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
require('dotenv').config()

const Perspective = require('perspective-api-client');
const perspective = new Perspective({apiKey: process.env.PERSPECTIVE_API_KEY });

// app.get('/Room1', function (req, res) {
//   res.sendFile(__dirname + '/index.html');
// });

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

  client.on('subscribe', function (data) {
    console.log("RECIEVED Join for room: ", data, "by client", client.id)
    client.join(data)
  })

  client.on('leave', function (data) {
    console.log("RECIEVED leave: ", data)
    client.leave(data)
  })

  client.on('debateEnded', function (data) {
    console.log("RECIEVED DebateEnded: ", data)
    io.in(data).emit('displayResultsTo:', data)
  })

  client.on('closeDebate', function (data) {
    console.log("RECIEVED closeDebate: ", data)
    client.emit('GoBackHome', data)
    // io.emit('closeRoom', data)
  })

  client.on('destroyRoom', function (data) {
    // if( data !== "mainroom") {
    //   console.log("RECIEVED destroyRoom: ", data)
    //   // io.emit('destroyRoom', data)
    // }
    console.log("Does the server get the destroy COMMAND")
    io.emit('destroyRoom', data)
  })

  client.on('message', function (data) {

    let incomingmsg = JSON.parse(data)

    checkMessage(incomingmsg.content).then(function(result){

      incomingmsg.content = incomingmsg.content + result;
      console.log("RECIEVED : ", incomingmsg, "from", incomingmsg.roomName);
      io.in(incomingmsg.roomName).emit('message', JSON.stringify(incomingmsg))
      console.log("SENT ", incomingmsg, "To hopefully only", incomingmsg.roomName)
    })
  });

  // client.on('proposal', function  (data) {
  //   console.log("RECIEVED proposal", data)
  //   let incomingProposal = JSON.parse(data)
  //   io.emit('proposal', JSON.stringify(incomingProposal))
  //   console.log("SEND BACK", incomingProposal)
  // })

   client.on('newRoom', function  (data) {
    console.log("RECIEVED newRoom", data)
    let incomingRoom = JSON.parse(data)
    io.emit('newRoom', JSON.stringify(incomingRoom))
    client.emit('redirect', JSON.stringify(incomingRoom))
  })

   client.on('joinDebate', function (data) {
    console.log("RECIEVED JOIN DEBATE")
    let incomingRoom = JSON.parse(data)
    client.emit('redirect', JSON.stringify(incomingRoom))
   })

  client.on('chatrooms', handleGetChatrooms)

  client.on('disconnect', function () {
    console.log('client disconnect...', client.id)
    handleDisconnect()
  })

  client.on('timer', function (data) {
    console.log('received timer', data)
    let incomingTimerUpdate = JSON.parse(data)
    console.log("this is the timer update data", incomingTimerUpdate)
    io.in(incomingTimerUpdate.room).emit('TimerUpdate', JSON.stringify(incomingTimerUpdate))
  })

  client.on('ResultsTimer', function (data) {
    console.log('received Results timer', data)
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
      let systemMessage = "";
      const result = await perspective.analyze(text);
      const score = result.attributeScores.TOXICITY.summaryScore.value;
    //  console.log(score);
     // return score;
      if (score >= 0.9){
        systemMessage = "-- Message is offensive!"
      }
      else if (score >= 0.7){
        systemMessage = "--Please watch your comment"
      }
     // console.log(systemMessage);
      return systemMessage;
   }


})

server.listen(3001, function (err) {
  if (err) throw err
  console.log('listening on port 3001')
})