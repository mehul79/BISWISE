# BISWISE Game - Complete Project Explanation

## 📁 Project Structure & File Tree

```
new_frontend/
├── index.html              # React app entry point (landing/login pages)
├── game.html              # Game entry point (standalone game page)
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite build configuration (supports both HTML files)
│
├── src/
│   ├── main.jsx           # React app entry (renders App.jsx)
│   ├── App.jsx            # React Router setup (landing, login, quiz routes)
│   ├── index.css          # Global styles
│   │
│   ├── components/        # React components
│   │   ├── landing/       # Landing page components
│   │   ├── login/         # Login/Signup components
│   │   ├── Quiz.jsx       # Quiz component
│   │   ├── StartQuiz.jsx  # Quiz starter
│   │   ├── Chat.jsx       # Chat component
│   │   └── Navbar.jsx     # Navigation bar
│   │
│   └── gameFIles/         # 🎮 GAME LOGIC (Main game code)
│       ├── main.js        # ⭐ GAME ENTRY POINT
│       ├── kaboomCtx.js   # Kaboom.js game engine initialization
│       ├── constants.js   # Game constants, dialogues, tasks, correct inventories
│       ├── inventory.js   # Inventory management & state persistence
│       ├── utils.js       # Utility functions (dialogue display, array comparison)
│       │
│       └── scenes/        # Game scenes (20 different locations)
│           ├── workshop.js      # Tutorial/workshop scene
│           ├── grocery.js      # Supermarket scene
│           ├── outside.js       # Outdoor/colony scene (hub)
│           ├── home1.js         # Home scene (level 1)
│           ├── home2.js         # Home scene (level 2)
│           ├── home3.js         # Home scene (level 3)
│           ├── home4.js         # Home scene (level 4)
│           ├── home5.js         # Home scene (level 5)
│           ├── estore.js        # Electronics store
│           ├── pharmacy.js      # Pharmacy/hospital
│           ├── manufacturing.js # Hardware store
│           ├── library.js       # Library
│           ├── park.js          # Park scene
│           ├── colony.js        # Colony scene
│           └── scene2-6.js      # Various transition scenes
│
└── public/                # Game assets
    ├── *.png, *.json      # Map tilesets and tilemap data
    ├── *.tsj, *.tmj      # Tiled map editor files
    ├── bg.mp3             # Background music
    ├── spritesheet.png    # Player character sprites
    └── mini-map.jfif      # Mini map image
```

---

## 🚀 Entry Points

### 1. **React App Entry** (`index.html` → `src/main.jsx`)
- **Purpose**: Landing page, login, signup, quiz functionality
- **Route**: `/` (default)
- **Framework**: React + React Router
- **Entry File**: `src/main.jsx` → renders `App.jsx`

### 2. **Game Entry** (`game.html` → `src/gameFIles/main.js`) ⭐
- **Purpose**: The actual game experience
- **Route**: `/game.html` (standalone page)
- **Framework**: Kaboom.js (2D game engine)
- **Entry File**: `src/gameFIles/main.js`

---

## 🎮 How The Game Works

### Game Engine: Kaboom.js
- **Kaboom.js** is a JavaScript game framework for creating 2D games
- Initialized in `kaboomCtx.js` with a canvas element (`#game`)
- Uses a scene-based architecture

### Core Game Flow

```
1. game.html loads
   ↓
2. Loads main.js (game entry point)
   ↓
3. Initializes Kaboom engine
   ↓
4. Loads all sprites and assets
   ↓
5. Creates all game scenes (20 scenes)
   ↓
6. Loads saved game state from localStorage
   ↓
7. Starts at saved scene (or "workshop" if first time)
   ↓
8. Player can move, interact, collect items
   ↓
9. Game state persists to localStorage
```

---

## 🎯 Game Logic Breakdown

### 1. **State Management** (`inventory.js`)

The game uses **localStorage** to persist:
- **Level** (1-5)
- **Current Scene** (where player is)
- **Inventory** (items collected)
- **First Time Flag** (tutorial completion)
- **Save Time** (expires after 1 hour)

