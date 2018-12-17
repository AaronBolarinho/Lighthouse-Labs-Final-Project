import React, { Component } from 'react';
import LeftArrow from './LeftArrow.jsx';
import RightArrow from './RightArrow.jsx';
import {Link } from 'react-router-dom';

export default class Slider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentIndex: 0
    };

    this.goToPrevSlide=this.goToPrevSlide.bind(this);
    this.goToNextSlide=this.goToNextSlide.bind(this);
    this.addViewerToRoom=this.addViewerToRoom.bind(this);
  }

  addViewerToRoom(user, room) {
    let viewer = {id:user.currentUser.id, username:user.currentUser.name, stance: null, room: room.debateRoom.name, roomId: room.debateRoom.id}
    this.props.socket.emit('addViewer', JSON.stringify(viewer))
  }

  goToPrevSlide() {
    let activeDebates = this.props.debateRooms.filter(d => {
     return d.debator2 !== null && d.allowViewers === "Yes"
      })
    if (this.state.currentIndex) {
      this.setState((prevState) => ({
        currentIndex: this.state.currentIndex - 1
      }))
    } else {
      this.setState((prevState) => ({
        currentIndex: activeDebates.length - 1
      }))
    };
  }

  goToNextSlide() {
    let activeDebates = this.props.debateRooms.filter(d => {
     return d.debator2 !== null && d.allowViewers === "Yes"
      })
     if (this.state.currentIndex === activeDebates.length - 1) {
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
    let currentUser = this.props.currentUser
    let activeDebates = this.props.debateRooms.filter(d => {
     return d.debator2 !== null && d.allowViewers === "Yes"
      })

    return (
      <footer className="footer">
          <div className="container mt-3">
            <h5>View Active Debates</h5>
      <div className="slider">
        <div className="d-flex justify-content-center">

          <LeftArrow goToPrevSlide={this.goToPrevSlide}/>

          <div className='slideContainer'>

            <ul className='slide-container justify-content-center'>
              {

                activeDebates.map((item, index) => {
                let debateRoom = activeDebates[this.state.currentIndex]
                let computedClass = index === (this.state.currentIndex) ? 'slide active' : 'slide';

                  return ( <li className='slide-li' className={computedClass} key={index}>
                          <Link className='slide-debate-title' to={`/${item.id}`} onClick={() =>{this.addViewerToRoom({currentUser}, {debateRoom})}}>{item.proposedDebate}</Link>
                        </li>)
              })}
            </ul>

          </div>

          <RightArrow goToNextSlide={this.goToNextSlide}/>

        </div>
      </div>
       </div>

        </footer>
    );
  }
}