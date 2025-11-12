import React from 'react';

function CharacterMarker({ position, scaleFactor }) {
  const scaledSize = 50 * scaleFactor;

  return (
    <div
      style={{
        left: `${position.x * scaleFactor}px`,
        top: `${position.y * scaleFactor}px`,
        width: `${scaledSize}px`,
        height: `${scaledSize}px`,
        transform: `translate(-50%, -50%)`,
      }}
      className="absolute rounded-full pointer-events-none 
                 border-4 border-solid border-white 
                 bg-red-500/50 
                 shadow-xl 
                 animate-pop-in"
    />
  );
}

// React.memo is a great choice here!
export default React.memo(CharacterMarker);