const guessedLettersUL = document.querySelector(".guessed-letters");
const guessBtn = document.querySelector(".guess");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingNumber = document.querySelector(".remaining > span");
const message = document.querySelector(".message");
const playAgainBtn = document.querySelector(".play-again");
let guessedLetters = [];
let letterInput = document.querySelector(".letter");
let remainingGuesses = 8;
let word;

const getWord = async function () {
  const res = await fetch(
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
  );
  const words = await res.text();
  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  const randomWord = wordArray[randomIndex];
  word = randomWord.trim();
  console.log(word);
  wordsInProgressText(word);
};


const wordsInProgressText = function(word) {
    let letterArray = [];
    for(let i = 0; i < word.length; i++){ 
        letterArray.push("●")
    }
    wordInProgress.innerHTML = letterArray.join('');
};

getWord();

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
        startOver();
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
        startOver();
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
});

const startOver = function() {
    guessBtn.classList.add("hide");
    remaining.classList.add("hide");
    guessedLettersUL.classList.add("hide");
    playAgainBtn.classList.remove("hide");
};

playAgainBtn.addEventListener('click', function(e) {
    message.classList.remove("win");
    remainingGuesses = 8;
    message.innerHTML = "";
    guessedLettersUL.innerHTML = "";
    guessedLetters = [];
    remainingNumber.innerHTML = "8 guesses";
    guessBtn.classList.remove("hide");
    remaining.classList.remove("hide");
    guessedLettersUL.classList.remove("hide");
    playAgainBtn.classList.add("hide");
    getWord();
})
