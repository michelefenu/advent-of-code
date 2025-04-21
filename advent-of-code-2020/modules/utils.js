/**
 * arr: Number[] Array of Numbers
 * targetValue: Number Target value
 * 
 * Initialize an empty hash table s.
 * Do following for each element A[i] in A[] 
 *      If s[x – A[i]] is set then print the pair (A[i], x – A[i])
 *      Insert A[i] into s
 */
const findPairThatSumsTo = (arr, targetValue) => {
    // value: { index, value }
    const searchTable = {}

    for (const [index, value] of arr.entries()) {
        const searchResult = searchTable[targetValue - value]
        if (searchResult) {
            return [
                { index, value },
                { index: searchResult.index, value: searchResult.value }
            ]
        } else {
            searchTable[value] = { index, value }
        }
    }

    return []
}

/**
 * arr: Number[] Array of Numbers
 * targetValue: Number Target value
 */
const findThreeValuesThatSumsTo = (arr, targetValue) => {
    // arr[index1] + arr[index2]: [ index1, index2 ]
    const sumTable = {}

    // Store all 2 values sums in a hashtable
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            sumTable[arr[i] + arr[j]] = [i, j]
        }
    }

    // Search if target - value is in table
    for (const [index, value] of arr.entries()) {
        const searchResult = sumTable[targetValue - value];

        // If value is found exclude same indexes
        if (searchResult && searchResult[0] !== index && searchResult[1] !== index) {
            return [
                { index: searchResult[0], value: arr[searchResult[0]] },
                { index: searchResult[1], value: arr[searchResult[1]] },
                { index, value }
            ]
        }
    }

    return []
}

module.exports = {
    findPairThatSumsTo,
    findThreeValuesThatSumsTo
}