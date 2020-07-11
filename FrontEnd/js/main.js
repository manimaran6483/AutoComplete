const search = document.getElementById('search');
const matchList = document.getElementById('match-list');
var i;
const searchStates = async searchText => {
	const response = await fetch('https://cors-anywhere.herokuapp.com/https://manimaran.pythonanywhere.com/');
	states = await response.json();
	console.log(states);
	//get Matches to current text input
	let matches = states.filter(state => {
		const regex = new RegExp(`^${searchText}`, 'gi');
		return state.name.match(regex);
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
		const html = matches.map(match =>
			`<p id="sug" onclick="change(${JSON.stringify(match.name)})">
			${JSON.stringify(match.name)}
		</p>`
		).join('');

		matchList.innerHTML = html;
	}
}
//fetchapi();
search.addEventListener('input', () => searchStates(search.value));

function change(value) {
	document.getElementById("sug").value = value;
}
