import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import TargetingBox from './TargetingBox';
import CharacterDropdown from './CharacterDropdown';
import CharacterMarker from './CharacterMarker';
import GameCompletedModal from './GameCompletedModal';
import api from '../services/api';

function GameBoard() {
    const { imageId } = useParams();
    const [targetingPosition, setTargetingPosition] = useState(null);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [characters, setCharacters] = useState([]);
    const [foundCharacters, setFoundCharacters] = useState([]);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);

    const correctSoundRef = useRef(null);
    const wrongSoundRef = useRef(null);
    const winSoundRef = useRef(null);
    const bgmSoundRef = useRef(null);

    useEffect(() => {
        correctSoundRef.current = new Audio('/correct.wav');
        wrongSoundRef.current = new Audio('/wrong.wav');
        winSoundRef.current = new Audio('/win.wav');
        bgmSoundRef.current = new Audio('/bgm.mp3');
        bgmSoundRef.current.loop = true;
        bgmSoundRef.current.volume = 0.3; 
        bgmSoundRef.current.play();

        return () => {
            bgmSoundRef.current.pause();
            bgmSoundRef.current.currentTime = 0;
        };
    }, []);

    useEffect(() => {
        const fetchCharacters = async () => {
            const response = await api.getCharacters(imageId); 
            setCharacters(response.data);
        };
        setStartTime(Date.now());
        fetchCharacters();
    }, [imageId]);

    useEffect(() => {
        if (gameCompleted) {
            setEndTime(Date.now());
            winSoundRef.current.play();
        }
    }, [gameCompleted]);

    useEffect(() => {
        let timer;
        if (!gameCompleted && startTime) {
            timer = setInterval(() => {
                setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [startTime, gameCompleted]);

    const handleImageClick = useCallback((event) => {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        setTargetingPosition({ x, y });
        setIsDropdownVisible(true);
    }, []);

    const handleOutsideClick = useCallback(() => {
        setTargetingPosition(null);
        setIsDropdownVisible(false);
    }, []);

    const handleCharacterSelect = useCallback(async (characterName) => {
        try {
            const response = await api.validateCharacter({
                characterName,
                x: targetingPosition.x,
                y: targetingPosition.y,
                image: imageId,
            });

            if (response.data.isCorrect) {
                correctSoundRef.current.play();
                setFoundCharacters((prev) => [...prev, characterName]);
                if (foundCharacters.length + 1 === characters.length) {
                    setGameCompleted(true);
                }
            } else {
                wrongSoundRef.current.play();
            }
        } catch (error) {
            console.error('Error validating character:', error);
        }
        setTargetingPosition(null);
        setIsDropdownVisible(false);
    }, [targetingPosition, characters, foundCharacters, imageId]);

    const formatTime = useCallback((timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, []);

    const handleScoreSubmitted = useCallback(() => {
        const event = new CustomEvent('scoreSubmitted');
        window.dispatchEvent(event);
    }, []);

    return (
        <div className="relative" onClick={handleOutsideClick}>
            <img
                src={`/${imageId}.jpeg`}
                alt="Where's Waldo Game"
                onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(e);
                }}
                className="w-screen w-full h-screen object-cover"
            />
            <div className="absolute top-8 right-4 bg-white p-2 rounded shadow-md text-cyan-500 ">
                {formatTime(elapsedTime)}
            </div>
            {targetingPosition && <TargetingBox position={targetingPosition} />}
            {isDropdownVisible && targetingPosition && (
                <CharacterDropdown 
                position={targetingPosition} 
                onSelect={handleCharacterSelect} 
                characters={characters}
                foundCharacters={foundCharacters} />
            )}
            {foundCharacters.map((characterName) => {
                const character = characters.find((c) => c.name === characterName);
                return (
                    <CharacterMarker
                        key={characterName}
                        position={{ x: character.x, y: character.y }}
                    />
                );
            })}
            {gameCompleted && <GameCompletedModal score={(endTime - startTime) / 1000} imageId={imageId} onScoreSubmitted={handleScoreSubmitted} />}
        </div>
    );
}

export default GameBoard;
