import { k } from "./kaboomCtx";
import { createGroceryScene } from "./scenes/grocery";
import { createWorkshopScene } from "./scenes/workshop";
import { createEstoreScene } from "./scenes/estore";
import { addItem,removeItem,inventoryState,loadState} from "./inventory";
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

k.loadSprite("map", "./map.png");
k.loadSprite("mapTwo", "./map-2.png");
k.loadSprite("mapThree", "./grocery-final.png");
k.loadSprite("mapFour", "./workshop.png");
k.loadSprite("mapFive", "./e-store.png");
k.loadSprite("mapSix", "./colony2.png");
k.loadSprite("mapSeven", "./scene_2.png");
k.loadSprite("mapEight", "./scene_3.png");
k.loadSprite("mapNine", "./pharmacy.png");
k.loadSprite("mapTen", "./finalPark.png");
k.loadSprite("mapEleven", "./scene4.png");
k.loadSprite("mapTwelve", "./superMarket.png");
k.loadSprite("mapThirteen", "./library.png");
k.loadSprite("mapFourteen", "./scene6.png");
k.loadSprite("mapFifteen", "./cook.png");
k.loadSprite("mapSixteen", "./sleep.png");
k.loadSprite("mapSeventeen", "./machine.png");
k.loadSprite("mapEighteen", "./idle.png");
k.loadSprite("mapNineteen", "./manufacturing1.png");
k.loadSprite("mapTwenty", "./fridge.png");

// Select elements
const bgElement = document.querySelector('.bg');
const audio = document.getElementById('bg-music');
audio.loop = true;

// Check and set initial state from localStorage
let isPlaying = localStorage.getItem('isPlaying') === 'true';
let savedTime = parseFloat(localStorage.getItem('currentTime')) || 0;
// console.log("audio duration is", audio.duration);
let duration=29.361625;
if(audio.duration){
  duration=audio.duration
}
// Adjust currentTime slightly forward to avoid repetition
audio.currentTime = Math.min(savedTime + 0.2, duration);

// Play or pause based on the stored state
if (isPlaying) {
  audio.play();
  updateIcon(true);
} else {
  updateIcon(false);
}

// Add a click event listener to toggle playback
bgElement.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause(); // Pause the audio
    updateIcon(false);
  } else {
    audio.play(); // Play the audio
    updateIcon(true);
  }
  isPlaying = !isPlaying; // Toggle the state
  localStorage.setItem('isPlaying', isPlaying); // Save state
});

// Save the current playback time periodically
setInterval(() => {
  if (!audio.paused) {
    localStorage.setItem('currentTime', audio.currentTime);
  }
}, 1000); // Save every second

// Function to update the icon
function updateIcon(isPlaying) {
  if (isPlaying) {
    bgElement.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="100" height="100" viewBox="0 0 100 100" id="music">
        <g id="_x37_7_Essential_Icons">
          <path id="Music" fill="white" d="M88.3 11.5c-.5-.4-1.1-.5-1.7-.4l-48 10c-.9.2-1.6 1-1.6 2v40.8c-2.7-3-6.6-4.8-11-4.8-8.3 0-15 6.7-15 15s6.7 15 15 15 15-6.7 15-15V38.6l44-9.2v24.4c-2.7-3-6.7-4.8-11-4.8-8.3 0-15 6.7-15 15s6.7 15 15 15 15-6.7 15-15V13c0-.6-.3-1.2-.7-1.5zM26 85c-6.1 0-11-4.9-11-11s4.9-11 11-11 11 4.9 11 11-4.9 11-11 11zm48-10c-6.1 0-11-4.9-11-11s4.9-11 11-11 11 4.9 11 11-4.9 11-11 11zm11-49.6l-44 9.2v-9.9l44-9.2v9.9z"></path>
        </g>
        <g id="Info">
          <path id="BORDER" fill="white" d="M664-650v1684h-1784V-650H664m8-8h-1800v1700H672V-658z"></path>
        </g>
      </svg>`;
  } else {
    bgElement.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="100" height="100" viewBox="0 0 100 100" id="music">
        <g id="_x37_7_Essential_Icons">
          <path id="Music" fill="red" d="M88.3 11.5c-.5-.4-1.1-.5-1.7-.4l-48 10c-.9.2-1.6 1-1.6 2v40.8c-2.7-3-6.6-4.8-11-4.8-8.3 0-15 6.7-15 15s6.7 15 15 15 15-6.7 15-15V38.6l44-9.2v24.4c-2.7-3-6.7-4.8-11-4.8-8.3 0-15 6.7-15 15s6.7 15 15 15 15-6.7 15-15V13c0-.6-.3-1.2-.7-1.5zM26 85c-6.1 0-11-4.9-11-11s4.9-11 11-11 11 4.9 11 11-4.9 11-11 11zm48-10c-6.1 0-11-4.9-11-11s4.9-11 11-11 11 4.9 11-11-4.9 11-11 11zm11-49.6l-44 9.2v-9.9l44-9.2v9.9z"></path>
        </g>
        <g id="Info">
          <path id="BORDER" fill="red" d="M664-650v1684h-1784V-650H664m8-8h-1800v1700H672V-658z"></path>
        </g>
      </svg>`;
  }
}


