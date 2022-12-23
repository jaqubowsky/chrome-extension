const buttonEl = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtnEl = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
let myLeads = [];

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
	myLeads = leadsFromLocalStorage;
	render(myLeads);
}

function render(leads) {
	let listItems = "";
	for (let i = 0; i < leads.length; i++) {
		listItems += `<li>
											<a target='_blank' href=${leads[i]}>
													${leads[i]}
											</a>
									</li>`;
	}

	ulEl.innerHTML = listItems;
}

buttonEl.addEventListener("click", function() {
	myLeads.push(inputEl.value);
	inputEl.value = "";
	localStorage.setItem("myLeads", JSON.stringify(myLeads));
	render(myLeads);
});

deleteBtnEl.addEventListener("dblclick", function() {
	myLeads = [];
	localStorage.clear();
	ulEl.innerHTML = "";
});

tabBtn.addEventListener("click", function() {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
		myLeads.push(tab[0].url);
		localStorage.setItem("myLeads", JSON.stringify(myLeads));
		render(myLeads);
	});
});
