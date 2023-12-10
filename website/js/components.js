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
const hintBtn = /** @type {HTMLButtonElement} */ (
    document.getElementById("hint-btn")
)
const skipBtn = /** @type {HTMLButtonElement} */ (
    document.getElementById("skip-btn")
)
const definitionDiv = /** @type {HTMLButtonElement} */ (
    document.getElementById("definition")
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

function resetDefinition() {
    definitionDiv.innerHTML = ""
}

/**
 * @param {DictionaryEntry} def 
 */
function setDefinition(def) {
    const title = `<h1 class="title">The word is ${escape(def.word)}</h1>`
    const items = def.meanings.map(m => {
        const synonyms = m.synonyms.map(s => `<li><p class="syn">${escape(s)}</p></li>`).join("")
        const antonyms = m.antonyms.map(a => `<li><p class="ant">${escape(a)}</p></li>`).join("")
        const defs = m.definitions.map(d => {
            const examples = d.examples.map(e => `<li><p class="example">${escape(e)}</p></li>`).join("")
            return `<li><p class="definition">${escape(d.definition)}<p>` +
                (examples.length ? `<ul class="examples">${examples}</ul>` : "") +
                `</li>`
        }).join("")
        return `<li><p class="part-of-speech">${escape(m.partOfSpeech)}</p>
            <ul class="definitions">${defs}</ul>` +
            (synonyms.length ? `Synonyms<ul class="synonyms">${synonyms}</ul>` : "") +
            (antonyms.length ? `Antonyms<ul class="antonyms">${antonyms}</ul>` : "") +
            `</li>`
    }).join("<hr />")
    definitionDiv.innerHTML = `${title}
        <ul class="meanings">${items}</ul>`
}

function escape(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
}

export {
    guessBtn,
    guessInput,
    hideGuessPanel,
    hideResetPanel,
    hintBtn,
    resetBtn,
    resetDefinition,
    setDefinition,
    showGuessPanel,
    showResetPanel,
    skipBtn
}

