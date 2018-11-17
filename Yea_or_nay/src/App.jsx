import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import MessageBar from './MessageBar.jsx';
// import DebateRoom from '.DebateRoom.jsx';
// import ProposedDebate from '.ProposedDebate.jsx';
// import ProposedDebateList from '.ProposedDebateList.jsx';
// import ActiveDebateList from '.ActiveDebateList.jsx';
const io = require('socket.io-client')
const socket = io.connect('http://localhost:3001')

class App extends Component {
  render() {
    return (
      <div>
        {/* create navbar component which includes a logo and a span element for displaying the number of users */}
        <nav className="navbar">
          <a href="/" className="navbar-brand">WEA or NAY</a>
          <span className="navbar-users">Viewer Avatar</span>
        </nav>

        <div className="section">
          <div className="container">
            <div className="columns">

              <div className="column">
                <div className="box">
                  <div className="field">
                    <h4 className="subtitle is-4">Propose Debate:</h4>
                    <div className="control">
                      <input className="input is-primary" type="text" placeholder="Debate input"/>
                      <div className="buttons has-addons">
                        <span className="button">WEA</span>
                        <span className="button">NAY</span>
                      </div>
                    </div>
                  </div>
                </div>

                  <div className="box">
                    <div className="field">
                      <h4 className="subtitle is-4">Join A Debate:</h4>
                      <div className="control">
                        <ul>
                          <li>This is our very long debate title<input class="button" type="submit" value="Wea or Nay"/></li>
                        </ul>
                      </div>
                    </div>
                  </div>


              </div>
               <div className="column is-three-quarters">
                <div class="field">
                  <div class="control">
                    {/* include the MessageList component to display the messages sent and their sender names */}
                    <MessageList/>
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                     {/* include a Chatbar component with corresponding user names and methods for sending messages to the server and update user names*/}
                    <MessageBar/>
                  </div>
                 </div>
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
    );
  }
}
export default App;