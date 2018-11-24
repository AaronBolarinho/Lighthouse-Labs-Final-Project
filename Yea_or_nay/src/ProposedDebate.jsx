import React, {Component} from 'react';
const uuid = require('uuid/v4')

class ProposedDebate extends Component {

   constructor(props) {
      super();
      this.state = {
       proposedDebate: "",
       stance: "Yea"
    }
     this.handleChange = this.handleChange.bind(this)
     this.handleSubmit= this.handleSubmit.bind(this)
     this.handleDropdown = this.handleDropdown.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    // const proposal = {id: uuid(), proposingUser:this.state.currentUser, proposedDebate: this.state.proposedDebate, stance: this.state.stance}
    // this.props.socket.emit('proposal', JSON.stringify(proposal))
    const newRoom = {id: uuid(), name: "", proposedDebate:this.state.proposedDebate, debator1:this.props.currentUser.name, debator2: null, debator1Stance: this.state.stance}
    event.target.reset()
    this.setState({stance: "Yea"})
    this.props.socket.emit('newRoom', JSON.stringify(newRoom))
    this.props.setUserToDebator("debator1")
  }

  handleDropdown(e){
    this.setState({stance: e.target.value})
  }

  handleChange (e) {
    this.setState({proposedDebate: e.target.value})
  }

  render() {
    return (

      <form className="form" onSubmit={this.handleSubmit}>
        <input className='input form-control propose-debate' type="text" placeholder="Debate input" onChange={this.handleChange}/>
        <div className="buttons has-addons">
          <select onChange={this.handleDropdown}>
            <option value="Yea"> Yea</option>
            <option value="Nay"> Nay</option>
          </select>
          <button type="submit" class="float-right btn btn-dark button-propose">Propose!</button>
        </div>
      </form>    );
  }
}

export default ProposedDebate;