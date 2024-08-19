import { useState } from "react";
import { LevelOne, LevelTwo, LevelThree, overworldMap } from "../consts/levels";

const useGameState = () => {
  const [playerMapPosition, setPlayerMapPosition] = useState([5, 5]);
  const [currentLevel, setCurrentLevel] = useState(
    overworldMap[playerMapPosition]
  );
  const [npcPositions, setNPCPositions] = useState(
    currentLevel.npcs.map((npc) => npc.initialPosition)
  );
  const [playerPosition, setPlayerPosition] = useState(currentLevel.playerStart);
  const [enemies, setEnemies] = useState(currentLevel.enemies);
  const [locationName, setLocationName] = useState(currentLevel.name);

  const movePlayerOnMap = (direction) => {
    setPlayerMapPosition((prevPosition) => {
      let [x, y] = prevPosition;
      let newPlayerPosition = playerPosition;

      switch (direction) {
        case "up":
          x -= 1;
          newPlayerPosition = {
            x: playerPosition.x,
            y: currentLevel.walls[0].height - 40,
          };
          break;
        case "down":
          x += 1;
          newPlayerPosition = { x: playerPosition.x, y: 0 };
          break;
        case "left":
          y -= 1;
          newPlayerPosition = {
            x: currentLevel.walls[0].width - 40,
            y: playerPosition.y,
          };
          break;
        case "right":
          y += 1;
          newPlayerPosition = { x: 0, y: playerPosition.y };
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
    setLocationName(newLevel.name);
    setPlayerPosition(newPlayerPosition);
    setNPCPositions(newLevel.npcs.map((npc) => npc.initialPosition));
    setEnemies(newLevel.enemies);
  };

  const handleSceneChange = (sceneName) => {
    let newLevel;
    if (sceneName === "LevelTwo") {
      newLevel = LevelTwo;
    } else if (sceneName === "LevelThree") {
      newLevel = LevelThree;
    }

    if (newLevel) {
      setCurrentLevel(newLevel);
      setLocationName(newLevel.name);
      setPlayerPosition(newLevel.playerStart);
      setNPCPositions(newLevel.npcs.map((npc) => npc.initialPosition));
      setEnemies(newLevel.enemies);
    }
  };

  const handleNPCPositionUpdate = (index, position) => {
    setNPCPositions((prevPositions) => {
      const newPositions = [...prevPositions];
      newPositions[index] = position;
      return newPositions;
    });
  };

  const handlePlayerPositionUpdate = (position) => {
    setPlayerPosition(position);
  };

  return {
    playerMapPosition,
    currentLevel,
    npcPositions,
    playerPosition,
    enemies,
    locationName,
    movePlayerOnMap,
    handleMapTransition,
    handleSceneChange,
    handleNPCPositionUpdate,
    handlePlayerPositionUpdate,
    setPlayerPosition,
    setNPCPositions,
    setEnemies,
  };
};

export default useGameState;
