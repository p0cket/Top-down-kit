import { useState, useRef, useEffect } from "react";
import { checkEventTrigger, checkProximity } from "../utils/collision";

const useMovement = (
  walls,
  eventSquares,
  npcs,
  enemies,
  onEventTrigger,
  onProximity,
  onPositionUpdate,
  onEnemyHealthChange,
  speed = 4 // Add a default speed parameter
) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const keysPressed = useRef({});
  const requestRef = useRef();

  const checkCollision = (newX, newY) => {
    const characterRect = {
      x: newX,
      y: newY,
      width: 40,
      height: 40,
    };

    for (let wall of walls) {
      const wallRect = {
        x: wall.x,
        y: wall.y,
        width: wall.width,
        height: wall.height,
      };

      if (
        characterRect.x < wallRect.x + wallRect.width &&
        characterRect.x + characterRect.width > wallRect.x &&
        characterRect.y < wallRect.y + wallRect.height &&
        characterRect.y + characterRect.height > wallRect.y
      ) {
        return true; // Collision detected
      }
    }

    for (let npc of npcs) {
      const npcRect = {
        x: npc.x,
        y: npc.y,
        width: 40,
        height: 40,
      };

      if (
        characterRect.x < npcRect.x + npcRect.width &&
        characterRect.x + characterRect.width > npcRect.x &&
        characterRect.y < npcRect.y + npcRect.height &&
        characterRect.y + characterRect.height > npcRect.y
      ) {
        return true; // Collision detected
      }
    }

    for (let enemy of enemies) {
      const enemyRect = {
        x: enemy.initialPosition.x,
        y: enemy.initialPosition.y,
        width: 40,
        height: 40,
      };

      if (
        characterRect.x < enemyRect.x + enemyRect.width &&
        characterRect.x + characterRect.width > enemyRect.x &&
        characterRect.y < enemyRect.y + enemyRect.height &&
        characterRect.y + characterRect.height > enemyRect.y
      ) {
        return true; // Collision detected
      }
    }

    return false; // No collision
  };

  const dealDamageInRadius = () => {
    const damageRadius = 50; // Adjust this value for the damage radius
    const damageAmount = 50; // Adjust this value for the damage amount

    enemies.forEach((enemy) => {
      const enemyRect = {
        x: enemy.initialPosition.x,
        y: enemy.initialPosition.y,
        width: 40,
        height: 40,
      };

      const dx = enemyRect.x - position.x;
      const dy = enemyRect.y - position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < damageRadius) {
        onEnemyHealthChange(enemy.id, enemy.initialHealth - damageAmount);
      }
    });
  };

  const moveCharacter = () => {
    let { x, y } = position;
    const step = speed; // Use the speed parameter for the step value

    if (keysPressed.current["ArrowUp"] || keysPressed.current["w"]) {
      if (!checkCollision(x, y - step)) y -= step;
    }
    if (keysPressed.current["ArrowDown"] || keysPressed.current["s"]) {
      if (!checkCollision(x, y + step)) y += step;
    }
    if (keysPressed.current["ArrowLeft"] || keysPressed.current["a"]) {
      if (!checkCollision(x - step, y)) x -= step;
    }
    if (keysPressed.current["ArrowRight"] || keysPressed.current["d"]) {
      if (!checkCollision(x + step, y)) x += step;
    }

    setPosition({ x, y });
    onEventTrigger(x, y); // Check for event trigger after moving
    onProximity(x, y); // Check for proximity to show notification
    onPositionUpdate({ x, y }); // Update the player's position
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      keysPressed.current[event.key] = true;

      // Check for activation event when near the square and 'e' is pressed
      if (event.key === "e") {
        onEventTrigger(position.x, position.y, true); // Passing an additional parameter for 'e' key press
      }

      // Deal damage when 'r' is pressed
      if (event.key === "r") {
        dealDamageInRadius();
      }
    };

    const handleKeyUp = (event) => {
      keysPressed.current[event.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const animate = () => {
      moveCharacter();
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(requestRef.current);
    };
  }, [position, eventSquares, npcs, enemies]);

  return position;
};

export default useMovement;
