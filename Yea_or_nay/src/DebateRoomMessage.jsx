import React, {Component} from 'react';

function DebateRoomMessage ({username, message, room, updateLiked, state, flag, debatorState}) {

  function clickedLike(e){
    updateLiked(username);
    e.target.disabled = true;

  }

  return (
    <div>
      <div>
        <span className="message-username">{username}: </span>
        <span>{debatorState} </span>
      </div>
      <div className="message">
        <div className="message-content speech-bubble top">{message} {room !== 'mainroom' && state === 'viewer' &&  !flag ? <button id='liked' onClick={clickedLike}>LIKE</button>: ''}</div>
      </div>
    </div>
  );
}

export default DebateRoomMessage;