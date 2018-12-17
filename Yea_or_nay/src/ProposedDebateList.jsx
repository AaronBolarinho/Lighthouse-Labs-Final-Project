import React, {Component} from 'react';
import ProposedDebateListItem from './ProposedDebateListItem.jsx'
import Home from './Home.jsx';

// class ProposedDebateList extends Component {

//   constructor(props) {
//     super(props)
//   }

//   createTopics () {
//     const topicList=this.props.debateRooms.map(debateRoom => {
//       if (!debateRoom.debator2)
//       return(
//         <ProposedDebateListItem key={debateRoom.id} topic={debateRoom.proposedDebate} proposingUser={debateRoom.debator1} stance={debateRoom.debator1Stance} debateRoom={debateRoom} socket={this.props.socket} currentUser={this.props.currentUser} setUserToDebator={this.props.setUserToDebator} setDebateRoomDebator2={this.props.setDebateRoomDebator2}/>
//       )
//     })
//     return topicList
//   }

//   updateTopics (newTopic) {
//   }

//   componentDidMount() {
//   }

//   render() {
//     return (
//       <div class="proposed-debate-list">
//         <ul>
//           {this.createTopics()}
//         </ul>
//       </div>
//     );
//   }
// }

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