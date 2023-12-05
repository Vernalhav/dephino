window.onload = main

/** @type {string[]} */
let words = []
/** @type {DictionaryEntry?} */
let wordDefinition = null

/** @type {GameObserver[]} */
const gameObservers = []

/** @type {GameState} */
let state = "start"

/** @param {GameState} s */
function setState(s) {
    if (s === state) return
    for (const observer of gameObservers) {
        observer(s)
    }
    state = s
}

/**
 * @param {string} word 
 * @returns {boolean}
 */
function guess(word) {
    const won = word.toLowerCase() === wordDefinition.word.toLowerCase()
    if (won) {
        processCorrectGuess()
    }
    return won
}

function processCorrectGuess() {
    setState("win")
}

async function newWord() {
    setState("loading")
    const word = choice(words)
    do {
        wordDefinition = await getDefinition(word)
    } while (wordDefinition === null)
    setState("guessing")
}

async function main() {
    setState("loading")
    words = await getWords()
    newWord()
}