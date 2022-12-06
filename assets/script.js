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
var highscoreLinkEl = document.querySelector("#highscore-link");
var click = 0;
var score = 0;
var secondsRemain = 75;
var timerInterval;
var element;
var highscore;
var highscores = [];

// Questions
var questionBank = [{
    question: "Inside which HTML element do we put the JavaScript?",
    options: ["A. <scripting>","B. <javascript>","C. <script>","D. <js>"],
    answer: "1"
}, {    
    question: "Question Text2",
    options: ["A. O1","B. O2","C. O3","D. O4"],
    answer: "1"
}, {    
    question: "Question Text3",
    options: ["A. O1","B. O2","C. O3","D. O4"],
    answer: "3"
}, {    
    question: "How do you write \"Hello World\" in an alert box?",
    options: ["A. O1","B. O2","C. O3","D. O4"],
    answer: "2"
}, {    
    question: "Question Text5",
    options: ["A. O1","B. O2","C. O3","D. O4"],
    answer: "3"
}, {    
    question: "How does a FOR loop start?",
    options: ["A. for(i = 0; i <= 5; i++)","B. for(i<=5; i++)","C. for i = 1 to 5","D. for(i = 0; i <= 5)"],
    answer: "2"
}, {    
    question: "Question Text4",
    options: ["A. O1","B. O2","C. O3","D. O4"],
    answer: "2"
}, {    
    question: "Question Text4",
    options: ["A. O1","B. O2","C. O3","D. O4"],
    answer: "2"
}, {    
    question: "Question Text4",
    options: ["A. O1","B. O2","C. O3","D. O4"],
    answer: "2"
}, {    
    question: "Question Text4",
    options: ["A. O1","B. O2","C. O3","D. O4"],
    answer: "2"
}];

var correctAnswers = ["1","1","3","2","3","1","1","3","2","3"];

// Function to begin quiz
startQuizBtnEl.addEventListener("click", function beginQuiz(){
    resetScreen();
    grabHighscores();
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
        feedbackEl.querySelector("h3").textContent = "Correct!";
    } else if (check === false){
        feedbackEl.querySelector("h3").textContent = "Wrong! The correct answer was " + correctAnswers[click] + ".";
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

      if (secondsRemain === 0) {
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
    questionCheck();
};

// Function to grab High Scores
var grabHighscores = function(){
var storedHighscores = JSON.parse(localStorage.getItem("highscores"));

if (storedHighscores !== null) {
    highscores = storedHighscores;
  };
};

// Function for High Score page
var highScorePage = function(){
    resetScreen();
    timeEl.style.display = "none";
    highscoreLinkEl.style.display = "none";
    document.getElementById("highscores").style.display = "block";
    highscoresListEl.style.display = "block";

   grabHighscores();
    highscoresListEl.innerHTML = null;
    for (var i = 0; i < highscores.length; i++) {
        var userScore = highscores[i];
    
        var li = document.createElement("li");
        li.textContent = i+1 + ". " + userScore.initial + " - " + userScore.score;
        li.setAttribute("data-index", i);
        highscoresListEl.appendChild(li);
      };
};

// Function to submit initials and highscore
submitBtnEl.addEventListener("click", function(event){
    event.preventDefault();
    if (document.getElementById("initial").value == ""){
        alert("Please enter your initials!");
        return allDone;
    }
    highscore = {
        score: score,
        initial: document.getElementById("initial").value,
    };
    highscores.push(highscore);
    localStorage.setItem("highscores",JSON.stringify(highscores));
    highScorePage();
});

// Button on the high scores page to go back to the home screen.
backHomeBtnEl.addEventListener("click", function(){
    resetScreen();
    secondsRemain = 75;
    click = 0;
    timeEl.textContent = "Timer: " + secondsRemain;
    quizSectionEl.dataset.index = 0;
    document.getElementById("title-page").style.display = "block";
    timeEl.style.display = "block";
    highscoreLinkEl.style.display = "block";
    location.reload();
    return;
});

// Button on High Scores page to clear the high scores.
clearScoresBtnEl.addEventListener("click", function(){
    localStorage.clear();
    highscoresListEl.style.display = "none";
    grabHighscores();
});

// Link at the top of the page to view the high scores.
highscoreLinkEl.addEventListener("click", function(){
    highScorePage();
});

// Clears the feedback section when the initials input box is clicked.
initialsEl.addEventListener("click", function(){
    feedbackEl.style.display = "none";
});

// Function to clear screen
var resetScreen = function() {
    document.getElementById("finished-page").style.display = "none";
    document.getElementById("title-page").style.display = "none";
    document.getElementById("highscores").style.display = "none";
    quizSectionEl.style.display = "none";
    feedbackEl.style.display = "none";
};


