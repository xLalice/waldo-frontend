import React from 'react';

function CharacterDropdown({ position, onSelect, characters, foundCharacters }) {
    const remainingCharacters = characters.filter(
        (character) => !foundCharacters.includes(character.name)
    );

    return (
        <div
            className="absolute left-[calc(var(--x))] top-[calc(var(--y))] bg-white border-1 border-solid border-black p-2"
            onClick={(e) => e.stopPropagation()}
            style={{ '--x': `${position.x}px`, '--y': `${position.y}px` }}
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
