/*
start quiz
question next
answer select 
submit scores
go back or clear high scores
*/

// Variables
var timeEl = document.querySelector(".timer");
var secondsRemain = 75;

function countdownTimer() {
    var timerInterval = setInterval(function() {
      secondsRemain--; 
      timeEl.textContent = "Timer: " + secondsRemain;
      if(secondsRemain === 0) {
        clearInterval(timerInterval);
      }
    }, 100); 
}

countdownTimer();