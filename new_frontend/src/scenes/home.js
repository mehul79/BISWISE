import { k } from "../kaboomCtx";
import { displayDialogue, setCamScale } from "../utils";
import { dialogueData, scaleFactor } from "../constants";
import {inventoryState,saveState} from "../inventory";

const addButton = document.getElementById("add");
const removeButton = document.getElementById("remove");

export function createHomeScene() {
    k.scene("home", async () => {
    addButton.style.display = "none";
    removeButton.style.display = "none";
    const mapData = await (await fetch("./map.json")).json();
    const layers = mapData.layers;

    const map = k.add([k.sprite("map"), k.pos(0), k.scale(scaleFactor)]);

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

            if (boundary.name && boundary.name !== "exit") {
            player.onCollide(boundary.name, () => {
                player.isInDialogue = true;
                displayDialogue(
                dialogueData[boundary.name],
                () => (player.isInDialogue = false)
                );
            });
            }

            if(boundary.name === "exit"){
            player.onCollide("exit",()=>{
                addButton.style.display = "block";
                removeButton.style.display = "block";
                inventoryState.currentScene = "outside";
                saveState();
                console.log("Leaving Home Scene...");
                k.go("colony", { previousScene: "home" });            
            })
            }
        }

        continue;
        }

        if (layer.name === "spawnpoints") {
        for (const entity of layer.objects) {
            if (entity.name === "player") {
            player.pos = k.vec2(
                (map.pos.x + entity.x) * scaleFactor,
                (map.pos.y + entity.y) * scaleFactor
            );
            k.add(player);
            continue;
            }
        }
        }

        // if(layer.name === "exit"){
        //   player.onCollide("exit",()=>{
        //     console.log("Scene 1 leaving..");
        //     k.go("main2");

        //   })
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