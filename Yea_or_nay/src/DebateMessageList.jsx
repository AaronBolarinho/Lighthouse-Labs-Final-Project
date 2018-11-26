import React, {Component} from 'react';
import DebateRoomMessage from './DebateRoomMessage.jsx';
import ProgressBar from './ProgressBar.jsx';


function DebateMessageList ({messages, debateRoom,updateLiked, userState, debator1Liked,
                            debator2Liked, debator1Switch, debator2Switch}) {
  console.log('debateRoom:', debateRoom);
  let debator1Points = debator1Liked + (debator1Switch * 3);
  let debator2Points = debator2Liked + (debator2Switch * 3);
  let progressValue = 0;
  let debatorYea = '';
  let debatorNay = '';

  if (debateRoom.debator1Stance === 'Yea') {
    progressValue = 100 * debator2Points / (debator1Points + debator2Points);
    debatorYea = debateRoom.debator1;
    debatorNay = debateRoom.debator2;
  } else {
    progressValue = 100 * debator1Points / (debator1Points + debator2Points);
    debatorYea = debateRoom.debator2;
    debatorNay = debateRoom.debator1;
  };

  console.log("MESSAGES IN MESSAGE LIST ARE", messages)

  const messageList = messages.map(message => {

    return(

      <DebateRoomMessage key={message.id} message={message.content} messageId={message.id} username={message.username}
        room={debateRoom.name} debatorState={message.state} updateLiked={updateLiked} state={userState} flag={message.flag}
        debatorYea={debatorYea} debatorNay={debatorNay} debator1Stance={debateRoom.debator1Stance} liked={message.liked}/>
      )
  });

  return (

    <div className="messages">
      <h4 className='room-name'>{debateRoom.proposedDebate} </h4>
      {debateRoom.name !== 'mainroom' ?  <ProgressBar value={progressValue} debatorYea={debatorYea} debatorNay={debatorNay}/> : ""}
      <div className='container message-list clearfix'>
        {messageList}
      </div>
    </div>
  );
}

export default DebateMessageList;
