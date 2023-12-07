const guessInput = /** @type {HTMLInputElement} */ (
    document.getElementById("guess-input")
)
const guessDiv = /** @type {HTMLDivElement} */ (
    document.getElementById("guess-div")
)
const guessBtn = /** @type {HTMLButtonElement} */ (
    document.getElementById("guess-btn")
)
const resetDiv = /** @type {HTMLButtonElement} */ (
    document.getElementById("reset-div")
)
const resetBtn = /** @type {HTMLButtonElement} */ (
    document.getElementById("reset-btn")
)

function hideGuessPanel() {
    guessInput.disabled = true
    guessBtn.disabled = true
    guessDiv.style.display = "none"
}

function showGuessPanel() {
    guessInput.disabled = false
    guessInput.value = ""
    guessBtn.disabled = false
    guessDiv.style.display = "initial"
}

function hideResetPanel() {
    resetDiv.style.display = "none"
    resetBtn.disabled = false
}

function showResetPanel() {
    resetDiv.style.display = "initial"
    resetBtn.disabled = false
}