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
      this.setState({yeaClass: 'selected', nayClass:'nayClass'});
      this.props.updateSide('yea');
    };

    if (e.target.value === 'nay') {
      this.setState({yeaClass: 'yeaClass', nayClass:'selected'});
      this.props.updateSide('nay');
    };
  }

  render() {
    return (
        <div className='choose-side'>
            <input className={this.state.yeaClass} type="submit" value='yea' onClick={this.clickSide}></input>
            Choose your side
            <input className={this.state.nayClass} type="submit" value='nay' onClick={this.clickSide}></input>
        </div>
    );
  }
}

export default ChooseSide;
