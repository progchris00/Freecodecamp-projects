const addEntryButton = document.getElementById("add-entry");
const entryDropdown = document.getElementById("entry-dropdown");

function cleanInputString(str) {
    const regex = /[+-\s]/g;
    return str.replace(regex, '');
}

function isInvalidInput(str) {
    const regex = /\d+e\d+/i;
    return str.match(regex);
}

function addEntry() {
    const currentInput = document.querySelector(`#${entryDropdown.value} .input-container`);
    const inputCounts = document.querySelectorAll(`#${entryDropdown.value} input[type="number"]`).length + 1;
    const HTMLString = `
    <label for="${entryDropdown.value}-${inputCounts}-name">Entry ${inputCounts} Name</label>
    <input id="${entryDropdown.value}-1-name" type="text" placeholder="Name">
    <label for="${entryDropdown.value}-1-calories">Entry 1 Calories</label>
    <input id="${entryDropdown.value}-1-calories" type="number" placeholder="Name">`;
    currentInput.innerHTML += HTMLString;
}

addEntryButton.addEventListener("click", addEntry);

