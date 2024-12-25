import { k } from "../kaboomCtx";
import { displayDialogue, setCamScale } from "../utils";
import {  scaleFactor,groceryDialogueData, } from "../constants";
import { inventoryState,saveState } from "../inventory";

export function createScene5(){
    k.scene("scene5", async (data) => {
        const previousScene = data?.previousScene || "scene3";  // Default to home if undefined

        const mapData = await (await fetch("./supermarketExterior.json")).json();
        const layers = mapData.layers;
      
        const map = k.add([k.sprite("mapTwelve"), k.pos(0), k.scale(scaleFactor)]);
      
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

            if (boundary.name && (boundary.name==="stall_1" || boundary.name=="stall_2") ) {
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
      
              // if (boundary.name!="exit") {
              //   player.onCollide(boundary.name, () => {
              //     player.isInDialogue = true;
              //     displayDialogue(
              //       dialogueData[boundary.name],
              //       () => (player.isInDialogue = false)
              //     );
              //   });
              // }
          if(boundary.name === "market entry"){
                player.onCollide("market entry",()=>{
                  inventoryState.currentScene = "grocery";
                  saveState();
                  console.log("Scene 5 leaving..");
                  k.go("grocery", { previousScene: "scene5" });
                })
            }
            if(boundary.name === "marketAreaExit"){
            player.onCollide("marketAreaExit",()=>{
                inventoryState.currentScene = "scene3";
                saveState();
                console.log("Scene 5 leaving..");
                k.go("scene3", { previousScene: "scene5" });
            })
            }
            if(boundary.name === "scene_6_exit"){
              player.onCollide("scene_6_exit",()=>{
                  inventoryState.currentScene = "scene6";
                  saveState();
                  console.log("Scene 5 leaving..");
                  k.go("scene6", { previousScene: "scene5" });
              })
              }
          }
           continue;
          }

          
          
      
        //   if (layer.name === "spawnpoint5") {
        //     for (const entity of layer.objects) {
        //       if (entity.name === "spawn-home") {
        //         player.pos = k.vec2(
        //           (map.pos.x + entity.x) * scaleFactor,
        //           (map.pos.y + entity.y) * scaleFactor
        //         );
        //         k.add(player);
        //         continue;
        //       }
        //     }
        //   }

        // for (const layer of layers) {
            if (layer.name === "spawnpoints") {
                for (const entity of layer.objects) {
                    if (entity.name === "marketAreaSpawn" && previousScene === "scene3"){
                        player.pos = k.vec2(
                            (map.pos.x + entity.x) * scaleFactor,
                            (map.pos.y + entity.y) * scaleFactor
                        );
                        k.add(player);
                    } else if (entity.name === "marketSpawn" && previousScene === "grocery"){
                        player.pos = k.vec2(
                            (map.pos.x + entity.x) * scaleFactor,
                            (map.pos.y + entity.y) * scaleFactor
                        );
                        k.add(player);
                    }else if (entity.name === "scene_6_spawn" && previousScene === "scene6"){
                      player.pos = k.vec2(
                          (map.pos.x + entity.x) * scaleFactor,
                          (map.pos.y + entity.y) * scaleFactor
                      );
                      k.add(player);
                  }
                }
            }
        // }
          
      
      
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