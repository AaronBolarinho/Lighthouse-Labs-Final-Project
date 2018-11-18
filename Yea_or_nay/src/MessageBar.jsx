import React, {Component} from 'react';

//component for displaying and receiving new username and receiving a new message content
class MessageBar extends Component {

  render() {

    return (
      //display of chatbar components, username and input message
      // <footer className="chatbar">
      <div className="columns">
        <div className="column">
          <div className="field">
            <div className="control">
              <span>BOB</span>
            </div>
          </div>
        </div>
        <div className="column is-three-quarters">
          <div className="field">
            <div className="control">
              <input className="input is-primary" name="inputMessage" type="text"
                  placeholder="Type a message and hit ENTER"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default MessageBar;