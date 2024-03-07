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

    const breakfastCalorieInputs = document.querySelectorAll("#breakfast input[type='number'");
    const lunchCalorieInputs = document.querySelectorAll("#lunch input[type='number'");
    const dinnerCalorieInputs = document.querySelectorAll("#dinner input[type='number'");
    const snacksCalorieInputs = document.querySelectorAll("#snacks input[type='number'");
    const exerciseCalorieInputs = document.querySelectorAll("#exercise input[type='number'");

    const breakfastCalories = getCaloriesFromInputs(breakfastCalorieInputs);
    const lunchCalories = getCaloriesFromInputs(lunchCalorieInputs);
    const dinnerCalories = getCaloriesFromInputs(dinnerCalorieInputs);
    const snacksCalories = getCaloriesFromInputs(snacksCalorieInputs);
    const exerciseCalories = getCaloriesFromInputs(exerciseCalorieInputs);
    const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

    const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
    const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;

    const surplusOrDeficit = remainingCalories < 0 ? "Surplus" : "Deficit";

    output.innerHTML = `
    <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
    <hr>
    <p>${budgetCalories} Calories Budgeted</p>
    <p>${consumedCalories} Calories Consumed</p>
    <p>${exerciseCalories} Calories Burned</p>
    `

    output.classList.remove('hide');
}

function clearForm() {
    const inputContainers = document.querySelectorAll(".input-container");

    for (const container of inputContainers) {
        container.innerText = '';
    }

    budgetNumberInput.value = '';
    output.innerText = '';
    output.classList.add("hide");

}

// Events
addEntryButton.addEventListener("click", addEntry);
calculateButton.addEventListener("click", calculateCalories);
clearButton.addEventListener("click", clearForm);
