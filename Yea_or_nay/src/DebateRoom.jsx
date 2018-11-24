import React, {Component} from 'react';
import DebateRoomChatBar from './DebateRoomChatBar.jsx';
import DebateMessageList from './DebateMessageList.jsx';
import { Link } from 'react-router-dom'
import Timer from './Timer.jsx';
import ChooseASide from './ChooseASide.jsx';

import DebateRoomMessage from './DebateRoomMessage.jsx';

const io = require('socket.io-client')
const socket = io.connect('http://localhost:3001')

class DebateRoom extends Component {
  constructor(props) {
    super();
    this.state = {
      debateRoom: props.debateRoom,
      connectedUsers: {
        1 : {username: props.debateRoom.debator1, state: "debator1", stance: props.debateRoom.debator1Stance, id: props.currentUser.id}
        },
      messages: [{id:1, content:"hello", username:"TestUser1"}, {id:2, content:"hello back", username:"TestUser2"} ],
      debator1Liked: 0,
      debator2Liked: 0,
      socket: socket,
      currentUser: props.currentUser,
      debator1Switch: 0,
      debator2Switch: 0,
      userStance: null

    };
    this.sendMessage = this.sendMessage.bind(this);
    this.updateMessages = this.updateMessages.bind(this);
    this.updateLiked = this.updateLiked.bind(this);
    this.leaveRoom = this.leaveRoom.bind(this)
    this.addConnectedUser = this.addConnectedUser.bind(this)
    this.updateSide = this.updateSide.bind(this);
  }

  addConnectedUser(newUser) {
    console.log("NEW USER IS", newUser)
    console.log("NEWUSER ID", newUser.id)
    let oldUsers = this.state.connectedUsers;
    console.log("EARLY OLD USERS", oldUsers)
    oldUsers[newUser.id] = newUser
    console.log("OLD USERS IS with new user ", oldUsers)
    this.setState({'connectedUsers': oldUsers})
    console.log("CONNECTED USERS ARE", this.state.connectedUsers)
   // console.log('current user', this.state.connectedUsers.newUser.id)
   for (let one in this.state.connectedUsers){
      console.log('user', this.state.connectedUsers[one].id)
    }
  }

  sendMessage(message) {
    // this.updateUserState("yea")
    const newMessage = {
      id: (this.state.messages.length + 1),
      username: this.props.currentUser.name,
      content: message,
      roomName: this.state.debateRoom.name
    };
    console.log("SENT : ", newMessage)
    socket.emit("message", JSON.stringify(newMessage));
  }

  updateMessages(newMessage) {
    let oldMessages = this.state.messages;
    let newMessages = [...oldMessages, newMessage];
    this.setState({ messages: newMessages });
  }

  leaveRoom () {
    let room = this.state.debateRoom.name
    console.log("ROOM TO LEAVE IS ", room)
    socket.emit('leave', room)
    this.props.setUserToViewer()
  }


  componentDidMount() {
    console.log("STATE", this.state)
    let room = this.state.debateRoom.name
    socket.emit('subscribe', room)
    socket.on ('message', data => {
    const serverMsg = JSON.parse(data)
    console.log("received : ", serverMsg)
    this.updateMessages(serverMsg)
    })
    socket.on('addUser', data => {
      const serverMsg = JSON.parse(data)
      this.addConnectedUser(serverMsg)
      // if (serverMsg.state === 'debator2'){
      //   this.setState({debateRoom.debator2: serverMsg.username});
      // }
    })

    socket.on('likes', data => {
      const serverMsg = JSON.parse(data)
    //  console.log("received : ", serverMsg)
      this.setState({debator1Liked:serverMsg.debator1Liked});
      this.setState({debator2Liked:serverMsg.debator2Liked});
      console.log(this.props.debateRoom.debator1, "has been liked= ",this.state.debator1Liked);
      console.log(this.props.debateRoom.debator2, "has been liked= ",this.state.debator2Liked);

    })

    socket.on('switch', data => {
      const serverMsg = JSON.parse(data)
    //  console.log("received : ", serverMsg)
      this.setState({debator1Switch:serverMsg.debator1Switch});
      this.setState({debator2Switch:serverMsg.debator2Switch});
      console.log(this.props.debateRoom.debator1, "has been switched= ",this.state.debator1Switch);
      console.log(this.props.debateRoom.debator2, "has been switched= ",this.state.debator2Switch);

    })


  }

  updateLiked(username) {
    if (username === this.state.debateRoom.debator1){
     this.state.debator1Liked += 1;
    } else {
      this.state.debator2Liked += 1;
    }

    const newMessage = {

      debator1Liked: this.state.debator1Liked,
      debator2Liked: this.state.debator2Liked,
      room: this.state.debateRoom.name
    }
    socket.emit("likes", JSON.stringify(newMessage));
   // console.log(this.state.debateRoom.debator1, "has been liked= ",this.state.debator1Liked);
   // console.log(this.state.debateRoom.debator2, "has been liked= ",this.state.debator2Liked);
   // console.log(this.state.userState.state);

  }

  updateSide(side) {

   // for (user in this.state.connectedUsers){
      //if ( this.state.connectedUsers[user].id === this.state.currentUser.id){
        if (this.state.userStance !== null){
          if (this.state.debateRoom.debator1Stance === side){
            this.state.debator1Switch ++;
          } else{
            this.state.debator2Switch ++;
          }
        }
        this.setState({userStance : side});
     // }
   // }

    const newMessage = {

      debator1Switch: this.state.debator1Switch,
      debator2Switch: this.state.debator2Switch,
      room: this.state.debateRoom.name
    }
    socket.emit("switch", JSON.stringify(newMessage));

  }

  render() {
    return (
      <div className = "container debate-room">
        <div className="container message-container">
          <DebateMessageList messages={this.state.messages} debateRoom={this.state.debateRoom} updateLiked={this.updateLiked} userState={this.state.currentUser.state} debator1Liked={this.state.debator1Liked} debator2Liked={this.state.debator2Liked}/>
          {this.state.debateRoom.name === 'mainroom' || this.state.currentUser.state !== 'viewer' ? <DebateRoomChatBar sendMessage={this.sendMessage}/> : <ChooseASide updateSide={this.updateSide}/>}
          <span className="message-content"> {this.state.debateRoom.name !== 'mainroom' && this.state.currentUser.state !== 'viewer' ? <Timer debateRoom={this.state.debateRoom} socket={this.state.socket}/> : ""}</span>
          {this.state.debateRoom.name !== 'mainroom' ? <Link to="/" onClick={this.leaveRoom}> Return Home </Link> : ""}
        </div>
      </div>
    );
  }
}

export default DebateRoom;


