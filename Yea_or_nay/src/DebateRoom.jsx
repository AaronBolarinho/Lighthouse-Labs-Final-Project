import React, {Component} from 'react';
import DebateRoomChatBar from './DebateRoomChatBar.jsx';
import DebateMessageList from './DebateMessageList.jsx';
import { Redirect, Link } from 'react-router-dom'
import Timer from './Timer.jsx';
import ChooseASide from './ChooseASide.jsx';
import Results from './Results.jsx'
import DebateRoomMessage from './DebateRoomMessage.jsx';
import LearnedSomethingNew from './LearnedSomethingNew.jsx';

class DebateRoom extends Component {
  constructor(props) {
    super();
    this.state = {
      debateRoom: props.debateRoom,
      connectedUsers: {
        },
      messages: [],
      debator1Liked: 0,
      debator2Liked: 0,
      shouldRedirect: false,
      debator1Switch: 0,
      debator2Switch: 0,
      userStance: null,
      resultsTrigger: false,
      debator1LrnedNew: false,
      debator2LrnedNew: false,
      debator1TotalScore: 0,
      debator2TotalScore: 0,
      debator1win: "Keep Trying!",
      debator2win: "Keep Trying!"
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.updateMessages = this.updateMessages.bind(this);
    this.updateLiked = this.updateLiked.bind(this);
    this.leaveRoom = this.leaveRoom.bind(this);
    this.addConnectedUser = this.addConnectedUser.bind(this);
    this.updateSide = this.updateSide.bind(this);
    this.LrnedNewThing = this.LrnedNewThing.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
    this.displayResults = this.displayResults.bind(this);
    // this.getInitialState = this.getInitialState.bind(this)
  }

  // getInitialState(initialState) {
  //   this.setState(initialState)
  // }

  addConnectedUser(newUser) {
    console.log("NEW USER IS", newUser)
    console.log("NEWUSER ID", newUser.id)
    let oldUsers = this.state.connectedUsers;
    console.log("EARLY OLD USERS", oldUsers)
    oldUsers[newUser.id] = newUser
    console.log("OLD USERS IS with new user ", oldUsers)
    this.setState({'connectedUsers': oldUsers})
    console.log("CONNECTED USERS ARE", this.state.connectedUsers)
   // console.log('current user', this.state.connectedUsers.newUser.id)
   for (let one in this.state.connectedUsers){
      console.log('user', this.state.connectedUsers[one].id)
    }
  }

  shouldRedirect() {
    let room = this.state.debateRoom.id
    console.log("This is the destroy room from shouldRedirect ", room)
    this.setState({shouldRedirect:true})
    this.props.socket.emit('destroyRoom', room)
  }

   sendMessage(message) {
    const newMessage = {
      id: (this.state.messages.length + 1),
      username: this.props.currentUser.name,
      content: message,
      roomName: this.state.debateRoom.name,
      roomId: this.state.debateRoom.id
    };
    console.log("SENT : ", newMessage)
    this.props.socket.emit("message", JSON.stringify(newMessage));
  }

  updateMessages(newMessage) {
    let oldMessages = this.state.messages;
    let newMessages = [...oldMessages, newMessage];
    this.setState({ messages: newMessages });
  }

  leaveRoom () {

    this.props.setUserToViewer()
    let room = this.state.debateRoom
    let roomUser = {currentUser: this.props.currentUser, room:this.state.debateRoom}
    console.log("Debate ROOM TO LEAVE IS ", room.id)
    this.props.socket.emit('leave', JSON.stringify(roomUser))
    //Destroy Room is working fine just gets called wrong during the results
    //this.props.socket.emit('destroyRoom', room.id)
  }

  componentDidMount() {
    console.log(this.state.debateRoom)
    this.props.socket.emit('subscribe', this.state.debateRoom.id)

    this.props.socket.emit('getInitialState', JSON.stringify(this.state.debateRoom.id))

    let room = this.state.debateRoom.id
    this.props.socket.on ('message', data => {
    const serverMsg = JSON.parse(data)
    console.log("received : ", serverMsg)
    this.updateMessages(serverMsg)
    })

    this.props.socket.on('addUser', data => {
      const serverMsg = JSON.parse(data)
      this.addConnectedUser(serverMsg)
    })

    this.props.socket.on('likes', data => {
      const serverMsg = JSON.parse(data)
      this.setState({debator1Liked:serverMsg.debator1Liked});
      this.setState({debator2Liked:serverMsg.debator2Liked});
      console.log(this.props.debateRoom.debator1, "has been liked= ",this.state.debator1Liked);
      console.log(this.props.debateRoom.debator2, "has been liked= ",this.state.debator2Liked);
    })

    this.props.socket.on('getInitialState', data => {
      const serverMsg = JSON.parse(data)
      console.log("RECEIVED INITIAL STATE", serverMsg)
      this.setState(serverMsg)
    })

    this.props.socket.on('switch', data => {
      const serverMsg = JSON.parse(data)
    //  console.log("received : ", serverMsg)
      this.setState({debator1Switch:serverMsg.debator1Switch});
      this.setState({debator2Switch:serverMsg.debator2Switch});
      console.log(this.props.debateRoom.debator1, "has been switched= ",this.state.debator1Switch);
      console.log(this.props.debateRoom.debator2, "has been switched= ",this.state.debator2Switch);
    })

    this.props.socket.on('GoBackHome', data => {
      console.log("recieved GOBACK HOME FROM SERVER IN ", data)
    this.shouldRedirect()
    })

    this.props.socket.on('resultsTriggered', data => {
      console.log("client recieved results triggered")
       this.displayResults()
    })

    this.props.socket.on('lrnedNewServerUpdate', data => {
      const serverMsg = JSON.parse(data)
      this.setState({debator1LrnedNew:serverMsg.debator1LrnedNew});
      this.setState({debator2LrnedNew:serverMsg.debator2LrnedNew});
    })

    this.props.socket.on('FinalTotalScoreServerUpdate', data => {
      const serverMsg = JSON.parse(data)
      console.log("this is the total score update sent to client", serverMsg)
      this.setState({debator1TotalScore:serverMsg.debator1TotalScore});
      this.setState({debator2TotalScore:serverMsg.debator2TotalScore});
      this.setState({debator1win:serverMsg.debator1win});
      this.setState({debator2win:serverMsg.debator2win});
    })

  }

  updateLiked(username) {
    if (username === this.state.debateRoom.debator1){
     this.state.debator1Liked += 1;
    } else {
      this.state.debator2Liked += 1;
    }

    const newMessage = {
      debator1Liked: this.state.debator1Liked,
      debator2Liked: this.state.debator2Liked,
      room: this.state.debateRoom.name,
      roomId: this.state.debateRoom.id
    }

    this.props.socket.emit("likes", JSON.stringify(newMessage));
  }

  updateSide(side) {

        if (this.state.userStance !== null){
          if (this.state.debateRoom.debator1Stance.toUpperCase() === side.toUpperCase()){
            this.state.debator1Switch ++;
          } else{
            this.state.debator2Switch ++;
          }
        }
        this.setState({userStance : side});

    const newMessage = {

      debator1Switch: this.state.debator1Switch,
      debator2Switch: this.state.debator2Switch,
      room: this.state.debateRoom.name,
      roomId: this.state.debateRoom.id

    }
    this.props.socket.emit("switch", JSON.stringify(newMessage));
  }

  displayResults () {
    this.calculateScore()
    // this.setState({resultsTrigger: true}, () => {
    // });
    this.setState({resultsTrigger: true});

  }

  calculateScore() {
    let debator1Score = 0
    let debator2Score = 0
    let debator1win = "Keep Trying!"
    let debator2win = "Keep Trying!"

    console.log("these are the scoring console logs")
    console.log("this is the state before the scoring calcs", this.state)

    debator1Score += this.state.debator1Liked
    debator1Score += this.state.debator1Switch * 3

    if (this.state.debator2LrnedNew === true) {
      debator1Score += 5
    }

    debator2Score += this.state.debator2Liked
    debator2Score += this.state.debator2Switch * 3

    if (this.state.debator1LrnedNew === true) {
      debator2Score += 5
    }

    if (debator1Score > debator2Score) {
      debator1win = "Winner!!"
    } else {
      debator2win = "Winner!!"
    }


    // console.log("finished calculating score for Deb 1", debator1Score)
    // console.log("finished calculating score for Deb 2", debator2Score)

    this.setState({debator1TotalScore: debator1Score, debator2TotalScore: debator2Score, debator1win: debator1win, debator2win: debator2win}, () => {

          const newMessage = {
            debator1TotalScore: this.state.debator1TotalScore,
            debator2TotalScore: this.state.debator2TotalScore,
            room: this.state.debateRoom.name,
            roomId: this.state.debateRoom.id,
            debator1win: this.state.debator1win,
            debator2win: this.state.debator2win
          }

          console.log("this is the total score Sent to the Server", newMessage)
          this.props.socket.emit("updateTotalScore", JSON.stringify(newMessage));
        })
  }

  LrnedNewThing (){
    if (this.props.currentUser.state === "debator1"){
        this.setState({debator1LrnedNew: true}, () => {

          const newMessage = {
            debator1LrnedNew: this.state.debator1LrnedNew,
            debator2LrnedNew: this.state.debator2LrnedNew,
            room: this.state.debateRoom.name,
            roomId: this.state.debateRoom.id
          }
          this.props.socket.emit("updateLrned", JSON.stringify(newMessage));
        })
    }

    if (this.props.currentUser.state === "debator2"){
        this.setState({debator2LrnedNew: true} , () => {

          const newMessage = {
            debator1LrnedNew: this.state.debator1LrnedNew,
            debator2LrnedNew: this.state.debator2LrnedNew,
            room: this.state.debateRoom.name,
            roomId: this.state.debateRoom.id
          }
          this.props.socket.emit("updateLrned", JSON.stringify(newMessage));
        })

    }

  }

  render() {

    if (this.state.shouldRedirect) {
         return (<Redirect to="/" />)
    }
    if (this.state.resultsTrigger === true) {
    return (

      <div className = "container debate-room">
        <div className="container message-container">
          <div className='row'>

            <div className='col-sm-4'>
              <span className="message-content"> {this.state.debateRoom.name !== 'mainroom' ? <Results debateRoom={this.state.debateRoom} socket={this.props.socket} leaveRoom={this.leaveRoom} state={this.state}/> : ""}</span>
              {this.state.debateRoom.name !== 'mainroom' ? <Link to="/" onClick={this.leaveRoom}> Return Home </Link> : ""}
            </div>

            <div className="col-sm-8">
              <DebateMessageList messages={this.state.messages} debateRoom={this.state.debateRoom} updateLiked={this.updateLiked} userState={this.props.currentUser.state} debator1Liked={this.state.debator1Liked} debator2Liked={this.state.debator2Liked}/>
               {this.state.debateRoom.name === 'mainroom' || this.props.currentUser.state !== 'viewer' ? <DebateRoomChatBar sendMessage={this.sendMessage}/> :''}
            </div>
          </div>
        </div>
      </div>

      )} else {
      return(
      <div className = "container debate-room">
        <div className="container message-container">
          <div className='row'>

            <div className='col-sm-4'>
              {this.state.debateRoom.name === 'mainroom' || this.props.currentUser.state !== 'viewer' ? '' : <ChooseASide updateSide={this.updateSide}/>}
              <span className="message-content"> {this.state.debateRoom.name !== 'mainroom' && this.props.currentUser.state !== 'viewer' ? <Timer debateRoom={this.state.debateRoom} socket={this.props.socket}/> : ""}</span>
              {this.state.debateRoom.name !== 'mainroom' && this.props.currentUser.state !== 'viewer' ? <LearnedSomethingNew LrnedNewThing={this.LrnedNewThing} currentUser={this.props.currentUser} socket={this.props.socket} debateRoom={this.state.debateRoom} state={this.state}/> : ""}
              {this.state.debateRoom.name !== 'mainroom' ? <Link to="/" onClick={this.leaveRoom}> Return Home </Link> : ""}
            </div>

            <div className="col-sm-8">
              <DebateMessageList messages={this.state.messages} debateRoom={this.state.debateRoom} updateLiked={this.updateLiked} userState={this.props.currentUser.state} debator1Liked={this.state.debator1Liked} debator2Liked={this.state.debator2Liked}/>
               {this.state.debateRoom.name === 'mainroom' || this.props.currentUser.state !== 'viewer' ? <DebateRoomChatBar sendMessage={this.sendMessage}/> :''}
            </div>
          </div>
        </div>
      </div>
      )}
    // );
  }
}

export default DebateRoom;


