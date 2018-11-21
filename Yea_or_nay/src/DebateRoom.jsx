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
      messages: [{id:1, content:"hello", username:"TestUser1"}, {id:2, content:"hello back", username:"TestUser2"} ],
      connectedUsers: 2,
      liked: 0,
      socket: socket
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.updateMessages = this.updateMessages.bind(this);
    this.updateLiked = this.updateLiked.bind(this);
    this.leaveRoom = this.leaveRoom.bind(this)
  }

   sendMessage(message) {
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
  }

  componentDidMount() {
    console.log(`${this.state.debateRoom.name} MOUNTED`)
    // Should join the room here
    let room = this.state.debateRoom.name
    socket.emit('subscribe', room)
    socket.on ('message', data => {
    const serverMsg = JSON.parse(data)
    console.log("received : ", serverMsg)
    this.updateMessages(serverMsg)
    })
  }

  updateLiked(username) {
    this.state.liked += 1;
    console.log('Liked' , this.state.liked)
    console.log(username);
  }

  render() {
    return (
      <div className = "debate-room">
        <DebateMessageList messages={this.state.messages} debateRoom={this.state.debateRoom} updateLiked={this.updateLiked}/>
        <div className="field">
          <div className="control">
            <DebateRoomChatBar sendMessage={this.sendMessage} />
          </div>
          <span className="message-content"> {this.state.debateRoom.name !== 'mainroom' ? <Timer debateRoom={this.state.debateRoom} socket={this.state.socket}/> : ""}</span>
        </div>
        <Link to="/" onClick={this.leaveRoom}> Return Home </Link>
      </div>
    );
  }
}

export default DebateRoom;


