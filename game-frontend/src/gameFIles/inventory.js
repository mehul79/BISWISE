// export var inventory = [];
// export const inventoryState = {
//     level: JSON.parse(localStorage.getItem("level")) || 1,
//     firstTime: JSON.parse(localStorage.getItem("firstTime")) ?? true,
//     currentScene: localStorage.getItem("currentScene") || "grocery",
//   };
  

//   export function saveState() {
//     localStorage.setItem("level", JSON.stringify(inventoryState.level));
//     localStorage.setItem("firstTime", JSON.stringify(inventoryState.firstTime));
//     localStorage.setItem("currentScene", inventoryState.currentScene);
//   }


// export function logInventory(){
//     console.log(inventory);
// }

// export function clearInventory(){
//     inventory.length = 0; // Clears the array without changing its reference
// }


// export function addItem(itemName) {
//     console.log("Add item called. Inventory: " + inventory);
//     if (!inventory.includes(itemName)) {
//         inventory.push(itemName);
//         updateInventoryUI();  // Update the inventory UI
//         console.log(`${itemName} added to inventory.`);
//     } else {
//         console.log(`${itemName} is already in the inventory.`);
//     }
// }


// export function updateInventoryUI() {
//     const inventoryUI = document.getElementById("inventory");
    
//     // Clear current inventory UI
//     inventoryUI.innerHTML = "";

//     if (inventory.length === 0) {
//         inventoryUI.innerHTML = "<p>Inventory: <span class='empty'>Empty</span></p>";
//     } else {
//         // Add a header
//         const header = document.createElement("h3");
//         header.textContent = "Your Inventory:";
//         inventoryUI.appendChild(header);

//         // Create an unordered list to display inventory items
//         const ul = document.createElement("ul");
//         ul.classList.add("inventory-list");

//         inventory.forEach(item => {
//             const li = document.createElement("li");
//             li.classList.add("inventory-item");
//             li.textContent = item;

//             // Create a remove button for each item
//             const removeButton = document.createElement("button");
//             removeButton.textContent = "✖";
//             removeButton.classList.add("remove-button");
//             removeButton.addEventListener("click", () => removeItem(item));

//             // Append the button to the list item
//             li.appendChild(removeButton);
//             ul.appendChild(li);
//         });

//         inventoryUI.appendChild(ul);
//     }
// }


// export function removeItem(itemName) {
//     console.log("Remove item called. Inventory: " + inventory);
//     const index = inventory.indexOf(itemName);
//     if (index !== -1) {
//         inventory.splice(index, 1); // Remove the specific item
//         updateInventoryUI();  // Update the UI to reflect the removal
//         console.log(`${itemName} removed from inventory.`);
//     } else {
//         console.log(`${itemName} is not in the inventory.`);
//     }
// }


// // Initialize inventory from localStorage or as an empty array
// export var inventory = JSON.parse(localStorage.getItem("inventory")) || [];

// export const inventoryState = {
//     level: JSON.parse(localStorage.getItem("level")) || 1,
//     firstTime: JSON.parse(localStorage.getItem("firstTime")) ?? true,
//     currentScene: localStorage.getItem("currentScene") || "grocery",
// };

// // Save the state, including inventory, to localStorage
// export function saveState() {
//     localStorage.setItem("level", JSON.stringify(inventoryState.level));
//     localStorage.setItem("firstTime", JSON.stringify(inventoryState.firstTime));
//     localStorage.setItem("currentScene", inventoryState.currentScene);
//     localStorage.setItem("inventory", JSON.stringify(inventory)); // Save inventory
// }

// // Log the inventory
// export function logInventory() {
//     console.log(inventory);
// }

// // Clear the inventory and save the updated state
// export function clearInventory() {
//     inventory.length = 0; // Clears the array without changing its reference
//     saveState(); // Save the cleared inventory to localStorage
//     updateInventoryUI();
// }

// // Add an item to the inventory and save the updated state
// export function addItem(itemName) {
//     console.log("Add item called. Inventory: " + inventory);
//     if (!inventory.includes(itemName)) {
//         inventory.push(itemName);
//         saveState(); // Save the updated inventory to localStorage
//         updateInventoryUI(); // Update the inventory UI
//         console.log(`${itemName} added to inventory.`);
//     } else {
//         console.log(`${itemName} is already in the inventory.`);
//     }
// }

// export function updateInventoryUI() {
//     const inventoryUI = document.getElementById("inventory");
    
//     // Clear current inventory UI
//     inventoryUI.innerHTML = "";

