import React, {Component} from 'react';
import DebateRoomChatBar from './DebateRoomChatBar.jsx';
import DebateMessageList from './DebateMessageList.jsx';
import { Link } from 'react-router-dom'
// import Timer from './Timer.jsx';

class Results extends React.Component {
  constructor(props) {
    super();
    this.state = {
      time: {},
      seconds: 150,
      debateRoom: props.debateRoom
    };

    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.updateComponant = this.updateComponant.bind(this);

    this.startResultsTimer = this.startResultsTimer.bind(this);
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
      let room = this.state.debateRoom.id
      this.props.socket.emit('closeDebate', room)
    }
}

  startResultsTimer() {
    this.startTimer()
  }

  componentDidMount() {

    console.log("this is the debate room state prior to the result component rendering)", this.props.state)

    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });

    this.props.socket.on ('resultsTimerTriggered', data => {
      console.log("Results Timer Triggered!", data)
       this.startResultsTimer()
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

    let room = this.state.debateRoom.id
    let timeLeft = this.state.seconds
    let roomTime = { room : room,
                     timeLeft : timeLeft
    }
    this.props.socket.emit('ResultsTimer', JSON.stringify(roomTime))
  }

  render() {
    return(
      <div>
      <div className="results">
        <h2 className="">Results!</h2>
        <table className='result-table'>
          <tr>
            <th>Debate Statistics</th>
            <th>Debator 1</th>
            <th>Debator 2</th>
          </tr>
          <tr>
            <td>Total Viewer Likes</td>
            <td>{this.props.state.debator1Liked}</td>
            <td>{this.props.state.debator2Liked}</td>
          </tr>
          <tr>
            <td>Changed A Viewer's Mind:</td>
            <td>{this.props.state.debator1Switch} Times</td>
            <td>{this.props.state.debator2Switch} Times</td>
          </tr>
          <tr>
            <td>Learned Something New!</td>
            <td>{this.props.state.debator1LrnedNew ? "Yes" : "No"}</td>
            <td>{this.props.state.debator2LrnedNew ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td>Total Score</td>
            <td>{this.props.state.debator1TotalScore}</td>
            <td>{this.props.state.debator2TotalScore}</td>
          </tr>
          <tr>
            <td>Debate Winner:</td>
            <td>{this.props.state.debator1win}</td>
            <td>{this.props.state.debator2win}</td>
          </tr>
        </table>
      </div>
      <div>
        <p> m: {this.state.time.m} s: {this.state.time.s}</p>
      </div>
    </div>
  )}
}

export default Results;