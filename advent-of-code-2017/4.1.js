var passphrases = document.getElementsByTagName('pre')[0].innerText.split('\n');

var validPassphrases = passphrases.filter(function(passphrase) {
  let words = passphrase.split(' ');
  return words.filter(function(x) { 
    return (words.splice(words.indexOf(x), 1).indexOf(x) !== -1).length === 0;
  }).length === 0;
});

console.log(validPassphrases.length);