//     if (inventory.length === 0) {
//         inventoryUI.innerHTML = "<p>Inventory: <span class='empty'>Empty</span></p>";
//     } else {
//         // Add a header
//         const header = document.createElement("h3");
//         header.textContent = "Your Inventory:";
//         inventoryUI.appendChild(header);

//         // Create an unordered list to display inventory items
//         const ul = document.createElement("ul");
//         ul.classList.add("inventory-list");

//         inventory.forEach(item => {
//             const li = document.createElement("li");
//             li.classList.add("inventory-item");
//             li.textContent = item;

//             // Create a remove button for each item
//             const removeButton = document.createElement("button");
//             removeButton.textContent = "✖";
//             removeButton.classList.add("remove-button");
//             removeButton.addEventListener("click", () => removeItem(item));

//             // Append the button to the list item
//             li.appendChild(removeButton);
//             ul.appendChild(li);
//         });

//         inventoryUI.appendChild(ul);
//     }
// }

// // Remove an item from the inventory and save the updated state
// export function removeItem(itemName) {
//     console.log("Remove item called. Inventory: " + inventory);
//     const index = inventory.indexOf(itemName);
//     if (index !== -1) {
//         inventory.splice(index, 1); // Remove the specific item
//         saveState(); // Save the updated inventory to localStorage
//         updateInventoryUI(); // Update the UI to reflect the removal
//         console.log(`${itemName} removed from inventory.`);
//     } else {
//         console.log(`${itemName} is not in the inventory.`);
//     }
// }

/// abhi tak ka best prompt --------------------------------------------------------------------------------------------------------------------

// // Initialize inventory from localStorage or as an empty array
// export var inventory = JSON.parse(localStorage.getItem("inventory")) || [];

// export const inventoryState = {
//     level: JSON.parse(localStorage.getItem("level")) || 1,
//     firstTime: JSON.parse(localStorage.getItem("firstTime")) ?? true,
//     currentScene: localStorage.getItem("currentScene") || "grocery",
// };

// // Save the state, including inventory, to localStorage
// export function saveState() {
//     localStorage.setItem("level", JSON.stringify(inventoryState.level));
//     localStorage.setItem("firstTime", JSON.stringify(inventoryState.firstTime));
//     localStorage.setItem("currentScene", inventoryState.currentScene);
//     localStorage.setItem("inventory", JSON.stringify(inventory)); // Save inventory
// }

// // Log the inventory
// export function logInventory() {
//     console.log(inventory);
// }

// // Clear the inventory and save the updated state
// export function clearInventory() {
//     inventory.length = 0; // Clears the array without changing its reference
//     saveState(); // Save the cleared inventory to localStorage
//     updateInventoryUI();
// }

// // Add an item to the inventory and save the updated state
// export function addItem(itemName) {
//     console.log("Add item called. Inventory: " + inventory);
//     if (!inventory.includes(itemName)) {
//         inventory.push(itemName);
//         saveState(); // Save the updated inventory to localStorage
//         updateInventoryUI(); // Update the inventory UI
//         console.log(`${itemName} added to inventory.`);
//     } else {
//         console.log(`${itemName} is already in the inventory.`);
//     }
// }

// // Remove an item from the inventory and save the updated state
// export function removeItem(itemName) {
//     console.log("Remove item called. Inventory: " + inventory);
//     const index = inventory.indexOf(itemName);
//     if (index !== -1) {
//         inventory.splice(index, 1); // Remove the specific item
//         saveState(); // Save the updated inventory to localStorage
//         updateInventoryUI(); // Update the UI to reflect the removal
//         console.log(`${itemName} removed from inventory.`);
//     } else {
//         console.log(`${itemName} is not in the inventory.`);
//     }
// }

// // Update the inventory UI
// export function updateInventoryUI() {
//     const inventoryUI = document.getElementById("inventory");

//     // Clear current inventory UI
//     inventoryUI.innerHTML = "";

//     if (inventory.length === 0) {
//         inventoryUI.innerHTML = "<p>Inventory: <span class='empty'>Empty</span></p>";
//     } else {
//         // Add a header
//         const header = document.createElement("h3");
//         header.textContent = "Your Inventory:";
//         inventoryUI.appendChild(header);

//         // Create an unordered list to display inventory items
//         const ul = document.createElement("ul");
//         ul.classList.add("inventory-list");

//         inventory.forEach(item => {
//             const li = document.createElement("li");
//             li.classList.add("inventory-item");
//             li.textContent = item;

//             // Create a remove button for each item
//             const removeButton = document.createElement("button");
//             removeButton.textContent = "✖";
//             removeButton.classList.add("remove-button");
//             removeButton.addEventListener("click", () => removeItem(item));

