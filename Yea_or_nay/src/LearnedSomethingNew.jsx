import React, {Component} from 'react';

function LearnedSomethingNew ({LrnedNewThing}) {
  return (
    <div className='lrnedSomethingNew'>
      <button className='lrnedSomethingNewButton' onClick={LrnedNewThing}>Learned Something New! </button>
    </div>
  )
}

export default LearnedSomethingNew;
