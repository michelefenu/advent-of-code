import fs from 'node:fs';


const checkValidity = (value, rules, update) => {
	const invalidBefore = rules[value];

	for(let i=0; update[i] !== value; i++) {
		if(invalidBefore.includes(update[i])) {
			return false;
		}
	}

	return true;
}

fs.readFile('input.txt', 'utf8', (err, data) => {
	const rules = new Array(100).fill([]);
	const updates = [];
	const validUpdates = [];

	const rulesList = data.split('\n\n')[0].split('\n');
	const pagesList = data.split('\n\n')[1].trim().split('\n');

	for(let rule of rulesList) {
		const index = +rule.split('|')[0].trim();
		const page = +rule.split('|')[1].trim();

		rules[index] = [...rules[index], page];
	}


	for(let page of pagesList) {
		updates.push(page.split(',').map(x => +x));
	}

	for(let update of updates) {
		let valid = true;
		for(let value of update) {
			if(!checkValidity(value, rules, update)) {
				valid = false;
				break;
			}
		}

		if(valid) {
			validUpdates.push(update);
		}	
	}	

	console.log('The checksum is: ', 	validUpdates.map((x) => x[Math.floor(x.length / 2)]).reduce((acc, val) => acc + val, 0));
});
