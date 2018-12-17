import React, {Component} from 'react';
const uuid = require('uuid/v4')

class ProposedDebate extends Component {

   constructor(props) {
      super();
      this.state = {
       proposedDebate: "",
       stance: "Yea",
       allowViewers: "Yes"
    }
     this.handleChange = this.handleChange.bind(this)
     this.handleSubmit= this.handleSubmit.bind(this)
     this.handleSide = this.handleSide.bind(this)
     this.allowViewers = this.allowViewers.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    const newRoom = {id: uuid(), name: "", proposedDebate:this.state.proposedDebate, debator1:this.props.currentUser.name, debator2: null, debator1Stance: this.state.stance, debator1Id: this.props.currentUser.id, allowViewers: this.state.allowViewers }
    event.target.reset()
    this.setState({stance: "Yea"})
    this.setState({allowViewers: "Yes"})
    this.props.socket.emit('newRoom', JSON.stringify(newRoom))
    this.props.setUserToDebator("debator1")
  }

  handleSide(e){
    this.setState({stance: e.target.value})
  }

  allowViewers(e){
    this.setState({allowViewers: e.target.value})
  }

  handleChange (e) {
    this.setState({proposedDebate: e.target.value})
  }

  render() {
    return (
      <form className="propose-debate-form" onSubmit={this.handleSubmit}>
        <input className='input form-control propose-debate' type="text" placeholder="Debate input" onChange={this.handleChange}/>
          <label className='stance'>Stance:
            <select onChange={this.handleSide}>
              <option value="Yea"> Yea</option>
              <option value="Nay"> Nay</option>
            </select>
          </label>
          <button type="submit" class="propose-button btn btn-dark">Propose!</button>
          <br/>
          <label className='stance'>Viewers:
            <select onChange={this.allowViewers}>
              <option value="Yes"> Yes </option>
              <option value="No"> No </option>
            </select>
          </label>
      </form>
    );
  }
}

export default ProposedDebate;