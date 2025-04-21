let sign = 1;
let c = 1;
let input = 368078;
let x = 0;
let y = 0;
let i = 1;

let matrix = [];
matrix[0] = [];
matrix[0][0] = 1;

while (true) {

  for (var j = 0; j < c; j++ , i++) {
    x = x + sign;

    if (!matrix[x]) matrix[x] = [];

    let sumN = sumNeightbours(matrix, x, y);
    matrix[x][y] = sumN;


    if (sumN > input) {
      console.log(sumN);
      throw new Error();
    }
  }

  for (var j = 0; j < c; j++ , i++) {
    y = y + sign;

    if (!matrix[x]) matrix[x] = [];

    let sumN = sumNeightbours(matrix, x, y);
    matrix[x][y] = sumN;
    

    if (sumN > input) {
      console.log(sumN);
      throw new Error();
    }
  }

  c = c + 1;
  sign = sign * -1;
}

function sumNeightbours(matrix, x, y) {
  let sum = 0;
  if (matrix[x + 1] && (matrix[x + 1][y] !== undefined)) { sum = sum + matrix[x + 1][y];          }
  if (matrix[x + 1] && (matrix[x + 1][y + 1] !== undefined)) { sum = sum + matrix[x + 1][y + 1]; }
  if (matrix[x] && (matrix[x][y + 1] !== undefined)) { sum = sum + matrix[x][y + 1];             }
  if (matrix[x - 1] && (matrix[x - 1][y + 1] !== undefined)) { sum = sum + matrix[x - 1][y + 1]; }
  if (matrix[x - 1] && (matrix[x - 1][y] !== undefined)) { sum = sum + matrix[x - 1][y];           }
  if (matrix[x - 1] && (matrix[x - 1][y - 1] !== undefined)) { sum = sum + matrix[x - 1][y - 1]; }
  if (matrix[x] && (matrix[x][y - 1] !== undefined)) { sum = sum + matrix[x][y - 1];  }
  if (matrix[x + 1] && (matrix[x + 1][y - 1] !== undefined)) { sum = sum + matrix[x + 1][y - 1]; }

  return sum;
}
