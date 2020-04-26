const createAnyElement = (element, className, index) => {
    const div = document.createElement(element);
    div.setAttribute('class', `${className} ${className}-${index}`);
    return div;
}

let boxArray = [];
let boxChildArray = [];
let boxContainer;
let boxContainerArray = [];
let boxName = 'box-container-';

const submitButton = createAnyElement('button', 'submitButtn', '');
const inputOne = createAnyElement('input', 'inputOne', '');
const inputTwo = createAnyElement('input', 'inputTwo', '');
const mainBoxContainer = createAnyElement('div', 'mainBoxContainer', '');

let cowStatus = createAnyElement('div', 'cowStatus', 'status');
let cowShyOne = createAnyElement('div', 'cowShyOne', 'x');
let cowShyTwo = createAnyElement('div', 'cowShyTwo', 'y');

inputOne.required = true;
inputOne.placeholder = 'Type a number';
document.body.appendChild(inputOne);

inputTwo.required = true;
inputTwo.placeholder = 'Type a number';
document.body.appendChild(inputTwo);

document.body.appendChild(submitButton);
submitButton.setAttribute('type', 'submit')
submitButton.innerHTML = 'Submit';

document.body.appendChild(mainBoxContainer)

// Get number from string
const getNumberFromString = (str) => {
    let numberFromString = str.filter(className => !isNaN(className))
    return numberFromString;
}

// Split class name and get box number
const splitClassName = (className) => {
    const name = [...className];
    const getBoxIndex = getNumberFromString(name);
    return getBoxIndex;
}

// Get a random number
const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

// Select a random box to add cows
const getBoxContainerChild = (className, x, y) => {    
    let boxStyle = document.getElementsByClassName(`${className}${x}`)[0].childNodes[y];
    return {boxStyle, x, y};
}

// Gets random coordinates
const getRandomXYCoordinates = (x, y) => {    
    mainBoxContainer.appendChild(cowStatus)
    mainBoxContainer.appendChild(cowShyOne)
    mainBoxContainer.appendChild(cowShyTwo)
    
    // Random x y coordinates 
    let getX = getRandomInt(x);
    let getY = getRandomInt(y);
    let getXX = getRandomInt(x);
    let getYY = getRandomInt(y);
    
    // Last
    let lastBoxX = x - 1;
    let lastBoxY = y - 1;

    // Create cow div
    let cowOne = getBoxContainerChild(boxName, getX, getY);
    let cowTwo = getBoxContainerChild(boxName, getXX, getYY);

    if(cowOne && cowTwo) {
        cowOne.boxStyle.style = 'background: url("https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Creative-Tail-Animal-cow.svg/128px-Creative-Tail-Animal-cow.svg.png"); background-size: cover';
        cowTwo.boxStyle.style = 'background: url("https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Creative-Tail-Animal-cow.svg/128px-Creative-Tail-Animal-cow.svg.png"); background-size: cover';
    } else {
        cowStatus.innerText = 'Not enough grids'
    }

    // Check shy cow
    if (getX === 0 || getX === lastBoxX || getY === 0 || getY === lastBoxX) {
        if(cowOne && cowOne.boxStyle) {
            cowOne.boxStyle.innerText = 'Shy';
        }
    } 
    // Check shy cow
    if (getYY === 0 || getYY === lastBoxY || getXX === 0 || getXX === lastBoxY) {
        if (cowTwo && cowTwo.boxStyle) {
            cowTwo.boxStyle.innerText = 'Shy';
        }
    }
    
    // Check if cow share box and are neighbors or not
    if(getY === getYY && getX === getXX) {
        cowStatus.innerText = 'Cows share Box';
        cowStatus.style = 'color:white; background: gold;';
    } 
    if(getY === getYY || getX === getXX) {
        if(getX-1 === getXX || getX+1 === getXX || getY+1 === getYY || getY-1 === getYY) {
            cowStatus.innerText = 'Cows are Neighbours';
            cowStatus.style = 'color:white; background: green;';
        }
    } else {
        cowStatus.textContent = 'Cows NOT Neighbours';
        cowStatus.style = 'color:white; background: red;';
    }

}

// Create grid
const createGrid = (vertical, horizontal) => {
    let i, j;
    for (i = 0; i < vertical; i++) {
        boxContainer = createAnyElement('div', 'box-container', i);
        boxContainerArray.push(boxContainer);
        boxContainer.style = 'display: flex; width: max-content; height: 75px; border: 1px solid lightgray;';
        mainBoxContainer.appendChild(boxContainer);
        for (j = 0; j < horizontal; j++) {
            boxArray[j] = createAnyElement('div', 'box', j);
            boxChildArray.push(document.querySelector(`.box-container-${i}`).appendChild(boxArray[j]));
        }
    }    
    getRandomXYCoordinates(i, j);
}

// Resets the main container div
const resetContainer = () => {
    let myNode = document.querySelector('.mainBoxContainer');
    if (myNode && myNode.childNodes) {
        while (myNode.lastElementChild) {
            myNode.removeChild(myNode.lastElementChild);
        }            
    }
}

// Reset and update new grid
const resetAndUpdate = () => {
    resetContainer()
    setTimeout(() => {
        updateGrid()
    }, 100);
}

submitButton.addEventListener('click', (e) => {
    resetAndUpdate()    
})

inputOne.addEventListener('\keyup', (e) => {
    if(e.keyCode === 13) {
        resetAndUpdate()
    }
})

inputTwo.addEventListener('keyup', (e) => {
    if(e.keyCode === 13) {
        resetAndUpdate()
    }
})

const updateGrid = (e) => {
    e = createGrid(inputOne.value, inputTwo.value);
}













