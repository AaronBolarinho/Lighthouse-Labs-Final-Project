import React, {Component} from 'react';
import DebateRoomChatBar from './DebateRoomChatBar.jsx';
import DebateMessageList from './DebateMessageList.jsx';
import { Link } from 'react-router-dom'

const io = require('socket.io-client')
const socket = io.connect('http://localhost:3001')

class DebateRoom extends Component {
  constructor(props) {
    super();
    this.state = {
      debateRoom: props.debateRoom,
      messages: [{id:1, content:"hello", username:"TestUser1"}, {id:2, content:"hello back", username:"TestUser2"} ],
      connectedUsers: 2
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.updateMessages = this.updateMessages.bind(this);
  }

   sendMessage(message) {
    const newMessage = {
      id: (this.state.messages.length + 1),
      username: "TestUser",
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

  componentDidMount() {
    console.log(`${this.state.debateRoom.name} MOUNTED`)
    // Should join the room here
    let room = this.state.debateRoom.name
    console.log("ROOM", room)
    socket.emit('subscribe', room)
    socket.on ('message', data => {
    const serverMsg = JSON.parse(data)
    console.log("received : ", serverMsg)
    this.updateMessages(serverMsg)
    })
  }

  render() {
    return (
      <div className = "debate-room">
        <DebateMessageList messages={this.state.messages} debateRoom={this.state.debateRoom} />
        <div className="field">
          <div className="control">
            <DebateRoomChatBar sendMessage={this.sendMessage} />
          </div>
        </div>
        <Link to="/"> Return Home </Link>
      </div>
    );
  }
}

export default DebateRoom;
