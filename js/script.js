
const submitButton = document.getElementById('Submit');
submitButton.addEventListener('click', checkGuess);
let guessNumber = 0;
let guessLeft = 6;
document.getElementById('guess-left').innerHTML = `Remaining Guesses: ${guessLeft}`;
let answer = "TRIAL"

function checkGuess() {
    let guess = checkValidInput(guessNumber);
    if (guess == false) {
        errorMessage();
        return;
    }

    changeColor(guessNumber);
    if (guess.toLowerCase() == answer.toLowerCase()) {
        setInputsReadOnly(guessNumber);

        wonGame();
        return;
    }

    if (guessNumber == 5){
        setInputsReadOnly(guessNumber);
        endGame();
        return;
    }
    
    setInputsReadOnly(guessNumber);
    setNextColumnToType(guessNumber);
    guessNumber += 1;
    guessLeft = 6-guessNumber;
    document.getElementById('guess-left').innerHTML = `Remaining Guesses: ${guessLeft}`;
}

function endGame() {
    document.getElementById('game-over').style.display = 'block';
}

function wonGame() {
    document.getElementById('game-won').style.display = 'block';
}

function changeColor(guessNumber) {
    const container = document.getElementById(guessNumber);
    const inputs = container.getElementsByTagName('input');
    answer = answer.toLowerCase();
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value.toLowerCase() == answer[i]) {
            inputs[i].style.backgroundColor = 'green';
        }
        else if (answer.includes(inputs[i].value.toLowerCase())) {
            inputs[i].style.backgroundColor = 'yellow';
        }
    }
}

function checkValidInput(id) {
    let regex = /^[a-zA-Z]+$/;

    const container = document.getElementById(id);
    // Get all input elements within the container
    const inputs = container.getElementsByTagName('input');
    let letters = "";
    
    // Iterate through the input elements and set t
    for (let input of inputs) {
        if (!(regex.test(input.value))) {
            return false;
        }
        else {
            letters += input.value;
        }
    }
    return letters;
}

function setInputsReadOnly(id) {
    // Get the container element by its ID
    const container = document.getElementById(id);

    // Get all input elements within the container
    const inputs = container.getElementsByTagName('input');
    
    // Iterate through the input elements and set their readOnly property to true
    for (let input of inputs) {
        input.readOnly = true;
    }
}

function setNextColumnToType(id) {
    const container2 = document.getElementById(id+1);
    const inputs2 = container2.getElementsByTagName('input');
    for (let input of inputs2) {
        input.readOnly = false;
    }
}

function errorMessage() {
    const errorMessage = document.getElementById('error-message');
    
    errorMessage.textContent = 'All fields must be filled and letters!';
    errorMessage.style.display = 'block';
    
    // Hide the error message after 2 seconds
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 2000);
}

