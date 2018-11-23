
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

   client.on('addViewer', function (data) {
    let incomingViewer = JSON.parse(data)
    let viewerToBeAdded = {id: incomingViewer.id, username: incomingViewer.username, state: "viewer", stance: null}
    io.in(incomingViewer.room).emit('addUser', JSON.stringify(viewerToBeAdded))
    console.log("ADD VIEEEEWER")
   })

   client.on('addDebator2', function (data) {
    let incomingDebator2 = JSON.parse(data)
    console.log("INCOMINGDEBATOR2", incomingDebator2)
    let debator2ToBeAdded = {id: incomingDebator2.id, username: incomingDebator2.username, state: "debator2", stance: incomingDebator2.stance}
    io.in(incomingDebator2.room.name).emit('addUser', JSON.stringify(debator2ToBeAdded))
    io.emit('addDebator2ToApp', JSON.stringify(incomingDebator2.room))
    console.log("ADDD DEBATOR 2222")
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