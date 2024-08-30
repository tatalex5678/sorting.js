document.addEventListener('DOMContentLoaded', () => {
    createArray();
});

const arraySize = 50;
let array = [];
let isSorting = false;
let shouldStop = false;

function createArray() {
    array = [];
    const arrayContainer = document.getElementById('array-container');
    arrayContainer.innerHTML = '';
    
    for (let i = 0; i < arraySize; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('array-bar');
        bar.style.height = `${value * 3}px`; // Scale height for visibility
        arrayContainer.appendChild(bar);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startBubbleSort() {
    if (isSorting) return; // Prevent multiple sorts from starting
    isSorting = true;
    shouldStop = false;
    
    const bars = document.getElementsByClassName('array-bar');
    
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (shouldStop) {
                isSorting = false;
                return;
            }

            bars[j].style.backgroundColor = '#ff4757';
            bars[j + 1].style.backgroundColor = '#ff4757';
            
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];

                bars[j].style.height = `${array[j] * 3}px`;
                bars[j + 1].style.height = `${array[j + 1] * 3}px`;
            }
            
            await sleep(50);
            
            bars[j].style.backgroundColor = '#007bff';
            bars[j + 1].style.backgroundColor = '#007bff';
        }
        
        bars[array.length - i - 1].classList.add('sorted');
    }

    isSorting = false;
}

function stopBubbleSort() {
    shouldStop = true;
}
