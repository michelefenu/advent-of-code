(function() {
	let lines = document.getElementsByTagName('pre')[0].innerText.split('\n').slice(0,1452);
	let processNames = lines.map((x) => x.split(' ')[0]);
	let references = lines.map((x) => x.split('-> ')[1] && x.split('-> ')[1].split(', '))
	let flattenedReferences = [].concat.apply([], references.filter(x => typeof x !== "undefined"));

	console.log(processNames.filter(x => flattenedReferences.indexOf(x) === -1));
	console.log();
})();