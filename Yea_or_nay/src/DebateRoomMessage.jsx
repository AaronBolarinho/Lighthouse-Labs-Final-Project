import React, {Component} from 'react';

class DebateRoomMessage extends Component {
  constructor(props) {
    super();
  }

  render() {

    return (
        <div className="message" >
          <span className="message-username">{this.props.username}: </span>
          <span className="message-content">{this.props.message}  </span>
        </div>
    );

  }
}

export default DebateRoomMessage;