const currentRollElement = document.getElementById("current-roll");
const rollHistoryBodyElement = document.getElementById("roll-history-body");
const runningTotalElement = document.getElementById("running-total");
const confettiElement = document.getElementById("confetti");

function rollDie() {
	const roll = Math.floor(Math.random() * 6) + 1;
	const date = new Date().toLocaleString();

	currentRollElement.textContent = `You rolled: ${roll}`;
	addRowToRollHistory(roll, date);
	updateRunningTotal(roll);

	if (roll === 6) {
		showConfetti();
	} else {
		hideConfetti();
	}
}

function addRowToRollHistory(roll, date) {
	const row = document.createElement("tr");
	const numberCell = document.createElement("td");
	const dateCell = document.createElement("td");

	numberCell.textContent = roll;
	dateCell.textContent = date;

	row.appendChild(numberCell);
	row.appendChild(dateCell);
    rollHistoryBodyElement.insertBefore(row, rollHistoryBodyElement.firstChild);
    
    if (rollHistoryBodyElement.childElementCount > 10) {
        rollHistoryBodyElement.removeChild(rollHistoryBodyElement.lastChild);
    }

    localStorage.setItem("history", rollHistoryBodyElement.innerHTML);
}

function showConfetti() {
	confettiElement.classList.remove("hidden");
}

function hideConfetti() {
	confettiElement.classList.add("hidden");
}

function addToTotal(value) {
	const currentTotal = parseInt(runningTotalElement.textContent);
	runningTotalElement.textContent = currentTotal + value;
}

function subtractFromTotal(value) {
	const currentTotal = parseInt(runningTotalElement.textContent);
	runningTotalElement.textContent = currentTotal - value;
}

function updateRunningTotal(roll) {
	const currentTotal = parseInt(runningTotalElement.textContent);
	runningTotalElement.textContent = currentTotal + roll;
}

const storedTotal = localStorage.getItem("total");
const storedHistory = localStorage.getItem("history");

if (storedTotal) {
	runningTotalElement.textContent = storedTotal;
}

if (storedHistory) {
	rollHistoryBodyElement.innerHTML = storedHistory;
}