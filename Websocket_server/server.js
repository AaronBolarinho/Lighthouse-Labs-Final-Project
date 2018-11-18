
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// app.get('/', function (req, res) {
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

  client.on('join', handleJoin)

  client.on('leave', handleLeave)

  client.on('message', function (data) {
    let incomingmsg = JSON.parse(data)
    console.log("RECIEVED : ", data);
    incomingmsg.tag = "serverMessage"
    client.broadcast.emit('message', JSON.stringify(incomingmsg))
  });

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