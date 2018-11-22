import React, {Component} from 'react';
import DebateRoomMessage from './DebateRoomMessage.jsx';

function DebateMessageList ({messages, debateRoom}) {
  const messageList = messages.map(message => {
    return(
      <DebateRoomMessage key={message.id} message={message.content} username={message.username} />
    )
  })
  return (
        <main className="messages">
          <h4 className='room-name'>{debateRoom.name}</h4>
          <h4 className='room-name'>{debateRoom.proposedDebate} </h4>
          <div className='container-message-list'>
              {messageList}
          </div>
        </main>
  )
}

export default DebateMessageList
