import { useCallback, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import TargetingBox from "./TargetingBox";
import CharacterDropdown from "./CharacterDropdown";
import CharacterMarker from "./CharacterMarker";
import GameCompletedModal from "./GameCompletedModal";
import api from "../services/api";

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
  const [scaleFactor, setScaleFactor] = useState(1);
  const [feedbackStatus, setFeedbackStatus] = useState(null);

  const correctSoundRef = useRef(null);
  const wrongSoundRef = useRef(null);
  const winSoundRef = useRef(null);
  const bgmSoundRef = useRef(null);

  const imgRef = useRef(null);

  useEffect(() => {
    correctSoundRef.current = new Audio("/correct.wav");
    wrongSoundRef.current = new Audio("/wrong.wav");
    winSoundRef.current = new Audio("/win.wav");
    bgmSoundRef.current = new Audio("/bgm.mp3");
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
      console.log("API Response Data:", response.data);
      setCharacters(response.data);
    };

    const updateScaleFactor = () => {
      if (imgRef.current) {
        const currentScale =
          imgRef.current.getBoundingClientRect().width /
          imgRef.current.naturalWidth;
        setScaleFactor(currentScale);
      }
    };

    const currentImg = imgRef.current;

    if (currentImg) {
      currentImg.addEventListener("load", updateScaleFactor);
      window.addEventListener("resize", updateScaleFactor);

      if (currentImg.complete) {
        updateScaleFactor();
      }
    }

    setStartTime(Date.now());
    fetchCharacters();

    return () => {
      window.removeEventListener("resize", updateScaleFactor);
      if (currentImg) {
        currentImg.removeEventListener("load", updateScaleFactor);
      }
    };
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
    const imgElement = event.target;

    const rect = imgElement.getBoundingClientRect();

    const xPercent = (event.clientX - rect.left) / rect.width;
    const yPercent = (event.clientY - rect.top) / rect.height;

    const x = xPercent * imgElement.naturalWidth;
    const y = yPercent * imgElement.naturalHeight;

    console.log(
      `Natural Coords: { "x": ${Math.round(x)}, "y": ${Math.round(y)} }`
    );

    setTargetingPosition({ x, y });
    setIsDropdownVisible(true);
  }, []);

  const handleOutsideClick = useCallback(() => {
    setTargetingPosition(null);
    setIsDropdownVisible(false);
  }, []);

  const handleCharacterSelect = useCallback(
    async (characterName) => {
      setIsDropdownVisible(false);

      try {
        const response = await api.validateCharacter({
          characterName,
          x: targetingPosition.x,
          y: targetingPosition.y,
          image: imageId,
        });

        if (response.data.isCorrect) {
          correctSoundRef.current.play();
          setFeedbackStatus("correct");
          setFoundCharacters((prev) => [...prev, characterName]);
          if (foundCharacters.length + 1 === characters.length) {
            setGameCompleted(true);
          }
        } else {
          wrongSoundRef.current.play();
          setFeedbackStatus("wrong");
        }
      } catch (error) {
        console.error("Error validating character:", error);
        setFeedbackStatus("wrong");
      }

      setTimeout(() => {
        setTargetingPosition(null);
        setFeedbackStatus(null);
      }, 500);
    },
    [targetingPosition, characters, foundCharacters, imageId]
  );

  const formatTime = useCallback((timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, []);

  const handleScoreSubmitted = useCallback(() => {
    const event = new CustomEvent("scoreSubmitted");
    window.dispatchEvent(event);
  }, []);

  return (
    <div className="relative" onClick={handleOutsideClick}>
      <div className="relative w-full">
        <img
          ref={imgRef}
          src={`/${imageId}.jpeg`}
          alt="Where's Waldo Game"
          onClick={(e) => {
            e.stopPropagation();
            handleImageClick(e);
          }}
          className="w-full h-auto cursor-pointer"
        />
      </div>
      <div className="fixed top-4 right-2/4 bg-white p-2 rounded shadow-md text-cyan-500 z-10 ">
        {formatTime(elapsedTime)}
      </div>
      {targetingPosition && (
        <TargetingBox
          position={targetingPosition}
          scaleFactor={scaleFactor}
          status={feedbackStatus}
        />
      )}
      {isDropdownVisible && targetingPosition && (
        <CharacterDropdown
          position={targetingPosition}
          scaleFactor={scaleFactor}
          onSelect={handleCharacterSelect}
          characters={characters}
          foundCharacters={foundCharacters}
          imageDimensions={{
            width: imgRef.current ? imgRef.current.naturalWidth : 0,
            height: imgRef.current ? imgRef.current.naturalHeight : 0,
          }}
        />
      )}
      {foundCharacters.map((characterName) => {
        const character = characters.find((c) => c.name === characterName);
        if (!character) return null;
        return (
          <CharacterMarker
            key={characterName}
            position={{ x: character.x, y: character.y }}
            scaleFactor={scaleFactor}
          />
        );
      })}
      {gameCompleted && (
        <GameCompletedModal
          score={(endTime - startTime) / 1000}
          imageId={imageId}
          onScoreSubmitted={handleScoreSubmitted}
        />
      )}
    </div>
  );
}

export default GameBoard;
