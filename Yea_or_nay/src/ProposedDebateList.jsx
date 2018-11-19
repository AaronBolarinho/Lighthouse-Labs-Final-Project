import React, {Component} from 'react';
import ProposedDebateListItem from './ProposedDebateListItem.jsx'

const io = require('socket.io-client')
const socket = io.connect('http://localhost:3001')

class ProposedDebateList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      topics: [{id: 1, proposingUser: "TestUser1", proposedDebate: "Aardvarks are superior to narwhales", stance:"Yea"}, {id: 2, proposingUser: "TestUser2", topicStatement: "Avocados are good for exfoliation", stance:"Nay"}],
    }
  }

  createTopics () {
    const topicList=this.state.topics.map(topic => {
      return(
        <ProposedDebateListItem key={topic.id} topic={topic.proposedDebate} proposingUser={topic.proposingUser} stance={topic.stance} />
      )
    })
    return topicList
  }

  updateTopics (newTopic) {
    let oldTopics = this.state.topics;
    let newTopics = [...oldTopics, newTopic];
    this.setState({ topics: newTopics });
  }

  componentDidMount() {
    socket.on('proposal', data => {
    const serverMsg = JSON.parse(data)
    console.log("received : ", serverMsg)
    this.updateTopics(serverMsg)
    })
  }
  render() {

    return (
      <div className="box">
        <div className="field">
          <div className="control">
            <ul>
              {this.createTopics()}
            </ul>
          </div>
        </div>
      </div>
    );

  }
}

export default ProposedDebateList;