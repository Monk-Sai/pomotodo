// variables
let workTitle = document.getElementById('work');
let breakTitle = document.getElementById('break');
let breakTitleTwo = document.getElementById('break2');


let workTime = 25;
let breakTime = 5;
let breakTime2 =10;

let seconds = "00";
let pomodoroCount = 0;

let remainingSeconds;

// Audio element for the alarm
let alarmSound = new Audio('../sounds/neraton.mp3');

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
    document.getElementById('seconds').innerHTML = seconds;

    workTitle.classList.add('active');
    breakTitle.classList.remove('active');
    breakTitleTwo.classList.remove('active');
});

breakClick.addEventListener('click', () => {
    document.getElementById('minutes').innerHTML = breakTime;
    document.getElementById('seconds').innerHTML = seconds;

    workTitle.classList.remove('active');
    breakTitle.classList.add('active');
    breakTitleTwo.classList.remove('active');
});

break2Click.addEventListener('click', () => {
    document.getElementById('minutes').innerHTML = breakTime2;
    document.getElementById('seconds').innerHTML = seconds;

    workTitle.classList.remove('active');
    breakTitle.classList.remove('active');
    breakTitleTwo.classList.add('active');
});

//start timer
function start() {
    //change button
    document.getElementById('start').style.display = "none";
    document.getElementById('pause').style.display = "flex";

    // Use the stored remaining seconds or set it to 59 if not set
    seconds = remainingSeconds !== undefined ? remainingSeconds : 59;

    let workMinutes = workTime - 1;
    let breakMinutes = breakTime - 1;

    //countdown
    let timerFunction = () => {
        //change the display
        document.getElementById('minutes').innerHTML = workMinutes;
        document.getElementById('seconds').innerHTML = seconds;

        //start
        seconds = seconds - 1;

        if(seconds === 0) {
            workMinutes = workMinutes - 1;
            if(workMinutes === -1){
                if(pomodoroCount === 0) {
                    // start a 5-minute break after the first Pomodoro
                    workMinutes = breakMinutes;
                    pomodoroCount++;

                    // change panel
                    workTitle.classList.remove('active');
                    breakTitle.classList.add('active');
                    breakTitleTwo.classList.remove('active');

                    alarmSound.play();

                }else if (pomodoroCount === 1) {
                    // start a 25-minute work after the first Break
                    workMinutes = 25; 
                    pomodoroCount++;

                    // change panel
                    workTitle.classList.add('active');
                    breakTitle.classList.remove('active');
                    breakTitleTwo.classList.remove('active');
                }else if (pomodoroCount === 2) {
                    // start a 10-minute break after the second Pomodoro
                    workMinutes = 10; 
                    pomodoroCount++;

                    // change panel
                    workTitle.classList.remove('active');
                    breakTitle.classList.remove('active');
                    breakTitleTwo.classList.add('active');
                }
                else if (pomodoroCount === 3) {

                    workMinutes = 25;
                    clearInterval(timerInterval); // Stop the timer using the stored ID

                    // change panel
                    breakTitle.classList.remove('active');
                    workTitle.classList.add('active');
                    breakTitleTwo.classList.remove('active');
                }
            }
        seconds = 59;
        }
    }
    // start Countdown
    timerInterval = setInterval(timerFunction, 1000);
}

// Pause timer function
function pause() {
    clearInterval(timerInterval);

     // Store the remaining seconds
    remainingSeconds = seconds;

    document.getElementById('start').style.display = "none";
    document.getElementById('pause').style.display = "flex";

    document.getElementById('start').style.display = "flex";
    document.getElementById('pause').style.display = "none";
}
