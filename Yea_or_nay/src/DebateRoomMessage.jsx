import React, {Component} from 'react';

function DebateRoomMessage ({username, message, room, updateLiked, state,
                            flag, debatorState, messageId, liked, debatorYea, debatorNay, debator1Stance})
  {

  function clickedLike(e){
    updateLiked(username, e.target.value);
    e.target.disabled = true;
  }

  if (username === debatorYea) {

    return (
      <div className='message-container'>
        <div className="message-username">{username}:
        </div>
        <div className="message-content speech-bubble-yea top-yea">
          {message}
          {room !== 'mainroom' && state === 'viewer' &&  !flag ?
          <button id='liked' onClick={clickedLike}>LIKE</button>: ''}
        </div>
      </div>
    )
  } else {

    return (

      <div className='message-container'>
        <div className="debatorNay">{username}
        </div>
        <div className="message-content speech-bubble-nay top-nay">
          {message}
          {room !== 'mainroom' && state === 'viewer' &&  !flag ?
          <button id='liked' onClick={clickedLike}>LIKE</button>: ''}
        </div>
      </div>
    )
  }
}

export default DebateRoomMessage;