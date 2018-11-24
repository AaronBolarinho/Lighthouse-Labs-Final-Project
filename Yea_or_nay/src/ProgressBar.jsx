import React, {Component} from 'react';

class ProgressBar extends Component {

  constructor(props) {
    super();
    // this.state = {
    //   value: 50
    // };

    // this.updateValue=this.updateValue.bind(this);
  }

  // updateValue() {
  //   this.setState({value: this.props.value});
  // }

  // componentDidMount() {
  //   this.setState({value: this.props.value});
  // }

  render() {
    return (
      <div className="progress-bar-container">
        <input type="range" min="0" max="100" value={this.props.value} className="progress-bar" id="grad" step="1"/>
      </div>
    )
  }
}

export default ProgressBar;