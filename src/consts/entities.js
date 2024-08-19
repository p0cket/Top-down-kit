// Define reusable wall shapes
export const basicWall = [
    { x: 300, y: 200, width: 50, height: 200 },
    { x: 500, y: 100, width: 200, height: 50 },
  ];
  
  export const wallShapeL = [
    { x: 100, y: 300, width: 100, height: 50 },
    { x: 200, y: 100, width: 150, height: 50 },
  ];
  
  // Define reusable event squares
  export const touchableTriggerBlock = {
    width: 50,
    height: 50,
    color: 'yellow',
    borderColor: 'gray',
  };
  
  export const sceneChangeBlock = {
    width: 50,
    height: 50,
    color: 'red',
    borderColor: 'black',
    type: 'scene',
  };
  
  export const activateBlock = {
    width: 50,
    height: 50,
    color: 'blue',
    borderColor: 'white',
    type: 'activate',
  };
  
  // Define reusable NPCs
  export const basicNPC = {
    initialPosition: { x: 200, y: 300 },
    movementRange: { minX: 200, maxX: 300 },
  };
  
  // Define reusable enemies
  export const basicEnemy = {
    id: 1,
    initialPosition: { x: 250, y: 250 },
    initialHealth: 100,
  };
  