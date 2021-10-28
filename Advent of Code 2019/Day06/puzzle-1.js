const fs = require('fs');
const path = require('path');


const inputPath = path.join(__dirname, 'input', 'puzzle-1.in');
const puzzleInput = fs.readFileSync(inputPath, 'utf8')
    .trim()
    .split('\r\n')
    .map(x => x = {
        name: x.split(')')[0],
        directOrbitObject: x.split(')')[1],
    });

const centerOfMass = 'COM';
const orbitTree = [];
buildOrbitTree(centerOfMass);

const objectNames = orbitTree.map(x => x.name);

const pathLength = objectNames.reduce((accumulator, value) => {
        return calculatePathLengthToRoot(value, 0) + accumulator;
    }, 0);


console.log(pathLength);

function buildOrbitTree(nodeName, parent) {

    if (!nodeName) {
        return;
    }

    const node = {
        name: nodeName,
        parent: parent,
        descendants: puzzleInput.filter(x => x.name === nodeName).map(x => x.directOrbitObject),
    };

    orbitTree.push(node);

    node.descendants.map(x => buildOrbitTree(x, nodeName));
}

function calculatePathLengthToRoot(nodeName, length) {
    const node = getNode(orbitTree, nodeName);

    if (!node.parent) {
        return 0;
    }
    return 1 + calculatePathLengthToRoot(node.parent, length);
}

function getNode(orbitTree, nodeName) {
    return orbitTree.find(x => x.name === nodeName);
}

