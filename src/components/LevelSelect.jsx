import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';

function LevelSelect() {
    const initialLoadingStates = {
        waldo1: true,
        waldo2: true,
        waldo3: true,
    };

    const [loadingStates, setLoadingStates] = useState(initialLoadingStates);

    const handleImageLoad = (imageId) => {
        setLoadingStates(prevLoadingStates => ({
            ...prevLoadingStates,
            [imageId]: false,
        }));
    };

    const imageLinks = [
        { id: 'waldo1', src: '/waldo1.jpeg', to: '/play/waldo1' },
        { id: 'waldo2', src: '/waldo2.jpeg', to: '/play/waldo2' },
        { id: 'waldo3', src: '/waldo3.jpeg', to: '/play/waldo3' },
    ];

    return (
        <div className="w-full text-center overflow-x-hidden">
            <h1 className="text-3xl font-bold mb-6 mt-8">Select an image</h1>
            <div className="w-full flex  flex-wrap justify-center gap-4 md:gap-6">
                {imageLinks.map(({ id, src, to }) => (
                    <Link key={id} to={to} className="group relative w-48 md:w-64">
                        {loadingStates[id] && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Spinner />
                            </div>
                        )}
                        <img
                            className={`w-full h-48 md:h-64 object-cover rounded-lg transition-transform duration-300 transform hover:scale-105 ${loadingStates[id] ? 'hidden' : 'block'}`}
                            src={src}
                            alt={id}
                            onLoad={() => handleImageLoad(id)}
                        />
                        <div className="absolute inset-0 bg-gray-900 opacity-0 group-hover:opacity-50 transition-opacity duration-300 flex justify-center items-center">
                            <p className="text-white text-lg font-bold">Play</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default LevelSelect;
