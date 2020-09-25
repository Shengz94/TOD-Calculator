

const currentView = document.querySelector('.container .result-screen .current-number');
const previousView = document.querySelector('.container .result-screen .previous-number');
const clearButton = document.querySelector('.container .button-holder .other-button');
const maxDisplayed = 15;

var operator = '';
var currentNumber = '0';
var previousNumber = '';
var error = false;


function add(a, b){
    var result = a + b;
    currentNumber = String(result);
    if(currentNumber.length > maxDisplayed){
        if(currentNumber.indexOf('.') != -1){
            round = maxDisplayed - currentNumber.indexOf('.');
            currentNumber = String(parseFloat(currentNumber).toFixed(round));
        }
        else
            error = true;
    }
    previousNumber = '';
}

function subtract(a, b){
    var result = a - b;
    currentNumber = String(result);
    if(currentNumber.length > maxDisplayed){
        if(currentNumber.indexOf('.') != -1){
            round = maxDisplayed - currentNumber.indexOf('.');
            currentNumber = String(parseFloat(currentNumber).toFixed(round));
        }
        else
            error = true;
    }
    previousNumber = '';
}

function multiply(a, b){
    var result = a * b;
    currentNumber = String(result);
    if(currentNumber.length > maxDisplayed){
        if(currentNumber.indexOf('.') != -1){
            round = maxDisplayed - currentNumber.indexOf('.');
            currentNumber = String(parseFloat(currentNumber).toFixed(round));
        }
        else
            error = true;
    }
    previousNumber = '';
}

function divide(a, b){
    var result = 0;
    if(b != 0)
        result = a / b;
    else
        error = true;
    currentNumber = String(result);
    if(currentNumber.length > maxDisplayed){
        if(currentNumber.indexOf('.') != -1){
            round = maxDisplayed - currentNumber.indexOf('.');
            currentNumber = String(parseFloat(currentNumber).toFixed(round));
        }
        else
            error = true;
    }
    previousNumber = '';
}

function addNumber(number){
    if( (number != '.' || (number == '.' && currentNumber.indexOf('.') == -1)) &&
        currentNumber.length < maxDisplayed && !error)
        if(currentNumber == '0' && number != '.')
            currentNumber = number;
        else
            currentNumber += number;
    else if (error){
        if(number != '.')
            currentNumber = number;
        else
            currentNumber = '0.';
        error = false;
    }
}

function changeOperator(op){
    if(previousNumber.length == 0 && currentNumber != '0.'){
        previousNumber = currentNumber;
        currentNumber = '0';
    }
    operator = op;
}

function negate(){
    if(currentNumber.indexOf('-') == -1 && currentNumber.length > 0 &&
    currentNumber != '0' && currentNumber != '0.')
        currentNumber = '-' + currentNumber;
    else if(currentNumber != '0' && currentNumber != '0.' && currentNumber.length > 0)
        currentNumber = currentNumber.slice(1)
}

function operate(){
    if(currentNumber.length > 0 && previousNumber.length > 0 && operator.length > 0){
        var a = parseFloat(previousNumber)
        var b = parseFloat(currentNumber)
        switch(operator){
            case '+': add(a, b); break;
            case '-': subtract(a, b); break;
            case 'x': multiply(a, b); break;
            case '/': divide(a, b); break;
        }
        operator = '';
    }
}

function clearCalculator(){
    currentNumber = '0';
    previousNumber = '';
    operator = '';
    error = false;
}

function backspace(){
    if(currentNumber.length > 0 && currentNumber != '0')
        currentNumber = currentNumber.slice(0, -1);
    if(currentNumber.length == 0 || currentNumber == '-')
        currentNumber = '0';
}

function updateView(){
    if(!error){
        currentView.textContent = currentNumber;
        previousView.textContent = previousNumber + ' ' + operator;
    }
    else{
        previousView.textContent = '';
        currentView.textContent = 'ERROR!';
    }
    if (currentNumber == '0' && previousNumber.length == 0 && !error)
        clearButton.textContent = 'AC';
    else if((currentNumber != '0' && 
        currentNumber.length > 0) || previousNumber.length > 0)
        clearButton.textContent = 'C';
    

}

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    
    if(!event.repeat){
        switch(keyName){
            case '1': addNumber('1'); break;
            case '2': addNumber('2'); break;
            case '3': addNumber('3'); break;
            case '4': addNumber('4'); break;
            case '5': addNumber('5'); break;
            case '6': addNumber('6'); break;
            case '7': addNumber('7'); break;
            case '8': addNumber('8'); break;
            case '9': addNumber('9'); break;
            case '0': addNumber('0'); break;
            case '*': changeOperator('x'); break;
            case '.': addNumber('.'); break;
            case '/': changeOperator('/'); break;
            case '+': changeOperator('+'); break;
            case '-': changeOperator('-'); break;
            case 'Enter': operate(); break;
            case 'Backspace': backspace(); break;
            case 'Escape': clearCalculator(); break;
            case '_': negate(); break;
        }
    }
    updateView();
  }, false);