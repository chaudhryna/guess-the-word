const guessedLettersUL = document.querySelector(".guessed-letters");
const guessBtn = document.querySelector(".guess");
let letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingNumber = document.querySelector(".remaining > span");
const message = document.querySelector(".message");
const playAgainBtn = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

const wordsInProgressText = function(word) {
    let letterArray = [];
    for(let i = 0; i < word.length; i++){ 
        letterArray.push("●")
    }
    wordInProgress.innerHTML = letterArray.join('');
}

wordsInProgressText(word);

const validateInput = function(letterGuess) {
    const acceptedLetter = /[a-zA-Z]/;

    if (letterGuess === "") {
        message.innerHTML = "Please enter a letter from A to Z"
    } else if (letterGuess.length > 1) {
        message.innerHTML = "Please enter only one letter at a time."
    } else if (!letterGuess.match(acceptedLetter)) {
        message.innerHTML = "Please enter a letter only."
    } else if (letterGuess.match(acceptedLetter)) {
        message.innerHTML = "Success! That's a valid letter!"
        let validLetter = letterGuess;
        return validLetter;
    }
};

const makeGuess = function(validLetterInput) {
    let validLetterUpper = validLetterInput.toUpperCase();
    if (guessedLetters.includes(validLetterUpper)) {
        message.innerHTML = "You've guessed that letter already.  Try another."
    } else {
        guessedLetters.push(validLetterUpper);
        console.log(guessedLetters);
    }
}

guessBtn.addEventListener('click', function(e) {
    e.preventDefault();
    let letterGuess = letterInput.value;
    let validLetterInput = validateInput(letterGuess);
    if (validLetterInput) {
        console.log(validLetterInput);
        makeGuess(validLetterInput);
    }
    letterInput.value = "";
})