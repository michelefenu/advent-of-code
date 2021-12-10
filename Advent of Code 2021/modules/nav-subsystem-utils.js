const removeCorruptedLines = (input) => {
  const errors = [];
  const corruptedLines = [];

  const pairs = {
    ")": "(",
    "]": "[",
    "}": "{",
    ">": "<",
  };

  const scores = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
  };

  for (let [index, chunk] of input.entries()) {
    const tokens = [];
    for (let token of chunk.split("")) {
      if (token === "(" || token === "[" || token === "{" || token === "<") {
        tokens.push(token);
      } else {
        const lastToken = tokens.pop();
        if (lastToken !== pairs[token]) {
          errors.push(token);
          corruptedLines.push(index);
          break;
        }
      }
    }
  }

  const errorScore = errors.reduce((acc, value) => acc + scores[value], 0);
  const filteredLines = input.filter((value, index) => !corruptedLines.includes(index));

  return { filteredLines, errorScore };
};

const fixIncomplete = (input) => {
  const completionStrings = [];
  const scores = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
  };

  const pairs = {
    "(": ")",
    "[": "]",
    "{": "}",
    "<": ">",
  };

  const incompleteLines = removeCorruptedLines(input).filteredLines;

  for (let chunk of incompleteLines) {
    const tokens = [];
    for (let token of chunk.split("")) {
      if (token === "(" || token === "[" || token === "{" || token === "<") {
        tokens.push(token);
      } else {
        tokens.pop();
      }
    }

    completionStrings.push(tokens.reverse().map((x) => pairs[x]));
  }

  const completionScores = [];

  for (completionString of completionStrings) {
    const completionScore = completionString.reduce((acc, value) => acc * 5 + scores[value], 0);
    completionScores.push(completionScore);
  }

  return completionScores.sort((a,b) => a- b)[Math.floor(completionScores.length / 2)]
};

module.exports = {
  removeCorruptedLines,
  fixIncomplete,
};
