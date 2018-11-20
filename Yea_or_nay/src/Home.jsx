import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import MessageBar from './MessageBar.jsx';
import DebateRoom from './DebateRoom.jsx';
import Message from './Message.jsx';
import ProposedDebate from './ProposedDebate.jsx';
import ProposedDebateList from './ProposedDebateList.jsx';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom'


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shouldRedirect:{should: false, room: null}
    }
  }

  shouldRedirect(room) {
    this.setState({shouldRedirect: {should: true, room: room}})
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

        <div className="section">
          <div className="container">
            <div className="columns">

              <div className="column">
                <h5 className="subtitle is-5">Propose Debate:</h5>
                <ProposedDebate socket={this.props.socket} currentUser={this.props.currentUser}/>
                <h5 className="subtitle is-5">Join Debate:</h5>
                <ProposedDebateList socket={this.props.socket} debateRooms={this.props.debateRooms} currentUser={this.props.currentUser}/>


              </div>
               <div className="column is-three-quarters">
                <div className="field">
                  <div className="control">
                    {/* include the MessageList component to display the messages sent and their sender names */}
                    <DebateRoom debateRoom={{name:"mainroom"}}/>
                  </div>
                </div>
                  {this.props.debateRooms.map(debateRoom => (
                          <li>
                            <Link to={`/${debateRoom.name}`}> {debateRoom.name}</Link>
                            <br/> <span> {debateRoom.proposedDebate} </span>
                          </li>
                    ))}
                  </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;