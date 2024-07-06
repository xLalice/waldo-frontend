import React, { useState } from 'react';
import api from '../services/api';

function GameCompletedModal({ score, imageId, onScoreSubmitted }) {
    const [playerName, setPlayerName] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.submitScore({
                name: playerName,
                time: score,
                image: imageId,
            });
            setSubmissionStatus('Score submitted successfully!');
            onScoreSubmitted();  
        } catch (error) {
            console.error('Error submitting score:', error);
            setSubmissionStatus('Failed to submit score. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg text-center">
                <h2 className="text-2xl font-bold mb-4">Game Completed!</h2>
                <p className="mb-4">Your time: {score.toFixed(2)} seconds</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full p-2 border rounded"
                        required
                    />
                    <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
                        Submit Score
                    </button>
                </form>
                {submissionStatus && <p className="mt-4">{submissionStatus}</p>}
            </div>
        </div>
    );
}

export default GameCompletedModal;
