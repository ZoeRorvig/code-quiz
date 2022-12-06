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
var cursor = 0;
var secondsRemain = 75;
var timerInterval;
var element;
var highscore;
var highscores = [];

// Questions
var questionBank = [{
    question: "Inside which HTML element do we put the JavaScript?",
    options: ["A. <scripting>","B. <javascript>","C. <script>","D. <js>"],
    answer: "C"
}, {    
    question: "Choose the correct HTML element for the largest heading:",
    options: ["A. <h6>","B. <heading>","C. <head>","D. <h1>"],
    answer: "D"
}, {    
    question: "Which is the correct CSS syntax?",
    options: ["A. {body;color:black;}","B. body {color: black;}","C. body:color=black;"],
    answer: "B"
}, {    
    question: "How do you write \"Hello World\" in an alert box?",
    options: ["A. alert(\"Hello World\");","B. alertBox(\"Hello World\");","C. msgBox(\"Hello World\");"],
    answer: "A"
}, {    
    question: "Which CSS property controls the text size?",
    options: ["A. font-style","B. text-size","C. text-style","D. font-size"],
    answer: "D"
}, {    
    question: "How does a FOR loop start?",
    options: ["A. for(i = 0; i <= 5; i++)","B. for(i<=5; i++)","C. for i = 1 to 5"],
    answer: "A"
}, {    
    question: "Which character is used to indicate an end tag?",
    options: ["A. <","B. *","C. /","D. ^"],
    answer: "C"
}, {    
    question: "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
    options: ["A. longdesc","B. title","C. alt","D. src"],
    answer: "C"
}, {    
    question: "How do you declare a JavaScript variable?",
    options: ["A. v carName;","B. var carName;","C. variable carName;"],
    answer: "B"
}, {    
    question: "How can you make a numbered list?",
    options: ["A. <dl>","B. <ul>","C. <ol>","D. <list>"],
    answer: "C"
}];

var correctAnswers = ["C","D","B","A","D","A","C","C","B","C"];

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
    quizSectionEl.querySelector("h2").textContent = questionBank[cursor].question;
    quizSectionEl.querySelector("#buttons").innerHTML = null;
for (var questionOptions of questionBank[cursor].options) {
        var buttonEl = document.createElement("button");
        buttonEl.textContent = questionOptions;
        buttonEl.dataset.choice = questionOptions[0];
        quizSectionEl.querySelector("#buttons").appendChild(buttonEl);
    }
};

// Function for question grading
var questionCheck = function(){
    feedbackEl.style.display = "block";
    var check = element.dataset.choice === correctAnswers[cursor];
    if (check === true){
        feedbackEl.querySelector("h3").textContent = "Correct!";
    } else if (check === false){
        feedbackEl.querySelector("h3").textContent = "Wrong! The correct answer was " + correctAnswers[cursor] + ".";
        secondsRemain -= 5;
        timeEl.textContent = "Timer: " + secondsRemain;
    }
};

// Function to move questions forward
quizSectionEl.addEventListener("click", function(event){
    element = event.target;
    if (element.matches(".quiz-section button")){
        questionCheck();
    if (cursor < questionBank.length - 1){
        cursor++;
        quizSectionEl.dataset.index = cursor;
    } else{
        resetScreen();
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
        allDone();
      }
    }, 1000); 
};

// Function for All Done page
var allDone = function (){
    questionCheck();
    document.getElementById("finished-page").style.display = "block";
    if (secondsRemain < 0){
        secondsRemain = 0;
    }
    timeEl.textContent = "Timer: " + secondsRemain;
    finishedPageEl.querySelector("p").textContent = "Your final score is " + secondsRemain + "!";
    
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
        score: secondsRemain,
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
    cursor = 0;
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


