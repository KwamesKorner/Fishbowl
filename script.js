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

// window.addEventListener('deviceorientation', handleOrientation);

function handleOrientation(event) {
    const alpha = event.alpha;
    const beta = event.beta;
    const gamma = event.gamma;
    document.querySelector("#tilt").innerHTML = event.beta;
}

function load() {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      // Handle iOS 13+ devices.
      DeviceMotionEvent.requestPermission()
        .then((state) => {
          if (state === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          } else {
            console.error('Request to access the orientation was rejected');
          }
        })
        .catch(console.error);
    } else {
      // Handle regular non iOS 13+ devices.
      window.addEventListener('devicemotion', handleOrientation);
    }
}