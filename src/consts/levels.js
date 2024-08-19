// src/consts/levels.js
import {
  basicWall,
  wallShapeL,
  touchableTriggerBlock,
  sceneChangeBlock,
  activateBlock,
  basicNPC,
  basicEnemy,
} from "./entities"

// Define LevelOne using reusable components
export const LevelOne = {
  name: "LevelOne",
  playerStart: { x: 100, y: 100 },
  walls: basicWall, // Use basicWall component
  eventSquares: [
    { ...touchableTriggerBlock, x: 150, y: 150, type: "walk" }, // Use touchableTriggerBlock with specific position
    { ...activateBlock, x: 400, y: 400 }, // Use activateBlock with specific position
    { ...sceneChangeBlock, x: 600, y: 450, sceneName: "LevelTwo" }, // Use sceneChangeBlock with specific position and scene name
  ],
  npcs: [
    { ...basicNPC }, // Use basicNPC
    {
      ...basicNPC,
      initialPosition: { x: 400, y: 500 },
      movementRange: { minX: 400, maxX: 500 },
    }, // Another NPC with different position
  ],
  enemies: [
    { ...basicEnemy }, // Use basicEnemy
    { ...basicEnemy, id: 2, initialPosition: { x: 450, y: 450 } }, // Another enemy with different ID and position
  ],
}

// Define LevelTwo using reusable components
export const LevelTwo = {
  name: "LevelTwo",
  playerStart: { x: 50, y: 50 },
  walls: wallShapeL, // Use wallShapeL component
  eventSquares: [
    { ...touchableTriggerBlock, x: 400, y: 100, type: "walk" },
    { ...sceneChangeBlock, x: 500, y: 500, sceneName: "LevelThree" },
  ],
  npcs: [
    {
      ...basicNPC,
      initialPosition: { x: 300, y: 300 },
      movementRange: { minX: 250, maxX: 350 },
    },
  ],
  enemies: [{ ...basicEnemy, id: 3, initialPosition: { x: 350, y: 350 } }],
}

// Define other levels similarly
export const LevelThree = {
  name: "LevelThree",
  playerStart: { x: 400, y: 400 },
  walls: [
    { x: 600, y: 200, width: 50, height: 200 },
    { x: 700, y: 100, width: 200, height: 50 },
  ],
  eventSquares: [{ ...touchableTriggerBlock, x: 800, y: 400, type: "walk" }],
  npcs: [],
  enemies: [],
}

export const StartingArea = {
  name: "StartingArea",
  playerStart: { x: 100, y: 100 },
  walls: basicWall,
  eventSquares: [
    { ...sceneChangeBlock, x: 400, y: 400, sceneName: "HouseScene" },
  ],
  npcs: [
    { ...basicNPC },
    {
      ...basicNPC,
      initialPosition: { x: 400, y: 500 },
      movementRange: { minX: 400, maxX: 500 },
    },
  ],
  enemies: [
    { ...basicEnemy },
    { ...basicEnemy, id: 2, initialPosition: { x: 450, y: 450 } },
  ],
}

export const LevelNorth = {
  name: "LevelNorth",
  playerStart: { x: 100, y: 200 },
  walls: wallShapeL,
  eventSquares: [],
  npcs: [
    {
      ...basicNPC,
      initialPosition: { x: 150, y: 350 },
      movementRange: { minX: 150, maxX: 250 },
    },
  ],
  enemies: [{ ...basicEnemy, id: 3, initialPosition: { x: 300, y: 300 } }],
}

export const LevelSouth = {
  name: "LevelSouth",
  playerStart: { x: 300, y: 100 },
  walls: [
    { x: 400, y: 200, width: 50, height: 200 },
    { x: 600, y: 100, width: 200, height: 50 },
  ],
  eventSquares: [],
  npcs: [],
  enemies: [],
}

export const LevelWest = {
  name: "LevelWest",
  playerStart: { x: 200, y: 400 },
  walls: [
    { x: 100, y: 400, width: 150, height: 50 },
    { x: 200, y: 300, width: 50, height: 100 },
  ],
  eventSquares: [],
  npcs: [
    {
      ...basicNPC,
      initialPosition: { x: 200, y: 350 },
      movementRange: { minX: 200, maxX: 300 },
    },
  ],
  enemies: [{ ...basicEnemy, id: 4, initialPosition: { x: 250, y: 250 } }],
}

export const LevelEast = {
  name: "LevelEast",
  playerStart: { x: 400, y: 400 },
  walls: [
    { x: 500, y: 200, width: 50, height: 200 },
    { x: 600, y: 100, width: 200, height: 50 },
  ],
  eventSquares: [],
  npcs: [],
  enemies: [{ ...basicEnemy, id: 5, initialPosition: { x: 550, y: 450 } }],
}

// Overworld Map Definition
export const overworldMap = {
  "5,5": StartingArea,
  "4,5": LevelNorth,
  "6,5": LevelSouth,
  "5,4": LevelWest,
  "5,6": LevelEast,
}
