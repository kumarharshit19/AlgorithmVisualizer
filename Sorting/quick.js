var beep = new Audio('beep3.mp3');
var mouseclick = new Audio('Mouseclick.mp3');
var done = new Audio('wrong.mp3');

const QuickSortbutton = document.querySelector(".QuickSort");
if (QuickSortbutton) {
    QuickSortbutton.addEventListener('click', async function () {
        selectText.innerHTML = `Quick Sort..`;
        mouseclick.play();

        const description = document.querySelector('#description');
        if (description) description.style.display = 'flex';

        const section = document.querySelector('#fullbody');
        if (section) section.style.height = '184vh';

        let element = document.querySelectorAll('.bar');
        let low = 0;
        let high = element.length - 1;

        disableSortingBtn();
        disableSizeSlider();
        disableNewArrayBtn();

        await quickSort(element, low, high);

        selectText.innerHTML = `Sorting Complete!`;
        done.play();

        enableSortingBtn();
        enableSizeSlider();
        enableNewArrayBtn();
    });
}

async function partition(element, low, high) {
    beep.play();
    let i = low - 1;
    element[high].style.background = 'red';

    for (let j = low; j <= high - 1; j++) {
        beep.play();
        element[j].style.background = 'yellow';
        await waitforme(delay);

        if (parseInt(element[j].style.height) < parseInt(element[high].style.height)) {
            beep.play();
            i++;
            swapping(element[i], element[j]);

            element[i].style.background = 'orange';
            if (i != j) element[j].style.background = 'orange';

            await waitforme(delay);
        } else {
            beep.play();
            element[j].style.background = 'pink';
        }
    }
    i++;
    await waitforme(delay);
    swapping(element[i], element[high]);

    element[high].style.background = 'pink';
    element[i].style.background = 'green';
    element[i].style.color = 'white';

    await waitforme(delay);

    for (let k = low; k <= high; k++) {
        beep.play();
        if (element[k].style.background != 'green')
            element[k].style.background = 'cyan';
    }

    return i;
}

async function quickSort(element, low, high) {
    if (low < high) {
        beep.play();
        let pivot_index = await partition(element, low, high);
        await quickSort(element, low, pivot_index - 1);
        await quickSort(element, pivot_index + 1, high);
    } else {
        if (low >= 0 && high >= 0 && low < element.length && high < element.length) {
            beep.play();
            element[high].style.background = 'green';
            element[low].style.background = 'green';
            element[high].style.color = 'white';
            element[low].style.color = 'white';
        }
    }
}

function swapping(el1, el2) {
    let tempHeight = el1.style.height;
    let tempValue = el1.innerHTML;

    el1.style.height = el2.style.height;
    el1.innerHTML = el2.innerHTML;

    el2.style.height = tempHeight;
    el2.innerHTML = tempValue;
}
