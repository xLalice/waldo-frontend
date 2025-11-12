import { useState } from 'react';
import api from '../services/api';
import Spinner from './Spinner'; 

function GameCompletedModal({ score, imageId, onScoreSubmitted }) {
  const [playerName, setPlayerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!playerName.trim()) {
      setErrorMessage('Please enter a name.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await api.submitScore({
        name: playerName,
        time: score,
        image: imageId,
      });

      setIsSubmitted(true);
      onScoreSubmitted(); 

    } catch (error) {
      console.error('Error submitting score:', error);
      setErrorMessage('Failed to submit score. Please try again.');
      setIsSubmitting(false); 
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 p-4">
      <div 
        className="bg-white p-6 md:p-8 rounded-lg shadow-xl text-center w-full max-w-md
                   mx-auto text-gray-900 animate-modal-pop"
      >
        {!isSubmitted ? (
          <>
            <h2 className="text-3xl font-bold mb-3 text-red-600">
              Game Completed!
            </h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Your time: <strong>{score.toFixed(2)}</strong> seconds
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your name"
                className="w-full p-3 border border-gray-300 rounded-md
                           text-lg text-gray-900
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full p-3 bg-blue-600 text-white text-lg font-bold rounded-md
                           transition-colors duration-200 
                           hover:bg-blue-700 
                           disabled:bg-gray-400 disabled:cursor-not-allowed
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <Spinner /> 
                    Submitting...
                  </span>
                ) : (
                  'Submit Score'
                )}
              </button>
            </form>

            {errorMessage && (
              <p className="mt-4 text-red-500">{errorMessage}</p>
            )}
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-3 text-green-600">
              Success!
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Your score has been submitted to the leaderboard.
            </p>
            <p className="text-sm text-gray-500">
              You can now close this window or navigate away.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default GameCompletedModal;