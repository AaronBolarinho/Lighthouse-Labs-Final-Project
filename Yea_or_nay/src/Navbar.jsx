import React, {Component} from 'react';
import TestChangeUser from './TestChangeUser.jsx';

function Navbar ({changeUsername, currentUser}) {

  if (currentUser.name === 'bob') {
    return (
      <nav className='navbar navbar-expand-sm navbar-black'>
        <div className='container'>
          <div className="navbar-brand">
            <p id="logo">YEA or NAY</p>
          </div>
          <div className="navbar-nav navbar-right">
            <div className="nav-item">
              <span className="navbar-users"><TestChangeUser changeUsername={changeUsername}/></span>
            </div>
          </div>
        </div>
      </nav>
    )
  } else {
    return(
       <nav className='navbar navbar-expand-sm navbar-black'>
      <div className='container'>
        <div className="navbar-brand">
          <p id="logo">YEA or NAY</p>
        </div>
        <div className="navbar-nav navbar-right">
          <div className="nav-item">
            <span className="navbar-users">{currentUser.name}</span>
          </div>
        </div>
      </div>
    </nav>
  )};


  {/*return (
    <nav className='navbar navbar-expand-sm navbar-black'>
      <div className='container'>
        <div className="navbar-brand">
          <p id="logo">YEA or NAY</p>
        </div>
          {currentUser.name === 'bob' ? <TestChangeUser changeUsername={changeUsername}/> : {currentUser.name}}
        <div className="navbar-nav navbar-right">
          <div className="nav-item">
            <span className="navbar-users">Viewer</span>
          </div>
        </div>
      </div>
    </nav>
  )*/}
}

export default Navbar;
