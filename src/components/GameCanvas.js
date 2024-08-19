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

    // Draw event squares with borders and custom colors
    eventSquares.forEach(square => {
      context.fillStyle = square.color || 'red'; // Default color is red if none provided
      context.fillRect(square.x, square.y, square.width, square.height);

      context.strokeStyle = square.borderColor || 'black'; // Default border color is black if none provided
      context.lineWidth = 3; // Set the border thickness
      context.strokeRect(square.x, square.y, square.width, square.height);
    });
  }, [walls, eventSquares]);

  return <canvas ref={canvasRef} className="border-2 border-black"></canvas>;
};

export default GameCanvas;
