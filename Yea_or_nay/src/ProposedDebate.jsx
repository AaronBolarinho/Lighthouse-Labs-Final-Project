import React, {Component} from 'react';

class ProposedDebate extends Component {

  render() {

    return (
       <div className="box">
                  <div className="field">
                    <div className="control">
                      <input className="input is-primary" type="text" placeholder="Debate input"/>
                      <div className="buttons has-addons">
                        <span className="button">YEA</span>
                        <span className="button">NAY</span>
                      </div>
                    </div>
                  </div>
                </div>
    );

  }
}

export default ProposedDebate;