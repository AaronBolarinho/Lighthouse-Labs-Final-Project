import React, {Component} from 'react';

function DebateRoomMessage ({username, message, room, updateLiked, state, flag, debatorState, messageId, liked}) {

  function clickedLike(e){
    updateLiked(username, e.target.value);
    e.target.disabled = true;

  }

  if (liked) {
    return (
      <div className={debatorState == 'debator1' ? 'debator1 liked' : 'debator2 liked'}>
        <div>
          <span className="message-username">{username}: </span>
        </div>
        <div className="message">
          <div className="message-content speech-bubble top liked">{message} {room !== 'mainroom' && state === 'viewer' &&  !flag ? <button id='liked' onClick={clickedLike} value={messageId}>LIKE </button>: ''}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={debatorState == 'debator1' ? 'debator1' : 'debator2'}>
        <div>
          <span className="message-username">{username}: </span>
        </div>
        <div className="message">
          <div className="message-content speech-bubble top">{message} {room !== 'mainroom' && state === 'viewer' &&  !flag ? <button id='liked' onClick={clickedLike} value={messageId}>LIKE </button>: ''}</div>
        </div>
      </div>
    )
  }
}

export default DebateRoomMessage;