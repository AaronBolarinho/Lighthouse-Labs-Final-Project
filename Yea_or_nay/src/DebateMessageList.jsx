import React, {Component} from 'react';
import DebateRoomMessage from './DebateRoomMessage.jsx';

function DebateMessageList ({messages, debateRoom}) {
  const messageList = messages.map(message => {
    return(
      <DebateRoomMessage key={message.id} message={message.content} username={message.username} />
    )
  })
  return (
    <div className="field">
      <div className="control">
        <main className="messages">
          <h4 className="subtitle is-4">{debateRoom.name}</h4>
          <h6 className="subtitle is-4">{debateRoom.proposedDebate} </h6>
          <div className="box">
            {messageList}
          </div>
        </main>
      </div>
    </div>
  )
}

export default DebateMessageList
