const calculateButton = document.getElementById("calorie-counter");

const budgetNumberInput = document.getElementById("budget");
const entryDropdown = document.getElementById("entry-dropdown");
const addEntryButton = document.getElementById("add-entry");
const clearButton = document.getElementById("clear");
const output = document.getElementById('output');

const labelInput = document.querySelector(".label-input");

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
    <div class="label-input-container">
        <div class="label-input">
            <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
            <input id="${entryDropdown.value}-${entryNumber}-name" type="text" placeholder="Name">
        </div>
        <div class="label-input">
            <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
            <input id="${entryDropdown.value}-${entryNumber}-calories" type="number" placeholder="Calories" min="0">
        </div>
        <div class="submitted-value">
            <span class="name"></span>
            <span class="icons hide">
                <span class="current-value"></span>
                <button class="edit invisible"><img src="assets/images/edit.png"></button>
                <button class="delete invisible"><img src="assets/images/delete.png"></button>
            </span>
        </div>
    </div>`;
    targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);
    editEntry();
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

    const numberInputs = document.querySelectorAll(".label-input input[type=number]");
    const inputValue = document.querySelectorAll(".current-value");
    const nameInputs = document.querySelectorAll(".label-input input[type=text]");
    const nameValue = document.querySelectorAll(".name");
    
    // const submittedValue = document.querySelector(".submitted-value");
    // submittedValue.classList.remove("hide"); 

    const labelInputs = document.querySelectorAll(".label-input");
    for (let index = 0; index < labelInputs.length; index++) {
        labelInputs[index].style.display = "none";
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
    <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
    <hr>
    <p>${budgetCalories} Calories Budgeted</p>
    <p>${consumedCalories} Calories Consumed</p>
    <p>${exerciseCalories} Calories Burned</p>
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

function enableEditDeleteButton() {
    editEntry();
    deleteEntry();
}

function editEntry() {
    document.querySelectorAll('.edit').forEach(editButton => {
        editButton.addEventListener('click', () => {
            const inputToShow = editButton.closest('.submitted-value');
            inputToShow.style.display = 'none';
            
            const parentContainer = editButton.closest('.label-input-container');
            const inputContainers = parentContainer.querySelectorAll('.label-input'); 
            for (let index = 0; index < inputContainers.length; index++) {
                inputContainers[index].style.display = 'block';
            }
        });
    });
}

function deleteEntry() {
    document.querySelectorAll('.delete').forEach(deleteButton => {
        deleteButton.addEventListener('click', () => {
            const divToRemove = deleteButton.closest('.submitted-value');
            divToRemove.remove();
        });
    });
}

// Events
addEntryButton.addEventListener("click", addEntry);
calculateButton.addEventListener("submit", calculateCalories);
clearButton.addEventListener("click", clearForm);