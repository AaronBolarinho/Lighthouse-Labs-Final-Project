import React, {Component} from 'react';


function SuggestedTopics ({topics}) {
  // // const messageList = messages.map(message => {
  // //   return(
  // //     <DebateRoomMessage key={message.id} message={message.content} username={message.username} room={debateRoom.name}  updateLiked={updateLiked} state={userState} flag={message.flag}/>
  // //   )
  // });


  const topicList = topics.map(topic => {
    return (<li><a href={topic.url} target="_blank">{topic.title}</a></li>)
  })
  return (
        <div className="messages">
          <h5 className='room-name'>Suggested Topics</h5>
          <ul>
           {topicList}
          </ul>
          </div>
  );
}

export default SuggestedTopics
