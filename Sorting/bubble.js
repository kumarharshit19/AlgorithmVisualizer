var beep = new Audio('beep3.mp3');
var mouseclick = new Audio('Mouseclick.mp3');
var done = new Audio('wrong.mp3');

const BubbleSortButton = document.querySelector(".BubbleSort");
BubbleSortButton.addEventListener('click', async function () {
    mouseclick.play();
    selectText.innerHTML = `Bubble Sort..`;
    const description = document.querySelector('#description');
    if (description) description.style.display = 'flex';
    const section = document.querySelector('#fullbody');
    if (section) section.style.height = '184vh';

    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();

    await BubbleSort();

    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
    selectText.innerHTML = `Sorting Complete!`;
});

async function BubbleSort() {
    const elements = document.querySelectorAll('.bar');
    for (let i = 0; i < elements.length - 1; i++) {
        for (let j = 0; j < elements.length - i - 1; j++) {
            // Highlight bars being compared (red)
            elements[j].style.background = 'rgb(250, 5, 54)';
            elements[j + 1].style.background = 'rgb(250, 5, 54)';

            await waitforme(delay);  // Wait before comparing

            if (parseInt(elements[j].style.height) > parseInt(elements[j + 1].style.height)) {
                swapping(elements[j], elements[j + 1]);
                beep.play();
                await waitforme(delay);  // Wait to show swap visually
            }

            // Reset bars color back to yellow after comparison
            elements[j].style.background = 'rgb(245, 212, 24)';
            elements[j + 1].style.background = 'rgb(245, 212, 24)';
        }
        // Mark sorted element green
        elements[elements.length - 1 - i].style.background = 'rgb(0, 255, 0)';
    }
    // Mark first element green as well
    elements[0].style.background = 'rgb(0, 255, 0)';

    done.play();
}

// Swap both height and displayed inner text of two bars
function swapping(el1, el2) {
    let tempHeight = el1.style.height;
    el1.style.height = el2.style.height;
    el2.style.height = tempHeight;

    let tempInner = el1.innerHTML;
    el1.innerHTML = el2.innerHTML;
    el2.innerHTML = tempInner;
}

// Wait helper function
function waitforme(milisec) {
    return new Promise(resolve => {
        setTimeout(resolve, milisec);
    });
}
