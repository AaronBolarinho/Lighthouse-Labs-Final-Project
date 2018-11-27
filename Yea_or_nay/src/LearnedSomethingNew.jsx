import React, {Component} from 'react';

class LearnedSomethingNew extends Component {

  constructor(props) {
    super();
    this.state = {
      // debator1LrnedNew: false,
      // debator2LrnedNew: false,
    };

    this.lrnedNew= this.lrnedNew.bind(this);
  }

  lrnedNew() {

    // console.log("Somthing New State before update", this.state)

    // this.setState({
    // debator1LrnedNew : this.props.state.debator1LrnedNew,
    // debator2LrnedNew : this.props.state.debator2LrnedNew
    // });

    // console.log("Somthing New State after update but before click info", this.state)

    // console.log("currentUser for learnedsmthingNew", this.props.currentUser)
    // console.log("currentUser State!!! for learnedsmthingNew", this.props.currentUser.state)

    // if (this.props.currentUser.state === "debator1") {
    //   this.props.state.setState({debator1LrnedNew: true})
    //   this.props.state.sendMessage()
    // }

    // if (this.props.currentUser.state === "debator2") {
    //   this.setState({debator2LrnedNew: true})
    //   this.sendMessage()
    // }

  //   let lrnedUpdate = {
  //   debator1LrnedNew: this.props.state.debator1LrnedNew,
  //   debator2LrnedNew: this.props.state.debator2LrnedNew,
  //   room: this.props.state.debateRoom.id
  // }

  // console.log("This is the send message lrnded props", this.props.state.debator1LrnedNew)

  // console.log("This is the lrned update object passed to server", lrnedUpdate)

  // // if (this.state.debator1LrnedNew === true) {
  // //       lrnedUpdate = {debator1LrnedNew: this.state.debator1LrnedNew, room: this.props.debateRoom.id}}

  // // if(this.state.debator2LrnedNew === true) {
  // //       lrnedUpdate = {debator2LrnedNew: this.state.debator2LrnedNew,
  // //                       room: this.props.debateRoom.id}
  // //     }

    // this.props.socket.emit("updateLrned", JSON.stringify(lrnedUpdate));
    // console.log("this is the current user for LrndedNewThing", this.props.currentUser)
    console.log("lrnednewthing props", this.props)
    this.props.LrnedNewThing();

  };

// sendMessage() {

//   let lrnedUpdate = {
//     debator1LrnedNew: this.props.state.debator1LrnedNew,
//     debator2LrnedNew: this.props.state.debator2LrnedNew,
//     room: this.props.state.debateRoom.id
//   }

//   console.log("This is the send message lrnded props", this.props.state.debator1LrnedNew)

//   console.log("This is the lrned update object passed to server", lrnedUpdate)

//   // if (this.state.debator1LrnedNew === true) {
//   //       lrnedUpdate = {debator1LrnedNew: this.state.debator1LrnedNew, room: this.props.debateRoom.id}}

//   // if(this.state.debator2LrnedNew === true) {
//   //       lrnedUpdate = {debator2LrnedNew: this.state.debator2LrnedNew,
//   //                       room: this.props.debateRoom.id}
//   //     }

//     this.props.socket.emit("updateLrned", JSON.stringify(lrnedUpdate));
// }
  render() {
    // console.log(this.props.currentUser)
    return (
      <div className='lrnedSomethingNew'>

       <button className='lrnedSomethingNewButton' onClick={this.lrnedNew}>Learned Something New!
        </button>
      </div>
    )
  }
}

export default LearnedSomethingNew;
