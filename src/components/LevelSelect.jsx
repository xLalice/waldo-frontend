import { useState } from 'react';
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
    setLoadingStates((prevLoadingStates) => ({
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
    <div className="min-h-screen w-full bg-cyan-300 text-center overflow-x-hidden">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-12">
          Select a Level
        </h1>

        <div className="w-full flex flex-wrap justify-center gap-6 md:gap-10">
          {imageLinks.map(({ id, src, to }) => (
            <Link
              key={id}
              to={to}
              className="group relative w-48 h-48 md:w-64 md:h-64 
                         rounded-xl shadow-lg overflow-hidden 
                         transition-all duration-300 ease-in-out
                         hover:shadow-2xl hover:-translate-y-1"
            >
              {loadingStates[id] && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                  <Spinner />
                </div>
              )}
              <img
                className={`w-full h-full object-cover rounded-xl
                            transition-transform duration-300 
                            group-hover:scale-105 
                            ${loadingStates[id] ? 'hidden' : 'block'}`}
                src={src}
                alt={`Level: ${id}`} 
                onLoad={() => handleImageLoad(id)}
                onError={() => handleImageLoad(id)}
              />
              <div
                className="absolute inset-0 flex justify-center items-center 
                           rounded-xl bg-black/0 group-hover:bg-black/60 
                           transition-all duration-300"
              >
                <p
                  className="text-white text-lg font-bold
                             opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100
                             transition-all duration-300"
                >
                  Play
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LevelSelect;