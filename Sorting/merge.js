var beep = new Audio('beep3.mp3');
var mouseclick = new Audio('Mouseclick.mp3');
var done = new Audio('wrong.mp3');

const MergeSortButton = document.querySelector(".MergeSort");

MergeSortButton.addEventListener('click', async function () {
    selectText.innerHTML = `Merge Sort..`;
    mouseclick.play();

    const description = document.querySelector('#description');
    if (description) description.style.display = 'flex';

    const section = document.querySelector('#fullbody');
    if (section) section.style.height = '184vh';

    let element = document.querySelectorAll('.bar');
    let si = 0;
    let ei = element.length - 1;

    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();

    await MergeSort(element, si, ei);

    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();

    selectText.innerHTML = `Sorting Complete!`;
    done.play();
});

async function MergeSort(element, si, ei) {
    if (si >= ei) return;

    const mid = si + Math.floor((ei - si) / 2);
    await MergeSort(element, si, mid);
    await MergeSort(element, mid + 1, ei);
    await Merge(element, si, mid, ei);
}

async function Merge(element, low, mid, high) {
    const a1 = mid - low + 1;
    const a2 = high - mid;
    let left = new Array(a1);
    let right = new Array(a2);

    for (let i = 0; i < a1; i++) {
        await waitforme(delay);
        beep.play();
        element[low + i].style.background = 'red';
        left[i] = element[low + i].style.height;
    }

    for (let i = 0; i < a2; i++) {
        await waitforme(delay);
        beep.play();
        element[mid + 1 + i].style.background = 'yellow';
        right[i] = element[mid + 1 + i].style.height;
    }

    await waitforme(delay);

    let i = 0, j = 0, k = low;
    while (i < a1 && j < a2) {
        beep.play();
        await waitforme(delay);
        if (parseInt(left[i]) <= parseInt(right[j])) {
            element[k].style.height = left[i];
            element[k].innerHTML = parseInt(left[i]);

            element[k].style.background = (a1 + a2 === element.length) ? 'rgb(0,255,0)' : 'lightgreen';

            i++;
        } else {
            element[k].style.height = right[j];
            element[k].innerHTML = parseInt(right[j]);

            element[k].style.background = (a1 + a2 === element.length) ? 'rgb(0,255,0)' : 'lightgreen';

            j++;
        }
        k++;
    }

    while (i < a1) {
        beep.play();
        await waitforme(delay);
        element[k].style.height = left[i];
        element[k].innerHTML = parseInt(left[i]);

        element[k].style.background = (a1 + a2 === element.length) ? 'rgb(0,255,0)' : 'lightgreen';
        i++;
        k++;
    }

    while (j < a2) {
        beep.play();
        await waitforme(delay);
        element[k].style.height = right[j];
        element[k].innerHTML = parseInt(right[j]);

        element[k].style.background = (a1 + a2 === element.length) ? 'rgb(0,255,0)' : 'lightgreen';
        j++;
        k++;
    }
}
