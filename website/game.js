window.onload = main

const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/"


async function main() {
    const response = await fetch(API_URL)
    const data = await response.json()
    console.log(data)
}