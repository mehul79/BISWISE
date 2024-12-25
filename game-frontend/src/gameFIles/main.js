import { k } from './kaboomCtx';
import { createHomeScene } from "./scenes/home";
import { createOutsideScene } from "./scenes/outside";
import { createGroceryScene } from "./scenes/grocery";
import { createWorkshopScene } from "./scenes/workshop";
import { createEstoreScene } from "./scenes/estore";
import { addItem,removeItem,inventoryState} from "./inventory";
import { tasks } from "./constants";
import { createColonyScene } from "./scenes/colony";
import { createScene2 } from "./scenes/scene2";
import { createScene3 } from "./scenes/scene3";
import { createPharmacyScene } from "./scenes/pharmacy";
import { createParkScene } from "./scenes/park";
import { createScene4 } from "./scenes/scene4";
import { createScene5 } from "./scenes/scene5";
import { createLibraryScene } from "./scenes/library";
import { createScene6 } from "./scenes/scene6";
import { createHomeScene1 } from "./scenes/home1";
import { createHomeScene2 } from "./scenes/home2";
import { createHomeScene3 } from "./scenes/home3";
import { createHomeScene5 } from "./scenes/home5";
import { createHomeScene4 } from "./scenes/home4";
import { createManufacturingScene } from "./scenes/manufacturing";

k.loadSprite("spritesheet", "./spritesheet.png", {
  sliceX: 39,
  sliceY: 31,
  anims: {
    "idle-down": 936,
    "walk-down": { from: 936, to: 939, loop: true, speed: 8 },
    "idle-side": 975,
    "walk-side": { from: 975, to: 978, loop: true, speed: 8 },
    "idle-up": 1014,
    "walk-up": { from: 1014, to: 1017, loop: true, speed: 8 },
  },
});

k.loadSprite("map", "/map.png");
k.loadSprite("mapTwo", "/map-2.png");
k.loadSprite("mapThree", "/grocery-final.png");
k.loadSprite("mapFour", "/workshop.png");
k.loadSprite("mapFive", "/e-store.png");
k.loadSprite("mapSix", "/colony.png");
k.loadSprite("mapSeven", "/scene2.png");
k.loadSprite("mapEight", "./scene3.jpg");
k.loadSprite("mapNine", "/pharmacy.png");
k.loadSprite("mapTen", "/finalPark.png");
k.loadSprite("mapEleven", "/scene4.png");
k.loadSprite("mapTwelve", "/superMarket.png");
k.loadSprite("mapThirteen", "/library.png");
k.loadSprite("mapFourteen", "./scene6.png");
k.loadSprite("mapFifteen", "./newhousecook.png");
k.loadSprite("mapSixteen", "./newhousesleep.png");
k.loadSprite("mapSeventeen", "./newhousewashingmachine.png");
k.loadSprite("mapEighteen", "./houseidle.png");
k.loadSprite("mapNineteen", "./manufacturing1.png");


k.setBackground(k.Color.fromHex("#311047"));

createHomeScene();
createOutsideScene();
createGroceryScene();
createWorkshopScene();
createEstoreScene();
createColonyScene();
createPharmacyScene();
createParkScene();
createScene2();
createScene3();
createScene4();
createScene5();
createLibraryScene();
createScene6();
createHomeScene1();
createHomeScene2(); 
createHomeScene3();
createHomeScene5();
createHomeScene4();
createManufacturingScene();

k.go(inventoryState.currentScene);

// Attach event listeners for Add and Remove buttons
// document.getElementById("add").addEventListener("click", (event) => {
//   const itemName = event.target.className; // Get the class name of the button
//   if (itemName) {
//       addItem(itemName);
//   } else {
//       console.log("No item name found on Add button.");
//   }
// });

// document.getElementById("remove").addEventListener("click", (event) => {
//   const itemName = event.target.className; // Get the class name of the button
//   if (itemName) {
//       removeItem(itemName);
//   } else {
//       console.log("No item name found on Remove button.");
//   }
// });

// let taskBox = document.querySelector('#currentTasks');
// document.addEventListener("keydown",(event)=>{
//   if (event.key === 't') {
//   // Toggle the 'hidden' class on the target element
//     console.log("key pressed");
//     taskBox.textContent=tasks[inventoryState.level];
//     taskBox.classList.toggle('hidden');
//   } 
// })

// Add and Remove buttons
document.getElementById("add").addEventListener("click", (event) => {
  const itemName = event.target.className; // Get the class name of the button
  if (itemName) {
      addItem(itemName);
  } else {
      console.log("No item name found on Add button.");
  }
}, { passive: true });

document.getElementById("remove").addEventListener("click", (event) => {
  const itemName = event.target.className; // Get the class name of the button
  if (itemName) {
      removeItem(itemName);
  } else {
      console.log("No item name found on Remove button.");
  }
}, { passive: true });

// Task display toggle
document.addEventListener("keydown", (event) => {
  if (event.key === 't') {
    console.log("key pressed");
    taskBox.textContent = tasks[inventoryState.level];
    taskBox.classList.toggle('hidden');
  }
}, { passive: true });




// document.getElementById("finish-grocery").addEventListener("click", (event) => {
//       logInventory();
// });
















