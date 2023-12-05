window.onload = main

let words = []

async function newWord() {
}

async function main() {
    words = await getWords()
    console.log(words)
}