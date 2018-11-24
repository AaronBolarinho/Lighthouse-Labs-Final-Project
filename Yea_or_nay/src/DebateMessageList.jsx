import React, {Component} from 'react';
import DebateRoomMessage from './DebateRoomMessage.jsx';
import ProgressBar from './ProgressBar.jsx';

function DebateMessageList ({messages, debateRoom,updateLiked, userState, debator1Liked, debator2Liked}) {
  console.log('debator1Liked', debator1Liked);
  console.log('debator1Liked', debator2Liked);
  let progress_value = 100 * debator2Liked / (debator1Liked + debator2Liked);
  console.log('progress_value', progress_value);
  const messageList = messages.map(message => {
    return(
      <DebateRoomMessage key={message.id} message={message.content} username={message.username} room={debateRoom.name}  updateLiked={updateLiked} state={userState} flag={message.flag}/>
    )
  });
  return (
        <div className="messages">
          <h4 className='room-name'>{debateRoom.proposedDebate} </h4>
          {debateRoom.name !== 'mainroom' ?  <ProgressBar value={progress_value}/> : ""}
          <h4 className='debator-name1'>{debateRoom.debator1}</h4>
          <h4 className='debator-name2'>{debateRoom.debator2}</h4>
        <div className='lrnedSomethingNew'>
          <span>Learned Something New! <button className='lrnedSomethingNewButton'>Cool!</button> </span>
        </div>
          <div className='container message-list'>
            {messageList}
          </div>
        </div>
  );
}

export default DebateMessageList
