window.onload = main

/** @type {string[]} */
let words = []
/** @type {DictionaryEntry?} */
let wordDefinition = null

/** @type {GameObserver[]} */
const gameObservers = []

/** @type {GameState} */
let state = "start"

/**
 * @param {GameState} s
 * @param {GameInfo?} info
 * */
function setState(s, info = null) {
    if (s === state) return
    for (const observer of gameObservers) {
        observer(s, info || { state })
    }
    state = s
}

/**
 * @param {string} word
 * @returns {boolean}
 */
function guess(word) {
    if (state !== "guessing") {
        setState("error", {
            state,
            error: { from: state, to: "guessing" },
        })
        return
    }
    const won = word.toLowerCase() === wordDefinition.word.toLowerCase()
    if (won) {
        setState("win")
    }
    return won
}

function skip() {
    if (state !== "guessing") {
        setState("error", {
            state,
            error: { from: state, to: "loading" },
        })
        return
    }
    setState("skipped")
}

async function newWord() {
    setState("loading")
    const word = choice(words)
    try {
        do {
            wordDefinition = await getDefinition(word)
        } while (wordDefinition === null)
    } catch {
        setState("error", {
            state,
            error: { from: state, to: "guessing" },
        })
        return
    }
    setState("guessing")
}

async function main() {
    setState("loading")
    words = await getWords()
    newWord()
}
