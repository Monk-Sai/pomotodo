
// variables
let workTitle = document.getElementById('work');
let breakTitle = document.getElementById('break');
let breakTitleTwo = document.getElementById('break2');


let workTime = 25;
let breakTime = 5;
let breakTime2 = 10;

let seconds = "00";
let pomodoroCount = 0;

let remainingMinutes;
let remainingSeconds;

// Pause timer function
async function pause() {
    clearInterval(timerInterval);

    // Store the remaining seconds
    remainingSeconds = seconds;

    document.getElementById('start').style.display = "none";
    document.getElementById('pause').style.display = "flex";

    document.getElementById('start').style.display = "flex";
    document.getElementById('pause').style.display = "none";
}

// Audio element for the alarm
let alarmSound = new Audio('../sounds/alarm_tone_1.mp3');

//Display
window.onload = () => {
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds;

    workTitle.classList.add('active');
    breakTitle.classList.remove('active');
    breakTitleTwo.classList.remove('active');
}

// Handle clicks on specific elements to switch between sessions
const workClick = document.getElementById('work');
const breakClick = document.getElementById('break');
const break2Click = document.getElementById('break2');

workClick.addEventListener('click', () => {

    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = "00";

    workTitle.classList.add('active');
    breakTitle.classList.remove('active');
    breakTitleTwo.classList.remove('active');

    // Change the button to play
    document.getElementById('start').style.display = "flex";
    document.getElementById('pause').style.display = "none";

    resetTimer();
});

breakClick.addEventListener('click', () => {

    document.getElementById('minutes').innerHTML = breakTime;
    document.getElementById('seconds').innerHTML = "00";

    workTitle.classList.remove('active');
    breakTitle.classList.add('active');
    breakTitleTwo.classList.remove('active');

    // Change the button to play
    document.getElementById('start').style.display = "flex";
    document.getElementById('pause').style.display = "none";

    resetTimer();
});

break2Click.addEventListener('click', () => {

    document.getElementById('minutes').innerHTML = breakTime2;
    document.getElementById('seconds').innerHTML = "00";

    workTitle.classList.remove('active');
    breakTitle.classList.remove('active');
    breakTitleTwo.classList.add('active');

    // Change the button to play
    document.getElementById('start').style.display = "flex";
    document.getElementById('pause').style.display = "none";

    resetTimer();
});


//start timer
async function start() {

    // Track button click event with Google Analytics
    gtag('event', 'click', {
        'event_category': 'Button',
        'event_label': 'Start Time'
    });

    //change button
    document.getElementById('start').style.display = "none";
    document.getElementById('pause').style.display = "flex";

    // Use the stored remaining seconds or set it to 59 if not set
    seconds = remainingSeconds || 59; // Use remainingSeconds if set, otherwise default to 59

    let workMinutes = workTime - 1;
    let breakMinutes = breakTime - 1;

    // Determine the active element and set initial values accordingly
    if (workTitle.classList.contains('active')) {
        workMinutes = workTime - 1;
    } else if (breakTitle.classList.contains('active')) {
        workMinutes = breakTime - 1;
    } else if (breakTitleTwo.classList.contains('active')) {
        workMinutes = breakTime2 - 1;
    }

    let newActiveElement = detectActiveElement();

    //countdown
    let timerFunction = () => {
        //change the display
        document.getElementById('minutes').innerHTML = workMinutes;
        document.getElementById('seconds').innerHTML = seconds;

        //start
        seconds = seconds - 1;

        if (seconds === 0) {
            workMinutes = workMinutes - 1;
            if (workMinutes === -1) {
                // Check for changes in the active element
                if (newActiveElement !== null) {
                    // Play sound and show alert when changing from one session to another
                    alarmSound.play();
                    alert(`Switching to ${newActiveElement} Session`);
                }
                if (pomodoroCount === 0) {
                    // start a 5-minute break after the first Pomodoro
                    workMinutes = breakMinutes;
                    pomodoroCount++;

                    // change panel
                    workTitle.classList.remove('active');
                    breakTitle.classList.add('active');
                    breakTitleTwo.classList.remove('active');

                } else if (pomodoroCount === 1) {
                    // start a 25-minute work after the first Break
                    workMinutes = 25;
                    pomodoroCount++;

                    // change panel
                    workTitle.classList.add('active');
                    breakTitle.classList.remove('active');
                    breakTitleTwo.classList.remove('active');

                } else if (pomodoroCount === 2) {
                    // start a 10-minute break after the second Pomodoro
                    workMinutes = 10;
                    pomodoroCount++;

                    // change panel
                    workTitle.classList.remove('active');
                    breakTitle.classList.remove('active');
                    breakTitleTwo.classList.add('active');
                }
                else if (pomodoroCount === 3) {

                    workMinutes = 2;
                    clearInterval(timerInterval); // Stop the timer using the stored ID

                    // change panel
                    breakTitle.classList.remove('active');
                    workTitle.classList.add('active');
                    breakTitleTwo.classList.remove('active');
                }
            }
            seconds = 59;
        }
    };
    // start Countdown
    timerInterval = setInterval(timerFunction, 1000);
}


// Function to detect the currently active element
async function detectActiveElement() {
    if (workTitle.classList.contains('active')) {
        return "Work";
    } else if (breakTitle.classList.contains('active')) {
        return "Break";
    } else if (breakTitleTwo.classList.contains('active')) {
        return "Break2";
    } else {
        return null;
    }
}

// Function to reset the timer
async function resetTimer() {
    clearInterval(timerInterval);
    remainingSeconds = undefined; // Reset remainingSeconds
}

// Reset Function
document.getElementById('reset').addEventListener('click', resetTimeNo);
function resetTimeNo() {
    clearInterval(timerInterval);
    let minutes;

    if (workTitle.classList.contains('active')) {
        minutes = workTime;
    } else if (breakTitle.classList.contains('active')) {
        minutes = breakTime;
    } else if (breakTitleTwo.classList.contains('active')) {
        minutes = breakTime2;
    }

    document.getElementById('minutes').innerHTML = minutes;
    document.getElementById('seconds').innerHTML = "00";
    document.getElementById('start').style.display = "flex";
    document.getElementById('pause').style.display = "none";
}