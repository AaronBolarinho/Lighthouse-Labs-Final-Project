import React, {Component} from 'react';
import DebateRoom from './DebateRoom.jsx';
import ProposedDebate from './ProposedDebate.jsx';
import ProposedDebateList from './ProposedDebateList.jsx';
import TestChangeUser from './TestChangeUser.jsx'
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom'
import Slider from './Slider.jsx';


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shouldRedirect:{should: false, room: null}
    }
    this.addUserToRoom = this.addUserToRoom.bind(this)
  }

  shouldRedirect(room) {
    this.setState({shouldRedirect: {should: true, room: room}})
  }
  addUserToRoom(user, room) {
    console.log("USER TO BE ADDED ", user)
    console.log("IN ROOM ", room.debateRoom.name)
    //THIS WILL SEND MESSAGE TO SEVER TO ADD USER TO DEBATE ROOM COMPONENT
  }

  componentDidMount() {
    this.props.socket.on('redirect', data => {
    const serverMsg = JSON.parse(data)
    serverMsg.name = "Room" + (this.props.debateRooms.length)
    this.shouldRedirect(serverMsg.name)
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

            <TestChangeUser changeUsername={this.props.changeUsername}/>
            <h5 className="subtitle">Propose Debate:</h5>
            <ProposedDebate socket={this.props.socket} currentUser={this.props.currentUser} setUserToDebator={this.props.setUserToDebator}/>
            <h5 className="subtitle">Join Debate:</h5>
            <ProposedDebateList socket={this.props.socket} debateRooms={this.props.debateRooms} currentUser={this.props.currentUser} setUserToDebator={this.props.setUserToDebator} setDebateRoomDebator2={this.props.setDebateRoomDebator2}/>

          </div>

          <div className="col-sm-7">
            <DebateRoom debateRoom={{name:"mainroom"}} currentUser={this.props.currentUser}/>
          </div>
        </div>
        <Slider debateRooms={this.props.debateRooms} currentUser={this.props.currentUser}/>
      </div>
    );
  }
}

export default Home;