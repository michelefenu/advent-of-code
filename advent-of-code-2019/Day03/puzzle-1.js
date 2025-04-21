const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'input', 'puzzle-1.in');
const puzzleInput = fs.readFileSync(inputPath, 'utf8');

const wireA = puzzleInput
    .split('\n')[0]
    .trim()
    .split(',')
    .map(x => x = {
        direction: x.charAt(0),
        steps: +x.split('').slice(1).join('')
    });

const wireB = puzzleInput
    .split('\n')[1]
    .trim()
    .split(',')
    .map(x => x = {
        direction: x.charAt(0),
        steps: +x.split('').slice(1).join('')
    });

const pathWireA = calculatePath(wireA);
const pathWireB = calculatePath(wireB);

const intersections = [...pathWireA]
    .filter(element => pathWireB.has(element))
    .map(element => x = { x: +element.split(',')[0], y: +element.split(',')[1] });

const closestIntersectionDistance = intersections
    .map(element => x = manhattanDistance({ x: 0, y: 0 }, element))
    .sort((a, b) => a - b);

console.log(closestIntersectionDistance[0]);

function calculatePath(wirePath) {
    const path = new Set();
    const position = { x: 0, y: 0 };

    for (let i = 0; i < wirePath.length; i++) {
        let direction = wirePath[i].direction;
        let distance = wirePath[i].steps;

        for (let step = 0; step < distance; step++) {
            position.x += direction === 'L' ? -1 : direction === 'R' ? 1 : 0;
            position.y += direction === 'U' ? -1 : direction === 'D' ? 1 : 0;

            path.add(`${position.x},${position.y}`);
        }
    };

    return path;
}

function manhattanDistance(pointA, pointB) {
    return Math.abs(pointB.x - pointA.x) + Math.abs(pointB.y - pointA.y);
}
