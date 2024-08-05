// src/components/GameCanvas.js
import React, { useEffect, useRef } from 'react';

const GameCanvas = ({ walls, eventSquares }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas dimensions
    canvas.width = 800;
    canvas.height = 600;

    // Draw initial state
    context.fillStyle = 'green';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw walls
    context.fillStyle = 'gray';
    walls.forEach(wall => {
      context.fillRect(wall.x, wall.y, wall.width, wall.height);
    });

    // Draw event squares
    context.fillStyle = 'red';
    eventSquares.forEach(square => {
      context.fillRect(square.x, square.y, square.width, square.height);
    });
  }, [walls, eventSquares]);

  return <canvas ref={canvasRef} className="border-2 border-black"></canvas>;
};

export default GameCanvas;