import React, {Component} from 'react';


// function DebateRoomMessage ({username, message, room, updateLiked, state,
//                             flag, debatorState, messageId, liked, debatorYea, debatorNay, debator1Stance})
//   {

//   function clickedLike(e){
//     updateLiked(username, e.target.value);
//     e.target.disabled = true;
//   }
//   if (username === debatorYea) {

//     return (
//       <div className='message-container'>
//         <div className="debatorYay">{username}:
//         </div>
//         <div className= {liked ? "message-content speech-bubble-yea top-yea liked" : "message-content speech-bubble-yea top-yea"}>
//           {message}
//           {room !== 'mainroom' && state === 'viewer' &&  !flag ?
//             <button id='liked' onClick={clickedLike} value={messageId} class="btn btn-secondary btn-xs active" role="button" aria-pressed="true">
//             <i class="far fa-thumbs-up"></i>LIKE</button>: ''}
//         </div>
//       </div>
//     )
//   } else {

//     return (

//       <div className='message-container'>
//         <div className="debatorNay">{username}
//         </div>
//         <div>
//           <div className={liked ? "message-content speech-bubble-nay top-nay liked" : "message-content speech-bubble-nay top-nay"}>
//             {message}
//             {room !== 'mainroom' && state === 'viewer' &&  !flag ?
//               <button id='liked' onClick={clickedLike} value={messageId} class="btn btn-secondary btn-xs active" role="button" aria-pressed="true">
//               <i class="far fa-thumbs-up"></i>LIKE</button>: ''}
//           </div>
//         </div>
//       </div>
//     )
//   }


class DebateRoomMessage extends Component{
  constructor(props) {
    super(props)
    this.clickedLike= this.clickedLike.bind(this);
  }

  componentDidMount() {
    let el = document.querySelector(".container.message-list.clearfix");
    el.scrollTop = el.scrollHeight;
  }

 clickedLike(e){
    this.props.updateLiked(this.props.username, e.target.value);
    e.target.disabled = true;
  }


//     return (
//       <div className='message-container'>
//         <div className="debatorYay">{username}:
//         </div>
//         <div className= {liked ? "message-content speech-bubble-yea top-yea liked" : "message-content speech-bubble-yea top-yea"}>
//           {message}
//           {room !== 'mainroom' && state === 'viewer' && !resultsTriggered && !flag ?
//             <button id='liked' onClick={clickedLike} value={messageId} class="btn btn-secondary btn-xs active" role="button" aria-pressed="true">
//             <i class="far fa-thumbs-up"></i>LIKE</button>: ''}
//         </div>
//       </div>
//     )
//   } else {
// =======
  render(){


    if (this.props.username === this.props.debatorYea) {

      return (
        <div className='message-container'>
          <div className="message-username">{this.props.username}:
          </div>
          <div className="message-content speech-bubble-yea top-yea">
            {this.props.message}
            {this.props.room !== 'mainroom' && this.props.state === 'viewer' && !this.props.resultsTriggered &&  !this.props.flag ?
              <button id='liked' onClick={this.clickedLike} value={this.props.messageId} class="btn btn-secondary btn-xs active" role="button" aria-pressed="true">
              <i class="far fa-thumbs-up"></i>LIKE</button>: ''}
          </div>
        </div>
      )
    } else {

      return (
        <div className='message-container'>
          <div className="debatorNay">{this.props.username}
          </div>
          <div>
            <div className="message-content speech-bubble-nay top-nay">
              {this.props.message}
              {this.props.room !== 'mainroom' && this.props.state === 'viewer' && !this.props.resultsTriggered &&  !this.props.flag ?
                <button id='liked' onClick={this.clickedLike} value={this.props.messageId} class="btn btn-secondary btn-xs active" role="button" aria-pressed="true">
                <i class="far fa-thumbs-up"></i>LIKE</button>: ''}
            </div>
          </div>
        </div>
      )
    }

  }
}
export default DebateRoomMessage;

