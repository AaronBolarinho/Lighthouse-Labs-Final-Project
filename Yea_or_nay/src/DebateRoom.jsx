import React, {Component} from 'react';
import DebateRoomChatBar from './DebateRoomChatBar.jsx';
import DebateMessageList from './DebateMessageList.jsx';
import { Link } from 'react-router-dom'
import Timer from './Timer.jsx';

import DebateRoomMessage from './DebateRoomMessage.jsx';

const io = require('socket.io-client')
const socket = io.connect('http://localhost:3001')

class DebateRoom extends Component {
  constructor(props) {
    super();
    this.state = {
      debateRoom: props.debateRoom,
      connectedUsers: {
        1 : {username: props.debateRoom.debator1, state: "debator1", stance: props.debateRoom.debator1Stance},
        },
      messages: [{id:1, content:"hello", username:"TestUser1"}, {id:2, content:"hello back", username:"TestUser2"} ],
      debator1Liked: 0,
      debator2Liked: 0,
      socket: socket,
      currentUser: props.currentUser,

    };
    this.sendMessage = this.sendMessage.bind(this);
    this.updateMessages = this.updateMessages.bind(this);
    this.updateLiked = this.updateLiked.bind(this);
    this.leaveRoom = this.leaveRoom.bind(this)
    this.addConnectedUser = this.addConnectedUser.bind(this)
    // this.updateUserState = this.updateUserState.bind(this)
  }

  addConnectedUser(newUser) {
    let oldUsers = this.state.connectedUsers;
    let newUsers = [...oldUsers, newUser];
    this.setState({ connectedUsers: newUsers });
    console.log("CONNECTED USERS ARE", this.state.connectedUsers)
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
///MAKE CONNECTED USERS AN OBJECT MAYBE... THIS FUNCTION DOES WORK BUT TO UPDATE STATE WILL BE A PAIN
//FUNCTION IS BEING CALLED ON NEW MESSAGE JUST TO TEST
  // updateUserState (newState) {
  //   console.log("CALLED")
  //    this.state.connectedUsers.forEach(user => {
  //     console.log(this.state.currentUser.name)
  //     console.log(this.state.connectedUsers)
  //     if (user.username === this.state.currentUser.name) {
  //       console.log("FOUND HIM", user)
  //       console.log("NEW STATE", newState)
  //     }
  //   })
  // }

  componentDidMount() {
    let room = this.state.debateRoom.name
    socket.emit('subscribe', room)
    socket.on ('message', data => {
    const serverMsg = JSON.parse(data)
    console.log("received : ", serverMsg)
    this.updateMessages(serverMsg)
    })
    socket.on('addUser', data => {
      const serverMsg = JSON.parse(data)
      console.log("receivedADDDD : ", serverMsg)
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

  render() {
    return (
      <div className = "container debate-room">
        <div className="container message-container">
          <DebateMessageList messages={this.state.messages} debateRoom={this.state.debateRoom} updateLiked={this.updateLiked} userState={this.state.currentUser.state}/>
          {this.state.debateRoom.name === 'mainroom' || this.state.currentUser.state !== 'viewer' ? <DebateRoomChatBar sendMessage={this.sendMessage} /> : ""}
          <span className="message-content"> {this.state.debateRoom.name !== 'mainroom' && this.state.currentUser.state !== 'viewer' ? <Timer debateRoom={this.state.debateRoom} socket={this.state.socket}/> : ""}</span>
          {this.state.debateRoom.name !== 'mainroom' ? <Link to="/" onClick={this.leaveRoom}> Return Home </Link> : ""}
        </div>
      </div>
    );
  }
}

export default DebateRoom;


