const countHouses = (map) => {
    let visitedHouses = 0;

    for(let rowIndex in map) {
        for(let houseIndex in map[rowIndex]) {
            if(!!map[rowIndex][houseIndex]) {
                visitedHouses++;
            }
        }
    }

    return visitedHouses;
}

function createMap (directions, map = [[1]]) {
    const currentPosition = { x: 0, y: 0 };

    for(let direction of directions) {
        switch(direction) {
            case '^':
                currentPosition.y--;
                break;
            case 'v':
                currentPosition.y++;
                break;
            case '<':
                currentPosition.x--;
                break;
            case '>':
                currentPosition.x++;
                break;
        }

        map[currentPosition.x] = map[currentPosition.x] || [];
        map[currentPosition.x][currentPosition.y] = map[currentPosition.x][currentPosition.y] ? map[currentPosition.x][currentPosition.y] + 1 : 1;    
    }
    return map;
}

module.exports = {
    countHouses, createMap
}