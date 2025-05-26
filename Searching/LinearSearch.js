console.log('Linear Search');

const findingAudio = new Audio('Finding.mp3');
const findedAudio = new Audio('Finded.mp3');
const mouseclick = new Audio('Mouseclick.mp3');
let count = 0;

// Utility delay function (assuming defined globally or re-define here)
function waitcount(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function linearSearch(array, n, val) {
    count = 0;

    for (let i = 0; i < n; i++) {
        await waitcount(delay);

        if (parseInt(array[i].innerHTML) === val) {
            count++;
            findingAudio.pause();
            findedAudio.play();
            array[i].style.background = 'green';
            array[i].style.color = '#fcfcfc';
            document.querySelector('.step').innerHTML = count;
            return i;
        }

        findingAudio.play();
        array[i].style.background = 'red';
        array[i].style.color = 'white';

        count++;
        document.querySelector('.step').innerHTML = count;
    }

    findingAudio.pause();
    return -1;
}

// Event listener for linear search button
document.querySelector('#linear_Search').addEventListener('click', async () => {
    mouseclick.play();

    const arrayNodeList = document.querySelectorAll('.bars');
    const array = Array.from(arrayNodeList);

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

    document.querySelector('.step').innerHTML = '0';
    document.querySelector('.index').innerHTML = '';
    const searchText = document.querySelector('.searchText');
    if (searchText) searchText.innerHTML = 'Linear Searching...';

    const description = document.querySelector('#description');
    if (description) description.style.display = 'flex';
    const section = document.querySelector('#fullbody');
    if (section) section.style.height = '184vh';

    // Disable UI during search
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();

    // Reset all bars color before search
    array.forEach(bar => {
        bar.style.background = '#00adb5';
        bar.style.color = 'white';
    });

    const foundIndex = await linearSearch(array, array.length, val);

    const index = document.querySelector('.index');
    if (foundIndex !== -1) {
        if (searchText) searchText.innerHTML = 'Searching Complete';
        index.innerHTML = `${val} is present at index no. ${foundIndex}`;
    } else {
        if (searchText) searchText.innerHTML = 'Not Found!!';
        index.innerHTML = `${val} is not present in the array!`;
    }

    // Enable UI after search
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});