**Key Functions:**
- `loadState()` - Loads from localStorage or resets if expired
- `saveState()` - Saves current state to localStorage
- `addItem(itemName)` - Adds item to inventory
- `removeItem(itemName)` - Removes item from inventory
- `clearInventory()` - Clears all items
- `updateInventoryUI()` - Updates the HTML inventory display

### 2. **Scene System**

Each scene (`scenes/*.js`) follows this pattern:

```javascript
export function createSceneName() {
    k.scene("sceneName", async () => {
        // 1. Load map data (JSON from Tiled editor)
        const mapData = await fetch("./map.json").json();
        
        // 2. Create map sprite
        const map = k.add([k.sprite("mapSprite"), ...]);
        
        // 3. Create player character
        const player = k.make([...]);
        
        // 4. Process map layers:
        //    - boundaries: Collision zones, exits, interactables
        //    - spawnpoints: Where player appears
        
        // 5. Set up player movement (keyboard/mouse)
        
        // 6. Handle collisions:
        //    - Exit zones → Change scene
        //    - Items → Show dialogue, add/remove items
        //    - NPCs → Show dialogue
    });
}
```

### 3. **Player Movement**

**Desktop (Keyboard):**
- Arrow keys or WASD
- `onKeyDown` → Start movement animation
- `onKeyRelease` → Stop animation, play idle

**Mobile (Touch):**
- Click/tap to move
- `onMouseDown` → Calculate angle, move player
- `onMouseRelease` → Stop movement

**Animations:**
- `walk-up`, `walk-down`, `walk-side`, `idle-down`, `idle-up`, `idle-side`
- Loaded from `spritesheet.png` (39x31 grid)

### 4. **Dialogue System** (`utils.js`)

**Function:** `displayDialogue(text, onDisplayEnd)`
- Shows textbox with typewriter effect
- Player presses Enter or clicks "Close" button
- Can pause player movement during dialogue
- Supports HTML content (links, formatting)

### 5. **Inventory System**

**How Items Work:**
1. Player collides with item boundary (e.g., "Paneer_1")
2. Dialogue shows item information (from `constants.js`)
3. Buttons appear: "Add item [1]" and "Remove item [2]"
4. Player can add/remove items using buttons or keyboard
5. Inventory updates in real-time (top-right corner)
6. Items persist across scenes via localStorage

**Item Validation:**
- Each level has a `correctInventory` array (in `constants.js`)
- When player reaches "mom" or "finish" boundary:
  - Compares player inventory with correct inventory
  - If match → Level up!
  - If no match → Try again

### 6. **Level Progression**

**Level Flow:**
```
Level 1: Workshop (tutorial) → Home → Grocery Store → Home → Check inventory
Level 2: Workshop → Home → Pharmacy → Home → Check inventory
Level 3: Workshop → Home → Electronics Store → Home → Check inventory
Level 4: Workshop → Home → Hardware Store → Home → Check inventory
Level 5: Workshop → Home → Library → Home → End
```

**Level Completion:**
1. Player collects correct items
2. Returns to home
3. Talks to "mom" boundary
4. System checks inventory against `correctInventory[level]`
5. If correct:
   - Level increments
   - Inventory clears
   - Fade effect shows "DAY X"
   - Returns to workshop for next level

### 7. **Scene Transitions**

**Exit Boundaries:**
- Each scene has "exit" boundaries
- On collision:
  - Save current scene to state
  - Use `k.go("sceneName")` to change scene
  - Player spawns at designated spawnpoint

**Fade Effects:**
- Used for level transitions
- Creates HTML div with fade-in/fade-out animations
- Shows "DAY X" or "Going Back Home" message

### 8. **Map System**

**Tiled Map Editor:**
- Maps created in Tiled (`.json` files)
- Layers:
  - **boundaries**: Collision zones, exits, interactables
  - **spawnpoints**: Player spawn locations
- Each boundary object has a `name` property:
  - `"exit"` → Scene transition
  - `"mom"` → Level completion check
  - `"Paneer_1"` → Item interaction
  - `"finish"` → Level completion (some scenes)

---

## 🔑 Key Files Explained

### `src/gameFIles/main.js` ⭐ **GAME ENTRY POINT**
- Loads all sprites
- Creates all scenes
- Sets up event listeners (inventory buttons, keyboard shortcuts)
- Loads saved state
- Starts the game with `k.go(inventoryState.currentScene)`

