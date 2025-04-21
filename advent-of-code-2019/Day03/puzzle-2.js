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

const intersections = [...pathWireA.entries()]
    .filter(([element]) => pathWireB.has(element))
    .map(([position, steps]) => pathWireB.get(position) + steps)
    .sort((a, b) => a - b)[0];

console.log(intersections);

function calculatePath(wirePath) {
    const path = new Map();
    const position = { x: 0, y: 0 };
    let totalSteps = 0;

    for (let i = 0; i < wirePath.length; i++) {
        let direction = wirePath[i].direction;
        let distance = wirePath[i].steps;

        for (let step = 0; step < distance; step++) {
            position.x += direction === 'L' ? -1 : direction === 'R' ? 1 : 0;
            position.y += direction === 'U' ? -1 : direction === 'D' ? 1 : 0;
            totalSteps++;
            path.set(`${position.x},${position.y}`, totalSteps);
        }
    };

    return path;
}
