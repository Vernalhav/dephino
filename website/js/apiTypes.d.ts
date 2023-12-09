type DictionaryEntry = {
    word: string
    meanings: Meaning[]
    source: Source
}

type Meaning = {
    partOfSpeech: string
    definitions: Definition[]
    synonyms: string[]
    antonyms: string[]
}

type Definition = {
    definition: string
    examples: string[]
}

type Source = {
    url: string
    license: License
}

type License = {
    name: string
    url: string
}

type APIResponse = {
    word: string
    meanings: {
        partOfSpeech: string
        definitions: {
            definition: string
            antonyms: string[]
            synonyms: string[]
            example: string
        }[]
        example: string
        synonyms: string[]
        antonyms: string[]
    }[]
    sourceUrls: string[]
    license: {
        name: string
        url: string
    }
}