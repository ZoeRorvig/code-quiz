// Variables
var startQuizBtnEl = document.querySelector("#startQuiz");
var submitBtnEl = document.querySelector("#submit");
var backHomeBtnEl = document.querySelector("#back-home");
var clearScoresBtnEl = document.querySelector("#clear-scores");
var timeEl = document.querySelector(".timer");
var quizSectionEl = document.querySelector(".quiz-section");
var feedbackEl = document.querySelector(".feedback");
var finishedPageEl = document.querySelector("#finished-page");
var initialsEl = document.querySelector("#initial");
var highscoresListEl = document.querySelector("#highscore-list");

var click = 0;
var secondsRemain = 75;
var score = 0;
var timerInterval;
var element;

// Highscores
var highscores = [];

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

var correctAnswers = ["1","1","3","2","3"];

// Function to begin quiz
startQuizBtnEl.addEventListener("click", function beginQuiz(){
    resetScreen();
    countdownTimer();
    questionDisplay();
});

// Function for showing the questions
var questionDisplay = function() {
    quizSectionEl.style.display = "block";
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
    feedbackEl.style.display = "block";
    var check = element.dataset.choice === correctAnswers[click];
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
        resetScreen();
        score = secondsRemain;
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
        resetScreen();
        score = secondsRemain;
        allDone();
      }
    }, 1000); 
};

// Function for All Done page
var allDone = function (){
    document.getElementById("finished-page").style.display = "block";
    finishedPageEl.querySelector("p").textContent = "Your final score is " + score;
    submitBtnEl.addEventListener("click", function(event){
        event.preventDefault();

        var highscore = {
            score: score,
            initial: document.getElementById("initial").value,
        };

        console.log(highscore);

        highscores.push(highscore);

        console.log(highscores);

        localStorage.setItem("highscores",JSON.stringify(highscores));

        //TODO: Check to make sure initials were entered
        //TODO: sort high scores
        highScorePage();
    });
};

// Function for High Score page
var highScorePage = function(){
    resetScreen();
    document.getElementById("highscores").style.display = "block";
    highscoresListEl.style.display = "block";

    var storedHighscores = JSON.parse(localStorage.getItem("highscores"));

    if (storedHighscores !== null) {
        highscores = storedHighscores;
      }

    for (var i = 0; i < highscores.length; i++) {
        var userScore = highscores[i];
    
        var li = document.createElement("li");
        li.textContent = i+1 + ". " + userScore.initial + " - " + userScore.score;
        li.setAttribute("data-index", i);
        highscoresListEl.appendChild(li);
      };

    backHomeBtnEl.addEventListener("click", function(){
        resetScreen();
        highscores = [];
        secondsRemain = 75;
        click = 0;
        timeEl.textContent = "Timer: " + secondsRemain;
        quizSectionEl.dataset.index = 0;
        document.getElementById("title-page").style.display = "block";
        return;
    });

    //TODO: Why duplicates?
    //TODO: clear high scores

    clearScoresBtnEl.addEventListener("click", function(){
        localStorage.clear();
        highscoresListEl.style.display = "none";
    });
};

// Function to clear screen
var resetScreen = function() {
    document.getElementById("finished-page").style.display = "none";
    document.getElementById("title-page").style.display = "none";
    document.getElementById("highscores").style.display = "none";
    quizSectionEl.style.display = "none";
    feedbackEl.style.display = "none";
};





