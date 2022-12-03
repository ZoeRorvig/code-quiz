// Variables
var click = 0;
var timeEl = document.querySelector(".timer");
var titleScreenEl = document.querySelector(".title-screen");
var startQuizBtnEl = document.querySelector("#startQuiz");
var quizSectionEl = document.querySelector(".quiz-section");
var feedbackEl = document.querySelector(".feedback");

var answers = ["1","1","3","2","3"];
var secondsRemain = 75;
var score = 0;
var timerInterval;
var check;
var element;

// Questions
var questionBank = [{
    question: "Question Text1",
    options: ["1. O1","2. O2","3. O3","4. O4"],
    answer: "1"
}, {    
    question: "Question Text2",
    options: ["1. O1","2. O2","3. O3"],
    answer: "1"
}, {    
    question: "Question Text3",
    options: ["1. O1","2. O2","3. O3","4. O4"],
    answer: "3"
}, {    
    question: "Question Text4",
    options: ["1. O1","2. O2","3. O3","4. O4"],
    answer: "2"
}, {    
    question: "Question Text5",
    options: ["1. O1","2. O2","3. O3","4. O4"],
    answer: "3"
}];

// Function for showing the questions
var questionDisplay = function() {
    quizSectionEl.querySelector("h2").textContent = questionBank[click].question;
    quizSectionEl.querySelector("#buttons").innerHTML = null;
    for (var questionOptions of questionBank[click].options) {
        var buttonEl = document.createElement("button");
        buttonEl.textContent = questionOptions;
        buttonEl.dataset.choice = questionOptions[0];
        quizSectionEl.querySelector("#buttons").appendChild(buttonEl);
    }
};

// Function for question grading
var questionCheck = function(){
    check = element.dataset.choice === answers[click];
    console.log(check);
    if (check === true){
        feedbackEl.querySelector("h3").textContent = "Correct";
    } else if (check === false){
        feedbackEl.querySelector("h3").textContent = "Wrong";
        secondsRemain -= 5;
        timeEl.textContent = "Timer: " + secondsRemain;
        console.log(secondsRemain);
    }
};

// Function to move questions forward
var nextQuestion = function(event){
    element = event.target;
    if (element.matches(".quiz-section button")){
        questionCheck();
    if (click < questionBank.length - 1){
        click++;
        quizSectionEl.dataset.index = click;
    } else{
        quizSectionEl.innerHTML = null;
        feedbackEl.innerHTML =null;
        score = secondsRemain;
        console.log(score);
        clearInterval(timerInterval);
        return;
    }
    questionDisplay();
}
};

// Function for timer countdown.
var countdownTimer = function() {
    timerInterval = setInterval(function() {
      secondsRemain--; 
      timeEl.textContent = "Timer: " + secondsRemain;
      if(secondsRemain === 0) {
        clearInterval(timerInterval);
        quizSectionEl.innerHTML = null;
        feedbackEl.innerHTML =null;
      }
    }, 1000); 
};

function beginQuiz(){
    titleScreenEl.querySelector("#clear").innerHTML = null;
    countdownTimer();
    questionDisplay();
}

// Add event listener to startQuiz button
startQuizBtnEl.addEventListener("click", beginQuiz);
quizSectionEl.addEventListener("click", nextQuestion);
