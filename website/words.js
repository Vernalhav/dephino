const WORDS_URL = "assets/words.txt"

/**
 * @return {Promise<Iterable<string>>}
 */
async function getWords() {
    const response = await fetch(WORDS_URL)
    const content = await response.text()
    return content.split("\n")
}