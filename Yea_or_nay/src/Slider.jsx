import React, { Component } from 'react';
import Slide from './Slide.jsx';
import LeftArrow from './LeftArrow.jsx';
import RightArrow from './RightArrow.jsx';

export default class Slider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      debateRoomList: [
        'Room 1', 'Room 2', 'Room 3'
      ],
      currentIndex: 0
    };

    this.goToPrevSlide=this.goToPrevSlide.bind(this);
    this.goToNextSlide=this.goToNextSlide.bind(this);
  }

  goToPrevSlide() {
    if (this.state.currentIndex) {
      this.setState((prevState) => ({
        currentIndex: this.state.currentIndex - 1
      }))
    } else {
      this.setState((prevState) => ({
        currentIndex: this.state.debateRoomList.length - 1
      }))
    };
  }

  goToNextSlide() {
     if (this.state.currentIndex === this.state.debateRoomList.length - 1) {
      this.setState({
        currentIndex: 0
      })
    } else {
      this.setState({
        currentIndex: this.state.currentIndex + 1
      })
    };
  }

   render() {

    // let sliderStyle = {
    //   transform:`translateX(${this.state.activeIndex * -100}%)`,
    //   transition: '0.25s'
    // }

    return (
      <div className="slider">
        <div className="d-flex justify-content-center">

          <LeftArrow goToPrevSlide={this.goToPrevSlide}/>

          <div className='slideContainer'>

            <ul className='slide-container, justify-content-center'>
              {this.state.debateRoomList.map((item, index) => {
                let computedClass = index === (this.state.currentIndex) ? 'slide active' : 'slide';
                return <li className={computedClass} key={index}>{item}</li>
              })}
            </ul>

          </div>

          <RightArrow goToNextSlide={this.goToNextSlide}/>

        </div>
      </div>
    );
  }
}