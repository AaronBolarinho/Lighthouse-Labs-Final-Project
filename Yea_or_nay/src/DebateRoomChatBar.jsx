import React, {Component} from 'react';

function DebateRoomChatBar ({sendMessage}) {

   function keyPressMessage(e){
      if(e.keyCode == 13 && e.target.value.length > 0){
         sendMessage(e.target.value);
         e.target.value = '';
      }
   }

    return (

      <div className="field">
        <div className="control">
          <footer className="debate-chatbar">
            <input className="input is-primary" onKeyDown={keyPressMessage} placeholder="Type a message and hit ENTER" />
          </footer>
        </div>
      </div>
    )
}

export default DebateRoomChatBar
