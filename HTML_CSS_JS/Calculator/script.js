function appendToDisplay(value) {
    document.getElementById("display").value += value;
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

function calculateResult() {
    try {
        document.getElementById("display").value = eval(document.getElementById("display").value);
    } catch (error) {
        alert("Invalid Calculation");
    }
}

// Theme Toggle Function
function toggleTheme() {
    document.body.classList.toggle("dark-theme");
    document.body.classList.toggle("light-theme");

    // Change theme button icon
    const button = document.querySelector(".theme-toggle");
    if (document.body.classList.contains("dark-theme")) {
        button.textContent = "☀️"; // Light mode icon
    } else {
        button.textContent = "🌙"; // Dark mode icon
    }
}

function backspace() {
    let display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
}
