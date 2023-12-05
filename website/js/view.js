const guessInput = /** @type {HTMLInputElement} */ (document.getElementById("guess"))

function processGuessInput() {
    guess(guessInput.value)
}