console.log('Binary Search');

const findingAudioB = new Audio('Finding.mp3');
const findedAudioB = new Audio('Finded.mp3');
const mouseclickB = new Audio('Mouseclick.mp3');

let stepCount = 0;

// Utility delay
function waitcount(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Binary Search Algorithm
async function binarySearch(array, val) {
    let left = 0;
    let right = array.length - 1;
    stepCount = 0;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        // Highlight mid bar
        array[mid].style.background = 'orange';
        findingAudioB.play();

        stepCount++;
        document.querySelector('.step').innerHTML = stepCount;

        await waitcount(delay);

        let currentVal = parseInt(array[mid].innerHTML);

        if (currentVal === val) {
            findingAudioB.pause();
            findedAudioB.play();
            array[mid].style.background = 'green';
            array[mid].style.color = '#fcfcfc';
            return mid;
        }

        // Reset color
        array[mid].style.background = '#ff5722';

        if (currentVal < val) {
            for (let i = left; i <= mid; i++) {
                array[i].style.background = '#393e46';
            }
            left = mid + 1;
        } else {
            for (let i = mid; i <= right; i++) {
                array[i].style.background = '#393e46';
            }
            right = mid - 1;
        }
    }

    findingAudioB.pause();
    return -1;
}

// Function to visually sort the bars in DOM
function sortAndRenderBars(array) {
    const body = document.querySelector('#mainbody');

    // Sort array based on values
    const sortedBars = Array.from(array).sort((a, b) => parseInt(a.innerHTML) - parseInt(b.innerHTML));

    // Clear current bars
    while (body.firstChild) {
        body.removeChild(body.firstChild);
    }

    // Re-render bars in sorted order
    sortedBars.forEach(bar => {
        bar.style.background = '#00adb5';
        bar.style.color = 'white';
        body.appendChild(bar);
    });

    return sortedBars;
}

// Binary Search Button Click Handler
document.querySelector('#binary_Search').addEventListener('click', async () => {
    mouseclickB.play();

    const arrayNodeList = document.querySelectorAll('.bars');
    if (!arrayNodeList.length) return;

    // Read & validate input
    const valStr = document.querySelector('#searchingVal').value.trim();
    if (valStr === '') {
        alert('Please enter a value to search!');
        return;
    }
    const val = parseInt(valStr);
    if (isNaN(val)) {
        alert('Please enter a valid number!');
        return;
    }

    const searchText = document.querySelector('.searchText');
    if (searchText) searchText.innerHTML = 'Binary Searching...';

    const description = document.querySelector('#description');
    if (description) description.style.display = 'flex';
    const section = document.querySelector('#fullbody');
    if (section) section.style.height = '184vh';

    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();

    document.querySelector('.step').innerHTML = '0';
    document.querySelector('.index').innerHTML = '';

    // Sort and re-render bars visually
    const sortedArray = sortAndRenderBars(arrayNodeList);

    // Perform binary search
    const index = await binarySearch(sortedArray, val);

    if (index !== -1) {
        if (searchText) searchText.innerHTML = 'Searching Complete';
        document.querySelector('.index').innerHTML = `${val} found at index ${index}`;
    } else {
        if (searchText) searchText.innerHTML = 'Not Found!!';
        document.querySelector('.index').innerHTML = `${val} is not in the array.`;
    }

    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});
