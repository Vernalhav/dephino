window.onload = main

async function main() {
    const words = await getWords()
    console.log(words)
}