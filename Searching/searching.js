// DOM elements
const slider = document.querySelector('#size_slider');
const output = document.querySelector('#size_value');
const body = document.querySelector('#mainbody');
const speedSlider = document.querySelector('#speed_slider');
const speedOutput = document.querySelector('#speed_value');
const select = document.querySelector('.select');
const icon = document.querySelector('.icon');
const menu = document.querySelector('.menu');
const options = document.querySelectorAll('.menu li');
const selected = document.querySelector('.selected');
const generate = document.querySelector('#generate');
const searchedVal = document.querySelector('#searchingVal');

// Disable search buttons and input during process
function disableSortingBtn() {
    document.querySelector("#linear_Search").disabled = true;
    document.querySelector("#binary_Search").disabled = true;
    searchedVal.disabled = true;
}

// Enable search buttons and input after process
function enableSortingBtn() {
    document.querySelector("#linear_Search").disabled = false;
    document.querySelector("#binary_Search").disabled = false;
    searchedVal.disabled = false;
}

// Disable size slider and label
function disableSizeSlider() {
    slider.disabled = true;
    document.querySelector('#size').disabled = true;
}

// Enable size slider and label
function enableSizeSlider() {
    slider.disabled = false;
    document.querySelector('#size').disabled = false;
}

// Disable Generate New Array button
function disableNewArrayBtn() {
    generate.disabled = true;
}

// Enable Generate New Array button
function enableNewArrayBtn() {
    generate.disabled = false;
}

// Initialize default array size display
output.innerHTML = slider.value;

let arrayVal = slider.value;
let arr = [];

// Generate initial random array and render bars
function generateArray(size) {
    arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * (350 - 20) + 20));
    }
    renderBars(arr);
}

function renderBars(array) {
    while (body.firstChild) {
        body.removeChild(body.firstChild);
    }
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement('div');
        bar.className = 'bars';
        bar.style.height = `${array[i]}px`;
        bar.style.width = `${96 / array.length}vw`;
        bar.innerHTML = array[i];
        body.appendChild(bar);
    }
}

// Initial rendering
generateArray(arrayVal);

// Slider input event: adjust array size and regenerate
slider.oninput = function () {
    selected.innerHTML = `Size Changed`;
    output.innerHTML = this.value;
    arrayVal = parseInt(this.value);
    generateArray(arrayVal);
}

// Generate New Array button event
generate.addEventListener('click', () => {
    new Audio('Mouseclick.mp3').play();
    enableSortingBtn();
    enableSizeSlider();
    selected.innerHTML = `New Array Generated`;

    const description = document.querySelector('#description');
    if (description) description.style.display = 'none';
    const section = document.querySelector('#fullbody');
    if (section) section.style.height = `100vh`;

    searchedVal.value = '';
    document.querySelector('.step').innerHTML = '';
    document.querySelector('.index').innerHTML = '';

    generateArray(arrayVal);
});

// Speed slider setup
speedOutput.innerHTML = speedSlider.value;

let delay = 260;
speedSlider.oninput = function () {
    selected.innerHTML = `Speed Changed`;
    speedOutput.innerHTML = this.value;
    delay = 760 - (100 * this.value);
    console.log('Delay set to:', delay);
}

// Select dropdown menu toggle (if applicable)
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

// Preloader handling (if you implement it)
// window.addEventListener('load', () => {
//     preloader.style.display = 'none';
// });

