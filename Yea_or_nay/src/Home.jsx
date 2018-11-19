import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import MessageBar from './MessageBar.jsx';
import DebateRoom from './DebateRoom.jsx';
import Message from './Message.jsx';
import ProposedDebate from './ProposedDebate.jsx';
import ProposedDebateList from './ProposedDebateList.jsx';
// import ProposedDebate from '.ProposedDebate.jsx';
// import ProposedDebateList from '.ProposedDebateList.jsx';
// import ActiveDebateList from '.ActiveDebateList.jsx';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom'
const io = require('socket.io-client')
const socket = io.connect('http://localhost:3001')

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      debateRooms: this.props.debateRooms
    }
  }

renderDebateRoom(debateRoom) {
    return (
      <DebateRoom debateRoom={debateRoom}/>
    )
  }

  render() {
    return (
      <div>

        <div className="section">
          <div className="container">
            <div className="columns">

              <div className="column">
                <h5 className="subtitle is-5">Propose Debate:</h5>
                <ProposedDebate/>
                <h5 className="subtitle is-5">Join Debate:</h5>
                <ProposedDebateList/>


              </div>
               <div className="column is-three-quarters">
                <div className="field">
                  <div className="control">
                    {/* include the MessageList component to display the messages sent and their sender names */}
                    <DebateRoom debateRoom={{name:"mainroom"}}/>
                  </div>
                </div>
                  <li>
                  <Link to ="/Room1">Room1</Link>
                  </li>
                  <li>
                  <Link to ="/Room2">Room2</Link>
                  </li>
                  <li>
                  <Link to ="/Room3">Room3</Link>
                  </li>
                  </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;