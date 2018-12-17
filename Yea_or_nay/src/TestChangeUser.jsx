import React, {Component} from 'react';

function ChangeUsername ({changeUsername}) {

  function keyPressMessage(e){
    if(e.keyCode == 13 && e.target.value.length > 0){
      changeUsername(e.target.value);
      e.target.value = '';
    }
  }

  return (
    <div className='username-container'>
      <span className='username-label'>Choose A Username</span>
      <input className="input username" onKeyDown={keyPressMessage} placeholder="Ex. PartyParrot99" />
    </div>
  )
}

export default ChangeUsername