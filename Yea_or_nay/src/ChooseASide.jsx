import React, {Component} from 'react';

class ChooseSide extends Component {

  constructor() {
    super();
    this.state = {
      yeaClass: 'yeaClass',
      nayClass: 'nayClass'
    };

    this.clickSide = this.clickSide.bind(this);
  }

  clickSide(e) {
    if (e.target.value === 'yea') {
      this.setState({yeaClass: 'selectedYea', nayClass:'nayClass'});
      this.props.updateSide('yea');
    };

    if (e.target.value === 'nay') {
      this.setState({yeaClass: 'yeaClass', nayClass:'selectedNay'});
      this.props.updateSide('nay');
    };
  }

  render() {
    return (
        <div className='choose-side'>
            Choose your side
          <div className ='choose-side-button'>
            <input className={this.state.yeaClass} type="submit" value='yea' onClick={this.clickSide}></input>
            <input className={this.state.nayClass} type="submit" value='nay' onClick={this.clickSide}></input>
            </div>
        </div>
    );
  }
}

export default ChooseSide;
