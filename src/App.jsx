import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import MessageBar from './MessageBar.jsx';
// import DebateRoom from '.DebateRoom.jsx';
// import ProposedDebate from '.ProposedDebate.jsx';
// import ProposedDebateList from '.ProposedDebateList.jsx';
// import ActiveDebateList from '.ActiveDebateList.jsx';

class App extends Component {
  render() {
    return (
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
            <div className="columns">

              <div className="column">
               <h5 className="subtitle is-5">Propose Debate:</h5>
                <div className="box">
                  <div className="field">
                    <div className="control">
                      <input className="input is-primary" type="text" placeholder="Debate input"/>
                      <div className="buttons has-addons">
                        <span className="button">YEA</span>
                        <span className="button">NAY</span>
                      </div>
                    </div>
                  </div>
                </div>
                  <h5 className="subtitle is-5">Join Debate:</h5>
                  <div className="box">
                    <div className="field">
                      <div className="control">
                        <ul>
                          <li>This is our very long debate title</li>
                          <li><input class="button" type="submit" value="Yea or Nay"/></li>
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