import React, {Component} from 'react';
import DebateRoomMessage from './DebateRoomMessage.jsx';

function DebateMessageList ({messages, debateRoom,updateLiked}) {
  const messageList = messages.map(message => {
    return(
      <DebateRoomMessage key={message.id} message={message.content} username={message.username} room={debateRoom.name}  updateLiked={updateLiked}/>
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
