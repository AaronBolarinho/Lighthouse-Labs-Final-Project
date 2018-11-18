const Chatroom = require('./Chatroom')
// const chatroomTemplates = require('../config/chatrooms')

const chatroomTemplates = [ {
    name: 'Terminus',
    image: 'https://jpeg.org/images/jpeg2000-home.jpg'
  },
{
  name: "BLAH",
  image: 'https://jpeg.org/images/jpeg2000-home.jpg'
}
  ]

module.exports = function () {
  // mapping of all available chatrooms
  const chatrooms = new Map(
    chatroomTemplates.map(c => [
      c.name,
      Chatroom(c)
    ])
  )

  function removeClient(client) {
    chatrooms.forEach(c => c.removeUser(client))
  }

  function getChatroomByName(chatroomName) {
    console.log("CHATROOMS ARE ", chatrooms)
    return chatrooms.get(chatroomName)
  }

  function serializeChatrooms() {
    return Array.from(chatrooms.values()).map(c => c.serialize())
  }

  return {
    removeClient,
    getChatroomByName,
    serializeChatrooms
  }
}
