// STEPS TO DO HERE
// See in-line comments throughout for detailed references to the listed steps

const output = document.querySelector('#size_value');
const bars = document.querySelector("#mainbody");
const arraySize = document.querySelector('#size_slider');
const selectText = document.querySelector('.selected');
const speedOutput = document.querySelector('#speed_value');

output.innerHTML = arraySize.value;

// Step 2: Update size from slider
let arrayVal = parseInt(arraySize.value);
arraySize.addEventListener('input', function () {
    selectText.innerHTML = `Size Changed`;
    output.innerHTML = this.value;
    arrayVal = parseInt(this.value);
    createNewArray(arrayVal);
});

// Step 3: Default delay
let delay = 39;

// Step 4 & 5: Speed control
let delayElement = document.querySelector('#speed_slider');
speedOutput.innerHTML = delayElement.value;
delayElement.addEventListener('input', function () {
    selectText.innerHTML = `Speed Changed`;
    speedOutput.innerHTML = this.value;
    delay = 525 - parseInt(100 * this.value);
});

// Step 6: Array declaration
let array = [];

// Step 7: Show default array on page load
createNewArray(arrayVal);

// Step 8: Create new array
function createNewArray(arrayVal) {
    deleteChild();
    array = [];
    for (let i = 0; i < arrayVal; i++) {
        let temp = Math.floor(Math.random() * (370 - 20) + 20);
        array.push(temp);
    }
    for (let i = 0; i < arrayVal; i++) {
        const bar = document.createElement("div");
        bar.style.height = `${array[i]}px`;
        bar.className = 'bar';
        bar.innerHTML = `${array[i]}`;
        bar.style.width = `${(96 / arrayVal)}vw`;
        bars.appendChild(bar);
    }
}

// Step 11: Clear previous bars
function deleteChild() {
    while (bars.firstChild) {
        bars.removeChild(bars.firstChild);
    }
}

// Step 12: New array on button click
const newArray = document.querySelector("#generate");
newArray.addEventListener("click", function () {
    var mouseclick = new Audio('Mouseclick.mp3');
    mouseclick.play();
    enableSortingBtn();
    enableSizeSlider();
    selectText.innerHTML = `New Array Generated`;
    createNewArray(arrayVal);

    const description = document.querySelector('#description');
    if (description) description.style.display = 'none';
    const section = document.querySelector('#fullbody');
    if (section) section.style.height = '100vh';
});

// disable all the sorting buttons while one sorting process take place
function disableSortingBtn() {
    document.querySelector(".BubbleSort").disabled = true;
    document.querySelector(".InsertionSort").disabled = true;
    document.querySelector(".MergeSort").disabled = true;
    document.querySelector(".QuickSort").disabled = true;
    document.querySelector(".SelectionSort").disabled = true;
}

// enable all the sorting buttons after one of the sorting process is totally completed
function enableSortingBtn() {
    document.querySelector(".BubbleSort").disabled = false;
    document.querySelector(".InsertionSort").disabled = false;
    document.querySelector(".MergeSort").disabled = false;
    document.querySelector(".QuickSort").disabled = false;
    document.querySelector(".SelectionSort").disabled = false;
}

// Disables array size slider while one sorting process take place
function disableSizeSlider() {
    document.querySelector("#size_slider").disabled = true;
    document.querySelector('#size').disabled = true
}

// Enables array size slider after one of the sorting process is done
function enableSizeSlider() {
    document.querySelector("#size_slider").disabled = false;
    document.querySelector('#size').disabled = false
}

// Disables newArray buttons while one sorting process take place
function disableNewArrayBtn() {
    document.querySelector("#generate").disabled = true;
}

// Enables newArray buttons after one of the sorting process is done
function enableNewArrayBtn() {
    document.querySelector("#generate").disabled = false;
}

// Used in async function so that we can so animations of sorting, takes input time in ms (1000 = 1s)
function waitforme(milisec) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, milisec);
    })
}
// Step 20: Swapping utility
function swapping(eliment_1, eliment_2) {
    let temp = eliment_1.style.height;
    eliment_1.style.height = eliment_2.style.height;
    eliment_2.style.height = temp;
}

// Optional dropdown logic (if implemented)
const menu = document.querySelector('.menu');
const options = document.querySelectorAll('.menu li');
const icon = document.querySelector('.icon');
const select = document.querySelector('.select');
const selected = document.querySelector('.selected');

if (menu && select && icon && selected) {
    menu.classList.toggle('close');

    select.addEventListener('click', () => {
        menu.classList.toggle('close');
        icon.classList.toggle('icon-rotate');
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            selected.innerText = option.innerText;
            menu.classList.toggle('close');
            icon.classList.toggle('icon-rotate');
        });
    });
}