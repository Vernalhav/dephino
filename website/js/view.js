import * as UI from "./components.js"
import * as Game from "./game.js"

function processGuessInput() {
    const correct = Game.guess(UI.guessInput.value)
    if (!correct) {
        UI.shakeGuessPanel()
        UI.guessInput.value = ""
    }
}

function startNewGame() {
    Game.newWord()
}

function processHintInput() {
    Game.getHint()
    UI.setDefinition(Game.hiddenDefinition)
}

function processSkipInput() {
    Game.skip()
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
    if (newState === "win" || newState === "skipped") {
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
    UI.setDefinition(Game.reveal())
    UI.showResetPanel()
}

function showGuess() {
    UI.setDefinition(Game.hiddenDefinition)
    hideAll()
    UI.showGuessPanel()
}

/** @param {GameInfo} info */
function showError(info) {
    window.alert(JSON.stringify(info.error, null, 4))
}

function hideAll() {
    UI.hideResetPanel()
    UI.hideGuessPanel()
}

function setupListeners() {
    UI.guessInput.onkeydown = e => { if (e.key == "Enter") processGuessInput() }
    UI.guessBtn.onclick = processGuessInput
    UI.skipBtn.onclick = processSkipInput
    UI.hintBtn.onclick = processHintInput
    UI.resetBtn.onclick = startNewGame
}

function setup() {
    setupListeners()
    hideAll()
    Game.gameObservers.push(gameObserver)
    Game.startGame()
}

window.addEventListener("load", setup)
