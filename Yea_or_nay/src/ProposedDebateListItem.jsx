import React, {Component} from 'react';

class ProposedDebateListItem extends Component {
   constructor(props) {
    super();
    this.checkSupportStatus = this.checkSupportStatus.bind(this)
  }

  checkSupportStatus () {
    let supports = "Nay"
    if (this.props.stance === "Nay") {
      supports = "Yea"
    }
    return supports
  }

  render() {
    return (
      <li>{this.props.proposingUser} proposes: {this.props.topic}<input className="button" type="submit" value={this.checkSupportStatus()}/></li>
    );
  }
}

export default ProposedDebateListItem;