const guessedLettersUL = document.querySelector(".guessed-letters");
const guessBtn = document.querySelector(".guess");
let letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingNumber = document.querySelector(".remaining > span");
const message = document.querySelector(".message");
const playAgainBtn = document.querySelector(".play-again");
let remainingGuesses = 8;

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

const showGuessedLetters = function(guessedLetters) {
    guessedLettersUL.innerHTML = "";
    guessedLettersUL.innerHTML = guessedLetters.join(' ');
};

const countGuessesRemaining = function(guess) {
    const wordUpper = word.toUpperCase();
    if (wordUpper.includes(guess)) {
        message.innerHTML = `Good guess! The word has the letter ${guess}`;
    } else {
        message.innerHTML = `Sorry! The word doesn't have a ${guess}`;
        remainingGuesses -= 1;
    }
    if (remainingGuesses === 0) {
        message.innerHTML = `Sorry, game over!  The word was ${wordUpper}.`;
    } else if (remainingGuesses === 1) {
        remainingNumber.innerHTML = `1 guess`;
    } else {
        remainingNumber.innerHTML = `${remainingGuesses} guesses`;
    }
};

const checkIfWin = function() {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">"You guessed correct the word! Congrats!"</p>`;
    }
};

const updateWordInProgress = function(guessedLetters) {
    let wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const updatedArray = [];
    
    // Check if wordArray contains any letters of guessedLetters
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            updatedArray.push(letter);
        } else {
            updatedArray.push("●");
        }
    }
    wordInProgress.innerHTML = updatedArray.join('');
    checkIfWin();
};

const makeGuess = function(validLetterInput) {
    let validLetterUpper = validLetterInput.toUpperCase();
    if (guessedLetters.includes(validLetterUpper)) {
        message.innerHTML = "You've guessed that letter already.  Try another."
    } else {
        guessedLetters.push(validLetterUpper);
        showGuessedLetters(guessedLetters);
        countGuessesRemaining(validLetterUpper);
        updateWordInProgress(guessedLetters);
    }
};

guessBtn.addEventListener('click', function(e) {
    e.preventDefault();
    let letterGuess = letterInput.value;
    let validLetterInput = validateInput(letterGuess);
    if (validLetterInput) {
        makeGuess(validLetterInput);
    }
    letterInput.value = "";
})
