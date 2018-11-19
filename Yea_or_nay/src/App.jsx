import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import MessageBar from './MessageBar.jsx';
import DebateRoom from './DebateRoom.jsx';
import Message from './Message.jsx'
import '../node_modules/bulma-extensions/bulma-carousel/dist/js/bulma-carousel.min.js';
import '../node_modules/bulma-extensions/bulma-carousel/dist/css/bulma-carousel.min.css';


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
                          <li>This is our very long debate title<input className="button" type="submit" value="Yea or Nay"/></li>
                        </ul>
                      </div>
                    </div>
                  </div>


              </div>
               <div className="column is-three-quarters">
                <div className="field">
                  <div className="control">
                    {/* include the MessageList component to display the messages sent and their sender names */}
                    <MessageList/>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                     {/* include a Chatbar component with corresponding user names and methods for sending messages to the server and update user names*/}
                    <MessageBar/>
                  </div>
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
              {/*this.state.debateRooms.map(debateRoom => (
                <div>
                <DebateRoom key={debateRoom.name} debateRoom={debateRoom}/>
                <li>
                <Link to={`/${debateRoom.name}`}> {debateRoom.name} </Link>
                <Link to="/test"> Test </Link>
                </li>
                </div>))*/}
                <Switch>
                <Route
                  exact
                  path="/"
                  component={Message}
                  />
                      {this.state.debateRooms.map(debateRoom => (
                        <Route
                          key={debateRoom.name}
                          exact
                          path={`/${debateRoom.name}`}
                          render={
                            props => this.renderDebateRoom(debateRoom.name)
                          }
                        /> ))
                    }
                </Switch>
            </div>
          </div>
        </div>
        <footer className="footer has-background-white">
              <div className='carousel carousel-animated carousel-animate-slide' data-size="5">
              <div className='carousel-container'>
                <div className='carousel-item is-active'>
                  <figure className="image is-2by1"><img src="https://bulma.io/images/placeholders/640x320.png"/></figure>
                </div>
                <div className='carousel-item'>
                  <figure className="image is-2by1"><img src="https://bulma.io/images/placeholders/640x320.png"/></figure>
                </div>
                <div className='carousel-item'>
                  <figure className="image is-2by1"><img src="https://bulma.io/images/placeholders/640x320.png"/></figure>
                </div>
                <div className='carousel-item'>
                  <figure className="image is-2by1"><img src="https://bulma.io/images/placeholders/640x320.png"/></figure>
                </div>
                <div className='carousel-item'>
                  <figure className="image is-2by1"><img src="https://bulma.io/images/placeholders/640x320.png"/></figure>
                </div>
                <div className='carousel-item'>
                  <figure className="image is-2by1"><img src="https://bulma.io/images/placeholders/640x320.png"/></figure>
                </div>
                <div className='carousel-item'>
                  <figure className="image is-2by1"><img src="https://bulma.io/images/placeholders/640x320.png"/></figure>
                </div>
              </div>
              <div className="carousel-navigation is-centered">
                <div className="carousel-nav-left">
                  <i className="fa fa-chevron-left" aria-hidden="true"></i>
                </div>
                <div className="carousel-nav-right">
                  <i className="fa fa-chevron-right" aria-hidden="true"></i>
                </div>
              </div>
            </div>

        </footer>
      </div>
      </BrowserRouter>
    );
  }
}
export default App;