const guessInput = /** @type {HTMLInputElement} */ (
    document.getElementById("guess")
)

function processGuessInput() {
    guess(guessInput.value)
}

/**
 * @param {GameState} newState
 * @param {GameInfo} info
 */
function gameObserver(newState, info) {
    if (newState === "error") {
        showError(info)
    }
}

/** @param {GameInfo} info */
function showError(info) {
    window.alert(info)
}

function setup() {
    gameObservers.push(gameObserver)
}

window.addEventListener("load", setup)