k.setBackground(k.Color.fromHex("#311047"));

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

const addButton = document.getElementById("add");
const removeButton = document.getElementById("remove");

loadState();
console.log(inventoryState.currentScene);
k.go(inventoryState.currentScene);

// Attach event listeners for Add and Remove buttons
document.getElementById("add").addEventListener("click", (event) => {
  const itemName = event.target.className; // Get the class name of the button
  if (itemName) {
      addItem(itemName);
  } else {
      console.log("No item name found on Add button.");
  }
  canvas.focus(); // Refocus the canvas after clicking the button
});

document.getElementById("remove").addEventListener("click", (event) => {
  const itemName = event.target.className; // Get the class name of the button
  if (itemName) {
      removeItem(itemName);
  } else {
      console.log("No item name found on Remove button.");
  }
  canvas.focus(); // Refocus the canvas after clicking the button
});

let taskBox = document.querySelector('#currentTasks');
if(window.innerWidth<1024){
  taskBox.classList.remove('styleMin');
  taskBox.classList.add('styleMax');
}else{
  taskBox.classList.remove('styleMax');
  taskBox.classList.add('styleMin');
}
document.addEventListener("keydown",(event)=>{
  if (event.key === 't') {
  // Toggle the 'hidden' class on the target element
    console.log("key pressed");
    taskBox.innerHTML=tasks[inventoryState.level];
    taskBox.classList.toggle('hidden');
  } 
})


document.querySelector(".mobileNote").addEventListener("click",(event)=>{
  console.log("clicked");
  taskBox.innerHTML=tasks[inventoryState.level];
  taskBox.classList.toggle('hidden');
})

let mapBox = document.querySelector('#map');
if(window.innerWidth<1024){
  mapBox.classList.remove('styleMinMap');
  mapBox.classList.add('styleMaxMap');
}else{
  mapBox.classList.remove('styleMaxMap');
  mapBox.classList.add('styleMinMap');
}
document.addEventListener("keydown",(event)=>{
  if (event.key === 'm') {
  // Toggle the 'hidden' class on the target element
    console.log("key pressed");
    mapBox.classList.toggle('hidden');
  } 
})

document.querySelector(".mobileMap").addEventListener("click",(event)=>{
  console.log("clicked");
  mapBox.classList.toggle('hidden');
})

document.addEventListener("keydown", (event) => {
  if (event.key === "1") {
      // Add item logic for key "1"
      console.log(addButton.classList[0]);
      const itemName = addButton.classList[0];
      if(itemName){
        addItem(itemName);
        console.log(`Added item: ${itemName}`);
      } // Replace with dynamic logic if needed
  } else if (event.key === "2") {
      // Remove item logic for key "2"
      const itemName = addButton.classList[0];
      if(itemName){
        removeItem(itemName);
        console.log(`Removed item: ${itemName}`);
      }

  }
});

document.addEventListener("DOMContentLoaded", () => {
  loadState();
  updateInventoryUI();
});
// document.getElementById("finish-grocery").addEventListener("click", (event) => {
//       logInventory();
// });















