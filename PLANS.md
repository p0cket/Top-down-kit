# Top-Down Game Kit - Development Roadmap

## Current State Analysis

### Strengths
- ✅ Solid foundation with canvas-based rendering
- ✅ Working collision detection system
- ✅ Grid-based overworld navigation
- ✅ Scene transition system
- ✅ Basic combat mechanics (player attacks, enemy health)
- ✅ NPC patrol AI
- ✅ Event system (walk, activate, scene triggers)
- ✅ Health system for player and enemies

### Issues & Technical Debt

#### Critical Issues
- ❌ **Health state duplication**: Player health managed in both Character component and useGameState hook
- ❌ **Enemy health management**: `handleEnemyHealthChange` updates state but enemies maintain their own health
- ❌ **Unused MainContext**: Set up but not utilized
- ❌ **Missing enemy updates**: Enemies removed from array when health reaches 0, causing React key issues
- ❌ **NPC damage timing**: No cooldown, causes rapid health drain on collision

#### Code Quality Issues
- ⚠️ Commented-out code in Enemy.js and Character.js
- ⚠️ Unused import warning in GameCanvas.js
- ⚠️ No PropTypes validation
- ⚠️ Inconsistent positioning system between overworld grid and scene transitions
- ⚠️ Tailwind config uses deprecated `purge` (should be `content`)
- ⚠️ Edge detection in Character.js assumes walls array has width/height (it doesn't)

#### Missing Features
- 🔲 No save/load system
- 🔲 No inventory system
- 🔲 No dialogue system
- 🔲 No sound effects or music
- 🔲 No sprite animations
- 🔲 No enemy AI beyond basic existence
- 🔲 No items or pickups
- 🔲 No game over state
- 🔲 No pause menu
- 🔲 No mobile controls

---

## Phase 1: Fix Critical Bugs & Refactor (Priority: HIGH)

### Milestone 1.1: Fix Health System
**Goal**: Single source of truth for all health states

- [ ] Refactor player health management
  - [ ] Remove health state from Character.js
  - [ ] Use only useGameState for player health
  - [ ] Update handlePlayerHealthChange to work correctly
  - [ ] Add health change animations/feedback
  - [ ] Test health updates work correctly

- [ ] Fix enemy health system
  - [ ] Create proper enemy state updates in useGameState
  - [ ] Implement handleEnemyHealthChange to update enemies array correctly
  - [ ] Use enemy.health instead of enemy.initialHealth
  - [ ] Add fade-out animation before removing dead enemies
  - [ ] Test multiple enemies can be damaged independently

- [ ] Add damage cooldown system
  - [ ] Create useCooldown custom hook
  - [ ] Add invulnerability frames for player (1 second)
  - [ ] Add visual feedback for invulnerability (flashing sprite)
  - [ ] Prevent NPC damage spam
  - [ ] Test cooldown timing

**Checkpoint**: Health system works reliably without state conflicts

### Milestone 1.2: Clean Up Code
**Goal**: Remove technical debt and improve maintainability

- [ ] Remove dead code
  - [ ] Delete commented code in Enemy.js
  - [ ] Delete commented code in Character.js
  - [ ] Remove unused MainContext or implement it properly
  - [ ] Clean up console.log statements
  - [ ] Remove unused imports

- [ ] Fix linter warnings
  - [ ] Fix React import in GameCanvas.js (use destructured useEffect/useRef)
  - [ ] Update Tailwind config (purge → content)
  - [ ] Add ESLint configuration for consistent style
  - [ ] Run and fix all linter warnings

- [ ] Add PropTypes
  - [ ] Install prop-types package
  - [ ] Add PropTypes to GameCanvas
  - [ ] Add PropTypes to Character
  - [ ] Add PropTypes to Enemy
  - [ ] Add PropTypes to NPC
  - [ ] Add PropTypes to all other components

**Checkpoint**: No linter errors, all components have PropTypes

### Milestone 1.3: Fix Edge Detection Bug
**Goal**: Proper scene transitions at edges

- [ ] Fix overworld edge detection
  - [ ] Identify canvas dimensions from level data
  - [ ] Update Character.js edge detection logic
  - [ ] Test transitions work at all four edges
  - [ ] Ensure player spawns at correct position after transition
  - [ ] Handle corner cases (what happens at map boundaries?)

**Checkpoint**: Can navigate between all overworld rooms smoothly

---

## Phase 2: Core Systems Expansion (Priority: HIGH)

### Milestone 2.1: Game State Management
**Goal**: Persistent game state with save/load capability

- [ ] Enhance useGameState hook
  - [ ] Add game status (playing, paused, gameOver)
  - [ ] Add score/progress tracking
  - [ ] Add timestamp tracking
  - [ ] Refactor to use useReducer for complex state
  - [ ] Add state validation

- [ ] Implement save system
  - [ ] Create saveGame utility (localStorage)
  - [ ] Save player position, health, inventory
  - [ ] Save defeated enemies (don't respawn)
  - [ ] Save completed events/triggers
  - [ ] Add save slots (3 slots)

- [ ] Implement load system
  - [ ] Create loadGame utility
  - [ ] Restore all saved state
  - [ ] Handle corrupted save data gracefully
  - [ ] Show save slot info (location, health, time)
  - [ ] Add "New Game" option

- [ ] Create pause menu
  - [ ] Pause game loop when menu open
  - [ ] Show resume/save/load/quit options
  - [ ] Add keyboard shortcut (ESC key)
  - [ ] Style pause overlay
  - [ ] Test pause doesn't break game state

**Checkpoint**: Can save, load, and resume games correctly

### Milestone 2.2: Inventory System
**Goal**: Collect, store, and use items

- [ ] Design inventory data structure
  - [ ] Define item schema (id, name, description, type, sprite)
  - [ ] Create items.js constants file
  - [ ] Define item types (consumable, key, equipment, quest)
  - [ ] Add inventory array to useGameState
  - [ ] Set max inventory size (20 items)

- [ ] Create inventory UI
  - [ ] Build InventoryPanel component
  - [ ] Grid layout for items
  - [ ] Show item tooltips on hover
  - [ ] Toggle with 'I' key
  - [ ] Style with Tailwind

- [ ] Implement item pickup system
  - [ ] Create Item component (world items)
  - [ ] Add items array to level definitions
  - [ ] Detect player collision with items
  - [ ] Show pickup notification
  - [ ] Add item to inventory
  - [ ] Remove item from world

- [ ] Implement item usage
  - [ ] Click item to use
  - [ ] Health potion restores HP
  - [ ] Key items unlock doors/events
  - [ ] Remove consumables after use
  - [ ] Show usage feedback

**Checkpoint**: Can pick up items, view inventory, and use consumables

### Milestone 2.3: Dialogue System
**Goal**: NPC conversations and story delivery

- [ ] Create dialogue data structure
  - [ ] Define dialogue schema (speaker, text, choices, next)
  - [ ] Support dialogue trees with branching
  - [ ] Add dialogue to NPC definitions
  - [ ] Create sample dialogues for testing

- [ ] Build DialogueBox component
  - [ ] Position at bottom of screen
  - [ ] Show speaker name
  - [ ] Typewriter text effect
  - [ ] Advance with SPACE or click
  - [ ] Style with borders and background

- [ ] Implement dialogue triggers
  - [ ] Trigger on NPC interaction (E key)
  - [ ] Pause movement during dialogue
  - [ ] Show dialogue choices
  - [ ] Navigate choices with arrow keys
  - [ ] Track dialogue state (which conversations completed)

- [ ] Add dialogue events
  - [ ] Give items through dialogue
  - [ ] Trigger scene changes
  - [ ] Set flags for quest progression
  - [ ] Lock/unlock dialogue based on flags

**Checkpoint**: NPCs can have conversations with branching dialogue

---

## Phase 3: Combat & AI Improvements (Priority: MEDIUM)

### Milestone 3.1: Enhanced Combat
**Goal**: More engaging combat mechanics

- [ ] Improve player combat
  - [ ] Add directional attacks (attack in facing direction)
  - [ ] Add attack animation
  - [ ] Add weapon swing hitbox visualization
  - [ ] Add attack cooldown (prevent spam)
  - [ ] Show damage numbers

- [ ] Add weapon system
  - [ ] Define weapon types (sword, bow, staff)
  - [ ] Different damage values
  - [ ] Different attack ranges
  - [ ] Different attack speeds
  - [ ] Equip weapons from inventory

- [ ] Add enemy variety
  - [ ] Create ranged enemies (shoot projectiles)
  - [ ] Create fast-moving enemies
  - [ ] Create tank enemies (high HP, slow)
  - [ ] Different sprite colors per type
  - [ ] Different damage values

- [ ] Add projectile system
  - [ ] Create Projectile component
  - [ ] Projectile collision detection
  - [ ] Projectile movement
  - [ ] Ranged enemy AI shoots projectiles
  - [ ] Player can use ranged weapons

**Checkpoint**: Combat feels engaging with multiple weapon and enemy types

### Milestone 3.2: Enemy AI
**Goal**: Enemies that actively engage the player

- [ ] Implement enemy states
  - [ ] Idle state (standing still)
  - [ ] Patrol state (moving along path)
  - [ ] Chase state (following player)
  - [ ] Attack state (in range, attacking)
  - [ ] Flee state (low health, retreat)

- [ ] Add detection system
  - [ ] Enemy detects player in radius
  - [ ] Line-of-sight checking (don't detect through walls)
  - [ ] Switch to chase state when player detected
  - [ ] Return to patrol when player out of range

- [ ] Improve movement AI
  - [ ] Pathfinding (basic A* or simple grid-based)
  - [ ] Chase player around obstacles
  - [ ] Avoid other enemies (no stacking)
  - [ ] Variable movement speeds per enemy type

- [ ] Add attack patterns
  - [ ] Melee attack when in range
  - [ ] Ranged attack from distance
  - [ ] Telegraph attacks (wind-up animation)
  - [ ] Attack cooldowns

**Checkpoint**: Enemies actively hunt and engage the player intelligently

---

## Phase 4: Polish & Content (Priority: MEDIUM)

### Milestone 4.1: Visual Improvements
**Goal**: Better graphics and animations

- [ ] Add sprite system
  - [ ] Create sprite atlas or individual sprite files
  - [ ] Replace colored squares with actual sprites
  - [ ] Player sprite (4-directional)
  - [ ] Enemy sprites per type
  - [ ] NPC sprites
  - [ ] Item sprites

- [ ] Implement animations
  - [ ] Player walk animation (4 directions)
  - [ ] Player attack animation
  - [ ] Enemy movement animations
  - [ ] Death animations (fade out, particles)
  - [ ] Damage flash effect
  - [ ] Item pickup sparkle

- [ ] Improve environment art
  - [ ] Tile-based floor rendering
  - [ ] Wall textures/sprites
  - [ ] Decorative objects (trees, rocks, furniture)
  - [ ] Event square visual improvements
  - [ ] Background parallax layers

- [ ] Add particle effects
  - [ ] Hit sparks on damage
  - [ ] Dust clouds on movement
  - [ ] Magic effects
  - [ ] Death particles

**Checkpoint**: Game looks polished with sprites and animations

### Milestone 4.2: Audio System
**Goal**: Sound effects and music

- [ ] Set up audio management
  - [ ] Create useAudio hook
  - [ ] Implement sound effect player
  - [ ] Implement background music player
  - [ ] Add volume controls
  - [ ] Add mute toggle

- [ ] Add sound effects
  - [ ] Player footsteps
  - [ ] Attack sounds (swoosh, hit)
  - [ ] Enemy hit/death sounds
  - [ ] Item pickup sound
  - [ ] Dialogue beep
  - [ ] Menu navigation sounds
  - [ ] Door/chest open sounds

- [ ] Add background music
  - [ ] Overworld theme
  - [ ] Combat music (plays when enemies near)
  - [ ] Boss music
  - [ ] Peaceful area music
  - [ ] Music crossfading

**Checkpoint**: Game has full audio feedback

### Milestone 4.3: UI/UX Polish
**Goal**: Professional-feeling interface

- [ ] Improve HUD
  - [ ] Redesign health bar (stylized)
  - [ ] Add stamina/mana bar if needed
  - [ ] Add minimap
  - [ ] Show active quest
  - [ ] Equipment slots display
  - [ ] Hotkey bar for quick items

- [ ] Add screen transitions
  - [ ] Fade in/out between scenes
  - [ ] Smooth camera transitions
  - [ ] Loading screen for heavy areas

- [ ] Create main menu
  - [ ] Title screen
  - [ ] New Game / Continue / Options
  - [ ] Credits screen
  - [ ] Settings menu (audio, controls, graphics)

- [ ] Add tutorial system
  - [ ] Movement tutorial
  - [ ] Combat tutorial
  - [ ] Inventory tutorial
  - [ ] On-screen key prompts
  - [ ] Disable after first completion

**Checkpoint**: UI feels complete and professional

---

## Phase 5: Content Creation (Priority: MEDIUM-LOW)

### Milestone 5.1: World Building
**Goal**: Expansive, interesting world to explore

- [ ] Design world map
  - [ ] Sketch overall world layout (towns, dungeons, wilderness)
  - [ ] Define 20+ connected areas
  - [ ] Plan progression flow
  - [ ] Mark key item/NPC locations

- [ ] Create town areas
  - [ ] Starting village (safe zone)
  - [ ] NPC homes
  - [ ] Shop system
  - [ ] Inn (save point, heal)
  - [ ] Quest givers

- [ ] Create dungeon areas
  - [ ] 3-5 dungeons with themes
  - [ ] Puzzle elements
  - [ ] Boss rooms
  - [ ] Treasure chests
  - [ ] Unique enemies per dungeon

- [ ] Create wilderness areas
  - [ ] Forests
  - [ ] Mountains
  - [ ] Caves
  - [ ] Random encounters
  - [ ] Hidden secrets

**Checkpoint**: 20+ diverse, interconnected areas to explore

### Milestone 5.2: Quest System
**Goal**: Structured objectives and progression

- [ ] Design quest structure
  - [ ] Quest data schema (id, name, description, objectives, rewards)
  - [ ] Quest types (main, side, fetch, kill, escort)
  - [ ] Quest states (available, active, completed)
  - [ ] Quest prerequisites/chains

- [ ] Implement quest tracking
  - [ ] Add quests array to game state
  - [ ] Quest log UI
  - [ ] Active quest display in HUD
  - [ ] Objective checklist
  - [ ] Quest completion notifications

- [ ] Create quest content
  - [ ] Main story questline (10+ quests)
  - [ ] Side quests (15+ quests)
  - [ ] Fetch quests
  - [ ] Combat quests (defeat X enemies)
  - [ ] Exploration quests (find locations)

- [ ] Add quest rewards
  - [ ] Experience/level system
  - [ ] Gold currency
  - [ ] Item rewards
  - [ ] Unlock new areas
  - [ ] Story progression

**Checkpoint**: Quest system drives player progression

### Milestone 5.3: Boss Battles
**Goal**: Memorable, challenging encounters

- [ ] Design boss mechanics
  - [ ] Boss data structure (phases, attacks, patterns)
  - [ ] Health bars for bosses
  - [ ] Attack patterns (cycling attacks)
  - [ ] Phase transitions at HP thresholds

- [ ] Create boss AI
  - [ ] Multi-phase behavior
  - [ ] Special attacks with telegraphs
  - [ ] Movement patterns
  - [ ] Summon minions
  - [ ] Invulnerability phases

- [ ] Build boss arenas
  - [ ] Locked boss rooms
  - [ ] Special arena layouts
  - [ ] Environmental hazards
  - [ ] Boss intro cutscene

- [ ] Create 3-5 unique bosses
  - [ ] Forest guardian boss
  - [ ] Dungeon mini-bosses
  - [ ] Final boss encounter
  - [ ] Optional secret boss

**Checkpoint**: 3-5 challenging boss fights implemented

---

## Phase 6: Advanced Features (Priority: LOW)

### Milestone 6.1: RPG Systems
**Goal**: Character progression and customization

- [ ] Level/XP system
  - [ ] Track player XP
  - [ ] Level up on XP thresholds
  - [ ] Stat increases on level up
  - [ ] Level up animation/sound

- [ ] Stat system
  - [ ] Health, Attack, Defense stats
  - [ ] Stat affects damage calculations
  - [ ] Show stats in menu
  - [ ] Allocate stat points on level up

- [ ] Equipment system
  - [ ] Armor slots (head, chest, legs)
  - [ ] Weapon slots
  - [ ] Equipment provides stat bonuses
  - [ ] Equipment UI
  - [ ] Equip/unequip items

- [ ] Shop system
  - [ ] Create Shop component
  - [ ] Buy/sell items
  - [ ] Gold currency
  - [ ] Shop inventory per location
  - [ ] Price calculations

**Checkpoint**: Full RPG progression system

### Milestone 6.2: Advanced Gameplay
**Goal**: Unique mechanics and replayability

- [ ] Add puzzle mechanics
  - [ ] Push blocks onto switches
  - [ ] Key and lock system
  - [ ] Timed challenges
  - [ ] Sequence puzzles
  - [ ] Environmental puzzles

- [ ] Add special abilities
  - [ ] Dash ability (quick movement)
  - [ ] Magic spells
  - [ ] Shield/block
  - [ ] Grappling hook
  - [ ] Ability unlocks through progression

- [ ] Add difficulty settings
  - [ ] Easy/Normal/Hard modes
  - [ ] Enemy damage scaling
  - [ ] Enemy health scaling
  - [ ] Player health scaling
  - [ ] Save difficulty choice

- [ ] Add achievements
  - [ ] Achievement definitions
  - [ ] Track achievement progress
  - [ ] Achievement notifications
  - [ ] Achievement menu
  - [ ] 20+ achievements

**Checkpoint**: Replayable with multiple play styles

### Milestone 6.3: Multiplayer (Stretch Goal)
**Goal**: Local co-op gameplay

- [ ] Research multiplayer architecture
  - [ ] Evaluate Socket.io vs WebRTC
  - [ ] Plan state synchronization
  - [ ] Plan lobby system
  - [ ] Identify challenges

- [ ] Implement local co-op
  - [ ] Second player character
  - [ ] Gamepad support
  - [ ] Keyboard player 2 controls
  - [ ] Shared camera following both players
  - [ ] Cooperative combat

- [ ] Balance for co-op
  - [ ] Scale enemy health
  - [ ] Increase enemy count
  - [ ] Shared inventory or separate?
  - [ ] Revive system

**Checkpoint**: 2-player local co-op working

---

## Phase 7: Deployment & Distribution (Priority: LOW)

### Milestone 7.1: Performance Optimization
**Goal**: Smooth gameplay on all devices

- [ ] Optimize rendering
  - [ ] Canvas rendering optimizations
  - [ ] Only redraw changed areas
  - [ ] Reduce DOM manipulations
  - [ ] Use CSS transforms for movement
  - [ ] Profile with React DevTools

- [ ] Optimize game loop
  - [ ] Delta time for frame-independent movement
  - [ ] Reduce collision checks (spatial partitioning)
  - [ ] Optimize enemy AI (update less frequently)
  - [ ] Lazy load level data

- [ ] Reduce bundle size
  - [ ] Code splitting by route
  - [ ] Lazy load large assets
  - [ ] Optimize images (compression, WebP)
  - [ ] Tree-shake unused code
  - [ ] Analyze bundle with webpack-bundle-analyzer

**Checkpoint**: 60 FPS on mid-range hardware

### Milestone 7.2: Mobile Support
**Goal**: Playable on mobile devices

- [ ] Add touch controls
  - [ ] Virtual joystick for movement
  - [ ] Touch buttons for actions
  - [ ] Responsive layout
  - [ ] Touch-friendly UI sizing
  - [ ] Test on real devices

- [ ] Optimize for mobile
  - [ ] Reduce canvas size on mobile
  - [ ] Simplify particle effects
  - [ ] Reduce audio quality/size
  - [ ] Add performance mode toggle

**Checkpoint**: Playable on mobile browsers

### Milestone 7.3: Production Deployment
**Goal**: Publish game publicly

- [ ] Prepare for production
  - [ ] Remove all console.logs
  - [ ] Add error boundaries
  - [ ] Add loading states
  - [ ] Add offline support (PWA)
  - [ ] Create favicon and app icons

- [ ] Deploy to hosting
  - [ ] Build production bundle
  - [ ] Deploy to Vercel/Netlify/GitHub Pages
  - [ ] Set up custom domain
  - [ ] Configure CDN
  - [ ] Add analytics (optional)

- [ ] Create marketing materials
  - [ ] Gameplay trailer
  - [ ] Screenshots
  - [ ] itch.io page
  - [ ] GitHub README with demo
  - [ ] Social media posts

**Checkpoint**: Game publicly available and playable

---

## Quick Wins (Can be done anytime)

- [ ] Add game controls reference (in-game or README)
- [ ] Add death state when health reaches 0
- [ ] Add respawn system
- [ ] Add screen shake on damage
- [ ] Add color flash on damage taken
- [ ] Make event squares visually distinct
- [ ] Add FPS counter (debug mode)
- [ ] Add God mode cheat (debug)
- [ ] Add jump-to-level cheat (debug)
- [ ] Improve notification styling
- [ ] Add more keyboard shortcuts (I for inventory, M for map, etc.)
- [ ] Add confirmation dialogs (quit, overwrite save)
- [ ] Add "Press any key to continue" on game over
- [ ] Add footstep dust particles
- [ ] Name the game!

---

## Testing Checklist (Before each major release)

- [ ] Test all scene transitions work
- [ ] Test save/load preserves all state
- [ ] Test combat with multiple enemy types
- [ ] Test all items can be picked up and used
- [ ] Test all NPCs have working dialogue
- [ ] Test inventory full state
- [ ] Test player death and respawn
- [ ] Test all boss fights are completable
- [ ] Test game completion (can reach end)
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Test on mobile devices
- [ ] Test with keyboard only
- [ ] Test with gamepad (if supported)
- [ ] No console errors in production build
- [ ] Performance profiling shows 60 FPS

---

## Suggested Immediate Priority Order

1. **Phase 1, Milestone 1.1** - Fix health system bugs (critical)
2. **Phase 1, Milestone 1.3** - Fix edge detection (breaks navigation)
3. **Phase 1, Milestone 1.2** - Clean up code (developer experience)
4. **Quick Wins** - Add death state and respawn (essential gameplay)
5. **Phase 2, Milestone 2.1** - Save/load system (player retention)
6. **Phase 2, Milestone 2.2** - Inventory system (enables items)
7. **Phase 3, Milestone 3.1** - Enhanced combat (fun factor)
8. **Phase 2, Milestone 2.3** - Dialogue system (enables story)

This gives you a working, bug-free foundation before expanding features.
