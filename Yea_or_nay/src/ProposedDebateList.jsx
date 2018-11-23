import React, {Component} from 'react';
import ProposedDebateListItem from './ProposedDebateListItem.jsx'
import Home from './Home.jsx';

class ProposedDebateList extends Component {

  constructor(props) {
    super(props)

    // this.state = {
    //   topics: [{id: 1, proposingUser: "TestUser1", proposedDebate: "Aardvarks are superior to narwhales", stance:"Yea"}, {id: 2, proposingUser: "TestUser2", proposedDebate: "Avocados are good for exfoliation", stance:"Nay"}],
    // }
  }

  createTopics () {
    // console.log("This is the proposed debate props", this.props)
    // this.props.closeMainRoomSocket()
    const topicList=this.props.debateRooms.map(debateRoom => {
      if (!debateRoom.debator2)
      return(
        <ProposedDebateListItem key={debateRoom.id} topic={debateRoom.proposedDebate} proposingUser={debateRoom.debator1} stance={debateRoom.debator1Stance} debateRoom={debateRoom} socket={this.props.socket} currentUser={this.props.currentUser} setUserToDebator={this.props.setUserToDebator} setDebateRoomDebator2={this.props.setDebateRoomDebator2} closeMainRoomSocket={this.props.closeMainRoomSocket}/>
      )
    })
    return topicList
  }

  updateTopics (newTopic) {
    // let oldTopics = this.state.topics;
    // let newTopics = [...oldTopics, newTopic];
    // this.setState({ topics: newTopics });
  }

  componentDidMount() {
    // this.props.socket.on('proposal', data => {
    // const serverMsg = JSON.parse(data)
    // this.updateTopics(serverMsg)
    // })
  }

  render() {
    console.log("DEBATE ROOMS FROM DEBATE LIST ARE ", this.props.debateRooms)
    return (
          <form className="form">
            <ul>
              {this.createTopics()}
            </ul>
          </form>
    );

  }
}

export default ProposedDebateList;