### `src/gameFIles/constants.js`
- **dialogueData**: Workshop dialogues, level instructions
- **groceryDialogueData**: Item descriptions for grocery items
- **estoreDialogueData**: Electronics store item info
- **manufacturingDialogueData**: Hardware store item info
- **pharmacyDialogue**: Pharmacy dialogues
- **libraryDialogue**: Library book links
- **tasks**: Task lists for each level
- **correctInventory**: Required items for each level

### `src/gameFIles/inventory.js`
- Manages game state persistence
- Handles inventory operations
- Updates UI display
- State expiration (1 hour timeout)

### `src/gameFIles/utils.js`
- `displayDialogue()`: Shows dialogue box
- `setCamScale()`: Adjusts camera for different screen sizes
- `areArraysEqual()`: Compares inventories for level completion

### `game.html`
- Standalone HTML page for the game
- Contains all UI elements:
  - Inventory display (top-right)
  - Dialogue box (bottom)
  - Task list (press T)
  - Map (press M)
  - Music toggle button
- Links to `src/gameFIles/main.js`

---

## 🎨 Game Features

### 1. **Multi-Level Educational Game**
- 5 levels teaching BIS (Bureau of Indian Standards) concepts
- Each level focuses on different product categories:
  - Level 1: Food products (paneer, biscuits, vegetables)
  - Level 2: Medicines
  - Level 3: Electronics (TV, lamp, speaker, fridge)
  - Level 4: Hardware (nails, paint, screwdriver, wood)
  - Level 5: Library exploration

### 2. **Interactive Learning**
- Scanner mechanic: Players "scan" items to learn about BIS standards
- Real-world links: Library scene links to actual BIS resources
- Educational dialogues explain standards, safety, quality

### 3. **Persistent State**
- Game saves progress automatically
- Returns to last scene on reload
- State expires after 1 hour (prevents stale saves)

### 4. **Responsive Design**
- Works on desktop (keyboard) and mobile (touch)
- Adaptive UI for different screen sizes
- Camera scaling for various resolutions

### 5. **Audio**
- Background music (`bg.mp3`)
- Toggle button (bottom-left)
- Music state persists

---

## 🔄 Game Loop

```
1. Scene loads
   ↓
2. Player spawns at spawnpoint
   ↓
3. Player moves (keyboard/touch)
   ↓
4. Player collides with boundaries:
   - Items → Show dialogue, allow add/remove
   - Exits → Change scene
   - NPCs → Show dialogue
   ↓
5. Player collects items → Inventory updates
   ↓
6. Player completes level → Check inventory
   ↓
7. If correct → Level up, fade effect, next level
   ↓
8. Repeat from step 1
```

---

## 📝 Important Notes

1. **Two Separate Apps:**
   - React app (`index.html`) for landing/login/quiz
   - Game app (`game.html`) for the actual game
   - Both built by Vite (configured in `vite.config.js`)

2. **No React in Game:**
   - Game uses vanilla JavaScript + Kaboom.js
   - UI elements are direct DOM manipulation
   - React is only for the landing/login pages

3. **Asset Loading:**
   - All assets in `public/` folder
   - Maps loaded via `fetch()` from JSON files
   - Sprites loaded via `k.loadSprite()`

4. **State Persistence:**
   - Uses localStorage (browser storage)
   - State expires after 1 hour
   - Saves: level, scene, inventory, firstTime flag

5. **Scene Creation:**
   - All scenes created upfront in `main.js`
   - Scenes registered but not active until `k.go()` is called
   - Each scene is independent with its own map, player, boundaries

---

## 🎯 Summary

**BISWISE** is an educational 2D game built with Kaboom.js that teaches players about BIS (Bureau of Indian Standards) through interactive gameplay. Players navigate various locations, scan products, learn about standards, collect correct items, and progress through 5 levels. The game features persistent state, responsive controls, and educational content integrated into the gameplay.

**Entry Point:** `game.html` → loads → `src/gameFIles/main.js`

**Game Engine:** Kaboom.js (initialized in `kaboomCtx.js`)

**State Management:** localStorage (managed in `inventory.js`)

**Scenes:** 20 different locations (all in `src/gameFIles/scenes/`)

**Assets:** Maps, sprites, audio in `public/` folder

