import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import MessageBar from './MessageBar.jsx';
import DebateRoom from './DebateRoom.jsx';
import Home from './Home.jsx';
// import ProposedDebate from '.ProposedDebate.jsx';
// import ProposedDebateList from '.ProposedDebateList.jsx';
// import ActiveDebateList from '.ActiveDebateList.jsx';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom'
const io = require('socket.io-client')
const socket = io.connect('http://localhost:3001')

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: null,
      client: socket,
      debateRooms: [{name: "Room1"}, {name:"Room2"}, {name:"Room3"}]
    }
  }

renderDebateRoom(debateRoom) {
    return (
      <DebateRoom debateRoom={debateRoom}/>
    )
  }

  render() {
    return (
      <BrowserRouter>
      <div>
        {/* create a nav component which includes a logo and a span element for displaying the viewer avatar and profile */}
        <nav className="level">
          <div claName="level-left">
            <div className="level-item has-text-centered">
              <p id="logo">YEA or NAY</p>
            </div>
          </div>
          <div claName="level-left">
            <div className="level-item">
              <span className="navbar-users">Viewer</span>
            </div>
          </div>
        </nav>

        <div className="section">
          <div className="container">
                <div className="field">
                  <div className="control">
                     <Switch>
                        <Route
                          exact
                          path="/"
                          render={
                            props => (
                          <Home debateRooms={this.state.debateRooms} />
                          )
                          }
                        />
                        {this.state.debateRooms.map(debateRoom => (
                          <Route
                            key={debateRoom.name}
                            exact
                            path={`/${debateRoom.name}`}
                            render={
                              props => this.renderDebateRoom(debateRoom)
                            }
                          /> ))
                        }
                      </Switch>
                  </div>
                </div>
          </div>
        </div>
        <footer className="footer has-background-white">
          <div className="content has-text-centered">
            <p>
              <strong>ActiveDebateList</strong>
            </p>
          </div>
        </footer>
      </div>
      </BrowserRouter>
    );
  }
}
export default App;