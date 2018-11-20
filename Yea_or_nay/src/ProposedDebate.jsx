import React, {Component} from 'react';
const uuid = require('uuid/v4')

const io = require('socket.io-client')
const socket = io.connect('http://localhost:3001')

class ProposedDebate extends Component {

   constructor(props) {
      super();
      this.state = {
       proposedDebate: "",
       stance: "Yea",
       currentUser: "TestUser1"
    }
     this.handleChange = this.handleChange.bind(this)
     this.handleSubmit= this.handleSubmit.bind(this)
     this.handleDropdown = this.handleDropdown.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    const proposal = {id: uuid(), proposingUser:this.state.currentUser, proposedDebate: this.state.proposedDebate, stance: this.state.stance}
    socket.emit('proposal', JSON.stringify(proposal))
    const newRoom = {id: uuid(), name: "", proposedDebate:this.state.proposedDebate, debator1:this.state.currentUser, debator2: null}
    event.target.reset()
    this.setState({stance: "Yea"})
    socket.emit('newRoom', JSON.stringify(newRoom))
    // this.props.addDebateRoom(newRoom)
  }

  handleDropdown(e){
    this.setState({stance: e.target.value})
  }

  handleChange (e) {
    this.setState({proposedDebate: e.target.value})
  }

  render() {
    return (
       <div className="box">
          <div className="field">
            <div className="control">
            <form className="form proposed-debate-form" onSubmit={this.handleSubmit}>
              <input className="input is-primary" type="text" placeholder="Debate input" onChange={this.handleChange}/>
              <div className="buttons has-addons">
              <select onChange={this.handleDropdown}>
                <option value="Yea"> Yea</option>
                <option value="Nay"> Nay</option>
              </select>
                <input className="button" type="submit" value="Propose!"/>
              </div>
              </form>
            </div>
          </div>
        </div>
    );
  }
}

export default ProposedDebate;