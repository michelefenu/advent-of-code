const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'input', 'puzzle-1.in');
const puzzleInput = fs.readFileSync(inputPath, 'utf8')
    .trim()
    .split('')
    .map(x => +x);

const image = splitToLayers(puzzleInput, 25, 6);
const decodedImage = decodeImage(image);

console.log(decodedImage.join(''));

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

function decodeImage(image) {
    const decodedImage = [];
    
    for (let i = 0; i < image[0].length; i++) {
        for (let j = 0; j < image.length; j++) {
 
            if (image[j][i] !== 2) {
                decodedImage.push(image[j][i]);
                break;
            }
        }
    }

    return decodedImage;
}
