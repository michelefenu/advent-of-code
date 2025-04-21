const getDifference = (s, t) => {
  for (let char of t.split("")) {
    s = s.replaceAll(char, "");
  }
  return s;
};

const getUniqueOutputValues = (input) => {
  let uniqueNumbersInOutput = 0;

  for (let line of input) {
    const output = line.split("|")[1].trim().split(" ");

    for (let value of output) {
      const n = value.length;
      if (n === 2 || n === 4 || n === 3 || n === 7) {
        uniqueNumbersInOutput++;
      }
    }
  }

  return uniqueNumbersInOutput;
};

const getLedPositions = (input) => {

  /**
   *    000
   *   5   1
   *   5   1
   *   5   1
   *    666
   *   4   2
   *   4   2
   *   4   2
   *    333
   */
  const NUMBER_CONF = [
    "012345",
    "12",
    "01346",
    "01236",
    "1256",
    "02356",
    "023456",
    "012",
    "0123456",
    "012356",
  ];

  let total = 0;
  for (let line of input) {
    const submarineConfiguration = [];
    const ledPositions = [null, null, null, null, null, null, null];

    let sub = line.split("|")[0].trim().split(" ");
    const output = line.split("|")[1].trim().split(" ");
    submarineConfiguration[1] = sub.filter((x) => x.length === 2)[0];
    submarineConfiguration[4] = sub.filter((x) => x.length === 4)[0];
    submarineConfiguration[7] = sub.filter((x) => x.length === 3)[0];
    submarineConfiguration[8] = sub.filter((x) => x.length === 7)[0];

    // Trovo il led superiore con differenza tra 1 e 7
    ledPositions[0] = getDifference(
      submarineConfiguration[7],
      submarineConfiguration[1]
    );

    // tengo da parte i numeri di 5 cifre e rimuovo d
    const fiveDigitNumbers = sub
      .filter((x) => x.length === 5)
      .map((x) => x.replace(ledPositions[0], ""));
    // Rimuovo il led da tutti
    sub = sub.map((x) => x.replace(ledPositions[0], ""));
    // Differenza tra il 4 e gli input con 5 cifre
    const fiveThreeCandidate = [];

    for (let fiveLedNumber of fiveDigitNumbers) {
      const differenceDigits = getDifference(
        fiveLedNumber,
        submarineConfiguration[4]
      );

      if (differenceDigits.length === 1) {
        ledPositions[3] = differenceDigits;
        fiveThreeCandidate.push(fiveLedNumber);
      } else {
        submarineConfiguration[2] = fiveLedNumber;
        ledPositions[4] = differenceDigits;
      }
    }

    ledPositions[4] = getDifference(ledPositions[4], ledPositions[3]);

    // Rimuovo il led da tutti
    sub = sub.map((x) => x.replace(ledPositions[3], ""));

    submarineConfiguration[3] = fiveThreeCandidate.filter(
      (x) => getDifference(x, submarineConfiguration[2]).length === 1
    )[0];
    submarineConfiguration[5] = fiveThreeCandidate.filter(
      (x) => getDifference(x, submarineConfiguration[2]).length === 2
    )[0];

    ledPositions[2] = getDifference(
      submarineConfiguration[3],
      submarineConfiguration[2]
    );

    sub = sub.map((x) => x.replace(ledPositions[2], ""));

    ledPositions[5] = getDifference(
      submarineConfiguration[5],
      submarineConfiguration[3]
    );

    sub = sub.map((x) => x.replace(ledPositions[5], ""));

    ledPositions[1] = getDifference(submarineConfiguration[1], ledPositions[2]);
    ledPositions[6] = getDifference(
      "abcdefg",
      ledPositions.filter(Boolean).join("")
    );

    const numberConf = NUMBER_CONF.map((x) =>
      x
        .split("")
        .map((x) => ledPositions[x])
        .join("")
    );

    let outputNumber = "";
    for (let line of output) {
      outputNumber += numberConf.indexOf(
        numberConf.filter(
          (x) => x.split("").sort().join("") === line.split("").sort().join("")
        )[0]
      );
    }
    total += +outputNumber;
  }

  return total;
};

module.exports = {
  getUniqueOutputValues,
  getLedPositions,
};
