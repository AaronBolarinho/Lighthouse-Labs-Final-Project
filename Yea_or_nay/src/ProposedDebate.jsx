import React, {Component} from 'react';

const io = require('socket.io-client')
const socket = io.connect('http://localhost:3001')

class ProposedDebate extends Component {

   constructor(props) {
    super();
    this.state = {
     proposedDebate: "",
     stance: "",
     currentUser: "TestUser1"
    }
   this.handleChange = this.handleChange.bind(this)
   this.handleSubmitNay = this.handleSubmitNay.bind(this)
   this.handleSubmitYea = this.handleSubmitYea.bind(this)
  }

  handleSubmitYea(event) {
    event.preventDefault();
    this.setState({supports: "Yea"})
    const proposal = {id:9, proposingUser:this.state.currentUser, proposedDebate: this.state.proposedDebate, stance: this.state.stance}
    socket.emit('proposal', JSON.stringify(proposal))
  }

  handleSubmitNay(event) {
    event.preventDefault();
    this.setState({supports: "Nay"})
    const proposal = {id:9, proposingUser:this.state.currentUser, proposedDebate: this.state.proposedDebate, stance: this.state.stance}
    console.log("THIS IS THE FORM Input", this.state.proposedDebate, this.state.stance)
    socket.emit('proposal', JSON.stringify(proposal))
  }

  handleChange (e) {
    this.setState({proposedDebate: e.target.value})
  }

  render() {

    return (
       <div className="box">
                  <div className="field">
                    <div className="control">
                    <form className="form proposed-debate-form">
                      <input className="input is-primary" type="text" placeholder="Debate input" onChange={this.handleChange}/>
                      <div className="buttons has-addons">
                        <input className="button" type="submit" value="Yea" onClick={this.handleSubmitYea}/>
                        <input className="button" type="submit" value="Nay" onClick={this.handleSubmitNay}/>
                      </div>
                      </form>
                    </div>
                  </div>
                </div>
    );

  }
}

export default ProposedDebate;