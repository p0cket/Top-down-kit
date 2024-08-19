import React, { useState, useEffect } from 'react';
import GameCanvas from './components/GameCanvas';
import Character from './components/Character';
import NPC from './components/NPC';
import Enemy from './components/Enemy';
import { LevelOne, LevelTwo, LevelThree, overworldMap } from './consts/levels'; 
import './index.css';

const App = () => {
  const [currentLevel, setCurrentLevel] = useState(LevelOne);
  const [playerMapPosition, setPlayerMapPosition] = useState([5, 5]);
  const [npcPositions, setNPCPositions] = useState(currentLevel.npcs.map(npc => npc.initialPosition));
  const [playerPosition, setPlayerPosition] = useState(currentLevel.playerStart);
  const [enemies, setEnemies] = useState(currentLevel.enemies);
  const [locationName, setLocationName] = useState(currentLevel.name); // To display the location name

  const movePlayerOnMap = (direction) => {
    setPlayerMapPosition((prevPosition) => {
      let [x, y] = prevPosition;
      let newPlayerPosition = playerPosition;

      switch (direction) {
        case "up":
          x -= 1;
          newPlayerPosition = { x: playerPosition.x, y: currentLevel.walls[0].height - 40 }; // Place near bottom edge
          break;
        case "down":
          x += 1;
          newPlayerPosition = { x: playerPosition.x, y: 0 }; // Place near top edge
          break;
        case "left":
          y -= 1;
          newPlayerPosition = { x: currentLevel.walls[0].width - 40, y: playerPosition.y }; // Place near right edge
          break;
        case "right":
          y += 1;
          newPlayerPosition = { x: 0, y: playerPosition.y }; // Place near left edge
          break;
        default:
          return prevPosition;
      }

      const newPosition = `${x},${y}`;
      if (overworldMap[newPosition]) {
        handleMapTransition(overworldMap[newPosition], newPlayerPosition);
        return [x, y];
      } else {
        console.log("No room there!");
        return prevPosition;
      }
    });
  };

  const handleMapTransition = (newLevel, newPlayerPosition) => {
    setCurrentLevel(newLevel);
    setLocationName(newLevel.name); // Update the location name
    setPlayerPosition(newPlayerPosition); // Position the player at the edge
    setNPCPositions(newLevel.npcs.map(npc => npc.initialPosition));
    setEnemies(newLevel.enemies);
  };

  const handleSceneChange = (sceneName) => {
    let newLevel;
    if (sceneName === 'LevelTwo') {
      newLevel = LevelTwo;
    } else if (sceneName === 'LevelThree') {
      newLevel = LevelThree;
    }

    if (newLevel) {
      setCurrentLevel(newLevel);
      setLocationName(newLevel.name); // Update the location name
      setPlayerPosition(newLevel.playerStart);
      setNPCPositions(newLevel.npcs.map(npc => npc.initialPosition));
      setEnemies(newLevel.enemies);
    }
  };
  
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

  const handleEnemyHealthChange = (id, newHealth) => {
    setEnemies((prevEnemies) => {
      if (newHealth <= 0) {
        return prevEnemies.filter(enemy => enemy.id !== id);
      }
      return prevEnemies.map(enemy => enemy.id === id ? { ...enemy, initialHealth: newHealth } : enemy);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Top-Down Game Kit</h1>
      <p className="text-lg mb-4">Current Location: {locationName}</p> {/* Display current location */}
      <div className="relative">
        <GameCanvas walls={currentLevel.walls} eventSquares={currentLevel.eventSquares} />
        <Character
          walls={currentLevel.walls}
          eventSquares={currentLevel.eventSquares}
          npcs={npcPositions}
          onPositionUpdate={handlePlayerPositionUpdate}
          enemies={enemies}
          onEnemyHealthChange={handleEnemyHealthChange}
          onSceneChange={handleSceneChange} // Pass scene change handler to Character
          movePlayerOnMap={movePlayerOnMap} // Pass the movePlayerOnMap function
        />
        {currentLevel.npcs.map((npc, index) => (
          <NPC
            key={index}
            initialPosition={npc.initialPosition}
            movementRange={npc.movementRange}
            walls={currentLevel.walls}
            playerPosition={playerPosition}
            onPositionUpdate={(position) => handleNPCPositionUpdate(index, position)}
          />
        ))}
        {enemies.map(enemy => (
          <Enemy
            key={enemy.id}
            id={enemy.id}
            initialPosition={enemy.initialPosition}
            initialHealth={enemy.initialHealth}
            onHealthChange={handleEnemyHealthChange}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
