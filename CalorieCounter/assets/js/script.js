const calculateButton = document.getElementById("calorie-counter");

const budgetNumberInput = document.getElementById("budget");
const entryDropdown = document.getElementById("entry-dropdown");
const addEntryButton = document.getElementById("add-entry");
const clearButton = document.getElementById("clear");
const output = document.getElementById('output');

const labelInput = document.querySelector(".label-input");
let remainingCalories;
let consumedCalories;
let exerciseCalories;

let isError = false;

// This will count the number of entries. Hide output if it is equals to 0
let entryCount = 0;

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
    <div class="label-input-container">
        <div class="label-input">
            <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
            <input id="${entryDropdown.value}-${entryNumber}-name" type="text" placeholder="Name">
        </div>
        <div class="label-input">
            <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
            <input id="${entryDropdown.value}-${entryNumber}-calories" type="number" placeholder="Calories" min="0">
        </div>
        <div class="submitted-value hide">
            <span class="name"></span>
            <span class="icons hide">
                <span class="current-value"></span>
                <button type="button" class="edit invisible" onclick="editEntry(this)"><img src="assets/images/edit.png"></button>
                <button type="button" class="delete invisible" onclick="deleteThisEntry(this)"><img src="assets/images/delete.png"></button>
            </span>
        </div>
    </div>`;
    targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);

    entryCount++;
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
    const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);
    
    exerciseCalories = getCaloriesFromInputs(exerciseCalorieInputs);
    
    consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
    remainingCalories = budgetCalories - consumedCalories + exerciseCalories;

    const surplusOrDeficit = remainingCalories < 0 ? "Surplus" : "Deficit";

    const numberInputs = document.querySelectorAll(".label-input input[type=number]");
    const inputValue = document.querySelectorAll(".current-value");
    const nameInputs = document.querySelectorAll(".label-input input[type=text]");
    const nameValue = document.querySelectorAll(".name");

    const submittedValue = document.querySelectorAll(".submitted-value");
    for (let index = 0; index < submittedValue.length; index++) {
        submittedValue[index].classList.remove("hide"); 
        submittedValue[index].classList.add("flex"); 
    }

    const labelInput = document.querySelectorAll(".label-input");
    for (let index = 0; index < labelInput.length; index++) {
        labelInput[index].classList.add("hide");
    }

    for (let index = 0; index < nameValue.length; index++) {
        nameValue[index].innerText = `${nameInputs[index].value}`;
        inputValue[index].innerText = `${numberInputs[index].value}`;
    }

    const icons = document.querySelectorAll(".icons");
    for (let index = 0; index < icons.length; index++) {
        icons[index].classList.remove("hide");
    }

    output.innerHTML = `
    <span id="output-calorie" class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
    <hr>
    <p>${budgetCalories} Calories Budgeted</p>
    <p id="consumed">${consumedCalories} Calories Consumed</p>
    <p id="burned">${exerciseCalories} Calories Burned</p>
    `
    output.classList.remove("hide");
}

function clearForm() {
    const inputContainers = document.querySelectorAll(".input-container");

    for (const container of inputContainers) {
        container.innerHTML = '';
    }

    budgetNumberInput.value = '';
    output.innerText = '';
    output.classList.add("hide");
}

function editEntry(button) {
    const inputToShow = button.closest('.submitted-value');
    inputToShow.classList.remove("flex");
    inputToShow.classList.add("hide");

    const closestLabelInputContainer = button.closest('.label-input-container');
    const labelInput = closestLabelInputContainer.querySelectorAll(".label-input");
    for (let index = 0; index < labelInput.length; index++) {
        labelInput[index].classList.remove("hide");
    }
}

function deleteThisEntry(button) {
    const outputDiv = document.querySelector("#output");
    const divToRemove = button.closest('.label-input-container');
    const parentElement = button.closest('.icons');
    const currentValue = parentElement.querySelector(".current-value").innerText;
    const outputCalorie = outputDiv.querySelector("#output-calorie"); 
    const consumed = output.querySelector("#consumed");
    const burned = output.querySelector("#burned");
    const closestFieldset = button.closest(".fieldset").getAttribute("id");

    if (closestFieldset === "exercise") {
        remainingCalories -= Number(currentValue);
        exerciseCalories -= Number(currentValue);
        burned.innerText = `${exerciseCalories} Calories Burned`;
    } else {
        remainingCalories += Number(currentValue);
        consumedCalories -= Number(currentValue);
    }

    const surplusOrDeficit = remainingCalories < 0 ? "Surplus" : "Deficit";

    consumed.innerText = `${consumedCalories} Calories Consumed`;
    outputCalorie.innerText = `${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}`;
    outputCalorie.classList.replace(outputCalorie.classList[0], surplusOrDeficit.toLowerCase());

    divToRemove.remove();

    entryCount -= 1;

    if (entryCount === 0 ) {
        output.classList.add("hide");
    }
}

// Events
addEntryButton.addEventListener("click", addEntry);
calculateButton.addEventListener("submit", calculateCalories);
clearButton.addEventListener("click", clearForm);


// Deleting exercise entry
// Bug description: unlike other entries (breakfast, lunch, dinner), the entries added
// to exercise field will be added to the calories burned. 
// If an entry from that field is deleted, the calorie is subtracted to the calories consumed
// It should be subtracted in calories burned.

// Deleting an entry in exercise field should
// 1. subtract from calories burned
// 2. subtract from output calorie