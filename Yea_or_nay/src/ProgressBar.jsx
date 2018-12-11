import React, {Component} from 'react';

class ProgressBar extends Component {

  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="progress-bar-container">
        <h4 className='debatorYea'><strong>YEA:</strong> {this.props.debatorYea}</h4>
        <h4 className='debatorNay'>{this.props.debatorNay} <strong>:NAY</strong></h4>
        <input type="range" min="0" max="100" value={this.props.value} className="progress-bar" id="grad" step="1"/>
      </div>
    )
  }
}

export default ProgressBar;



