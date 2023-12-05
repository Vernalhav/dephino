window.onload = main

/** @type {string[]} */
let words = []
/** @type {DictionaryEntry?} */
let wordDefinition = null

/** @type {GameObserver[]} */
const gameObservers = []

/** @type {GameState} */
let state = "loading"

/** @param {GameState} s */
function setState(s) {
    for (const observer of gameObservers) {
        observer(s)
    }
    state = s
}

/** @param {string} word */
function guess(word) {
    word.toLowerCase() === wordDefinition.word.toLowerCase()
        ? processCorrectGuess() : processIncorrectGuess()
}

function processCorrectGuess() {
    setState("win")
}

function processIncorrectGuess() {
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
    words = await getWords()
    newWord()
}