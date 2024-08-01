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

// Function to keep it running in the background
let timerInterval;
let startTime;
let remainingTime;
let isRunning = false;

// Pause timer function
function pause() {
    clearInterval(timerInterval);
    isRunning = false;

    // Get remaining seconds from displayed minutes and seconds
    let remainingMinutes = parseInt(document.getElementById('minutes').innerHTML);
    let remainingSeconds = parseInt(document.getElementById('seconds').innerHTML);

    remainingTime = remainingMinutes * 60 + remainingSeconds;

    document.getElementById('start').style.display = "flex";
    document.getElementById('pause').style.display = "none";
}


// Display
window.onload = () => {
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds;

    workTitle.classList.add('active');
    breakTitle.classList.remove('active');
    breakTitleTwo.classList.remove('active');
}


workClick.addEventListener('click', () => {
    setSession(workTime, workTitle, [breakTitle, breakTitleTwo]);
});

breakClick.addEventListener('click', () => {
    setSession(breakTime, breakTitle, [workTitle, breakTitleTwo]);
});

break2Click.addEventListener('click', () => {
    setSession(breakTime2, breakTitleTwo, [workTitle, breakTitle]);
});

function setSession(time, activeTitle, inactiveTitles) {
    document.getElementById('minutes').innerHTML = time;
    document.getElementById('seconds').innerHTML = "00";

    activeTitle.classList.add('active');
    inactiveTitles.forEach(title => title.classList.remove('active'));

    resetTimer();
    pause();
}

// Start timer
function start() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now();

        // Use the stored remaining time or the initial session time
        remainingTime = remainingTime !== undefined ? remainingTime : getRemainingTime();
        runTimer();
    }

    document.getElementById('start').style.display = "none";
    document.getElementById('pause').style.display = "flex";
}

function runTimer() {
    if (!isRunning) return;

    let elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    let timeLeft = remainingTime - elapsedTime;

    if (timeLeft <= 0) {
        handleSessionSwitch();
        return;
    }

    updateDisplay(timeLeft);
    requestAnimationFrame(runTimer);
}

function updateDisplay(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    document.getElementById('minutes').innerHTML = minutes;
    document.getElementById('seconds').innerHTML = seconds < 10 ? '0' + seconds : seconds;
}

function handleSessionSwitch() {
    clearInterval(timerInterval);
    isRunning = false;
    alarmSound.play();

    if (workTitle.classList.contains('active')) {
        setSession(breakTime, breakTitle, [workTitle, breakTitleTwo]);
    } else if (breakTitle.classList.contains('active')) {
        setSession(workTime, workTitle, [breakTitle, breakTitleTwo]);
    } else if (breakTitleTwo.classList.contains('active')) {
        setSession(workTime, workTitle, [breakTitle, breakTitleTwo]);
    }
}

function getRemainingTime() {
    if (workTitle.classList.contains('active')) {
        return workTime * 60;
    } else if (breakTitle.classList.contains('active')) {
        return breakTime * 60;
    } else if (breakTitleTwo.classList.contains('active')) {
        return breakTime2 * 60;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    remainingTime = getRemainingTime();
    isRunning = false;
}

// Reset Function
document.getElementById('reset').addEventListener('click', resetTimeNo);

function resetTimeNo() {
    resetTimer();
    pause();

    if (workTitle.classList.contains('active')) {
        updateDisplay(workTime * 60);
    } else if (breakTitle.classList.contains('active')) {
        updateDisplay(breakTime * 60);
    } else if (breakTitleTwo.classList.contains('active')) {
        updateDisplay(breakTime2 * 60);
    }

    document.getElementById('start').style.display = "flex";
    document.getElementById('pause').style.display = "none";
}

if (Notification.permission !== 'granted') {
    Notification.requestPermission();
}

function showNotification(title, body) {
    if (Notification.permission === 'granted') {
        let notification = new Notification(title, { body });
        notification.onclick = function() {
            handleNotificationClick();
            notification.close();
        };
    } else {
        alert(body);
        handleNotificationClick();
    }
}

function handleNotificationClick() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
    start(); // Start the next Pomodoro or timer
}

function handleSessionSwitch() {
    clearInterval(timerInterval);
    isRunning = false;
    alarmSound.play();

    showNotification('Pomodoro Timer', 'Time is up! Click to start the next session.');

    if (workTitle.classList.contains('active')) {
        setSession(breakTime, breakTitle, [workTitle, breakTitleTwo]);
    } else if (breakTitle.classList.contains('active')) {
        setSession(workTime, workTitle, [breakTitle, breakTitleTwo]);
    } else if (breakTitleTwo.classList.contains('active')) {
        setSession(workTime, workTitle, [breakTitle, breakTitleTwo]);
    }
}
