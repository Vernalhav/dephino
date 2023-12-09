const MAX_REPLACEMENTS = 50

/**
 * @param {string} str the string to hide occurences of word
 * @param {string} word the word that should be hidden
 * @param {number} count how many trailing characters to hide
 * @param {string?} censor character to replace hidden chars
 * @returns {string} `str` with hidden `word`s
 */
function hide(str, word, count, censor = "-") {
    word = word.toLowerCase()
    const strLower = str.toLowerCase()
    count = count > word.length ? word.length : count

    let pos = strLower.indexOf(word)
    for (let i = 0; i < MAX_REPLACEMENTS && pos >= 0; i++) {
        const censored = str.substring(pos, pos + (word.length - count)) + censor.repeat(count)
        str = str.substring(0, pos) + censored + str.substring(pos + censored.length)
        pos = strLower.indexOf(word, pos + 1)
    }

    return str
}

/** @type {{str: string, word: string, n: number, expected: string}[]} */
const tests = [
    { str: "word", word: "word", n: 3, expected: "w---" },
    { str: "word", word: "word", n: 10, expected: "----" },
    { str: "word", word: "word", n: 0, expected: "word" },
    { str: "this sentence will be censored", word: "sentence", n: 8, expected: "this -------- will be censored" },
    { str: "bad word is bad", word: "bad", n: 2, expected: "b-- word is b--" },
    { str: "prefixes are censored", word: "prefix", n: 6, expected: "------es are censored" },
    { str: "prefixes", word: "prefix", n: 4, expected: "pr----es" },
    { str: "PrEFiXEs", word: "prefix", n: 2, expected: "PrEF--Es" },
]
for (const { str, word, n, expected } of tests) {
    const received = hide(str, word, n)
    if (received !== expected) {
        console.error(`FAILED: expected '${expected}' received '${received}'`)
    }
}

/**
 * @param {string} s 
 * @returns {string}
 */
function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1)
}