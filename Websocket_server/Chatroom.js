module.exports = function ({ name, image }) {
  const members = new Map() // members are connected users
  let chatHistory = [] // this is an array of added messages

  function broadcastMessage(message) {
    members.forEach(m => m.emit('message', message))
  }

  function addEntry(entry) {
    chatHistory = chatHistory.concat(entry)
  }

  function getChatHistory() {
    // return chatHistory.slice() // not sure if this is nessesary
    return chatHistory
  }

  function addUser(client) {
    members.set(client.id, client)
  }

  function removeUser(client) {
    members.delete(client.id)
  }

  function serialize() {
    return {
      name,
      image,
      numMembers: members.size
    }
  }

  return {
    broadcastMessage,
    addEntry,
    getChatHistory,
    addUser,
    removeUser,
    serialize
  }
}
