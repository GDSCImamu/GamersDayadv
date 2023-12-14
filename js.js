function checkGuess() {
    const wordToGuess = "gamerday"; 
    const guessInput = document.getElementById("guess");
    const resultMessage = document.getElementById("result");

    if (guessInput.value.toLowerCase() === wordToGuess) {
        resultMessage.textContent = "Correct! You guessed the word!";
        resultMessage.style.color = "green";
    } else {
        resultMessage.textContent = "Sorry, that's not correct. Try again!";
        resultMessage.style.color = "red";
    }
}
