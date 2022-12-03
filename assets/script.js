/*
start quiz
question next
answer select 
submit scores
go back or clear high scores
*/

// Variables
var click = 0;
var timeEl = document.querySelector(".timer");
var titleScreenEl = document.querySelector("#title-screen");
var startQuizBtnEl = document.querySelector("#startQuiz");
var quizSectionEl = document.querySelector(".quiz-section");

// Questions
var questionBank = [{
    question: "Question Text",
    choices: ["O1","O2","O3","O4"],
    answer: 1
}, {    
    question: "Question Text",
    choices: ["O1","O2","O3","O4"],
    answer: 2
}, {    
    question: "Question Text",
    choices: ["O1","O2","O3","O4"],
    answer: 3
}, {    
    question: "Question Text",
    choices: ["O1","O2","O3","O4"],
    answer: 4
}, {    
    question: "Question Text",
    choices: ["O1","O2","O3","O4"],
    answer: 5
}];

// Function for showing the questions
var displayQuestions = function() {
    quizSectionEl.querySelector('h2').textContent = questionBank[click].question;
};

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
    displayQuestions();
}

// Add event listener to startQuiz button
startQuizBtnEl.addEventListener("click", beginQuiz);
