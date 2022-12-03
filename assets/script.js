// Variables
var click = 0;
var timeEl = document.querySelector(".timer");
var mainSectionEl = document.querySelector(".main-section");
var startQuizBtnEl = document.querySelector("#startQuiz");
var quizSectionEl = document.querySelector(".quiz-section");
var feedbackEl = document.querySelector(".feedback");
var finishedPageEl = document.querySelector("#finished-page");
var finalScoreEl = document.querySelector("#final-score");
var submitBtnEl = document.querySelector("#submit");

var answers = ["1","1","3","2","3"];
var secondsRemain = 75;
var score = 0;
var timerInterval;
var element;

// Highscores
var highscores = [{
    score: "",
    initials: "",
}];

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
    var check = element.dataset.choice === answers[click];
    console.log(check);
    if (check === true){
        feedbackEl.querySelector("h3").textContent = "Correct";
    } else if (check === false){
        feedbackEl.querySelector("h3").textContent = "Wrong";
        secondsRemain -= 5;
        timeEl.textContent = "Timer: " + secondsRemain;
    }
};

// Function to move questions forward
quizSectionEl.addEventListener("click", function(event){
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
        allDone();
        return;
    }
    questionDisplay();
}
});

// Function for timer countdown.
var countdownTimer = function() {
    timerInterval = setInterval(function() {
      secondsRemain--; 
      timeEl.textContent = "Timer: " + secondsRemain;
      if(secondsRemain === 0) {
        clearInterval(timerInterval);
        quizSectionEl.innerHTML = null;
        feedbackEl.innerHTML =null;
        score = secondsRemain;
        allDone();
      }
    }, 1000); 
};

// Function for All Done page
var allDone = function (){
    document.getElementById('finished-page').style.display = "block";
    finishedPageEl.querySelector("p").textContent = "Your final score is " + score;
    submitBtnEl.addEventListener("click", function(){
        console.log("hello");
        //TODO: Store values then pull for highscore page
    });
};



startQuizBtnEl.addEventListener("click", function beginQuiz(){
    // mainSectionEl.querySelector("#title-page").innerHTML = null;
    document.getElementById('title-page').style.display = "none";
    countdownTimer();
    questionDisplay();
});



