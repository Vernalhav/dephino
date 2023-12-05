/**
 * @template T
 * @param {T[]} array 
 * @return {T}
 */
function choice(array) {
    const index = randInt(0, array.length)
    return array[index]
}

/**
 * Pseudo-random int between [min, max)
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}