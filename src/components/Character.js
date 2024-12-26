import React, { useEffect, useState } from "react";
import HeadSprite from "../sprites/head.png";
import useMovement from "../hooks/useMovement";
import Notification from "./Notification";
import { checkEventTrigger, checkProximity } from "../utils/collision";
import { throttleLog } from "../utils/throttleLog";

const Character = ({
  walls,
  eventSquares,
  npcs,
  enemies,
  onPositionUpdate,
  onEnemyHealthChange,
  onSceneChange,
  movePlayerOnMap,
  handlePlayerHealthChange
}) => {
  const [health, setHealth] = useState(100); // Initial health
  const [showNotification, setShowNotification] = useState(false); // State to show/hide notification
  const [notificationPosition, setNotificationPosition] = useState({
    x: 0,
    y: 0,
  }); // Notification position

  throttleLog(() =>
    console.log("Character received onSceneChange:", onSceneChange)
  );

  const handleEventTrigger = (x, y, isActivationKey = false) => {
    checkEventTrigger(x, y, eventSquares, isActivationKey, onSceneChange);
  };

  const handleProximity = (x, y) => {
    checkProximity(
      x,
      y,
      eventSquares,
      setNotificationPosition,
      setShowNotification
    );
  };

  const position = useMovement(
    walls,
    eventSquares,
    npcs,
    enemies,
    handleEventTrigger,
    handleProximity,
    onPositionUpdate,
    onEnemyHealthChange,
    (newX, newY) => handleCollision(newX, newY)
  );

  const handleCollision = (newX, newY) => {
    npcs.forEach((npc, index) => {
      if (npc.dealsDamage) {
        const npcRect = {
          x: npc.initialPosition.x,
          y: npc.initialPosition.y,
          width: 40,
          height: 40,
        };

        const playerRect = {
          x: newX,
          y: newY,
          width: 40,
          height: 40,
        };

        if (
          playerRect.x < npcRect.x + npcRect.width &&
          playerRect.x + playerRect.width > npcRect.x &&
          playerRect.y < npcRect.y + npcRect.height &&
          playerRect.y + playerRect.height > npcRect.y
        ) {
          // Player has collided with an NPC that deals damage
          console.log("Player collided with NPC that deals damage!");
          const newHealth = Math.max(0, health - 10);
          setHealth(newHealth); // Reduce health by 10
          handlePlayerHealthChange(newHealth); // Update global health state
        }
      }
    });
  };

  useEffect(() => {
    // Check if the player is at the edge of the current level
    const { x, y } = position;

    const isAtEdge = x <= 0 || y <= 0 || x >= walls.width || y >= walls.height;

    if (isAtEdge) {
      // Determine the direction based on the position
      let direction = null;
      if (x <= 0) direction = "left";
      if (y <= 0) direction = "up";
      if (x >= walls.width) direction = "right";
      if (y >= walls.height) direction = "down";

      if (direction) {
        movePlayerOnMap(direction);
      }
    }
  }, [position]);

  return (
    <>
      <img
        src={HeadSprite}
        alt="Character"
        style={{
          position: "absolute",
          top: position.y,
          left: position.x,
          width: "40px",
          height: "40px",
        }}
      />
      <Notification show={showNotification} position={notificationPosition} />
    </>
  );
};

export default Character;
