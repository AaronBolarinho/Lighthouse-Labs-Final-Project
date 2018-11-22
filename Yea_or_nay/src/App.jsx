import React, {Component} from 'react';
import Timer from './Timer.jsx';
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
      currentUser: {name:"bob", state:"viewer"},
      socket: socket,
      debateRooms: [{id: 1, name: "Room1", proposedDebate:"Bananas are blue", debator1:"testUser1", debator2: null, debator1Stance: "Yea"}, {id: 2, name: "Room2", proposedDebate:"The sky is blue", debator1:"testUser3", debator2: "testUser4", debator1stance: "Nay"}]
    }
    this.changeUsername = this.changeUsername.bind(this)
    this.setUserToDebator = this.setUserToDebator.bind(this)
    this.findDebateRoomById = this.findDebateRoomById.bind(this)
    this.setDebateRoomDebator2 = this.setDebateRoomDebator2.bind(this)
    this.addDebateRoom = this.addDebateRoom.bind(this)
    this.setUserToViewer = this.setUserToViewer.bind(this)

  }

  changeUsername(newUsername) {
    this.setState({currentUser: {name: newUsername, state: this.state.currentUser.state}});
  }

  setUserToDebator(debator) {
    console.log(`Setting ${this.state.currentUser.name} to ${debator}`)
    this.setState({currentUser: {name: this.state.currentUser.name, state: debator}});
  }

  setUserToViewer() {
    console.log(`Setting ${this.state.currentUser.name} to Viewer`)
    this.setState({currentUser: {name: this.state.currentUser.name, state: "viewer"}});
  }

  setDebateRoomDebator2(user, debateRoom) {
    debateRoom.debator2 = user.name

    const index = this.findDebateRoomById(debateRoom.id)

    this.setState({debateRooms: [
      ...this.state.debateRooms.slice(0, index), debateRoom, ...this.state.debateRooms.slice(index + 1)
      ]})

  }

  findDebateRoomById(id) {
    let room = this.state.debateRooms.findIndex(debateRoom => {
      return debateRoom.id == id
    })
    return room
  }

  renderDebateRoom(debateRoom) {
    return (
      <DebateRoom debateRoom={debateRoom} currentUser={this.state.currentUser} setUserToViewer={this.setUserToViewer}/>
    )
  }

  addDebateRoom(newDebateRoom) {
    let oldDebateRooms = this.state.debateRooms;
    let newDebateRooms = [...oldDebateRooms, newDebateRoom];
    this.setState({ debateRooms: newDebateRooms });
  }

  componentDidMount() {
    socket.on('newRoom', data => {
    const serverMsg = JSON.parse(data)
    serverMsg.name = "Room" + (this.state.debateRooms.length + 1)
    this.addDebateRoom(serverMsg)
    })
  }

  render() {
    return (
      <BrowserRouter>
      <div>
        {/* create a nav component which includes a logo and a span element for displaying the viewer avatar and profile */}
        <nav className='navbar navbar-expand-sm navbar-black'>
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
                     <Switch>
                        <Route
                          exact
                          path="/"
                          render={
                            props => (
                          <Home debateRooms={this.state.debateRooms} socket={this.state.socket} currentUser={this.state.currentUser} changeUsername={this.changeUsername} setUserToDebator={this.setUserToDebator} setDebateRoomDebator2={this.setDebateRoomDebator2} setUserToViewer={this.setUserToViewer}/>
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
        <footer className="footer">
          <div className="container mt-3">

            <h4>View debates</h4>
            <Slider debateRooms={this.state.debateRooms}/>
          </div>

        </footer>
      </div>
      </BrowserRouter>
    );
  }
}
export default App;