var randomNum = randomNumber();
var userInput = document.getElementById("guess-form");
var displayGuess = document.getElementById('display-guess');
var guessButton = document.querySelector('#guess-button');
var clearButton = document.getElementById('clear-button');
var displayHighLow = document.getElementById('display-high-low');
var resetButton = document.getElementById('reset-button');
var lastGuess = document.getElementById('last-guess');
var minButton = document.getElementById('min-range-btn');
var maxButton = document.getElementById('max-range-btn');
var min = 1;
var max = 100;
var round = 1;

/////// Modal targeting //////
var hideDiv = document.getElementById('show-hide');
var divBtn = document.getElementById('close-div');
var divBtn2 = document.getElementById('close-div2');
var modalOne = document.getElementById('bodyyy');
var winModal = document.getElementById('modal-two');
var levelTwo = document.getElementById('level-two');
var rulesBtn = document.getElementById('game-rules-btn');


window.onload = function() {
  randomNum = randomNumber();
  gameRound();
}

  window.onclick = function(event) {
    if (event.target == modalOne &&  !hideDiv.classList.contains('hidden')) {
      hideDiv.classList.toggle('hidden');
    }
    if (event.target == modalOne && !winModal.classList.contains('hidden')) {
      winModal.classList.toggle('hidden');
    }
  }

////////////Event Listeners ////////////
rulesBtn.addEventListener('click', function() {
  toggleRules();

})

divBtn.addEventListener('click', function() {
  toggleRules();
})

divBtn2.addEventListener('click', function() {
  toggleWin();
})

minButton.addEventListener('click', function() {
  adjustMin();
  randomNumber();
})

maxButton.addEventListener('click', function() {
  adjustMax();
  randomNumber();
})


//guess button functionality
guessButton.addEventListener('click', function(e) {
  e.preventDefault();
  var input = userInput.value;
  displayGuess.innerText = input;
  userGuess(input);
  userInput.value = '';
  document.getElementById('guess-button').setAttribute( "disabled", true);
  document.getElementById('clear-button').setAttribute("disabled", true);

})

//clear button
clearButton.addEventListener('click', function() {
  userInput.value='';
  toggleWin();
})

//reset button functionality
resetButton.addEventListener('click', function() {
  resetFields();
  buttonsOff();
})


///////////// FUNCTION SECTION /////////////


function randomNumber() {
  var randomNum = (Math.floor(Math.random() * (max-min) +1)+min);
  console.log("rannumfunc : " + randomNum);
  return randomNum;
}


//function to update min
function adjustMin() {
  var minInput = document.getElementById('set-min');
  if (minInput === '') {
      document.getElementById('mix-range-button').setAttribute( "disabled", true);
  } else {
    minInput = minInput.value;
    min = minInput;
  }
}

function adjustMax() {
  var maxInput = document.getElementById('set-max');
  maxInput = maxInput.value;
  max = maxInput;
}

//compare user input from guess field after ENTER pressed //
function userGuess (input) {
  input = parseInt(input);
  if (input < min || input > max) {
    updateGuess("Range", input);
  }
  else if (isNaN(input)) {
    updateGuess("NaN", input);
  }
  else if (input < randomNum) {
    updateGuess("Low", input);
  }
  else if (input > randomNum) {
    updateGuess("High", input);
  }
  else {
    updateGuess("Win", input);
    round++;
    getemAudio();
    gameRound();
    toggleWin();
    toggleWin();
    randomNum = randomNumber();
  }
}


//Enable Buttons when the INPUT field is typed in //
function buttonsOn() {
  document.getElementById('guess-button').removeAttribute("disabled");
  document.getElementById('clear-button').removeAttribute("disabled");
  document.getElementById('reset-button').removeAttribute("disabled");
}

function buttonsOff() {
  document.getElementById('guess-button').setAttribute( "disabled", true);
  document.getElementById('clear-button').setAttribute("disabled", true);
  document.getElementById('reset-button').setAttribute("disabled", true);

}

function resetFields() {
  userInput.value = '';
  displayGuess.innerText='';
  displayHighLow.innerText='';
  lastGuess.innerText='';
  round = 1;
  levelTwo.setAttribute('hidden', true);

}

function getemAudio() {
  // $("#gotem").trigger('play')  JQUERY version ///////
  var noise = new Audio("assets/Baird  Got em.mp3");
  noise.oncanplaythrough = function() {
    noise.play();
  }

}

function gameRound() {
  var displayRound = document.getElementById('round-what');
  displayRound.innerText = round;
    if (round === 1) {
    } else if (round === 2) {
      levelTwo.classList.toggle('hidden');
    } else if (round === 3) {
  }
}

function updateGuess(results, input) {
  var text;
  var changeText = document.getElementById('contain-guess');
  changeText.innerHTML="";

  switch (results) {
    case "High":
    text = "Your guess was too High";
    break;

    case "Low":
    text =  "Your guess was too Low";
    break;

    case "Range":
    text = "Please guess a number between " + min + " and " + max;
    break;

    case "NaN":
    text = "Please enter a real number";
    break;

    case "Win":
    text = "Winner!!!";
    break;

    default:
    text = "You broke the game! Yay!!!";
  }
  var textSwap = `<p id="last-guess">Your last guess was </p>
          <p id="display-guess">`+ input + `</p>
          <p id="display-high-low">`+text+`</p>`;
  changeText.innerHTML = textSwap;
}

function toggleRules() {
    var x = document.getElementById('show-hide');
    toggleModalDisplay(x);
}

function toggleWin() {
    var y = document.getElementById('win-modal');
    toggleModalDisplay(y);
}

function toggleModalDisplay(el) {
  if (el.style.display === 'none') {
      el.style.display = 'block';
  } else {
      el.style.display = 'none';
  }
}
