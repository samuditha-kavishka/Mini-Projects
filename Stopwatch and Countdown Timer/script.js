/* ------------------ STOPWATCH ------------------- */

let swInterval = null;
let swStartTime = 0;

const swDisplay = document.getElementById("sw-display");

function updateStopwatch() {
    const current = Date.now() - swStartTime;

    let hrs = Math.floor(current / 3600000);
    let mins = Math.floor((current % 3600000) / 60000);
    let secs = Math.floor((current % 60000) / 1000);
    let ms = current % 1000;

    swDisplay.textContent =
        `${hrs.toString().padStart(2,'0')}:` +
        `${mins.toString().padStart(2,'0')}:` +
        `${secs.toString().padStart(2,'0')}.` +
        `${ms.toString().padStart(3,'0')}`;
}

document.getElementById("sw-start").addEventListener("click", () => {
    if (swInterval) return; // already running
    swStartTime = Date.now();
    swInterval = setInterval(updateStopwatch, 10);
});

document.getElementById("sw-stop").addEventListener("click", () => {
    if (!swInterval) return;

    clearInterval(swInterval);
    swInterval = null;

    const task = document.getElementById("sw-task").value || "Unnamed Task";
    document.getElementById("sw-result").textContent =
        `Task Completed: ${task} | Time: ${swDisplay.textContent}`;
});

document.getElementById("sw-reset").addEventListener("click", () => {
    clearInterval(swInterval);
    swInterval = null;
    swDisplay.textContent = "00:00:00.000";
    document.getElementById("sw-task").value = "";
    document.getElementById("sw-result").textContent = "";
});


/* ------------------ COUNTDOWN TIMER ------------------- */

let timerInterval = null;
let timerRemaining = 0;

const timerDisplay = document.getElementById("timer-display");

function updateTimer() {
    if (timerRemaining <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        timerDisplay.textContent = "00:00.000";
        alert("⏰ Time's Up!");
        return;
    }

    timerRemaining -= 10; // 10ms step

    let mins = Math.floor(timerRemaining / 60000);
    let secs = Math.floor((timerRemaining % 60000) / 1000);
    let ms = timerRemaining % 1000;

    timerDisplay.textContent =
        `${mins.toString().padStart(2,'0')}:` +
        `${secs.toString().padStart(2,'0')}.` +
        `${ms.toString().padStart(3,'0')}`;
}

// Start Button
document.getElementById("timer-start").addEventListener("click", () => {
    if (timerInterval) return; // already running

    let mins = parseInt(document.getElementById("minutes").value) || 0;
    let secs = parseInt(document.getElementById("seconds").value) || 0;

    timerRemaining = (mins * 60 + secs) * 1000;

    if (timerRemaining <= 0) {
        alert("Please enter a valid time!");
        return;
    }

    timerInterval = setInterval(updateTimer, 10);
});

// Stop Button
document.getElementById("timer-stop").addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
});

// Reset Button
document.getElementById("timer-reset").addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
    timerRemaining = 0;
    timerDisplay.textContent = "00:00.000";
    document.getElementById("minutes").value = "";
    document.getElementById("seconds").value = "";
});
