import fs from 'node:fs';


const checkValidity = (value, rules, update) => {
	const invalidBefore = rules[value];

	for(let i=0; update[i] !== value; i++) {
		if(invalidBefore.includes(update[i])) {
			return { valid: false, errIndex: i };
		}
	}

	return { valid: true };
}

/*
 *	1. Find unordered page
 *	2. Put after value
 *	3. Repeat until sorted
 */
const fixSorting = (update, rules) => {
	let allValid = false;

	while(!allValid) {
		for(let index in update) {
			const res = checkValidity(update[index], rules, update);
	
			if(!res.valid) {
				const num = update.splice(res.errIndex, 1)[0];
				update.splice(index, 0, num);
				allValid = false;
				break;
			} else {
				allValid = true;
			}
		}
	}

	return update;
};

fs.readFile('input.txt', 'utf8', (err, data) => {
	const rules = new Array(100).fill([]);
	const updates = [];
	const invalidUpdates = [];
	const validUpdates = [];
	const sortedUpdates = [];

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
			if(!checkValidity(value, rules, update).valid) {
				valid = false;
				break;
			}
		}

		if(!valid) {
			invalidUpdates.push(update);
		}	
	}	
	
	for(let update of invalidUpdates) {
		sortedUpdates.push(fixSorting(update, rules));
	}
	
	for(let update of sortedUpdates) {
		validUpdates.push(update[Math.floor(update.length / 2)]);
	}

	console.log('The checksum is: ', validUpdates.reduce((acc, val) => acc + val, 0));
});
