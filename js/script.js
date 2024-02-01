// variables
let workTitle = document.getElementById('work');
let breakTitle = document.getElementById('break');
let break2Title = document.getElementById('break2');

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
    document.getElementById('reset').style.display = "flex";

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
                    // start second Pomodoro
                    workMinutes = 25; // 25 minutes minus 1
                    pomodoroCount++;

                    // change panel
                    workTitle.classList.add('active');
                    breakTitle.classList.remove('active');
                    break2Title.classList.remove('active');
                }else if (pomodoroCount === 2) {
                    // start a 10-minute break after the second Pomodoro
                    workMinutes = 10; // 10 minutes minus 1
                    pomodoroCount++;

                    // change panel
                    workTitle.classList.remove('active');
                    breakTitle.classList.remove('active');
                    break2Title.classList.add('active');
                }else if (pomodoroCount === 3) {
                    // stop Pomodoro
                    workMinutes = clearInterval(); 

                    // change panel
                    workTitle.classList.add('active');
                    breakTitle.classList.remove('active');
                    break2Title.classList.remove('active');
                }
                else {
                    workMinutes = workTime;
                    pomodoroCount = 0;

                    // change panel
                    breakTitle.classList.add('active');
                    workTitle.classList.remove('active');
                    break2Title.classList.remove('active');
                }
            }
        seconds = 59;
        }
    }

    // start Countdown
    setInterval(timerFunction, 1000);
}