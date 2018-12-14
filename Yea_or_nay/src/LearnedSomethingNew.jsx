import React, {Component} from 'react';

class LearnedSomethingNew extends Component {

  constructor(props) {
    super();
    this.state = {
    };
    this.lrnedNew= this.lrnedNew.bind(this);
  }

  lrnedNew() {
    this.props.LrnedNewThing();
  };

  render() {
    return (
      <div className='lrnedSomethingNew'>
        <button className='lrnedSomethingNewButton' onClick={this.lrnedNew}>Learned Something New!</button>
      </div>
    )
  }
}

export default LearnedSomethingNew;
