const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

// Calculate first and second values depending on operator
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber,
};

function sendNumberValue(number) {
    // Replace current display value if first value is entered
    if (awaitingNextValue){
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}
function addDecimal(){
    // If operator pressed, don't add decimal
    if(awaitingNextValue) return;
    // If no decimal, add one
    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`; 
    }
}


function useOperator(operator){
    const currentValue = Number(calculatorDisplay.textContent);
    // Prevent multiple operators
    if(operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    // Assign firstValue if no value
    if(!firstValue) {
        firstValue = currentValue;
    } else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    // Ready for next value, store operator
    awaitingNextValue = true
    operatorValue = operator;
    console.log('firstValue', firstValue);
    console.log('operator', operatorValue);
}



// Reset all values, display
function resetAll() {
    calculatorDisplay.textContent = '0';
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
}
// Add Event Listeners for numbers, operators, decimal buttons
inputBtns.forEach((btn) => {
    if(btn.classList.length === 0){
        btn.addEventListener('click', () => sendNumberValue(btn.value));
    } else if(btn.classList.contains('operator')){
        btn.addEventListener('click', () => useOperator(btn.value));
    } else if(btn.classList.contains('decimal')){
        btn.addEventListener('click', addDecimal);
    }
});

clearBtn.addEventListener('click', resetAll);
