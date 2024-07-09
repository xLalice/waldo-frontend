import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GameBoard from './components/GameBoard';
import Leaderboard from './components/Leaderboard';
import LevelSelect from './components/LevelSelect';

function App() {
    return (
        <Router>
            <div className="min-h-screen w-full bg-gray-100">
                <nav className="relative w-full z-10 bg-gray-100">
                    <ul className="flex items-center h-16 px-4 w-full">
                        <li className="mx-4 mr-auto">
                            <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
                                <img className="w-40 mt-10 z-10 " src="/logo.svg" alt="" />
                            </Link>
                        </li>
                        <li className="mx-4">
                            <Link to="/leaderboard" className="text-blue-600 hover:text-blue-800 font-medium">
                                <p className='font-custom text-xl text-cyan-400 '>Leaderboard</p>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="w-full h-full flex justify-center items-center">
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
