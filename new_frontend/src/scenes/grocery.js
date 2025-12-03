import { k } from "../kaboomCtx";
import { displayDialogue, setCamScale,areArraysEqual } from "../utils";
import {  scaleFactor,groceryDialogueData,correctInventory, scaleFactor2 } from "../constants";
import { clearInventory,inventoryState,saveState,inventory } from "../inventory";
let activeKey = null; // Tracks the currently active movement key

export function createGroceryScene(){
    k.scene("grocery", async () => {
        const mapData = await (await fetch("./grocery-final.json")).json();
        const layers = mapData.layers;
      
        const map = k.add([k.sprite("mapThree"), k.pos(0), k.scale(scaleFactor)]);
      
        const player = k.make([
          k.sprite("spritesheet", { anim: "idle-down" }),
          k.area({
            shape: new k.Rect(k.vec2(0, 3), 10, 10),
          }),
          k.body(),
          k.anchor("center"),
          k.pos(),
          k.scale(scaleFactor2),
          {
            speed: 250,
            direction: "down",
            isInDialogue: false,
          },
          "player",
        ]);
      
        for (const layer of layers) {
          if (layer.name === "boundaries") {
            for (const boundary of layer.objects) {
              map.add([
                k.area({
                  shape: new k.Rect(k.vec2(0), boundary.width, boundary.height),
                }),
                k.body({ isStatic: true }),
                k.pos(boundary.x, boundary.y),
                boundary.name,
            ]);

            if (boundary.name && boundary.name !== "exit" && boundary.name !== "boundary" && boundary.name !=="finish") {
                player.onCollide(boundary.name, () => {
                    player.isInDialogue = true;
            
                    const addItemBtn = document.getElementById("add");
                    const removeItemBtn = document.getElementById("remove");
            
                    // Remove all existing classes from the buttons
                    addItemBtn.className = "";
                    removeItemBtn.className = "";
            
                    // Set the class name as the boundary name
                    addItemBtn.classList.add(boundary.name);
                    removeItemBtn.classList.add(boundary.name);
            
                    // Check if the boundary is part of groceryDialogueData
                    if (groceryDialogueData[boundary.name]) {
                        displayDialogue(
                            groceryDialogueData[boundary.name],
                            () => { player.isInDialogue = false; },  // onDisplayEnd callback
                        );
                    } else {
                        displayDialogue(
                            groceryDialogueData[boundary.name],
                            () => { player.isInDialogue = false; }
                        );
                    }
                });
            }
            
            if(boundary.name === "exit"){
                player.onCollide("exit",()=>{
                  activeKey = null;
                    inventoryState.currentScene = "scene5";
                    saveState();
                    console.log("Leaving Grocery Scene...");
                    k.go("scene5", { previousScene: "grocery" });
                })
            }


            if (boundary.name === "finish") {
              player.onCollide("finish", () => {
                // Pause the game
                k.paused = true;
            
                const inventoryTop = document.getElementById("inventory");
            
                // Display inventory comparison UI
                const inventoryUI = document.getElementById("inventory-ui");
                const playerInventoryEl = document.getElementById("player-inventory");
                const correctInventoryEl = document.getElementById("correct-inventory");
                const nextLevelBtn = document.getElementById("next-level");
            
                // Populate UI with inventories
                playerInventoryEl.innerText = `Your Inventory: ${JSON.stringify(inventory)}`;
                correctInventoryEl.innerText = `Required Inventory: ${JSON.stringify(correctInventory[inventoryState.level])}`;
            
                // Update button text based on inventory comparison
                if (areArraysEqual(inventory, correctInventory[inventoryState.level])) {
                  nextLevelBtn.textContent = "Move to Next Level";
                } else {
                  nextLevelBtn.textContent = "Try Again";
                }
            
                // Show the UI
                inventoryUI.style.display = "block";
            
                nextLevelBtn.onclick = () => {
                  if (areArraysEqual(inventory, correctInventory[inventoryState.level])) {
                    // Clear inventory and update state
                    clearInventory();
                    inventoryTop.textContent = "Inventory: Empty";
                    inventoryState.level++;
                    inventoryState.firstTime = true;
                    inventoryState.currentScene = "workshop";
                    saveState();
            
                    // Hide UI
                    inventoryUI.style.display = "none";
            
                    // Create a fade effect using an HTML element
                    const fadeDiv = document.createElement("div");
                    fadeDiv.id = "fade-effect";
                    // const fadeDiv = document.getElementById("fade-effect");
                    fadeDiv.innerHTML = `<div class="day-display">DAY ${inventoryState.level}</div>`;
                    document.body.appendChild(fadeDiv);
            
                    // Add fade-in class
                    fadeDiv.classList.add("fade-in");
            
                    // After fade-in, wait, then start fade-out
                    setTimeout(() => {
                      k.go("workshop", { previousScene: "outside" });
                      fadeDiv.classList.remove("fade-in");
                      fadeDiv.classList.add("fade-out");
            
                      // After fade-out, remove the element and go to the next scene
                      fadeDiv.addEventListener("animationend", () => {
                        fadeDiv.remove();
                        k.paused = false;
                      });
                    }, 2000); // Wait for 2 seconds to show "Day X"
                  } else {
                    // Retry: Hide UI and let player try again
                    inventoryUI.style.display = "none";
                    k.paused = false; // Resume game
                    console.log("Retry. Inventories do not match.");
                  }
                };
              });
            }
            
            
            
          }
           continue;
          }
      
          if (layer.name === "spawnpoints") {
            for (const entity of layer.objects) {
              if (entity.name === "spawnpoint") {
                activeKey = null;
                player.pos = k.vec2(
                  (map.pos.x + entity.x) * scaleFactor,
                  (map.pos.y + entity.y) * scaleFactor
                );
                k.add(player);
                continue;
              }
            }
          }
      
      
        }
      
        setCamScale(k);
      
        k.onResize(() => {
          setCamScale(k);
        });
      
        k.onUpdate(() => {
          k.camPos(player.worldPos().x, player.worldPos().y - 100);
          // inventoryState.position = player.pos;
          // saveState(); // Save the player's position
        });
      
        if (window.innerWidth <= 1024) { // Example threshold for laptops
          k.onMouseDown((mouseBtn) => {
              if (mouseBtn !== "left" || player.isInDialogue) return;
      
              const worldMousePos = k.toWorld(k.mousePos());
              player.moveTo(worldMousePos, player.speed);
      
              const mouseAngle = player.pos.angle(worldMousePos);
      
              const lowerBound = 50;
              const upperBound = 125;
      
              if (
                  mouseAngle > lowerBound &&
                  mouseAngle < upperBound &&
                  player.curAnim() !== "walk-up"
              ) {
                  player.play("walk-up");
                  player.direction = "up";
                  return;
              }
      
              if (
                  mouseAngle < -lowerBound &&
                  mouseAngle > -upperBound &&
                  player.curAnim() !== "walk-down"
              ) {
                  player.play("walk-down");
                  player.direction = "down";
                  return;
              }
      
              if (Math.abs(mouseAngle) > upperBound) {
                  player.flipX = false;
                  if (player.curAnim() !== "walk-side") player.play("walk-side");
                  player.direction = "right";
                  return;
              }
      
              if (Math.abs(mouseAngle) < lowerBound) {
                  player.flipX = true;
                  if (player.curAnim() !== "walk-side") player.play("walk-side");
                  player.direction = "left";
                  return;
              }
          });
      }
      
        function stopAnims() {
          if (player.direction === "down") {
            player.play("idle-down");
            return;
          }
          if (player.direction === "up") {
            player.play("idle-up");
            return;
          }
      
          player.play("idle-side");
        }
      
        k.onMouseRelease(stopAnims);
      
        k.onKeyRelease((key) => {
                  if (key === activeKey) {
                    activeKey = null; // Reset active key on release
                    stopAnims(); // Stop the animation
                  }
                });
        
        
                k.onKeyDown((key) => {
                  if (activeKey && activeKey !== key) return; // Prevent multiple keys from being active
                  activeKey = key;
                
                  const keyMap = {
                    right: () => {
                      player.flipX = false;
                      if (player.curAnim() !== "walk-side") player.play("walk-side");
                      player.direction = "right";
                      player.move(player.speed, 0);
                    },
                    left: () => {
                      player.flipX = true;
                      if (player.curAnim() !== "walk-side") player.play("walk-side");
                      player.direction = "left";
                      player.move(-player.speed, 0);
                    },
                    up: () => {
                      if (player.curAnim() !== "walk-up") player.play("walk-up");
                      player.direction = "up";
                      player.move(0, -player.speed);
                    },
                    down: () => {
                      if (player.curAnim() !== "walk-down") player.play("walk-down");
                      player.direction = "down";
                      player.move(0, player.speed);
                    },
                  };
                
                  if (keyMap[key] && !player.isInDialogue) {
                    keyMap[key]();
                  }
                });
        
      });
      
}