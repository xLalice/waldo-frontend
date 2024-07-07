import React, { useRef, useEffect, useState } from 'react';

function CharacterDropdown({ position, onSelect, characters, foundCharacters, scaleFactor, imageDimensions }) {
    const dropdownRef = useRef(null);
    const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });

    const remainingCharacters = characters.filter(
        (character) => !foundCharacters.includes(character.name)
    );

    useEffect(() => {
        if (dropdownRef.current) {
            const dropdownRect = dropdownRef.current.getBoundingClientRect();
            let x = position.x * scaleFactor;
            let y = position.y * scaleFactor;

            if (x + dropdownRect.width > imageDimensions.width * scaleFactor) {
                x = (imageDimensions.width * scaleFactor) - dropdownRect.width;
            }

            if (y + dropdownRect.height > imageDimensions.height * scaleFactor) {
                y = y - dropdownRect.height;
            }

            setDropdownPosition({ x, y });
        }
    }, [position, scaleFactor, imageDimensions]);

    return (
        <div
            ref={dropdownRef}
            className="absolute bg-white border-1 border-solid border-black p-2"
            onClick={(e) => e.stopPropagation()}
            style={{
                left: `${dropdownPosition.x}px`,
                top: `${dropdownPosition.y}px`,
                transform: `scale(${scaleFactor})`,
                transformOrigin: 'top left'
            }}
        >
            <ul className="list-none p-0 m-0 text-center">
                {remainingCharacters.map((character) => (
                    <li
                        key={character._id}
                        className="cursor-pointer p-2 hover:bg-blue-200"
                        onClick={() => onSelect(character.name)}
                    >
                        {character.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CharacterDropdown;