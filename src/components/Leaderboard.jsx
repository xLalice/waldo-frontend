import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Leaderboard() {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        fetchScores('waldo1');
        const handleScoreSubmitted = () => {
            fetchScores('waldo1');
        };

        window.addEventListener('scoreSubmitted', handleScoreSubmitted);

        return () => {
            window.removeEventListener('scoreSubmitted', handleScoreSubmitted);
        };
    }, []);

    const fetchScores = async (image) => {
        try {
            const response = await api.getTopScores(image);
            setScores(response.data);
        } catch (error) {
            console.error('Error fetching scores:', error);
        }
    };

    return (
        <div className="container  mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-6">Leaderboard</h2>
            <div className="flex justify-center gap-6 mb-6">
                {['waldo1', 'waldo2', 'waldo3'].map((image) => (
                    <button key={image} onClick={() => fetchScores(image)} className={`w-60 p-2 border rounded shadow-md ${image === scores[0]?.image ? 'bg-blue-600 text-white' : ''}`}>
                        <img className="w-full" src={`/${image}.jpeg`} alt="" />
                    </button>
                ))}
            </div>
            <div className="overflow-x-auto w-full">
                <table className="w-full bg-white text-center shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="py-3 px-4 text-center">Rank</th>
                            <th className="py-3 px-4 text-center">Player</th>
                            <th className="py-3 px-4 text-center">Time (seconds)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores.map((score, index) => (
                            <tr key={score._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                <td className="py-3 px-4">{index + 1}</td>
                                <td className="py-3 px-4">{score.name}</td>
                                <td className="py-3 px-4">{score.time.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Leaderboard;
