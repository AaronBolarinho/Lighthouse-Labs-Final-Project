import React, {Component} from 'react';
import Timer from './Timer.jsx';
import DebateRoom from './DebateRoom.jsx';
import Home from './Home.jsx';
import Slider from './Slider.jsx';
import Navbar from './Navbar.jsx';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
const uuid = require('uuid/v4')
const io = require('socket.io-client');
const socket = io.connect('http://localhost:3001');


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: {id: uuid(), name:"bob", state:"viewer"},
      socket: socket,
      debateRooms: []
    }
    this.changeUsername = this.changeUsername.bind(this)
    this.setUserToDebator = this.setUserToDebator.bind(this)
    this.findDebateRoomById = this.findDebateRoomById.bind(this)
    this.setDebateRoomDebator2 = this.setDebateRoomDebator2.bind(this)
    this.addDebateRoom = this.addDebateRoom.bind(this)
    this.setUserToViewer = this.setUserToViewer.bind(this)
    this.getInitialDebateRooms = this.getInitialDebateRooms.bind(this)
  }

  getInitialDebateRooms(debateRooms) {
    this.setState({debateRooms: debateRooms})
  }

  changeUsername(newUsername) {
    this.setState({currentUser: {id: this.state.currentUser.id, name: newUsername, state: this.state.currentUser.state}});
  }

  setUserToDebator(debator) {
    console.log(`Setting ${this.state.currentUser.name} to ${debator}`)
    this.setState({currentUser: {id: this.state.currentUser.id, name: this.state.currentUser.name, state: debator}});
  }

  setUserToViewer() {
    console.log(`Setting ${this.state.currentUser.name} to Viewer`)
    this.setState({currentUser: {id: this.state.currentUser.id, name: this.state.currentUser.name, state: "viewer"}});
  }

  setDebateRoomDebator2(user, debateRoom) {
    debateRoom.debator2 = user
    const index = this.findDebateRoomById(debateRoom.id)
    this.setState({debateRooms: [
      ...this.state.debateRooms.slice(0, index), debateRoom, ...this.state.debateRooms.slice(index + 1)
      ]})
  }

  findDebateRoomById(id) {
    let roomIndex = this.state.debateRooms.findIndex(debateRoom => {
      return debateRoom.id == id
    })
    return roomIndex
  }

  renderDebateRoom(debateRoom) {
    return (
      <div>
        <DebateRoom debateRoom={debateRoom} currentUser={this.state.currentUser} setUserToViewer={this.setUserToViewer} socket={this.state.socket}/>
      </div>
    )
  }

  addDebateRoom(newDebateRoom) {
    let oldDebateRooms = this.state.debateRooms;
    let newDebateRooms = [...oldDebateRooms, newDebateRoom];
    this.setState({ debateRooms: newDebateRooms });
  }

  destroyDebateRoom(id) {
    const index = this.findDebateRoomById(id)

    this.setState({debateRooms: [
      ...this.state.debateRooms.slice(0, index), ...this.state.debateRooms.slice(index + 1)
      ]})
  }

  componentDidMount() {
    socket.emit('getDebateRooms', "please")

    socket.on('debateRooms', data => {
      const serverMsg = JSON.parse(data)
      this.getInitialDebateRooms(serverMsg)
    })

    socket.on('destroyRoom', data => {
      this.destroyDebateRoom(data)
    })

    socket.on('newRoom', data => {
      const serverMsg = JSON.parse(data)
      this.addDebateRoom(serverMsg)
    })
    socket.on('addDebator2ToApp', data => {
      const serverMsg = JSON.parse(data)
      this.setDebateRoomDebator2(serverMsg.username, serverMsg.room)
    })
  }

  render() {
    return (
      <BrowserRouter>
      <div>
        <Navbar changeUsername={this.changeUsername} currentUser={this.state.currentUser}/>
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
                  key={debateRoom.id}
                  exact
                  path={`/${debateRoom.id}`}
                  render={
                    props => this.renderDebateRoom(debateRoom)
                  }
                /> ))
              }
            </Switch>
          </div>
      </div>
      </BrowserRouter>
    );
  }
}
export default App;