import React, {Component} from 'react';
import DebateRoom from './DebateRoom.jsx';
import ProposedDebate from './ProposedDebate.jsx';
import ProposedDebateList from './ProposedDebateList.jsx';
import TestChangeUser from './TestChangeUser.jsx'
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom'
import Slider from './Slider.jsx';
import SuggestedTopics from './SuggestedTopics.jsx';


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shouldRedirect:{should: false, room: null},
      topics: []
    }
  }

  shouldRedirect(room) {
    this.setState({shouldRedirect: {should: true, room: room}})
  }

  componentDidMount() {
    this.props.setUserToViewer();

    this.props.socket.emit('getDebateRooms', "please")

    this.props.socket.on('redirect', data => {
      const serverMsg = JSON.parse(data)
      serverMsg.name = "Room" + (serverMsg.id)
      this.shouldRedirect(serverMsg.id)
    })

    this.props.socket.on('newsfeed', data => {
      const serverMsg = JSON.parse(data)
      this.setState({topics:serverMsg});
    })

  }

  render() {
    if (this.state.shouldRedirect.should) {
     return (<Redirect to={`/${this.state.shouldRedirect.room}`} />)
    }
    return (
      <div>
        <div className='row'>
          <div className="col-sm-5">
            <h5 className="subtitle">Propose Debate:</h5>
            <ProposedDebate socket={this.props.socket} debateRooms={this.props.debateRooms} currentUser={this.props.currentUser} setUserToDebator={this.props.setUserToDebator}/>
            <h5 className="subtitle">Join Debate:</h5>
            <ProposedDebateList socket={this.props.socket} debateRooms={this.props.debateRooms} currentUser={this.props.currentUser} setUserToDebator={this.props.setUserToDebator} setDebateRoomDebator2={this.props.setDebateRoomDebator2}/>
          </div>
          <div className="col-sm-7">
            <SuggestedTopics topics={this.state.topics}/>
          </div>
        </div>
        <Slider debateRooms={this.props.debateRooms} currentUser={this.props.currentUser} socket={this.props.socket}/>
      </div>
    );
  }
}

export default Home;