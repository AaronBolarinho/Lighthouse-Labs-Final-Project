function makeHandleEvent(client, clientManager, chatroomManager) {

  function handleEvent(chatroomName, createEntry) {

        return new Promise(function (resolve, reject) {
        let user = clientManager.getUserByClientId(client.id)

        let chatroom = chatroomManager.getChatroomByName(chatroomName)
        // append event to chat history
        const entry = { user, ...createEntry() }
        chatroom.addEntry(entry)

        // notify other clients in chatrooms
        chatroom.broadcastMessage({ chat: chatroomName, ...entry })

          return chatroom
            ? resolve(chatroom)
            : reject("rejectionMessage")
        })
  }

  return handleEvent
}

module.exports = function (client, clientManager, chatroomManager) {
  const handleEvent = makeHandleEvent(client, clientManager, chatroomManager)

  // function handleRegister(userName, callback) {
  //   if (!clientManager.isUserAvailable(userName))
  //     return callback('user is not available')

  //   const user = clientManager.getUserByName(userName)
  //   clientManager.registerClient(client, user)

  //   return callback(null, user)
  // }

  function handleJoin(chatroomName, callback) {
    const createEntry = () => ({ event: `joined ${chatroomName}` })

    handleEvent(chatroomName, createEntry)
      .then(function (chatroom) {
        // add member to chatroom
        chatroom.addUser(client)

        // send chat history to client
        callback(null, chatroom.getChatHistory())
      })
      .catch(callback)
  }

  function handleLeave(chatroomName, callback) {
    const createEntry = () => ({ event: `left ${chatroomName}` })

    handleEvent(chatroomName, createEntry)
      .then(function (chatroom) {
        // remove member from chatroom
        chatroom.removeUser(client.id)

        callback(null)
      })
      .catch(callback)
  }

  function handleMessage({ chatroomName, message } = {}, callback) {
    const createEntry = () => ({ message })

    handleEvent(chatroomName, createEntry)
      .then(() => callback(null))
      .catch(callback)
  }

  function handleGetChatrooms(_, callback) {
    return callback(null, chatroomManager.serializeChatrooms())
  }

  // function handleGetAvailableUsers(_, callback) {
  //   return callback(null, clientManager.getAvailableUsers())
  // }

  function handleDisconnect() {
    // remove user profile
    clientManager.removeClient(client)
    // remove member from all chatrooms
    chatroomManager.removeClient(client)
  }

  return {
    handleRegister,
    handleJoin,
    handleLeave,
    handleMessage,
    handleGetChatrooms,
    handleGetAvailableUsers,
    handleDisconnect
  }
}
