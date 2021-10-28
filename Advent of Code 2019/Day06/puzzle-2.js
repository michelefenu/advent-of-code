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

const santaPathToRoot = new Set(getPathToRoot('SAN', []));
const myPathToRoot = new Set(getPathToRoot('YOU', []));

const pathTowardsMe = [...myPathToRoot].filter(x => !santaPathToRoot.has(x));
const pathTowardsSanta = [...santaPathToRoot].filter(x => !myPathToRoot.has(x));

const pathLengthToSanta = pathTowardsMe.length + pathTowardsSanta.length - 2;
console.log(pathLengthToSanta);

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

function getPathToRoot(nodeName, path) {
    const node = getNode(orbitTree, nodeName);
    path.push(node.name);

    if (!node.parent) {
        return path;
    }

    return getPathToRoot(node.parent, path);
}

function getNode(orbitTree, nodeName) {
    return orbitTree.find(x => x.name === nodeName);
}
