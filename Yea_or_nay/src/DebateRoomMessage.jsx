import React, {Component} from 'react';

function DebateRoomMessage ({username, message, room, updateLiked, state, flag, debatorState, messageId, liked}) {

  function clickedLike(e){
    updateLiked(username, e.target.value);
    e.target.disabled = true;
    console.log("VALUE", e.target.value)
  }
  console.log("LIKED IN MESSAGE IS", liked)
  if (liked) {
    return (
      <div className="liked">
        <div>
          <span className="message-username">{username}: </span>
          <span>{debatorState} </span>
        </div>
        <div className="message">
          <div className="message-content speech-bubble top">{message} {room !== 'mainroom' && state === 'viewer' &&  !flag ? <button id='liked' onClick={clickedLike} value={messageId}>LIKE {messageId}</button>: ''}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <span className="message-username">{username}: </span>
          <span>{debatorState} </span>
        </div>
        <div className="message">
          <div className="message-content speech-bubble top">{message} {room !== 'mainroom' && state === 'viewer' &&  !flag ? <button id='liked' onClick={clickedLike} value={messageId}>LIKE {messageId}</button>: ''}</div>
        </div>
      </div>
    )
  }
}

export default DebateRoomMessage;