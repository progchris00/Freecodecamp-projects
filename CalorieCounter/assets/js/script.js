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
    const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
    const entryNumber = document.querySelectorAll(`#${entryDropdown.value} input[type="number"]`).length + 1;
    const HTMLString = `
    <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
    <input id="${entryDropdown.value}-${entryNumber}-name" type="text" placeholder="Name">
    <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
    <input id="${entryDropdown.value}-${entryNumber}-calories" type="number" placeholder="Calories">`;
    targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);
}

addEntryButton.addEventListener("click", addEntry);
