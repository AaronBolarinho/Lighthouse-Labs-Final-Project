import React, {Component} from 'react';
import DebateRoom from './DebateRoom.jsx';
import Home from './Home.jsx';
import Slider from './Slider.jsx';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
const io = require('socket.io-client');
const socket = io.connect('http://localhost:3001');

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
        <nav className='navbar navbar-expand-sm bg-dark navbar-black'>
          <div className='container'>
            <div className="navbar-brand">
              <p id="logo">YEA or NAY</p>
            </div>
            <div className="navbar-nav navbar-right">
              <div className="nav-item">
                <span className="navbar-users">Viewer</span>
              </div>
            </div>
          </div>
        </nav>
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
        <footer className="footer">
          <div className="container mt-3">

            <h4>View debates</h4>
            <Slider/>
          </div>

        </footer>
      </div>
      </BrowserRouter>
    );
  }
}
export default App;