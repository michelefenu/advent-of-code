const OPPONENT = {
    'A': 0,
    'B': 1,
    'C': 2,
}

const PLAYER = {
    'X': 0,
    'Y': 1,
    'Z': 2,
}

const part1 = (input) => {
    const points = input
        .map(x => getPoints(x.p1, x.p2))
        .reduce((acc, v) => acc + v, 0);

    return points;
}

const part2 = (input) => {
    const points = input
        .map(x => getPoints2(x.p1, x.p2))
        .reduce((acc, v) => acc + v, 0);

    return points;
}

function getPoints(p1, p2) {
    const p1Score = OPPONENT[p1];
    const p2Score = PLAYER[p2];

    if (p1Score === p2Score) {
        return p2Score + 1 + 3; // Pareggio
    } else if ((p1Score + 1) % 3 === p2Score) {
        return p2Score + 1 + 6; // Vittoria
    } {
        return p2Score + 1; // Sconfitta
    }
}

function getPoints2(p1, p2) {
    const p1Score = OPPONENT[p1];

    switch (p2) {
        case 'X':
            const outcome = p1Score - 1 + 1;
            return outcome !== 0 ? outcome  : 3; // Sconfitta
        case 'Y':
            return p1Score + 1 + 3; // Pareggio
        case 'Z':
            return (p1Score + 1) % 3 + 1  + 6; // Vittoria
    }
}

module.exports = {
    part1, part2
}