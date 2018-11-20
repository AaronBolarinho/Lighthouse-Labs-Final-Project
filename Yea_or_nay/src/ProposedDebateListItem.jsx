import React, {Component} from 'react';
import { Link } from 'react-router-dom'

class ProposedDebateListItem extends Component {
   constructor(props) {
    super();
    this.checkSupportStatus = this.checkSupportStatus.bind(this)
    this.makeDebator = this.makeDebator.bind(this)
  }

  checkSupportStatus () {
    let supports = "Nay"
    if (this.props.stance === "Nay") {
      supports = "Yea"
    }
    return supports
  }

  makeDebator () {
    console.log(`HELLO WELCOME TO ${this.props.debateRoom} `, this.props.currentUser)
  }

  render() {

    return (
      <li>{this.props.proposingUser} proposes: {this.props.topic} in {this.props.debateRoom}<Link to={`/${this.props.debateRoom}`} onClick={this.makeDebator}><input className="button" value={this.checkSupportStatus()}/></Link></li>
    );
  }
}

export default ProposedDebateListItem;