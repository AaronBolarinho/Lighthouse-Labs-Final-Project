
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

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

  client.on('message', function (data) {
    let incomingmsg = JSON.parse(data)
    console.log("RECIEVED : ", incomingmsg, "from", incomingmsg.roomName);
    io.in(incomingmsg.roomName).emit('message', JSON.stringify(incomingmsg))
    console.log("SENT ", incomingmsg, "To hopefully only", incomingmsg.roomName)
  });

  client.on('proposal', function  (data) {
    console.log("RECIEVED proposal", data)
    let incomingProposal = JSON.parse(data)
    io.emit('proposal', JSON.stringify(incomingProposal))
    console.log("SEND BACK", incomingProposal)
  })

  client.on('chatrooms', handleGetChatrooms)

  client.on('disconnect', function () {
    console.log('client disconnect...', client.id)
    handleDisconnect()
  })

  client.on('error', function (err) {
    console.log('received error from client:', client.id)
    console.log(err)
  })
})

server.listen(3001, function (err) {
  if (err) throw err
  console.log('listening on port 3001')
})