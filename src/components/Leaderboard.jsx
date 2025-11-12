import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import Spinner from './Spinner'; 

function Leaderboard() {
  const [scores, setScores] = useState([]);
  const [selectedImage, setSelectedImage] = useState('waldo1'); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const levelImages = ['waldo1', 'waldo2', 'waldo3'];

  const fetchScores = useCallback(async (image) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.getTopScores(image);
      setScores(response.data);
    } catch (err) {
      console.error('Error fetching scores:', err);
      setError('Failed to load scores. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchScores(selectedImage);
  }, [selectedImage, fetchScores]);

  useEffect(() => {
    const handleScoreSubmitted = () => {
      fetchScores(selectedImage);
    };

    window.addEventListener('scoreSubmitted', handleScoreSubmitted);

    return () => {
      window.removeEventListener('scoreSubmitted', handleScoreSubmitted);
    };
  }, [selectedImage, fetchScores]);

  const renderTableBody = () => {
    if (isLoading) {
      return (
        <tr>
          <td colSpan="3" className="py-12">
            <div className="flex justify-center">
              <Spinner />
            </div>
          </td>
        </tr>
      );
    }

    if (error) {
      return (
        <tr>
          <td colSpan="3" className="py-8 text-center text-red-500">
            {error}
          </td>
        </tr>
      );
    }

    if (scores.length === 0) {
      return (
        <tr>
          <td colSpan="3" className="py-8 text-center text-gray-500">
            No scores submitted for this level yet.
          </td>
        </tr>
      );
    }

    return scores.map((score, index) => (
      <tr
        key={score._id}
        className="border-b border-gray-200 transition-colors duration-150
                   hover:bg-gray-100"
      >
        <td className="py-3 px-4 text-center font-medium">
          {index + 1}
        </td>
        <td className="py-3 px-4 text-left">{score.name}</td>
        <td className="py-3 px-4 text-center">
          {score.time.toFixed(2)}s
        </td>
      </tr>
    ));
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 px-4 py-8">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 text-center mb-12">
          Leaderboard
        </h2>
        
        <div className="flex justify-center gap-4 md:gap-8 mb-8">
          {levelImages.map((image) => (
            <button
              key={image}
              onClick={() => setSelectedImage(image)}
              className={`group relative w-32 md:w-48
                          rounded-xl shadow-lg overflow-hidden 
                          transition-all duration-300 ease-in-out
                          hover:shadow-xl hover:-translate-y-1
                          ${selectedImage === image ? 'ring-4 ring-blue-500' : 'opacity-70 hover:opacity-100'}`}
            >
              <img
                className="w-full h-20 md:h-28 object-cover 
                           transition-transform duration-300 group-hover:scale-105"
                src={`/${image}.jpeg`}
                alt={`Level ${image.replace('waldo', '')}`}
              />
            </button>
          ))}
        </div>

        <div className="overflow-x-auto w-full">
          <div className="w-full bg-white shadow-xl rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-center uppercase font-semibold text-sm w-1/6">
                    Rank
                  </th>
                  <th className="py-3 px-4 text-left uppercase font-semibold text-sm w-3/6">
                    Player
                  </th>
                  <th className="py-3 px-4 text-center uppercase font-semibold text-sm w-2/6">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {renderTableBody()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;