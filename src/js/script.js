let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.getElementById("display");

document.querySelector(".all-btns").addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
        buttonClick(event.target.innerText);
    }
});

buttonClick = (value) =>{
    if (isNaN(Number(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.value = buffer;
}

handleNumber = (numberString) =>{
    if (buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

handleSymbol = (symbol) =>{
    switch (symbol) {
        case 'C':
            buffer = "0";
            runningTotal = 0;
            previousOperator = null;
            break;
        case '=':
            if (previousOperator === null || previousOperator === undefined || previousOperator === Infinity) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = String(runningTotal);
            runningTotal = 0;
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            handleMath(symbol);
            break;
    }
}

handleMath = (symbol) => {
    if (buffer === '0') {
        // do nothing
        return;
    }

    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = symbol;
    buffer = '0';
}

flushOperation = (intBuffer) => {
    if (previousOperator === "+") {
        runningTotal += intBuffer;
    } else if (previousOperator === "-") {
        runningTotal -= intBuffer;
    } else if (previousOperator === "*") {
        runningTotal *= intBuffer;
    } else {
        runningTotal /= intBuffer;
    }
}
