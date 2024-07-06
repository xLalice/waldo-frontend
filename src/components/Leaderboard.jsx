import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Leaderboard() {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        fetchScores();
        const handleScoreSubmitted = () => {
            fetchScores();
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
        <div className="container w-full mx-auto max-w-3xl px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-6">Leaderboard</h2>
            <div className="flex justify-center gap-6 mb-6">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => fetchScores("waldo1")}>Image 1</button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => fetchScores("waldo2")}>Image 2</button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => fetchScores("waldo3")}>Image 3</button>
            </div>
            <div className="overflow-x-auto w-full">
                <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="py-3 px-4 text-left">Rank</th>
                            <th className="py-3 px-4 text-left">Player</th>
                            <th className="py-3 px-4 text-left">Time (seconds)</th>
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
