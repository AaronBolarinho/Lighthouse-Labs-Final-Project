import React, {Component} from 'react';
import ProposedDebateListItem from './ProposedDebateListItem.jsx'

function ProposedDebateList ({debateRooms, socket, currentUser, setUserToDebator, setDebateRoomDebator2}) {
  const topicList=debateRooms.map(debateRoom => {
    if (!debateRoom.debator2) {
      return (
        <ProposedDebateListItem key={debateRoom.id} topic={debateRoom.proposedDebate} proposingUser={debateRoom.debator1} stance={debateRoom.debator1Stance} debateRoom={debateRoom} socket={socket} currentUser={currentUser} setUserToDebator={setUserToDebator} setDebateRoomDebator2={setDebateRoomDebator2}/>
      )
    }
  })

  return (
    <div class="proposed-debate-list">
      <ul>
        {topicList}
      </ul>
    </div>
  )
}

export default ProposedDebateList;