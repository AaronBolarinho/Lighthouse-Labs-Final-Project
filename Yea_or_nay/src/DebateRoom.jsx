import React, {Component} from 'react';
import DebateRoomChatBar from './DebateRoomChatBar.jsx';
import DebateMessageList from './DebateMessageList.jsx';

const io = require('socket.io-client')
const socket = io.connect('http://localhost:3001')

class DebateRoom extends Component {
  constructor(props) {
    super();
    this.state = {
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
    console.log("DEBATE ROOM MOUNTED")
    console.log(this.updateMessages)
    socket.on ('message', data => {
    const serverMsg = JSON.parse(data)
    console.log("received : ", serverMsg)
    this.updateMessages(serverMsg)
    console.log("client Hello" ,data);
    })

    //This is where the socket receiving and sending happens NEED TO UPDATE MESSAGE LIST HERE
    // socket.onopen = function (){
    // };
    // socket.onmessage = event => {
    //   const serverMsg = JSON.parse(event.data);  //Deal with receiving message here
    //   switch(serverMsg.type) {
    //     case 'message':
    //       this.updateMessages(serverMsg);
    //       break;
    //       default:
    //     throw new Error ('Unknown event type ' + serverMsg.type);
    //   }
  }

  render() {
    return (
      <div className = "debate-room">
        <div className="column is-three-quarters">
          <DebateMessageList messages={this.state.messages} />
          <div className="field">
            <div className="control">
              <DebateRoomChatBar sendMessage={this.sendMessage} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DebateRoom;
