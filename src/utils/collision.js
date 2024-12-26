import { throttleLog } from "./throttleLog";

// src/utils/collision.js

export const isColliding = (rect1, rect2) => {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
};

export const createRect = (entity) => ({
  x: entity.x || entity.initialPosition?.x || 0,
  y: entity.y || entity.initialPosition?.y || 0,
  width: entity.width || 40,
  height: entity.height || 40,
});

export const doesItCollide = (rectToCheck, entities, onCollision) => {
  for (let entity of entities) {
    const entityRect = createRect(entity);
    if (isColliding(rectToCheck, entityRect)) {
      if (onCollision) {
        onCollision(entity); // Handle collision if callback provided
      }
      return true; // Collision detected
    }
  }
  return false; // No collision
};


export const checkEventTrigger = (newX, newY, eventSquares, isActivationKey = false, onSceneChange) => {
  throttleLog(() => console.log('checkEventTrigger called with:', { newX, newY, isActivationKey, onSceneChange }));

  const characterRect = {
    x: newX,
    y: newY,
    width: 40,
    height: 40,
  };

  for (let square of eventSquares) {
    const squareRect = {
      x: square.x,
      y: square.y,
      width: square.width,
      height: square.height,
    };

    if (
      characterRect.x < squareRect.x + squareRect.width &&
      characterRect.x + characterRect.width > squareRect.x &&
      characterRect.y < squareRect.y + squareRect.height &&
      characterRect.y + characterRect.height > squareRect.y
    ) {
      //handles triggered Events. Like the notification or switching scenes.
      if (square.type === "walk" || (square.type === "activate" && isActivationKey)) {
        console.log(`${square.type.charAt(0).toUpperCase() + square.type.slice(1)} event triggered!`);
      } else if (square.type === "scene") {
        console.log("Scene change triggered!");
        if (typeof onSceneChange === 'function') {
          onSceneChange(square.sceneName);
        } else {
          console.error('onSceneChange is not a function');
        }
      }
      return true;
    }
  }

  return false;
};

  
  export const checkProximity = (newX, newY, eventSquares, setNotificationPosition, setShowNotification) => {
    const characterRect = {
      x: newX,
      y: newY,
      width: 40,
      height: 40,
    }
  
    for (let square of eventSquares) {
      if (square.type === "activate") {
        const squareRect = {
          x: square.x,
          y: square.y,
          width: square.width,
          height: square.height,
        }
  
        if (
          characterRect.x < squareRect.x + squareRect.width + 10 &&
          characterRect.x + characterRect.width > squareRect.x - 10 &&
          characterRect.y < squareRect.y + squareRect.height + 10 &&
          characterRect.y + characterRect.height > squareRect.y - 10
        ) {
          setNotificationPosition({ x: square.x, y: square.y - 20 }) // Set position above the square
          setShowNotification(true) // Show notification
          return
        }
      }
    }
  
    setShowNotification(false) // Hide notification if not near
  }