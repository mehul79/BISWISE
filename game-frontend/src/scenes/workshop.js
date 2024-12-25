import { k } from "../kaboomCtx";
import { displayDialogue, setCamScale } from "../utils";
import { dialogueData, scaleFactor } from "../constants";
import {inventoryState,saveState,inventory} from "../inventory";

const addButton = document.getElementById("add");
const removeButton = document.getElementById("remove");


export function createWorkshopScene(){


    k.scene("workshop", async () => {
      addButton.style.display = "none";
      removeButton.style.display = "none";
        const mapData = await (await fetch("./workshop.json")).json();
        const layers = mapData.layers;
      
        const map = k.add([k.sprite("mapFour"), k.pos(0), k.scale(scaleFactor)]);
      
        const player = k.make([
          k.sprite("spritesheet", { anim: "idle-down" }),
          k.area({
            shape: new k.Rect(k.vec2(0, 3), 10, 10),
          }),
          k.body(),
          k.anchor("center"),
          k.pos(),
          k.scale(scaleFactor),
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

            if (boundary.name && boundary.name !== "exit" && boundary.name !== "boundary") {
                player.onCollide(boundary.name, () => {
                    player.isInDialogue = true;
                    console.log(inventoryState);
                    displayDialogue(
                    dialogueData[inventoryState.level],
                    () => (player.isInDialogue = false)
                    );
                });
            }
            
            if(boundary.name === "exit"){
                player.onCollide("exit",()=>{
                  addButton.style.display = "block";
                  removeButton.style.display = "block";
                    console.log("Leaving workshop Scene...");
                    if(inventoryState.firstTime){
                      inventoryState.firstTime=false;
                      // inventoryState.currentScene = "home";
                      inventoryState.currentScene = `home${inventoryState.level}`;
                      saveState();
                      // saveState(); // Save the new level and state
                      // const fadeDiv =document.getElementsByClassName("fade-out");
                      // fadeDiv.innerHTML = `<div class="day-display">Going Back Home</div>`;
                      // fadeDiv.classList.add("fade-in");

                      // setTimeout(() => {
                      //   k.go("home", { previousScene: "outside" });
                      //   fadeDiv.classList.remove("fade-in");
                      //   fadeDiv.classList.add("fade-out");
              
                      //   // After fade-out, remove the element and go to the next scene
                      //   fadeDiv.addEventListener("animationend", () => {
                      //     fadeDiv.remove();
                      //     k.paused = false;
                      //   });
                      // }, 2000);
                      // Create a fade effect using an HTML element
                      const fadeDiv = document.createElement("div");
                      fadeDiv.id = "fade-effect";
                      // const fadeDiv = document.getElementById("fade-effect");
                      fadeDiv.innerHTML = `<div class="day-display">Going Back Home</div>`;
                      document.body.appendChild(fadeDiv);
              
                      // Add fade-in class
                      fadeDiv.classList.add("fade-in");
              
                      // After fade-in, wait, then start fade-out
                      setTimeout(() => {
                        k.go(`home${inventoryState.level}`, { previousScene: "outside" });
                        fadeDiv.classList.remove("fade-in");
                        fadeDiv.classList.add("fade-out");
            
                        // After fade-out, remove the element and go to the next scene
                        fadeDiv.addEventListener("animationend", () => {
                        fadeDiv.remove();
                        k.paused = false;
                        });
                      }, 2000);
                      // k.go(`home${inventoryState.level}`, { previousScene: "outside" });

                    }else{
                      inventoryState.currentScene = "scene3";
                      saveState();
                      console.log("leaving workshop scene");
                      k.go("scene3", { previousScene: "workshop" });
                    }
                })
            }

          }
           continue;
          }
      
          if (layer.name === "spawnpoint") {
            console.log("layer mil gyi")
            for (const entity of layer.objects) {
              if (entity.name === "spawnpoint") {
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
          saveState(); // Save the player's position

        });
      
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
      
        k.onKeyRelease(() => {
          stopAnims();
        });
        k.onKeyDown((key) => {
          const keyMap = [
            k.isKeyDown("right"),
            k.isKeyDown("left"),
            k.isKeyDown("up"),
            k.isKeyDown("down"),
          ];
      
          let nbOfKeyPressed = 0;
          for (const key of keyMap) {
            if (key) {
              nbOfKeyPressed++;
            }
          }
      
          if (nbOfKeyPressed > 1) return;
      
          if (player.isInDialogue) return;
          if (keyMap[0]) {
            player.flipX = false;
            if (player.curAnim() !== "walk-side") player.play("walk-side");
            player.direction = "right";
            player.move(player.speed, 0);
            return;
          }
      
          if (keyMap[1]) {
            player.flipX = true;
            if (player.curAnim() !== "walk-side") player.play("walk-side");
            player.direction = "left";
            player.move(-player.speed, 0);
            return;
          }
      
          if (keyMap[2]) {
            if (player.curAnim() !== "walk-up") player.play("walk-up");
            player.direction = "up";
            player.move(0, -player.speed);
            return;
          }
      
          if (keyMap[3]) {
            if (player.curAnim() !== "walk-down") player.play("walk-down");
            player.direction = "down";
            player.move(0, player.speed);
          }
        });
      });
      
}