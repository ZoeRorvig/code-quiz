/*
start quiz
question next
answer select 
submit scores
go back or clear high scores
*/

// Variables
var timeEl = document.querySelector(".timer");
var startQuizBtn = document.querySelector("#startQuiz");
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

function beginQuiz(){
    console.log("you clicked me!");
    countdownTimer();
}

// Add event listener to generate button
startQuizBtn.addEventListener("click", beginQuiz);
