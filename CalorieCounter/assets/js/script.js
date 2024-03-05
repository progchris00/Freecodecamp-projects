const addEntryButton = document.getElementById("add-entry");
const entryDropdown = document.getElementById("entry-dropdown");
const budgetNumberInput = document.getElementById("budget");
const clearButton = document.getElementById("clear");
const calculateButton = document.querySelector(`button[type="submit"]`);

let isError = false;

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

function getCaloriesFromInputs(list) {
    let calories = 0;

    for (const item of list) {
        const currVal = cleanInputString(item.value);
        const invalidInputMatch = isInvalidInput(currVal);

        if (invalidInputMatch) {
            alert(`Invalid input: ${invalidInputMatch[0]}`);
            isError = true;
            return null;
        }
        calories += Number(currVal);
    }
    return calories;
}

function calculateCalories(e) {
    e.preventDefault();
    isError = false;

    const breakfastCalories = document.querySelectorAll("#breakfast input[type='number'");
    const lunchCalories = document.querySelectorAll("#lunch input[type='number'");
    const dinnerCalories = document.querySelectorAll("#dinner input[type='number'");
    const snacksCalories = document.querySelectorAll("#snacks input[type='number'");
    const exerciseCalories = document.querySelectorAll("#exercise input[type='number'");
}
// Test function
// subtracted total budget calorie to the total calories of inputs 
function calculateTotalCalories() {
    const list = document.querySelectorAll(`.input-container input[type="number"]`);
    const totalCalories = getCaloriesFromInputs(list);
    alert(budgetNumberInput.value - totalCalories);
}

addEntryButton.addEventListener("click", addEntry);

// Test button
calculateButton.addEventListener("click", calculateCalories);