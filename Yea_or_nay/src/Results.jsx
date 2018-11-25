import React, {Component} from 'react';
import DebateRoomChatBar from './DebateRoomChatBar.jsx';
import DebateMessageList from './DebateMessageList.jsx';
import { Link } from 'react-router-dom'
// import Timer from './Timer.jsx';

class Results extends React.Component {
  constructor(props) {
    super();
    this.state = {
      endSequence : false,
      time: {},
      seconds: 60,
      debateRoom: props.debateRoom
    };

    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.updateComponant = this.updateComponant.bind(this);

    this.displayResults = this.displayResults.bind(this);
  }

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  updateComponant(data) {

    // Remove one second, set state so a re-render happens.
    let seconds = data.timeLeft - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds == 0) {
      clearInterval(this.timer);
      let room = this.state.debateRoom.name
      this.props.socket.emit('closeDebate', room)
    }
}

  displayResults () {
    this.setState({
      endSequence : true,
    });

    this.startTimer()
  }

  componentDidMount() {

    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });

    this.props.socket.on ('displayResultsTo:', data => {
      console.log("received displayResults: ", data)
       this.displayResults()
    })

    this.props.socket.on ('ResultsTimerUpdate', data => {
      let timer = JSON.parse(data)
      this.updateComponant(timer)
    })
  }

  startTimer() {
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {

    let room = this.state.debateRoom.name
    let timeLeft = this.state.seconds
    let roomTime = { room : room,
                     timeLeft : timeLeft
    }
    this.props.socket.emit('ResultsTimer', JSON.stringify(roomTime))
  }

  render() {
    if (this.state.endSequence === true || this.state.seconds !== 10) {

      return(
        <div className="level-item">
          <span className="navbar-users">Results!</span>
          m: {this.state.time.m} s: {this.state.time.s}
        </div>
      )} else {

        return(
          <div className="level-item">
          </div>
        )}

  }
}

export default Results;