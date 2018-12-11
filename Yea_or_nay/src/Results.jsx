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
      seconds: 120,
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
    let seconds = data.timeLeft - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

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

    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });

    this.props.socket.on ('resultsTimerTriggered', data => {
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
      <h2 className="results-header">Results!</h2>
      <div className="results-table">
        <table>
          <tr>
            <td className="results-debator"></td>
            <td className="results-debator1-name" id='overlay-results-debator1'>{this.props.findDebatorName("debator1")}</td>
            <td></td>
            <td className="results-debator2-name" id='overlay-results-debator2'>{this.props.findDebatorName("debator2")}</td>
          </tr>
          <tr>
            <td className='result-type'>Total Viewer Likes</td>
            <td className='results-debator1' id='overlay-results-debator1'>{this.props.state.debator1Liked}</td>
            <td></td>
            <td className="results-debator2" id='overlay-results-debator2'>{this.props.state.debator2Liked}</td>
          </tr>
          <tr>
            <td className='result-type'>Changed A Viewer's Mind:</td>
            <td className='results-debator1' id='overlay-results-debator1'>{this.props.state.debator1Switch} Times</td>
            <td></td>
            <td className="results-debator2" id='overlay-results-debator2'>{this.props.state.debator2Switch} Times</td>
          </tr>
          <tr>
            <td className='result-type'>Learned Something New!</td>
            <td className='results-debator1' id='overlay-results-debator1'>{this.props.state.debator1LrnedNew ? "Yes" : "No"}</td>
            <td></td>
            <td className="results-debator2" id='overlay-results-debator2'>{this.props.state.debator2LrnedNew ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className='result-type'>Total Score</td>
            <td className='results-debator1' id='overlay-results-debator1'>{this.props.state.debator1TotalScore}</td>
            <td></td>
            <td className="results-debator2" id='overlay-results-debator2'>{this.props.state.debator2TotalScore}</td>
          </tr>
          <tr>
            <td className='result-type'>Debate Winner:</td>
            <td className='results-debator1' id='overlay-results-debator1'>{this.props.state.debator1win}</td>
            <td></td>
            <td className="results-debator2" id='overlay-results-debator2'>{this.props.state.debator2win}</td>
          </tr>
        </table>
      </div>
      {/*<div className='clock'>
        <div className='timer time'>{this.state.time.m} : {this.state.time.s < 10 ? 0 :''} {this.state.time.s} </div>
      </div>*/}
    </div>
  )}
}

export default Results;