// src/components/GameCanvas.js
import React, { useEffect, useRef } from 'react';

const GameCanvas = ({ walls, eventSquares }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas dimensions
    canvas.width = 1600;
    canvas.height = 750;
    // location(url), request (info sent), response(info you recieve)


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
      context.fillStyle = square.color || 'red';
      context.fillRect(square.x, square.y, square.width, square.height);

      context.strokeStyle = square.borderColor || 'black';
      context.lineWidth = 3;
      context.strokeRect(square.x, square.y, square.width, square.height);

      if (square.type) {
        context.fillStyle = 'black';
        context.font = '16px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(square.type, square.x + square.width / 2, square.y + square.height / 2);
      }
    });
  }, [walls, eventSquares]);

  return <canvas ref={canvasRef} className="border-2 border-black"></canvas>;
};

export default GameCanvas;
