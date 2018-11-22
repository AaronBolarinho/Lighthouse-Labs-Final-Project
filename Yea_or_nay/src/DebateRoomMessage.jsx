import React, {Component} from 'react';

function DebateRoomMessage ({username, message, room, updateLiked}) {


   function clickedLike(){
     updateLiked(username);

   }

  return (
      <div className="message" >
        <span className="message-username">{username}: </span>
        <span className="message-content">{message} {room !== 'mainroom' ? <button className='liked' onClick={clickedLike}>LIKE</button>: ''}</span>
      </div>
  );
}

export default DebateRoomMessage;