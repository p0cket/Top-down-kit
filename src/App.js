import React, { useState } from 'react';
import GameCanvas from './components/GameCanvas';
import Character from './components/Character';
import NPC from './components/NPC';
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

  // Define NPCs initial state
  const initialNPCs = [
    { initialPosition: { x: 200, y: 300 }, movementRange: { minX: 200, maxX: 300 }, walls },
    { initialPosition: { x: 400, y: 500 }, movementRange: { minX: 400, maxX: 500 }, walls },
  ];

  const [npcPositions, setNPCPositions] = useState(initialNPCs.map(npc => npc.initialPosition));
  const [playerPosition, setPlayerPosition] = useState({ x: 100, y: 100 });

  const handleNPCPositionUpdate = (index, position) => {
    setNPCPositions(prevPositions => {
      const newPositions = [...prevPositions];
      newPositions[index] = position;
      return newPositions;
    });
  };

  const handlePlayerPositionUpdate = (position) => {
    setPlayerPosition(position);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Top-Down Game</h1>
      <div className="relative">
        <GameCanvas walls={walls} eventSquares={eventSquares} />
        <Character
          walls={walls}
          eventSquares={eventSquares}
          npcs={npcPositions}
          onPositionUpdate={handlePlayerPositionUpdate}
        />
        {initialNPCs.map((npc, index) => (
          <NPC
            key={index}
            initialPosition={npc.initialPosition}
            movementRange={npc.movementRange}
            walls={walls}
            playerPosition={playerPosition}
            onPositionUpdate={(position) => handleNPCPositionUpdate(index, position)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;