//             // Append the button to the list item
//             li.appendChild(removeButton);
//             ul.appendChild(li);
//         });

//         inventoryUI.appendChild(ul);
//     }
// }

// // Call this function during the initial setup to ensure the UI reflects the correct state
// export function initializeInventoryUI() {
//     updateInventoryUI(); // Reflect the current inventory in the UI
// }

// // Initialize the inventory UI on page load
// document.addEventListener("DOMContentLoaded", initializeInventoryUI);


// Default values
const DEFAULT_STATE = {
    level: 1,
    firstTime: true,
    currentScene: "workshop",
    inventory: [],
};

// Time limit in milliseconds (1 minute = 60,000 ms)
const TIME_LIMIT = 60000; // Adjust to 3600000 for 1 hour

// Initialize inventory and state from localStorage or defaults
export var inventory = [];
export const inventoryState = { ...DEFAULT_STATE };

// Function to check if saved state is expired
function isStateExpired() {
    const lastSaveTime = JSON.parse(localStorage.getItem("lastSaveTime"));
    if (!lastSaveTime) return true; // No save time means state is expired
    const currentTime = Date.now();
    return currentTime - lastSaveTime > TIME_LIMIT;
}

// Function to reset state to defaults
function resetStateToDefaults() {
    inventory = [...DEFAULT_STATE.inventory];
    Object.assign(inventoryState, DEFAULT_STATE);
    saveState();
    updateInventoryUI();
}

// Load state from localStorage or reset if expired
function loadState() {
    if (isStateExpired()) {
        console.log("State expired. Resetting to defaults.");
        resetStateToDefaults();
    } else {
        console.log("Loading saved state.");
        inventory = JSON.parse(localStorage.getItem("inventory")) || [...DEFAULT_STATE.inventory];
        inventoryState.level = JSON.parse(localStorage.getItem("level")) || DEFAULT_STATE.level;
        inventoryState.firstTime = JSON.parse(localStorage.getItem("firstTime")) ?? DEFAULT_STATE.firstTime;
        inventoryState.currentScene = localStorage.getItem("currentScene") || DEFAULT_STATE.currentScene;
    }
}

// Save the current state to localStorage
export function saveState() {
    localStorage.setItem("level", JSON.stringify(inventoryState.level));
    localStorage.setItem("firstTime", JSON.stringify(inventoryState.firstTime));
    localStorage.setItem("currentScene", inventoryState.currentScene);
    localStorage.setItem("inventory", JSON.stringify(inventory));
    localStorage.setItem("lastSaveTime", JSON.stringify(Date.now())); // Save current timestamp
}

// Log the inventory
export function logInventory() {
    console.log(inventory);
}

// Clear the inventory and save the updated state
export function clearInventory() {
    inventory.length = 0;
    saveState();
    updateInventoryUI();
}

// Add an item to the inventory and save the updated state
export function addItem(itemName) {
    if (!inventory.includes(itemName)) {
        inventory.push(itemName);
        saveState();
        updateInventoryUI();
        console.log(`${itemName} added to inventory.`);
    } else {
        console.log(`${itemName} is already in the inventory.`);
    }
}

// Remove an item from the inventory and save the updated state
export function removeItem(itemName) {
    const index = inventory.indexOf(itemName);
    if (index !== -1) {
        inventory.splice(index, 1);
        saveState();
        updateInventoryUI();
        console.log(`${itemName} removed from inventory.`);
    } else {
        console.log(`${itemName} is not in the inventory.`);
    }
}

// Update the inventory UI
export function updateInventoryUI() {
    const inventoryUI = document.getElementById("inventory");
    inventoryUI.innerHTML = "";

    if (inventory.length === 0) {
        inventoryUI.innerHTML = "<p>Inventory: <span class='empty'>Empty</span></p>";
    } else {
        const header = document.createElement("h3");
        header.textContent = "Your Inventory:";
        inventoryUI.appendChild(header);

        const ul = document.createElement("ul");
        ul.classList.add("inventory-list");

        inventory.forEach(item => {
            const li = document.createElement("li");
            li.classList.add("inventory-item");
            li.textContent = item;

            const removeButton = document.createElement("button");
            removeButton.textContent = "✖";
            removeButton.classList.add("remove-button");
            removeButton.addEventListener("click", () => removeItem(item));

            li.appendChild(removeButton);
            ul.appendChild(li);
        });

        inventoryUI.appendChild(ul);
    }
}

// Initialize the game
document.addEventListener("DOMContentLoaded", () => {
    loadState();
    updateInventoryUI();
});
