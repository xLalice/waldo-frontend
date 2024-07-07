import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GameBoard from './components/GameBoard';
import Leaderboard from './components/Leaderboard';
import LevelSelect from './components/LevelSelect';

function App() {
    return (
        <Router>
            <div className="min-h-screen w-full bg-gray-100">
                <nav className="fixed w-full top-0 z-10 bg-white shadow-md">
                    <ul className="flex justify-center items-center h-16 px-4">
                        <li className="mx-4">
                            <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
                                Play Game
                            </Link>
                        </li>
                        <li className="mx-4">
                            <Link to="/leaderboard" className="text-blue-600 hover:text-blue-800 font-medium">
                                Leaderboard
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="w-full h-full flex justify-center items-center pt-20">
                    <Routes>
                        <Route path="/" element={<LevelSelect />} />
                        <Route path="/play/:imageId" element={<GameBoard />} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
