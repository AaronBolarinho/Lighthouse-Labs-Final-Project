import React, {Component} from 'react';

// function ChooseSide ({updateSide}) {

//   let yeaClass = 'yeaClass';
//   let nayClass = 'nayClass';

//   function clickSide(e) {
//     if (e.target.value === 'yea') {
//       e.target.className= 'selected';
//       nayClass = 'nayClass';
//       // updateSide('yea');
//     };

//     if (e.target.value === 'nay') {
//       e.target.className = 'selected';
//       yeaClass = 'yeaClass';
//       // nayClass = 'selected';
//       // updateSide('nay');
//     };
//   }

//   return (
//         <div>
//           <span><input className={yeaClass} type="submit" value='yea' onClick={clickSide}></input> Choose your side <input className={nayClass} type="submit" value='nay' onClick={clickSide}></input></span>
//           {/*<span><input type="submit" value='yea' onClick={clickSide}></input> Choose your side <input type="submit" value='nay' onClick={clickSide}></input></span>*/}
//         </div>
//   );
// }

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
          <span>
            <input className={this.state.yeaClass} type="submit" value='yea' onClick={this.clickSide}></input>
            Choose your side
            <input className={this.state.nayClass} type="submit" value='nay' onClick={this.clickSide}></input>
          </span>
        </div>
    );
  }
}

export default ChooseSide;
