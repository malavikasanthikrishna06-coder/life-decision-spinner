let choices = [];
let currentRotation = 0;

const choiceInput = document.getElementById("choiceInput");
const addBtn = document.getElementById("addBtn");
const choicesList = document.getElementById("choicesList");
const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const resetBtn = document.getElementById("resetBtn");
const result = document.getElementById("result");


// ADD CHOICE
addBtn.addEventListener("click", addChoice);

choiceInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addChoice();
    }
});


function addChoice() {

    const choice = choiceInput.value.trim();

    if (choice === "") {
        return;
    }

    choices.push(choice);

    choiceInput.value = "";

    displayChoices();
    updateWheel();
}


// DISPLAY CHOICES
function displayChoices() {

    choicesList.innerHTML = "";

    choices.forEach(function(choice, index) {

        const item = document.createElement("div");

        item.className = "choice";

        item.textContent = `${index + 1}. ${choice}`;

        choicesList.appendChild(item);

    });
}


// UPDATE WHEEL
function updateWheel() {

    if (choices.length === 0) {

        wheel.style.background =
            "conic-gradient(#64748b 0deg 360deg)";

        wheel.querySelector(".wheel-text").textContent =
            "Add choices";

        return;
    }

    const colors = [
        "#f43f5e",
        "#8b5cf6",
        "#06b6d4",
        "#22c55e",
        "#f97316",
        "#eab308",
        "#ec4899",
        "#14b8a6"
    ];

    const sectionSize = 360 / choices.length;

    let gradient = "conic-gradient(";

    choices.forEach(function(choice, index) {

        const start = index * sectionSize;
        const end = (index + 1) * sectionSize;

        gradient += `${colors[index % colors.length]} ${start}deg ${end}deg`;

        if (index < choices.length - 1) {
            gradient += ", ";
        }

    });

    gradient += ")";

    wheel.style.background = gradient;

    wheel.querySelector(".wheel-text").textContent =
        `${choices.length} choices`;
}


// SPIN
spinBtn.addEventListener("click", function() {

    if (choices.length < 2) {

        result.textContent =
            "⚠️ Add at least 2 choices!";

        return;
    }

    result.textContent = "🎰 Spinning...";

    const randomIndex =
        Math.floor(Math.random() * choices.length);

    const sectionSize = 360 / choices.length;

    const targetAngle =
        360 - (randomIndex * sectionSize + sectionSize / 2);

    const extraSpins = 360 * 5;

    currentRotation += extraSpins + targetAngle;

    wheel.style.transform =
        `rotate(${currentRotation}deg)`;

    setTimeout(function() {

        result.textContent =
            `🎉 You should: ${choices[randomIndex]}!`;

    }, 4000);

});


// RESET
resetBtn.addEventListener("click", function() {

    choices = [];

    currentRotation = 0;

    wheel.style.transform = "rotate(0deg)";

    result.textContent =
    `🎉 You should: ${choices[randomIndex]}!`;

confetti({
    particleCount: 150,
    spread: 90,
    origin: {
        y: 0.6
    }
});

    displayChoices();

    updateWheel();

});