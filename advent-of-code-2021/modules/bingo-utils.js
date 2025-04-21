class BingoBoard {
  score = 0;
  board = [];
  win = false;

  constructor(numbers) {
    for (let numberRow of numbers) {
      this.board.push(numberRow.map((x) => ({ value: x, checked: false })));
    }
  }

  checkNumber(value) {
    this.board = this.board.map((row) =>
      row.map((x) => ({
        value: x.value,
        checked: x.checked || x.value === value,
      }))
    );

    this.calculateScore();
  }

  checkWin() {
    const rowWins =
      this.board.filter((row) => row.filter((x) => x.checked).length === 5)
        .length > 0;

    let colWins = false;

    for (let i = 0; i < 5; i++) {
      if (
        this.board[0][i].checked &&
        this.board[1][i].checked &&
        this.board[2][i].checked &&
        this.board[3][i].checked &&
        this.board[4][i].checked
      ) {
        colWins = true;
        break;
      }
    }
    this.win = rowWins || colWins;
    return rowWins || colWins;
  }

  calculateScore() {
    this.score = this.board
      .flat()
      .filter((x) => !x.checked)
      .reduce((acc, x) => x.value + acc, 0);
  }
}

const getWinnerScore = (data) => {
  const drawnNumbers = data[0].split(",").map(Number);
  let boards = [];
  let currentBoard = [];

  for (let dataRow of data.slice(2, data.length)) {
    if (dataRow.trim()) {
      currentBoard.push(dataRow.split(" ").filter(Boolean).map(Number));
    } else {
      boards = boards.concat(new BingoBoard(currentBoard));
      currentBoard = [];
    }
  }
  
  for (let drawnNumber of drawnNumbers) {
    for (let board of boards) {
      board.checkNumber(drawnNumber);
      if (board.checkWin()) {
        return drawnNumber * board.score;
      }
    }
  }
};

const getLatestWinnerBoardScore = (data) => {
    const drawnNumbers = data[0].split(",").map(Number);
    let boards = [];
    let currentBoard = [];
  
    for (let dataRow of data.slice(2, data.length)) {
      if (dataRow.trim()) {
        currentBoard.push(dataRow.split(" ").filter(Boolean).map(Number));
      } else {
        boards = boards.concat(new BingoBoard(currentBoard));
        currentBoard = [];
      }
    }
    let latestWinnerBoardScore;
    let latestWinnerNumber;

    for (let drawnNumber of drawnNumbers) {
      for (let board of boards) {
        board.checkNumber(drawnNumber);
        if (!board.win && board.checkWin()) {
            latestWinnerNumber = drawnNumber;
            latestWinnerBoardScore = board.score;
        }
      }
    }

    return latestWinnerNumber * latestWinnerBoardScore;
  };

module.exports = {
  getWinnerScore,
  getLatestWinnerBoardScore
};
