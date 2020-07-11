const search = document.getElementById('search');
const matchList = document.getElementById('match-list');


//search states.json and filter
const searchStates = async searchText => {
	const response = await fetch('https://cors-anywhere.herokuapp.com/http://localhost:5000/');
    const states = await response.json();
	console.log(states);	
	//get Matches to current text input
	let matches = states.filter(state => {
		const regex = new RegExp(`^${searchText}`, 'gi');
		return states[0].match(regex);
	});
	if (searchText.length == 0) {
		matches = [];
		matchList.innerHTML = '';
	}
	outputHtml(matches);
};

//show resulsts
const outputHtml = matches => {
	if (matches.length > 0) {
		const html = matches.map(match => `
			<div>
				<h4>${match}</h4>
			</div>
		`).join('');
		matchList.innerHTML = html;
	}
}

search.addEventListener('input', () => searchStates(search.value));

