// src/components/Enemy.js
import React, { useState, useEffect } from 'react';

const Enemy = ({ id, initialPosition, initialHealth, onHealthChange }) => {
  const [position, setPosition] = useState(initialPosition);
  const [health, setHealth] = useState(initialHealth);

  useEffect(() => {
    // const takeDamage = (amount) => {
      // setHealth(health);
    // };
    // console.log(`health changed`, health, id)
    if (health <= 0) {
      onHealthChange(id, 0); // Remove enemy when health is zero
    }
  }, [health, id, onHealthChange]);

  // const takeDamage = (amount) => {
  //   setHealth((prevHealth) => Math.max(0, prevHealth - amount));
  // };

  return (
    <div
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        width: '40px',
        height: '40px',
        backgroundColor: 'red',
        display: health > 0 ? 'block' : 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-20px',
          left: '0',
          backgroundColor: 'white',
          padding: '2px',
          borderRadius: '3px',
        }}
      >
        {health}
      </div>
    </div>
  );
};

export default Enemy;