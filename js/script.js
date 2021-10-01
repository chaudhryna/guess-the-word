const guessedLettersUL = document.querySelector(".guessed-letters");
const guessBtn = document.querySelector(".guess");
let letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingNumber = document.querySelector(".remaining > span");
const message = document.querySelector(".message");
const playAgainBtn = document.querySelector(".play-again");

const word = "magnolia";

const wordsInProgressText = function(word) {
    let letterArray = [];
    for(let i = 0; i < word.length; i++){ 
        console.log(word[i]);
        letterArray.push("●")
    }
    wordInProgress.innerHTML = letterArray.join('');
}

wordsInProgressText(word);

guessBtn.addEventListener('click', function(e) {
    e.preventDefault();
    let letterGuess = letterInput.value;
    letterInput.value = "";
    console.log(letterGuess);
})