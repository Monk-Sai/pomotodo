// variables
let workTitle = document.getElementById('work');
let breakTitle = document.getElementById('break');
let breakTitleTwo = document.getElementById('break2');


let workTime = 25;
let breakTime = 5;
let breakTime2 = 10;

let seconds = "00";
let pomodoroCount = 0;

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
    loadTimerState();

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
                saveTimerState(); // Save the state after switching sessions
                return;
            }
            seconds = 59;
        }
        saveTimerState(); // Save the state periodically
    }
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


// Playlist function
async function playlist() {
    const iframe = document.getElementById("playlistFrame");
    iframe.src = "widgets/play-list.html";
    iframe.style.display = "flex"; // Show the iframe

    // Create a close button
    const closeButton = document.createElement('button');
    closeButton.addEventListener('click', closeToDoListPopup);

    // Append the close button to the document body
    document.body.appendChild(closeButton);

    // Function to close the popup
    function closeToDoListPopup() {
        iframe.style.display = "none";
        button.style.display = "flex"; // Show the button again
        closeButton.remove(); // Remove the close button
    }

    // Add event listener to close the popup when clicked outside
    function clickOutsidePopup(event) {
        if (!iframe.contains(event.target) && event.target !== closeButton) {
            closeToDoListPopup();
            document.removeEventListener('mousedown', clickOutsidePopup);
        }
    }

    // Add the event listener to close the popup when clicked outside
    document.addEventListener('mousedown', clickOutsidePopup);
}

// To do list
async function openToDoList() {
    const iframe = document.getElementById("todolistFrame");
    iframe.src = "widgets/to-do-list.html";
    iframe.style.display = "flex"; // Show the iframe

    // Create a close button
    const closeButton = document.createElement('button');
    closeButton.addEventListener('click', closeToDoListPopup);

    // Append the close button to the document body
    document.body.appendChild(closeButton);

    // Function to close the popup
    function closeToDoListPopup() {
        iframe.style.display = "none";
        button.style.display = "flex"; // Show the button again
        closeButton.remove(); // Remove the close button
    }

    // Add event listener to close the popup when clicked outside
    function clickOutsidePopup(event) {
        if (!iframe.contains(event.target) && event.target !== closeButton) {
            closeToDoListPopup();
            document.removeEventListener('mousedown', clickOutsidePopup);
        }
    }

    // Add the event listener to close the popup when clicked outside
    document.addEventListener('mousedown', clickOutsidePopup);
}

// Function idems div below
var section = document.getElementById('frameLoadSection');
var iframe = document.getElementById('todolistFrame');
section.appendChild(iframe);

var section = document.getElementById('frameLoadSection');
var iframe = document.getElementById('playlistFrame');
section.appendChild(iframe);


// run the timer even in background //
function saveTimerState() {
    localStorage.setItem('timerState', JSON.stringify({
        workMinutes: document.getElementById('minutes').innerText,
        seconds: document.getElementById('seconds').innerText,
        pomodoroCount: pomodoroCount,
        activeElement: detectActiveElement(),
        isRunning: (document.getElementById('pause').style.display === "flex"),
        timestamp: Date.now() // Save the current timestamp
    }));
}

function loadTimerState() {
    let savedState = localStorage.getItem('timerState');
    if (savedState) {
        savedState = JSON.parse(savedState);
        const elapsedTime = (Date.now() - savedState.timestamp) / 1000; // Calculate elapsed time in seconds

        let workMinutes = parseInt(savedState.workMinutes);
        let seconds = parseInt(savedState.seconds);

        // Update minutes and seconds based on elapsed time
        const totalSeconds = workMinutes * 60 + seconds - elapsedTime;
        workMinutes = Math.floor(totalSeconds / 60);
        seconds = Math.floor(totalSeconds % 60);

        if (totalSeconds <= 0) {
            // Handle case where time has elapsed
            workMinutes = 0;
            seconds = 0;
            // Optionally, you can trigger the next session or alert the user
        }

        document.getElementById('minutes').innerText = workMinutes;
        document.getElementById('seconds').innerText = seconds;
        pomodoroCount = savedState.pomodoroCount;

        if (savedState.activeElement === "Work") {
            workTitle.classList.add('active');
            breakTitle.classList.remove('active');
            breakTitleTwo.classList.remove('active');
        } else if (savedState.activeElement === "Break") {
            workTitle.classList.remove('active');
            breakTitle.classList.add('active');
            breakTitleTwo.classList.remove('active');
        } else if (savedState.activeElement === "Break2") {
            workTitle.classList.remove('active');
            breakTitle.classList.remove('active');
            breakTitleTwo.classList.add('active');
        }

        if (savedState.isRunning) {
            start();
        }
    }
}

window.addEventListener('beforeunload', saveTimerState);
window.addEventListener('unload', saveTimerState);

