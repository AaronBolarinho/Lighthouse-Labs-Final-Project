import React, {Component} from 'react';

class Navbar extends Component {

  render() {
    return (
      <nav className='navbar navbar-expand-sm navbar-black'>
        <div className='container'>
          <div className="navbar-brand">
            <p id="logo">YEA or NAY</p>
          </div>

          <TestChangeUser changeUsername={this.changeUsername}/>

          <div className="navbar-nav navbar-right">
            <div className="nav-item">
              <span className="navbar-users">Viewer</span>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar;
