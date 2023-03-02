// Define the list of biblical characters
var characters = [
    "Adam",
    "Eve",
    "Noah",
    "Abraham",
    "Isaac",
    "Jacob",
    "Joseph",
    "Moses",
    "Aaron",
    "Joshua",
    "Samson",
    "David",
    "Solomon",
    "Isaiah",
    "Jeremiah",
    "Ezekiel",
    "Daniel",
    "Jonah",
    "John the Baptist",
    "Jesus",
    "Mary",
    "Peter",
    "Paul",
    "James",
    "Judas"
];

function openSettings() {
  var popup = document.getElementById("settings-popup");
  popup.classList.toggle("show");
}

function saveCharacters() {
  var input = document.getElementById("characters-input").value;
  characters = input.split(",");
  characters = characters.map(function(c) {
    return c.trim();
  });
  var popup = document.getElementById("settings-popup");
  popup.classList.remove("show");
}

// function getRandomCharacter() {
//   var index = Math.floor(Math.random() * characters.length);
//   return characters[index];
// }

// function next() {
//   var characterElement = document.getElementById("character");
//   var character = getRandomCharacter();
//   characterElement.textContent = character;
// }


  
// Initialize variables for tracking the current and previous characters
var currentCharacter = "";
var previousCharacters = [];

// Define the next() function to randomly select a character and display it
function next() {
    var index = Math.floor(Math.random() * characters.length);
    var character = characters[index];
    if (!previousCharacters.includes(character)) {
        // Select a random character from the list
        document.querySelector("#character").innerHTML = character;
        
        // Check if the character has already been displayed
        
        // If it has, select another character

        
        // Add the character to the list of previous characters
        previousCharacters.push(character);
        
    } else {
        next();
        return;
    }
}


//create isStarted variable equal to whether previousCharacters is empty


//add random functionality

function handleOrientation(event) {
    let x = event.beta; // In degree in the range [-180,180)
    let y = event.gamma; // In degree in the range [-90,90)

    document.querySelector("#tilt").innerHTML = x;
  
    // output.textContent = `beta : ${x}\n`;
    // output.textContent += `gamma: ${y}\n`;
  
    // // Because we don't want to have the device upside down
    // // We constrain the x value to the range [-90,90]
    // if (x > 90) {
    //   x = 90;
    // }
    // if (x < -90) {
    //   x = -90;
    // }
  
    // // To make computation easier we shift the range of
    // // x and y to [0,180]
    // x += 90;
    // y += 90;
  
    // // 10 is half the size of the ball
    // // It center the positioning point to the center of the ball
    // ball.style.top = `${(maxY * y) / 180 - 10}px`;
    // ball.style.left = `${(maxX * x) / 180 - 10}px`;
  }
  
  window.addEventListener("deviceorientation", handleOrientation);