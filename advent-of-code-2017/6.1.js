(function(){
	let blocks = document.getElementsByTagName('pre')[0].innerText.split('\t').map(x => +x);
	let memoryConf = [];
	let steps = 0;
 	let max;
	let originalSum = blocks.reduce((a, b) => a + b, 0);

	while(memoryConf.indexOf(blocks.join(' ')) === -1) {

		memoryConf.push(blocks.join(' '));
        max = Math.max(...blocks);

        let indexOfMax = blocks.indexOf(max);
		blocks[indexOfMax] = 0;

		while(max > 0) {
			indexOfMax++;
			blocks[indexOfMax % blocks.length]++;
			max--;
		}
		steps++; 
		if(originalSum != blocks.reduce((a, b) => a + b, 0))
			break;
    }

	console.log(steps);
	console.log(max);

})();