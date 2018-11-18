import React, {Component} from 'react';
import DebateRoomMessage from './DebateRoomMessage.jsx';

function DebateMessageList ({messages}) {
  const messageList = messages.map(message => {
    return(
      <DebateRoomMessage key={message.id} message={message.content} username={message.username} />
    )
  })
  return (
    <div className="field">
      <div className="control">
        <main className="messages">
          <h4 className="subtitle is-4">Debate Room</h4>
          <div className="box">
            {messageList}
          </div>
        </main>
      </div>
    </div>
  )
}

export default DebateMessageList
