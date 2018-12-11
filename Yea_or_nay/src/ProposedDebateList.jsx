import React, {Component} from 'react';
import ProposedDebateListItem from './ProposedDebateListItem.jsx'
import Home from './Home.jsx';

class ProposedDebateList extends Component {

  constructor(props) {
    super(props)
  }

  createTopics () {
    const topicList=this.props.debateRooms.map(debateRoom => {
      if (!debateRoom.debator2)
      return(
        <ProposedDebateListItem key={debateRoom.id} topic={debateRoom.proposedDebate} proposingUser={debateRoom.debator1} stance={debateRoom.debator1Stance} debateRoom={debateRoom} socket={this.props.socket} currentUser={this.props.currentUser} setUserToDebator={this.props.setUserToDebator} setDebateRoomDebator2={this.props.setDebateRoomDebator2} closeMainRoomSocket={this.props.closeMainRoomSocket}/>
      )
    })
    return topicList
  }

  updateTopics (newTopic) {
  }

  componentDidMount() {
  }

  render() {
    return (
      <div class="proposed-debate-list">
        <ul>
          {this.createTopics()}
        </ul>
      </div>
    );
  }
}

export default ProposedDebateList;