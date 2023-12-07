function processGuessInput() {
    guess(guessInput.value)
}

function startNewGame() {
    newWord()
}

/**
 * @param {GameState} newState
 * @param {GameInfo} info
 */
function gameObserver(newState, info) {
    if (newState === "error") {
        showError(info)
        return
    }
    if (newState === "win") {
        showWin()
        return
    }
    if (newState === "guessing") {
        showGuess()
        return
    }
}

function showWin() {
    hideAll()
    showResetPanel()
}

function showGuess() {
    hideAll()
    showGuessPanel()
}

/** @param {GameInfo} info */
function showError(info) {
    window.alert(info)
}

function hideAll() {
    hideResetPanel()
    hideGuessPanel()
}

function setup() {
    hideAll()
    gameObservers.push(gameObserver)
}

window.addEventListener("load", setup)
