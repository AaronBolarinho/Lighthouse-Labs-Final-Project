import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import Home from './Home.jsx';

function ProposedDebateListItem (props) {

  function checkSupportStatus () {
    let supports = "Nay"
    if (props.stance === "Nay") {
      supports = "Yea"
    }
    return supports
  }

  function makeDebator () {
    console.log("This is the proposeddebatelist props", props)
    props.closeMainRoomSocket()
    props.setUserToDebator("debator2")
    let debator2 = {id: props.currentUser.id, username:props.currentUser.name, stance:checkSupportStatus(), room:props.debateRoom}
    props.socket.emit("addDebator2", JSON.stringify(debator2))
  }

    return (
      <div className="proposed-debate-list-item">
       <span className='proposed-debate-li'> <strong> {props.proposingUser} proposes: </strong> {props.topic} </span>
        <Link to={`/${props.debateRoom.id}`} onClick={makeDebator} className="nay-link">
        <button className="btn nay-btn" value={checkSupportStatus()}> {checkSupportStatus()}</button>
        </Link>
        </div>
    );
}

export default ProposedDebateListItem;