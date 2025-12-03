import { k } from "../kaboomCtx";
import { setCamScale } from "../utils";
import { scaleFactor, scaleFactor2 } from "../constants";
import {inventoryState,saveState} from "../inventory";
let activeKey = null; // Tracks the currently active movement key

export function createColonyScene(){
    k.scene("colony", async (data) => {
      
        const previousScene = data?.previousScene || "home";  // Default to home if undefined

        const mapData = await (await fetch("./colony2.json")).json();
        const layers = mapData.layers;
      
        const map = k.add([k.sprite("mapSix"), k.pos(0), k.scale(scaleFactor)]);
      
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
      
              // if (boundary.name!="exit") {
              //   player.onCollide(boundary.name, () => {
              //     player.isInDialogue = true;
              //     displayDialogue(
              //       dialogueData[boundary.name],
              //       () => (player.isInDialogue = false)
              //     );
              //   });
              // }
          if(boundary.name === "house_entry"){
                player.onCollide("house_entry",()=>{

                  console.log("Colony leaving..");
                  if(inventoryState.level === 1){
                    activeKey = null;
                    inventoryState.currentScene = "home1";
                    saveState();
                    location.reload();
                    k.go("home1");
                  }else if(inventoryState.level === 2){
                    activeKey = null;
                    inventoryState.currentScene = "home2";
                    saveState();
                    location.reload();
                    k.go("home2");
                  }else if(inventoryState.level === 3){
                    activeKey = null;
                    inventoryState.currentScene = "home3";
                    saveState();
                    location.reload();
                    k.go("home3");
                  }else if(inventoryState.level === 4){
                    activeKey = null;
                    inventoryState.currentScene = "home4";
                    saveState();
                    location.reload();
                    k.go("home4");
                  }else if(inventoryState.level === 5){
                    activeKey = null;
                    inventoryState.currentScene = "home5";
                    saveState();
                    location.reload();
                    k.go("home5");
                  }
                  // k.go("home1");
                })
              }
            if(boundary.name === "colony_exit"){
            player.onCollide("colony_exit",()=>{
              activeKey = null;
                inventoryState.currentScene = "scene2";
                saveState();
                console.log("Colony leaving..");
                k.go("scene2", { previousScene: "colony" });
              })
            }
          }

           continue;
          }

        // for (const layer of layers) {
            if (layer.name === "spawnpoints") {
                for (const entity of layer.objects) {
                    if (entity.name === "house_entry" && previousScene === "home") {
                      activeKey = null;
                        player.pos = k.vec2(
                            (map.pos.x + entity.x) * scaleFactor,
                            (map.pos.y + entity.y) * scaleFactor
                        );
                        k.add(player);
                    } else if (entity.name === "colony_spawn" && previousScene === "scene2") {
                      activeKey = null;
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