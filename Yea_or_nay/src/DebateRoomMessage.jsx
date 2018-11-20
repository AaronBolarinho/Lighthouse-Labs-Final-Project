import React, {Component} from 'react';

function DebateRoomMessage ({username, message}) {

  return (
      <div className="message" >
        <span className="message-username">{username}: </span>
        <span className="message-content">{message}  </span>
      </div>
  );
}

export default DebateRoomMessage;