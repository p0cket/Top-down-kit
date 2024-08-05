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

  // Define event squares
  const eventSquares = [
    { x: 150, y: 150, width: 50, height: 50, type: 'walk' },
    { x: 400, y: 400, width: 50, height: 50, type: 'activate' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Top-Down Game</h1>
      <div className="relative">
        <GameCanvas walls={walls} eventSquares={eventSquares} />
        <Character walls={walls} eventSquares={eventSquares} />
      </div>
    </div>
  );
};

export default App;