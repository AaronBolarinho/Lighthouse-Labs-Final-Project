import React, {Component} from 'react';

function ChooseSide () {


   function updateSide(e){
     //updateLiked();

   }

  return (
      <div className="viewer-bar" >
        <span className="viewer-button"><button id='yea' onClick={updateSide}>YEA</button> Choose your side <button id='nay' onClick={updateSide}>NAY</button> </span>
      </div>
  );
}

export default ChooseSide;
