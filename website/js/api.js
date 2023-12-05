const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en"
const MAX_RETRIES = 5

/**
 * @param {string} word 
 * @return {Promise<DictionaryEntry?>} 
 */
async function getDefinition(word) {
    let response = new Response()
    for (let i = 0; i < MAX_RETRIES && response.status !== 200; i++) {
        response = await fetch(`${API_URL}/${word}`)
        if (response.status === 404) {
            return null
        }
    }
    if (response.status !== 200) {
        throw new Error("error reading from the API")
    }

    const data = await response.json()
    return mapResponseToDomain(data[0])
}

/**
 * @param {APIResponse} data 
 * @return {DictionaryEntry}
 */
function mapResponseToDomain(data) {
    const getExamples = example => example ? [example] : []
    return {
        word: data.word,
        meanings: data.meanings.map(meaning => ({
            partOfSpeech: meaning.partOfSpeech,
            definitions: meaning.definitions.map(def => ({
                definition: def.definition,
                examples: getExamples(def.example)
            })),
            synonyms: getSynonyms([...meaning.definitions, meaning]),
            antonyms: getAntonyms([...meaning.definitions, meaning]),
        })),
        source: {
            url: data.sourceUrls[0],
            license: {
                name: data.license.name,
                url: data.license.url
            }
        }
    }
}

/**
 * @param {{synonyms: string[]}[]} defs 
 * @returns {Iterable<string>}
 */
function getSynonyms(defs) {
    return defs.reduce((xs, def) => new Set([...xs, ...def.synonyms]), new Set())
}

/**
 * @param {{antonyms: string[]}[]} defs 
 * @returns {Iterable<string>}
 */
function getAntonyms(defs) {
    return defs.reduce((xs, def) => new Set([...xs, ...def.antonyms]), new Set())
}
