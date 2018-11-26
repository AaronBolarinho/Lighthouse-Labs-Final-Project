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
        <h4 className='debator-name1'>{this.props.debatorYea}</h4>
        <h4 className='debator-name2'>{this.props.debatorNay}</h4>
        <input type="range" min="0" max="100" value={this.props.value} className="progress-bar" id="grad" step="1"/>
      </div>
    )
  }
}

export default ProgressBar;

// style={{width: this.props.value}}

//   constructor(props) {
//     super();
//     this.state = {
//       value: 50,
//       sliderStyle: ''
//     };

//     this.updateValue=this.updateValue.bind(this);
//   }

//   updateValue() {
//     this.setState({value: this.props.value});
//   }


//   render() {

//     let oldValue = this.state.value;
//     this.updateValue();
//     let myInput = React.createRef();

//     this.setState({sliderStyle: {
//       transform: `translateX(${myInput.clientWidth*(this.state.value - oldValue)})`,
//       transition: '0.25s'}
//     });

//     console.log('this.props.value', this.props.value);
//     return (
//       <div className="progress-bar-container">
//         <input ref={myInput} style={this.state.sliderStyle} type="range" min="0" max="100" className="progress-bar" id="grad" step="1"/>
//       </div>
//     )
//   }
// }

// export default ProgressBar;

