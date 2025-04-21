const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'input', 'puzzle-1.in');
const puzzleInput = fs.readFileSync(inputPath, 'utf8').trim();

const lowerBound = +puzzleInput.split('-')[0];
const upperBound = +puzzleInput.split('-')[1];

let numberOfMatchingPasswords = 0;
for (let i = lowerBound; i <= upperBound; i++) {
    if (passwordMatchCriteria(`${i}`)) {
        numberOfMatchingPasswords++
    }
}

console.log(numberOfMatchingPasswords)

function passwordMatchCriteria(password) {
    const chars = password.split('');
    return exactlyTwoAdjacentValuesAreEqual(chars) && digitsNeverDecrease(chars);
}

function exactlyTwoAdjacentValuesAreEqual(chars) {
    return chars.filter((element, index, array) =>
        element !== array[index - 1] && element === array[index + 1] && element !== array[index + 2]
    ).length > 0;
}

function digitsNeverDecrease(chars) {
    return chars.filter((element, index, array) =>
        element > array[index + 1]
    ).length === 0;
}
