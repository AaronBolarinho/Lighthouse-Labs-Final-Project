import React, {Component} from 'react';

function ProgressBar ({debatorYea, debatorNay, value}) {
  return (
    <div className="progress-bar-container">
      <h4 className='debatorYea'><strong>YEA:</strong> {debatorYea}</h4>
      <h4 className='debatorNay'>{debatorNay} <strong>:NAY</strong></h4>
      <input type="range" min="0" max="100" value={value} className="progress-bar" id="grad" step="1"/>
    </div>
  )
}

export default ProgressBar;



