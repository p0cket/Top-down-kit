// src/App.js
import React from 'react';
import GameCanvas from './components/GameCanvas';
import Character from './components/Character';
import './index.css';

const App = () => {
  // Define walls as an array of objects with x, y, width, and height properties
  const walls = [
    { x: 300, y: 200, width: 50, height: 200 },
    { x: 500, y: 100, width: 200, height: 50 },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Top-Down Game</h1>
      <div className="relative">
        <GameCanvas walls={walls} />
        <Character walls={walls} />
      </div>
    </div>
  );
};

export default App;