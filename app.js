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

// const data = {
//   numbers: [[4], [1], [2]],
//   operators: ['+', '-']
// };

function calculate() {
  const result = data.numbers
    .map(el => parseFloat(el.join('')))
    .reduce((accu, current, i) => {
      return operate(data.operators[i - 1], accu, current);
  });

  return result;
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

  console.log(data.numbers);
}

function addOperator(input) {
  data.operators.push(input);
  console.log(data.operators);
}

function clearData() {
  data.numbers = [];
  data.operators = [];
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

function clearDisplay() {
  display.textContent = '';
}

// Controller
function handleClick(e) {
  if (e.target.dataset.number) {
    addToDisplay(e.target.dataset.number);
    addNumber(e.target.dataset.number);
  } else if (e.target.dataset.operator) {
    // can't add an operator if the previous input is one
    if (data.operators.length === data.numbers.length) return;

    addToDisplay(e.target.dataset.operator, e.target.textContent);
    addOperator(e.target.dataset.operator);
  } else if (e.target.dataset.equals) {
    // can't calculate expression if the previous input is an operator
    if (data.operators.length === data.numbers.length) return;
    const result = calculate();
    clearData();
    clearDisplay();
    addNumber(result);
    addToDisplay(+result.toFixed(10));
  } else if (e.target.dataset.operation === 'clear') {
    clearData();
    clearDisplay();
  } else if (e.target.dataset.point) {
    // add leading zero if decimal point is the first thing in a number
    if (data.numbers.length === data.operators.length || data.numbers[data.numbers.length - 1].length === 0) {
      addToDisplay('0');
      addNumber('0');
    }

    if (data.numbers[data.numbers.length - 1].includes('.')) return // allow only 1 decimal point
    addToDisplay(e.target.dataset.point);
    addNumber(e.target.dataset.point);
  }
}

const buttons = document.querySelector('.buttons');
buttons.addEventListener('click', handleClick);