const WORDS_URL = "assets/words.txt"

/**
 * @return {Promise<string[]>}
 */
async function getWords() {
    const response = await fetch(WORDS_URL)
    const content = await response.text()
    return content.split("\n")
}

export { getWords }
