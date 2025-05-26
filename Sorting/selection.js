var beep = new Audio('beep3.mp3');
var mouseclick = new Audio('Mouseclick.mp3');
var done = new Audio('wrong.mp3');

const SelectionSortButton = document.querySelector(".SelectionSort");
if (SelectionSortButton) {
    SelectionSortButton.addEventListener('click', async function () {
        selectText.innerHTML = `Selection Sort..`;
        mouseclick.play();

        const description = document.querySelector('#description');
        if (description) description.style.display = 'flex';

        const section = document.querySelector('#fullbody');
        if (section) section.style.height = '184vh';

        disableSortingBtn();
        disableSizeSlider();
        disableNewArrayBtn();

        await SelectionSort();

        selectText.innerHTML = `Sorting Complete!`;
        done.play();

        enableSortingBtn();
        enableSizeSlider();
        enableNewArrayBtn();
    });
}

async function SelectionSort() {
    const element = document.querySelectorAll(".bar");
    for (let i = 0; i < element.length; i++) {
        let smallest_element_index = i;
        element[i].style.background = 'rgb(250, 5, 54)'; // red current

        for (let j = i + 1; j < element.length; j++) {
            element[j].style.background = 'rgb(245, 212, 24)'; // yellow being compared
            await waitforme(delay);

            if (parseInt(element[j].style.height) < parseInt(element[smallest_element_index].style.height)) {
                if (smallest_element_index !== i) {
                    element[smallest_element_index].style.background = 'cyan';
                }
                smallest_element_index = j;
            } else {
                element[j].style.background = 'cyan';
            }
        }

        beep.play();
        await waitforme(delay);
        swapping(element[smallest_element_index], element[i]);

        element[smallest_element_index].style.background = 'cyan';
        element[i].style.background = 'rgb(0,255,0)'; // green - sorted
    }
}

function swapping(el1, el2) {
    let tempHeight = el1.style.height;
    let tempText = el1.innerHTML;

    el1.style.height = el2.style.height;
    el1.innerHTML = el2.innerHTML;

    el2.style.height = tempHeight;
    el2.innerHTML = tempText;
}
