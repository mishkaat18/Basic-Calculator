
const display = document.getElementById("display");

// Add numbers and operators
function appendValue(value) {
    if (display.value === "Error") {
        display.value = "";
    }
    display.value += value;
}

// Clear the entire display
function clearDisplay() {
    display.value = "";
}

// Delete the last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Calculate the result
function calculate() {
    try {
        if (display.value.trim() === "") return;

        const expression = display.value;

        // Allow only valid calculator characters
        if (!/^[0-9+\-*/%.()\s]+$/.test(expression)) {
            throw new Error("Invalid input");
        }

        const result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!Number.isFinite(result)) {
            throw new Error("Invalid calculation");
        }

        display.value = Number.isInteger(result)
            ? result
            : parseFloat(result.toPrecision(12));

    } catch (error) {
        display.value = "Error";
    }
}

// Keyboard support
document.addEventListener("keydown", function(event) {
    const key = event.key;

    if (/^[0-9+\-*/%.()]$/.test(key)) {
        appendValue(key);
    } else if (key === "Enter" || key === "=") {
        calculate();
    } else if (key === "Backspace") {
        deleteLast();
    } else if (key === "Escape") {
        clearDisplay();
    }
});
