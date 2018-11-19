import React, {Component} from 'react';
import ProposedDebateListItem from './ProposedDebateListItem.jsx'

class ProposedDebateList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      topics: [{id: 1, proposingUser: "TestUser1", topicStatement: "Aardvarks are superior to narwhales", stance:"Yea"}, {id: 2, proposingUser: "TestUser2", topicStatement: "Avocados are good for exfoliation", stance:"Nay"}],
    }
  }

  createTopics () {
    const topicList=this.state.topics.map(topic => {
      return(
        <ProposedDebateListItem key={topic.id} topic={topic.topicStatement} proposingUser={topic.proposingUser} stance={topic.stance} />
      )
    })
    return topicList
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