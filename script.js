

const currentView = document.querySelector('.container .result-screen .current-number');
const previousView = document.querySelector('.container .result-screen .previous-number');
const clearButton = document.querySelector('.container .button-holder .clear-button');


var operator = '';
var currentNumber = '';
var previousNumber = '';
var error = false;


function add(a, b){
    var result = a + b;
    currentNumber = String(result);
    if(currentNumber.length >= 16){
        if(currentNumber.indexOf('.') != -1){
            round = 15 - currentNumber.indexOf('.');
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
    if(currentNumber.length >= 16){
        if(currentNumber.indexOf('.') != -1){
            round = 15 - currentNumber.indexOf('.');
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
    if(currentNumber.length >= 16){
        if(currentNumber.indexOf('.') != -1){
            round = 15 - currentNumber.indexOf('.');
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
    if(currentNumber.length >= 16){
        if(currentNumber.indexOf('.') != -1){
            round = 15 - currentNumber.indexOf('.');
            currentNumber = String(parseFloat(currentNumber).toFixed(round));
        }
        else
            error = true;
    }
    previousNumber = '';
}

function negate(){
    if(currentNumber.indexOf('-') == -1)
        currentNumber = '-' + currentNumber;
    else
        currentNumber = currentNumber.slice(1)
}

function addNumber(number){
    if( (number != '.' || (number == '.' && currentNumber.indexOf('.') == -1)) &&
        currentNumber.length < 16 && !error)
        if(currentNumber == 0)
            currentNumber = number;
        else
            currentNumber += number;
    else if (error){
        currentNumber = number;
        error = false;
    }
}

function changeOperator(op){
    if(previousNumber.length == 0){
        previousNumber = currentNumber;
        currentNumber = '';
    }
    operator = op;
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
    if(currentNumber.length > 0 || previousNumber.length > 0)
        clearButton.textContent = 'C';
    else
        clearButton.textContent = 'AC';

}
function clearCalculator(){
    currentNumber = '';
    previousNumber = '';
    operator = '';
    error = false;
}

function operate(){
    if(currentNumber.length > 0 && previousNumber.length > 0 && operator.length > 0){
        var a = parseFloat(previousNumber)
        var b = parseFloat(currentNumber)
        switch(operator){
            case '+': add(a, b); break;
            case '-': subtract(a, b); break;
            case '*': multiply(a, b); break;
            case '/': divide(a, b); break;
        }
        operator = '';
        /*updateView();*/
    }
}