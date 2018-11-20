import React, {Component} from 'react';
import ProposedDebateListItem from './ProposedDebateListItem.jsx'

class ProposedDebateList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      topics: [{id: 1, proposingUser: "TestUser1", proposedDebate: "Aardvarks are superior to narwhales", stance:"Yea"}, {id: 2, proposingUser: "TestUser2", proposedDebate: "Avocados are good for exfoliation", stance:"Nay"}],
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
    this.props.socket.on('proposal', data => {
    const serverMsg = JSON.parse(data)
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