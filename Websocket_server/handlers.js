function makeHandleEvent(client, clientManager, chatroomManager) {

  function handleEvent(chatroomName, createEntry) {

        return new Promise(function (resolve, reject) {
        let user = clientManager.getUserByClientId(client.id)

        let chatroom = chatroomManager.getChatroomByName(chatroomName)
        // append event to chat history
        const entry = { user, ...createEntry() }
             //
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
  // console.log("CLIENT IS ", client)
  const handleEvent = makeHandleEvent(client, clientManager, chatroomManager)
  // console.log("HANDLE EVENT IS ", handleEvent)

  function handleJoin(chatroomName, callback) {
    // console.log("JOIN handler called for ", chatroomName)
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

  function handleDisconnect() {
    // remove user profile
    clientManager.removeClient(client)
    // remove member from all chatrooms
    chatroomManager.removeClient(client)
  }

  return {
    handleJoin,
    handleLeave,
    handleMessage,
    handleGetChatrooms,
    handleDisconnect
  }
}
