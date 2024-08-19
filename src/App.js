import React from "react"
import GameCanvas from "./components/GameCanvas"
import Character from "./components/Character"
import NPC from "./components/NPC"
import Enemy from "./components/Enemy"
import useGameState from "./hooks/useGameState"
import "./index.css"
import GameUI from "./components/UI/GameUI"

const App = () => {
  const {
    currentLevel,
    npcPositions,
    playerPosition,
    enemies,
    locationName,
    movePlayerOnMap,
    handleSceneChange,
    handlePlayerPositionUpdate,
    handleNPCPositionUpdate,
    handleEnemyHealthChange,
  } = useGameState()

  return (
<div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
  <h1 className="text-2xl font-bold mb-4 text-white">Top-Down Game Kit</h1>
  <GameUI locationName={locationName} />
  <div className="relative">
    <GameCanvas
      walls={currentLevel.walls}
      eventSquares={currentLevel.eventSquares}
    />
    <Character
      walls={currentLevel.walls}
      eventSquares={currentLevel.eventSquares}
      npcs={npcPositions}
      onPositionUpdate={handlePlayerPositionUpdate}
      enemies={enemies}
      onEnemyHealthChange={handleEnemyHealthChange}
      onSceneChange={handleSceneChange}
      movePlayerOnMap={movePlayerOnMap}
    />
    {npcPositions.length > 0 &&
      currentLevel.npcs &&
      npcPositions.map((npcPosition, index) => {
        if (!currentLevel.npcs[index]) {
          return null;
        }

        const npc = currentLevel.npcs[index];
        return (
          <NPC
            key={index}
            initialPosition={npcPosition}
            movementRange={npc.movementRange}
            walls={currentLevel.walls}
            playerPosition={playerPosition}
            onPositionUpdate={(position) =>
              handleNPCPositionUpdate(index, position)
            }
          />
        );
      })}
    {enemies.length > 0 &&
      enemies.map((enemy) => (
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

  )
}

export default App
