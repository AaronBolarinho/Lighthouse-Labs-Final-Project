import React, {Component} from 'react';

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

  render(){
    console.log("LIEKS", this.props.liked)

    if (this.props.username === this.props.debatorYea) {

      return (
        <div className='message-container'>
          <div className="debatorYay">{this.props.username}:
          </div>
          <div className={this.props.flag ? "message-content speech-bubble-yea top-yea flagged" : "message-content speech-bubble-yea top-yea"}>
            {this.props.message} {this.props.liked ? <i class="fas fa-heart heart-nay"></i> : ""}
            {this.props.room !== 'mainroom' && this.props.state === 'viewer' && !this.props.resultsTriggered &&  !this.props.flag  ?
              <button id='likedYea' onClick={this.clickedLike} value={this.props.messageId} class="btn btn-secondary btn-xs active" role="button" aria-pressed="true">
              <i class="far fa-thumbs-up"></i>LIKE</button> : ""}
          </div>
        </div>
      )
    } else {

      return (
        <div className='message-container'>
          <div className="debatorNay">{this.props.username}
          </div>
          <div>
            <div className={this.props.flag ? "message-content speech-bubble-nay top-nay flagged" : "message-content speech-bubble-nay top-nay"}>
              {this.props.message} {this.props.liked ? <i class="fas fa-heart heart-nay"></i> : ""}
              {this.props.room !== 'mainroom' && this.props.state === 'viewer' && !this.props.resultsTriggered &&  !this.props.flag ?
                <button id='likedNay' onClick={this.clickedLike} value={this.props.messageId} class="btn btn-secondary btn-xs active" role="button" aria-pressed="true">
                <i class="far fa-thumbs-up"></i>LIKE</button>: ''}
            </div>
          </div>
        </div>
      )
    }
  }
}

export default DebateRoomMessage;

