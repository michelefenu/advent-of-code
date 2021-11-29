const isNiceString = (inputString) => {
    const matchVovels = /((a|e|i|o|u)+[a-z]*){3}/gm;
    const matchDoubleLetter = /([a-z])\1/gm;
    const matchForbidden = /(ab|cd|pq|xy)/gm;

    return inputString.match(matchVovels) && inputString.match(matchDoubleLetter) && !inputString.match(matchForbidden);
}

const isVeryNiceString = (inputString) => {
    const matchDoublePair = /([a-z]{2})[a-z]*\1/gm;
    const matchRepeatedLetter = /([a-z])[a-z]\1/gm;

    return inputString.match(matchDoublePair) && inputString.match(matchRepeatedLetter);
}

module.exports = {
    isNiceString, isVeryNiceString
};