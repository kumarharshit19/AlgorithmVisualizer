var beep = new Audio('beep3.mp3');
var mouseclick = new Audio('Mouseclick.mp3');
var done = new Audio('wrong.mp3');

const InsertionSortButton = document.querySelector(".InsertionSort");
InsertionSortButton.addEventListener('click', async function () {
    selectText.innerHTML = `Insertion Sort..`;
    mouseclick.play();

    const description = document.querySelector('#description');
    if (description) description.style.display = 'flex';

    const section = document.querySelector('#fullbody');
    if (section) section.style.height = '184vh';

    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();

    await InsertionSort();

    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();

    selectText.innerHTML = `Sorting Complete!`;
    done.play();
});

async function InsertionSort() {
    const elements = document.querySelectorAll('.bar');
    elements[0].style.background = 'cyan';

    for (let i = 1; i < elements.length; i++) {
        let keyHeight = elements[i].style.height;
        let keyText = elements[i].innerHTML;
        let j = i - 1;

        elements[i].style.background = 'rgb(250, 5, 54)'; // Red
        await waitforme(delay);

        while (j >= 0 && parseInt(elements[j].style.height) > parseInt(keyHeight)) {
            elements[j].style.background = 'rgb(9, 102, 2)'; // Dark Green

            elements[j + 1].style.height = elements[j].style.height;
            elements[j + 1].innerHTML = elements[j].innerHTML;

            j--;
            beep.play();
            await waitforme(delay);
        }

        elements[j + 1].style.height = keyHeight;
        elements[j + 1].innerHTML = keyText;

        // Color all sorted up to i
        for (let k = 0; k <= i; k++) {
            elements[k].style.background = 'rgb(3, 252, 11)'; // Light Green
        }
    }
}
