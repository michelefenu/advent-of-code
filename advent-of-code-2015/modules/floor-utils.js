function getFloor(directions) {
    let floor = 0;

    for(let direction of directions) {
        switch(direction) {
            case '(' :
                floor++;
                break;
            case ')' :
                floor--;
                break;
        }
    }
    return floor;
}

function getFirstBasementAccess(directions) {
    let floor = 0;

    for(const [index, direction] of directions.entries()) {
        switch(direction) {
            case '(' :
                floor++;
                break;
            case ')' :
                floor--;
                break;
        }

        if(floor === -1) {
            return index + 1;
        }
    }

    throw new Error('No basement access found');
}

module.exports = {
    getFloor,
    getFirstBasementAccess
}