/** @type {string[]} */
let words = []
/** @type {DictionaryEntry?} */
let wordDefinition = null
/** @type {DictionaryEntry?} */
let hiddenDefinition = null

/** @type {number} */
let hints = 0

/** @type {GameObserver[]} */
const gameObservers = []

/** @type {GameState} */
let state = "start"

/**
 * @param {GameState} s
 * @param {GameInfo?} info
 */
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

function getHint() {
    hints++
    hiddenDefinition = getHiddenDefinition(wordDefinition, hints)
}

/**
 * @param {DictionaryEntry} def 
 * @param {number} hints 
 * @returns {DictionaryEntry} 
 */
function getHiddenDefinition(def, hints) {
    const hidden = structuredClone(def)
    const nHidden = def.word.length - hints

    const hideMany = ws => ws.map(w => hide(w, def.word, nHidden))

    hidden.word = hide(hidden.word, def.word, nHidden)
    for (const meaning of hidden.meanings) {
        meaning.synonyms = hideMany(meaning.synonyms)
        meaning.antonyms = hideMany(meaning.antonyms)
        for (const d of meaning.definitions) {
            d.definition = hide(d.definition, def.word, nHidden)
            d.examples = hideMany(d.examples)
        }
    }

    return hidden
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
    hints = 0
    hiddenDefinition = getHiddenDefinition(wordDefinition, hints)
    setState("guessing")
}

async function main() {
    setState("loading")
    words = await getWords()
    newWord()
}

window.addEventListener("load", main)
