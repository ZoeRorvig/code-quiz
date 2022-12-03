// Variables
var click = 0;
var timeEl = document.querySelector(".timer");
var titleScreenEl = document.querySelector(".title-screen");
var startQuizBtnEl = document.querySelector("#startQuiz");
var quizSectionEl = document.querySelector(".quiz-section");

// Questions
var questionBank = [{
    question: "Question Text1",
    options: ["O1","O2","O3","O4"],
    answer: 0
}, {    
    question: "Question Text2",
    options: ["O1","O2","O3","O4"],
    answer: 1
}, {    
    question: "Question Text3",
    options: ["O1","O2","O3","O4"],
    answer: 3
}, {    
    question: "Question Text4",
    options: ["O1","O2","O3","O4"],
    answer: 2
}, {    
    question: "Question Text5",
    options: ["O1","O2","O3","O4"],
    answer: 3
}];

// Function for showing the questions
var questionDisplay = function() {
    quizSectionEl.querySelector("h2").textContent = questionBank[click].question;
    for (var questionOptions of questionBank[click].options) {
        var buttonEl = document.createElement("button");
        buttonEl.textContent = questionOptions;
        quizSectionEl.appendChild(buttonEl);
    }
};

// Function to move questions forward
var nextQuestion = function(event){
    var element = event.target;
    if(element.matches(".quiz-section button")){
    if(click < questionBank.length - 1){
        var answers = element.dataset.choice === questionBank.answer[click];
        console.log(answers);
        click++;
    }
    questionDisplay();
}
};

// Function for timer countdown.
var countdownTimer = function() {
    var secondsRemain = 75;
    var timerInterval = setInterval(function() {
      secondsRemain--; 
      timeEl.textContent = "Timer: " + secondsRemain;
      if(secondsRemain === 0) {
        clearInterval(timerInterval);
      }
    }, 100); 
};

function beginQuiz(){
    titleScreenEl.querySelector("#clear").innerHTML = null;
    countdownTimer();
    questionDisplay();
}

// Add event listener to startQuiz button
startQuizBtnEl.addEventListener("click", beginQuiz);
quizSectionEl.addEventListener("click", nextQuestion);
