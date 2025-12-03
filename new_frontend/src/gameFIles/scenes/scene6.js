import { k } from "../kaboomCtx";
import { setCamScale } from "../utils";
import { scaleFactor, scaleFactor2 } from "../constants";
import {inventoryState,saveState} from "../inventory";
let activeKey = null; // Tracks the currently active movement key

export function createScene6(){
    k.scene("scene6", async (data) => {
        const previousScene = data?.previousScene || "scene5";  // Default to home if undefined

        const mapData = await (await fetch("./scene6.json")).json();
        const layers = mapData.layers;
      
        const map = k.add([k.sprite("mapFourteen"), k.pos(0), k.scale(scaleFactor)]);
      
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
          if(boundary.name === "scene6_exit"){
                player.onCollide("scene6_exit",()=>{
                  activeKey = null;
                  inventoryState.currentScene = "scene5";
                  saveState();
                  console.log("Scene 6 leaving..");
                  k.go("scene5", { previousScene: "scene6" });
                })
            }
            if(boundary.name === "hardware_entry"){
            player.onCollide("hardware_entry",()=>{
              activeKey = null;
                inventoryState.currentScene = "manufacturing";
                saveState();
                console.log("Scene 6 leaving..");
                location.reload();
                k.go("manufacturing", { previousScene: "scene6" });
            })
            }
            if(boundary.name === "e_store_entry"){
              player.onCollide("e_store_entry",()=>{
                activeKey = null;
                  inventoryState.currentScene = "estore";
                  saveState();
                  console.log("Scene 6 leaving..");
                  location.reload();
                  k.go("estore", { previousScene: "scene6" });
              })
            }
          }
           continue;
          }

            if (layer.name === "spawnpoints") {
                for (const entity of layer.objects) {
                    if (entity.name === "Scene6_Entry" && previousScene === "scene5"){
                      activeKey = null;
                        player.pos = k.vec2(
                            (map.pos.x + entity.x) * scaleFactor,
                            (map.pos.y + entity.y) * scaleFactor
                        );
                        k.add(player);
                    } else if (entity.name === "manufactoring_entry" && previousScene === "manufactoring"){
                      activeKey = null;
                        player.pos = k.vec2(
                            (map.pos.x + entity.x) * scaleFactor,
                            (map.pos.y + entity.y) * scaleFactor
                        );
                        k.add(player);
                    }else if (entity.name === "e_store_spawn" && previousScene === "estore"){
                      activeKey = null;
                      player.pos = k.vec2(
                          (map.pos.x + entity.x) * scaleFactor,
                          (map.pos.y + entity.y) * scaleFactor
                      );
                      k.add(player);
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