// variables
let workTitle = document.getElementById('work');
let breakTitle = document.getElementById('break');

let workTime = 25;
let breakTime = 5;

let seconds = "00"
let pomodoroCount = 0;

//Display
window.onload = () => {
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds;

    workTitle.classList.add('active');
}

//start timer
function start() {
    //change button
    document.getElementById('start').style.display = "none";
    document.getElementById('reset').style.display = "block";

    //change time
    seconds = 59;

    let workMinutes = workTime - 1;
    let breakMinutes = breakTime - 1;

    breakCount = 10;

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
                    // start break
                    workMinutes = breakMinutes;
                    pomodoroCount++;

                    // change panel
                    workTitle.classList.remove('active');
                    breakTitle.classList.add('active');
                }else if (pomodoroCount === 1) {
                    // start a 10-minute break after the second Pomodoro
                    workMinutes = 9; // 10 minutes minus 1
                    pomodoroCount++;

                    // change panel
                    workTitle.classList.remove('active');
                    breakTitle.classList.add('active');
                }else {
                    workMinutes = workTime;
                    pomodoroCount = 0;

                    // change panel
                    breakTitle.classList.add('active');
                    workTitle.classList.remove('active');
                }
            }
            seconds = 59;
        }
    }

    // start Countdown
    setInterval(timerFunction, 1000);
}