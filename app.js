// Operations

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  if (operator === 'add') {
    return add(a, b);
  } else if (operator === 'subtract') {
    return subtract(a, b);
  } else if (operator === 'multiply') {
    return multiply(a, b)
  } else if (operator === 'divide') {
    return divide(a, b);
  }
}

// Data

const data = {
  numbers: [],
  operators: []
};

function addNumber(input) {
  if (data.numbers.length > data.operators.length) {
    data.numbers[data.numbers.length - 1].push(input) // add digit to the current number
  } else {
    data.numbers.push([input]) // start a new number
  }

  console.log(data);
}

function addOperator(input) {
  data.operators.push(input);
  console.log(data);
}


// DOM functions

const display = document.querySelector('.display');

function addToDisplay(...inputs) {
  if (inputs.length === 2) {
    display.textContent += ` ${inputs[1]} `;
  } else {
    display.textContent += inputs[0];
  }
}

// Controller
function handleClick(e) {
  if (e.target.dataset.number) {
    addToDisplay(e.target.dataset.number);
    addNumber(e.target.dataset.number);
  } else {
    // can't add an operator if the previous input is one
    if (data.operators.length === data.numbers.length) return;

    addToDisplay(e.target.dataset.operator, e.target.textContent);
    addOperator(e.target.dataset.operator);
  }
}

const buttons = document.querySelector('.buttons');
buttons.addEventListener('click', handleClick);