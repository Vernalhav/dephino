window.onload = main

/** @type {string[]} */
let words = []
/** @type {DictionaryEntry?} */
let wordDefinition = null

const guessInput = /** @type {HTMLInputElement} */ (document.getElementById("guess"))

function guess() {
    const guess = guessInput.value
    console.log(guess)
    console.log(guess.toLowerCase() === wordDefinition.word.toLowerCase())
}

async function newWord() {
    const word = choice(words)
    wordDefinition = await getDefinition(word)
    console.log(word, wordDefinition)
}

async function main() {
    words = await getWords()
    newWord()
}