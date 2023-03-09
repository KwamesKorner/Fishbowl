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

// Set the initial countdown value
var countDownValue = 3;
var timerValue = 30;
var score = 0;
let screenLock;
var startButton = document.getElementById("start-button");
timesUp = document.getElementById("timesUp")

function begin() {
    startButton.classList.toggle("hide")

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
    getScreenLock()
    countdown = document.getElementById("countdown")
    countdown.classList.toggle("show")

    // Update the countdown every 1 second
    var x = setInterval(function() {

        // Decrement the countdown value
        countDownValue--;

        // Display the countdown timer on the screen
        document.getElementById("countdown").innerHTML = countDownValue;

        // If the countdown is finished, display a message
        if (countDownValue == 0) {
            clearInterval(x);
            countdown.classList.toggle("show")
            document.getElementById("timer-container").classList.toggle("show")
            document.getElementById("score-container").classList.toggle("show")
            gameplay()
            next()
        }
    }, 1000);
}

function gameplay() {
    var y = setInterval(function() {

        // Decrement the countdown value
        timerValue--;

        // Display the countdown timer on the screen
        document.getElementById("timer").innerHTML = timerValue;

        // If the countdown is finished, display a message
        if (timerValue == 0) {
            window.removeEventListener('deviceorientation', handleOrientation);
            clearInterval(y);
            document.getElementById("character").innerHTML = ''
            timesUp.innerHTML = "TIME'S UP!"
            timesUp.classList.toggle("show")
            release();
        }
    }, 1000);
}

function openSettings() {
  var popup = document.getElementById("settings-popup");
  if(!startButton.classList.contains("hide")) {
    startButton.classList.toggle("hide")
    popup.classList.toggle("show");
  } else if (previousCharacters.length > 0){
    return;
  } else {
    popup.classList.remove("show");
    startButton.classList.toggle("hide");
  }
}

function saveCharacters() {
  var input = document.getElementById("characters-input").value;
  characters = input.split(",");
  characters = characters.map(function(c) {
    return c.trim();
  });
  var popup = document.getElementById("settings-popup");
  popup.classList.remove("show");
  startButton.classList.toggle("hide")
}

function addCharacters() {
    var input = document.getElementById("characters-input").value;
    charactersToAdd = input.split(",");
    characters.concat(charactersToAdd.map(function(c) {
      return c.trim();
    }));
    var popup = document.getElementById("settings-popup");
    popup.classList.remove("show");
    startButton.classList.toggle("hide")
}


  
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
        previousCharacters.push(character);
        
    } else {
        next();
        return;
    }
}

characterOnScreen = document.querySelector("#character");

const observer = new MutationObserver(() => {
    if(previousCharacters.length > 1) {
        window.removeEventListener('deviceorientation', handleOrientation);
        setTimeout(() => {
            window.addEventListener('deviceorientation', handleOrientation);
        }, 1000);
    }
});

observer.observe(characterOnScreen, { subtree: true, childList: true });

timeUp = document.querySelector("#timesUp");

const timesUpObserver = new MutationObserver(() => {
    if(previousCharacters.length > 0) {
        console.log("equal")
        characters = []
        window.removeEventListener('deviceorientation', handleOrientation);
    }
});

timesUpObserver.observe(timeUp, { subtree: true, childList: true });

function handleOrientation(event) {
    // const alpha = event.alpha;
    // const beta = event.beta;
    const gamma = event.gamma;
    // document.querySelector("#alpha").innerHTML = alpha;
    // document.querySelector("#beta").innerHTML = beta;
    // document.querySelector("#gamma").innerHTML = gamma;
    if(countDownValue == 0) {
        if((30 <= gamma && gamma <= 60) || (10 <= gamma && gamma <= 40)) {
            next()
            score += 1
            document.getElementById("score").innerHTML = score;
            return;
        }

        else if((-60 <= gamma && gamma <= -30) || (-40 <= gamma && gamma <= -10)) {
            next()
            return;
        }
    }
}

function isScreenLockSupported() {
    return ('wakeLock' in navigator);
}

async function getScreenLock() {
    if(isScreenLockSupported()){
      try {
         screenLock = await navigator.wakeLock.request('screen');
      } catch(err) {
         console.log(err.name, err.message);
      }
      return screenLock;
    }
}

function release() { 
    if(typeof screenLock !== "undefined" && screenLock != null) {
      screenLock.release()
      .then(() => {
        console.log("Lock released 🎈");
        screenLock = null;
      });
    }
}
