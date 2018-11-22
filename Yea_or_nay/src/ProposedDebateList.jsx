import React, {Component} from 'react';
import ProposedDebateListItem from './ProposedDebateListItem.jsx'

class ProposedDebateList extends Component {

  constructor(props) {
    super(props)

    // this.state = {
    //   topics: [{id: 1, proposingUser: "TestUser1", proposedDebate: "Aardvarks are superior to narwhales", stance:"Yea"}, {id: 2, proposingUser: "TestUser2", proposedDebate: "Avocados are good for exfoliation", stance:"Nay"}],
    // }
  }

  createTopics () {
    const topicList=this.props.debateRooms.map(debateRoom => {
      if (!debateRoom.debator2)
      return(
        <ProposedDebateListItem key={debateRoom.id} topic={debateRoom.proposedDebate} proposingUser={debateRoom.debator1} stance={debateRoom.debator1Stance} debateRoom={debateRoom.name} socket={this.props.socket} currentUser={this.props.currentUser}/>
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