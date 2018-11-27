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
        <div className= {liked ? "message-content speech-bubble-yea top-yea liked" : "message-content speech-bubble-yea top-yea"}>
          {message}
          {room !== 'mainroom' && state === 'viewer' &&  !flag ?
            <button id='liked' onClick={clickedLike} value={messageId} class="btn btn-secondary btn-xs active" role="button" aria-pressed="true">
            <i class="far fa-thumbs-up"></i>LIKE</button>: ''}
        </div>
      </div>
    )
  } else {

    return (

      <div className='message-container'>
        <div className="debatorNay">{username}
        </div>
        <div>
          <div className={liked ? "message-content speech-bubble-nay top-nay liked" : "message-content speech-bubble-nay top-nay"}>
            {message}
            {room !== 'mainroom' && state === 'viewer' &&  !flag ?
              <button id='liked' onClick={clickedLike} value={messageId} class="btn btn-secondary btn-xs active" role="button" aria-pressed="true">
              <i class="far fa-thumbs-up"></i>LIKE</button>: ''}
          </div>
        </div>
      </div>
    )
  }
}

export default DebateRoomMessage;