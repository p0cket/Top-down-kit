import React, { useState, useEffect, useRef } from 'react';

const NPC = ({ initialPosition, movementRange, walls, playerPosition, onPositionUpdate }) => {
  const [position, setPosition] = useState(initialPosition);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const requestRef = useRef();

  const checkCollisionWithWallsAndPlayer = (newX) => {
    const npcRect = {
      x: newX,
      y: position.y,
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
        npcRect.x < wallRect.x + wallRect.width &&
        npcRect.x + npcRect.width > wallRect.x &&
        npcRect.y < wallRect.y + wallRect.height &&
        npcRect.y + npcRect.height > wallRect.y
      ) {
        return true; // Collision detected with wall
      }
    }

    // Check collision with player
    const playerRect = {
      x: playerPosition.x,
      y: playerPosition.y,
      width: 40,
      height: 40,
    };

    if (
      npcRect.x < playerRect.x + playerRect.width &&
      npcRect.x + npcRect.width > playerRect.x &&
      npcRect.y < playerRect.y + playerRect.height &&
      npcRect.y + npcRect.height > playerRect.y
    ) {
      return true; // Collision detected with player
    }

    return false; // No collision
  };

  const moveNPC = () => {
    let { x, y } = position;
    const step = 1;
    const { minX, maxX } = movementRange;

    const newX = x + step * direction;

    if ((newX >= maxX || newX <= minX) || checkCollisionWithWallsAndPlayer(newX)) {
      setDirection(direction * -1); // Reverse direction
    } else {
      x = newX;
    }

    setPosition({ x, y });
    onPositionUpdate({ x, y });
  };

  useEffect(() => {
    const animate = () => {
      moveNPC();
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [position, direction]);

  return (
    <div
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        width: '40px',
        height: '40px',
        backgroundColor: 'purple',
      }}
    />
  );
};

export default NPC;