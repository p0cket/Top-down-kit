import React from 'react';
import GameCanvas from './components/GameCanvas';
import Character from './components/Character';
import './index.css';

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Top-Down Game</h1>
      <div className="relative">
        <GameCanvas />
        <Character />
      </div>
    </div>
  );
};

export default App;