# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A React-based top-down 2D game built with Create React App. Features include a player character that can move across multiple connected scenes, interact with NPCs, battle enemies, and trigger events. The game uses canvas rendering for the environment and absolutely positioned React components for entities.

## Development Commands

```bash
npm start          # Run development server at http://localhost:3000
npm test           # Run tests in interactive watch mode
npm run build      # Create production build in build/ folder
```

## Architecture

### State Management Architecture

The game uses a dual state management approach:

1. **MainContext** (`src/MainContext.js`): A React Context with reducer pattern that's currently minimal but set up for future global state needs
2. **useGameState Hook** (`src/hooks/useGameState.js`): The primary state manager that handles:
   - Current level/scene state
   - Player position and health
   - NPC positions
   - Enemy states
   - Map navigation (grid-based overworld system)

### Game Loop and Movement

- **useMovement Hook** (`src/hooks/useMovement.js`): Implements the game loop using `requestAnimationFrame`
  - Manages keyboard input via refs to avoid re-renders
  - Handles collision detection before position updates
  - Triggers event checks on each frame
  - Supports WASD and arrow keys for movement
  - 'e' key activates nearby objects
  - 'r' key deals damage in a radius

### Level System

Two navigation systems exist:

1. **Scene Transitions**: Direct teleportation between named scenes via event squares (e.g., StartingArea → LevelTwo)
2. **Grid-based Overworld Map**: Connected rooms in a coordinate grid system (e.g., "5,5" is the starting area, "4,5" is north)
   - Player can walk to edges to transition between adjacent rooms
   - Position wraps to opposite edge when transitioning

Levels are defined in `src/consts/levels.js` and composed using reusable entity definitions from `src/consts/entities.js`.

### Component Architecture

- **App.js**: Main orchestrator that renders the canvas, player character, NPCs, and enemies
- **GameCanvas.js**: Static canvas rendering for walls and event squares
- **Character.js**: Player character with collision detection, health system, and event interaction
- **Enemy.js**: Red square enemies with health bars that can be damaged
- **NPC.js**: Autonomous entities with patrol behavior and optional collision damage
- **Scene.js**: Scene transition component
- **GameUI.js**: Heads-up display showing location name and player health

### Collision System

Located in `src/utils/collision.js`, implements rectangle-based collision detection:

- `isColliding()`: AABB collision detection
- `createRect()`: Normalizes entity objects into collision rectangles
- `doesItCollide()`: Batch collision checking with optional callback
- `checkEventTrigger()`: Handles walking onto or activating event squares
- `checkProximity()`: Shows notifications when near interactive objects

### Event System

Event squares defined in level data with three types:

- **walk**: Trigger on collision (yellow squares)
- **activate**: Require 'e' key press when nearby (blue squares, show notification on proximity)
- **scene**: Trigger scene transitions on collision (red squares)

## Key Patterns

### Entity Composition

Entities (walls, NPCs, enemies, event squares) are defined as reusable templates in `src/consts/entities.js` and composed with spread syntax in level definitions. Positions and properties can be overridden per instance.

### Position Management

All positions use absolute pixel coordinates. Each entity component maintains its own position state and reports updates via callback props to the central `useGameState` hook, which maintains the canonical positions.

### Health System

- Player health managed in both Character component (local) and useGameState hook (global)
- Enemies have local health that triggers removal callbacks when reaching 0
- Damage dealt through collision (NPCs) or radius attacks (player 'r' key)

## Important Implementation Details

- The game canvas is 1600x750 pixels
- Entity dimensions are typically 40x40 pixels
- Movement speed is 4 pixels per frame by default
- Collision detection happens before position updates to prevent wall clipping
- The `throttleLog` utility prevents console spam during development
- Player map position in overworld uses `[x,y]` array format, not coordinate strings
