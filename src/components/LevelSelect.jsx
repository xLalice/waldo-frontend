import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';

function LevelSelect() {
    const [loadingStates, setLoadingStates] = useState({
        waldo1: true,
        waldo2: true,
        waldo3: true,
    });

    const handleImageLoad = (imageId) => {
        setLoadingStates((prevState) => ({
            ...prevState,
            [imageId]: false,
        }));
    };

    return (
        <div className="w-screen h-screen text-center overflow-x-hidden">
            <h1 className="text-3xl font-bold mb-6">Select an image</h1>
            <div className="flex justify-center w-full gap-6">
                <Link to="/play/waldo1" className="group relative">
                    {loadingStates.waldo1 && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Spinner />
                        </div>
                    )}
                    <img
                        className={`w-64 h-64 object-cover rounded-lg transition-transform duration-300 transform hover:scale-105 ${loadingStates.waldo1 ? 'hidden' : 'block'}`}
                        src="/waldo1.jpeg"
                        alt="waldo1"
                        onLoad={() => handleImageLoad('waldo1')}
                    />
                    <div className="absolute inset-0 bg-gray-900 opacity-0 group-hover:opacity-50 transition-opacity duration-300 flex justify-center items-center">
                        <p className="text-white text-lg font-bold">Play</p>
                    </div>
                </Link>
                <Link to="/play/waldo2" className="group relative">
                    {loadingStates.waldo2 && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Spinner />
                        </div>
                    )}
                    <img
                        className={`w-64 h-64 object-cover rounded-lg transition-transform duration-300 transform hover:scale-105 ${loadingStates.waldo2 ? 'hidden' : 'block'}`}
                        src="/waldo2.jpeg"
                        alt="waldo2"
                        onLoad={() => handleImageLoad('waldo2')}
                    />
                    <div className="absolute inset-0 bg-gray-900 opacity-0 group-hover:opacity-50 transition-opacity duration-300 flex justify-center items-center">
                        <p className="text-white text-lg font-bold">Play</p>
                    </div>
                </Link>
                <Link to="/play/waldo3" className="group relative">
                    {loadingStates.waldo3 && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Spinner />
                        </div>
                    )}
                    <img
                        className={`w-64 h-64 object-cover rounded-lg transition-transform duration-300 transform hover:scale-105 ${loadingStates.waldo3 ? 'hidden' : 'block'}`}
                        src="/waldo3.jpeg"
                        alt="waldo3"
                        onLoad={() => handleImageLoad('waldo3')}
                    />
                    <div className="absolute inset-0 bg-gray-900 opacity-0 group-hover:opacity-50 transition-opacity duration-300 flex justify-center items-center">
                        <p className="text-white text-lg font-bold">Play</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default LevelSelect;
