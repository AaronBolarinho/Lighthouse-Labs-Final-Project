import React, {Component} from 'react';

class ProposedDebateList extends Component {

  render() {

    return (
      <div className="box">
                    <div className="field">
                      <div className="control">
                        <ul>
                          <li>This is our very long debate title<input className="button" type="submit" value="Yea or Nay"/></li>
                        </ul>
                      </div>
                    </div>
                  </div>
    );

  }
}

export default ProposedDebateList;