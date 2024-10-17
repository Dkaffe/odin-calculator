// Starting variables
let num1 = "", num2 = "", operator = ""; display = "";

// DOM elements
const displayElement = document.querySelector(".calc-display p");
const digitButtons = document.querySelectorAll(".digits button");
const operateButtons = document.querySelectorAll(".operations button");
const clearButton = document.querySelector("#clear-button");
const resultButton = document.querySelector("#result-button");
const decimalButton = document.querySelector("#decimal");
const backSpaceButton = document.querySelector("#backspace");

// Basic calculator functions
const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

// Perform operation with two nums + operator
function operate(num1, num2, operator) {
    num1 = parseFloat(num1), num2 = parseFloat(num2); 

    // Dividing by zero case
    if(num2 == 0 && operator == "/") {
        return "ERROR";
    }

    switch (operator) {
        case "+": return add(num1, num2);
        case "-": return subtract(num1, num2);
        case "*": return multiply(num1, num2);
        case "/": return divide(num1, num2);
        default: return num1;
    }
}

// Digit button event listener
digitButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        // Prevent input overflow
        if (display.length > 15) return;
        // Prevent leading zeros
        if (display.length == 1 && e.target.value == 0) return;
        // Fix display after "ERROR" message
        if (display == "ERROR") display = "", displayElement.innerText = "0";

        // Append the digit to the display
        display += e.target.value;
        displayElement.innerText = display;

        // Update num values accordingly
        operator == "" ? num1 += e.target.value : num2 += e.target.value;
        });
});

// Operate buttons event listener
operateButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        if (operator !== "" && display !== "") {
            // If there's an operator and a second number, perform the calculation
            num2 = display;
            // Perform the calculation using the operate function
            let result = operate(num1, num2, operator);
            // Update the display with the result
            display = result.toString();
            displayElement.innerText = display;
            // Prepare for the next operation
            num1 = display;
            num2 = "";
        } else if (display !== "") {
            // If this is the first operation, store the first number
            num1 = display;
        }
        // Set the new operator
        operator = e.target.value;
        // Clear the display for the next number input
        display = "";
    });
});

// Getting the result
resultButton.addEventListener("click", (e) => {
    if(operator == "/" && num2 == 0) {
        display = "ERROR";
        displayElement.innerText = display;
        num1 = display, num2 = "", operator = "";
    }
    if (operator != "" && num1 != "" && num2 != "") {
        display = operate(num1, num2, operator);
        // limiting decimals
        if(Math.floor(display) != display) {
            display = parseFloat(display.toFixed(10));
        }
        displayElement.innerText = display;
        num1 = display, num2 = "", operator = "";
    }
})

// Decimal point button event listener
decimalButton.addEventListener("click", () => {
    if (display.includes(".")) {
        return;
    } else {
        display += ".";
        displayElement.innerText = display;
        operator == "" ? num1 = display : num2 = display;
    }
})

// Reset all input
clearButton.addEventListener("click", () => {
    num1 = "", num2 = "", operator = "", display = ""
    displayElement.innerText = 0;
})

// Backspace button
backSpaceButton.addEventListener("click", () => {
    if (display.length <= 1 || display === "") return;
    display = display.slice(0, -1);
    displayElement.innerText = display;
    operator == "" ? num1 = display : num2 = display;
})