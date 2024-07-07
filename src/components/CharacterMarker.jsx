import React from 'react';

function CharacterMarker({ position, scaleFactor }) {
  const size = 50;
  const scaledSize = size * scaleFactor; 
  const offset = scaledSize / 2; 
  const adjustmentX = 20; 
  const adjustmentY = 20;

  return (
    <div 
      style={{
        left: `${position.x * scaleFactor - offset + adjustmentX}px`,
        top: `${position.y * scaleFactor - offset + adjustmentY}px`,
        width: `${scaledSize}px`,
        height: `${scaledSize}px`,
        transform: `translate(-50%, -50%)`
      }}
      className='absolute border-2 border-solid border-red-600 rounded-full pointer-events-none'
    />
  );
}

export default React.memo(CharacterMarker);
