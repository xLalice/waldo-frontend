// CharacterMarker.js
import React from 'react';

function CharacterMarker({ position }) {
  return (
    <div 
      style={{'--x': `${position.x}px`, '--y': `${position.y}px`}}
      className=' absolute left-[calc(var(--x)-20px)] top-[calc(var(--y)-20px)] w-[50px] h-[50px] border-2 border-solid border-red-600 pointer-events-none'
    />
  );
}

export default React.memo(CharacterMarker);