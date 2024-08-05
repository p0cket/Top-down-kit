// src/components/GameCanvas.js
import React, { useEffect, useRef } from 'react';

const GameCanvas = () => {
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
  }, []);

  return <canvas ref={canvasRef} className="border-2 border-black"></canvas>;
};

export default GameCanvas;