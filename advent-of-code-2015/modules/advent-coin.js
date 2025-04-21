const md5 = require("crypto-js/md5");

const mine = function (secret, difficulty) {
  let paddingNumber = 0;

  while (
    md5(`${secret}${paddingNumber}`).toString().substr(0, difficulty) !==
    new Array(difficulty + 1).join("0")
  ) {
    paddingNumber++;
  }

  return paddingNumber;
};

module.exports = {
  mine,
};
