const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'input', 'puzzle-1.in');
const puzzleInput = fs.readFileSync(inputPath, 'utf8')
    .trim()
    .split('')
    .map(x => +x);

const image = splitToLayers(puzzleInput, 25, 6);
const checksum = calculateChecksum(image);

console.log(checksum);

function splitToLayers(imageData, width, height) {

    const layerSize = width * height;
    const numberOfLayers = imageData.length / layerSize;

    const layers = [];

    for (let i = 0; i < numberOfLayers; i++) {
        const layerData = imageData.slice(i * layerSize, i * layerSize + layerSize);
        layers.push(layerData);
    }

    return layers;
}

function calculateChecksum(image) {
    let minZeroes = Number.MAX_VALUE;
    let minZeroesIndex = 0;

    image.map((element, index) => {
        const numberOfZeores = element.filter( x => x === 0).length;
        if(numberOfZeores < minZeroes) {
            minZeroes = numberOfZeores;
            minZeroesIndex = index;
        }
    });

    const numberOfOnes = image[minZeroesIndex].filter( x => x === 1).length;
    const numberOfTwoes = image[minZeroesIndex].filter( x => x === 2).length;

    return numberOfOnes * numberOfTwoes;
}
