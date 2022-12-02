/*
start quiz
question next
answer select 
submit scores
go back or clear high scores
*/

// Questions
var questionBank = [{
    question: "Question Text",
    choices: ["O1","O2","O3","O4"],
    correct: 1
}, {    
    question: "Question Text",
    choices: ["O1","O2","O3","O4"],
    correct: 2
}, {    
    question: "Question Text",
    choices: ["O1","O2","O3","O4"],
    correct: 3
}, {    
    question: "Question Text",
    choices: ["O1","O2","O3","O4"],
    correct: 4
}, {    
    question: "Question Text",
    choices: ["O1","O2","O3","O4"],
    correct: 5
}];

// Variables
var timeEl = document.querySelector(".timer");
var startQuizBtn = document.querySelector("#startQuiz");


// Function for timer countdown.
function countdownTimer() {
    var secondsRemain = 75;
    var timerInterval = setInterval(function() {
      secondsRemain--; 
      timeEl.textContent = "Timer: " + secondsRemain;
      if(secondsRemain === 0) {
        clearInterval(timerInterval);
      }
    }, 100); 
}

function beginQuiz(){
    countdownTimer();
}

// Add event listener to startQuiz button
startQuizBtn.addEventListener("click", beginQuiz);
