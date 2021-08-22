//#region variables
// Obj array to store Q's and Ans'
const QA_SET = [
   {
      question: "What are the three foundational web technologies?",
      answer: ["HTML, CSS, Node", "Javascript, CSS, HTML", "Node, JSON, CSS", "HTML, Java, JQuery"],
      correctAnswerIndex: 1,
   },
   {
      question: "What is the element called that forms a search pattern out of a sequence of characters?",
      answer: ["Conditional Argument", "Boolean Variable", "Event", "RegExp or Regular Expression"],
      correctAnswerIndex: 3,
   },
   {
      question: "What is considered to be the most popular programming language in the world?",
      answer: ["Ruby", "HTML", "Swift", "Javascript"],
      correctAnswerIndex: 3,
   },
   {
      question: "What is the name of the statement that is used to exit or end a loop?",
      answer: ["Break statement", "Conditional statement", "Close statement", "Falter statement"],
      correctAnswerIndex: 0,
   },
   {
      question:
         "What is the language or list of instructions that are executed by the computer (how JavaScript is built)?",
      answer: ["Output", "Scope", "JSON", "Syntax"],
      correctAnswerIndex: 3,
   },
   {
      question: "What are the identifiers called that cannot be used as variables or function names?",
      answer: ["Reserved Words", "Constants", "Concrete Terms", "Favorites"],
      correctAnswerIndex: 0,
   },
   {
      question: "In JavaScript, what element is used to store and manipulate text, usually in multiples?",
      answer: ["Recorders", "Variables", "Strings", "Arrays"],
      correctAnswerIndex: 2,
   },
   {
      question: "What is the object called that lets you work with both dates and time-related data?",
      answer: ["Time field", "Dates", "Time-warp", "Clock"],
      correctAnswerIndex: 1,
   },
   {
      question:
         "What is the type of loop that continues through a block of code as long as the specified condition remains TRUE?",
      answer: ["For Loop", "While Loop", "Conditional Loop", "Else Loop"],
      correctAnswerIndex: 1,
   },
   {
      question:
         "What is the element used – and hidden – in code that explains things and makes the content more readable?",
      answer: ["Comparisons", "Comments", "Notes", "Quotations"],
      correctAnswerIndex: 1,
   },
];

const BUTTONS = 4;
const TIME_LIMIT = 100;
const TIME_TICK = 1000;
const WRONG_PENALTY = 10;
const EXAM_QUESTIONS = QA_SET.length;
const LOCAL_STG_KEY = "coding-quiz";

var startQuizBtn = document.querySelector("#start-quiz");
var answerBtn = document.querySelector("#answer-buttons");
var initialsBtn = document.querySelector("#initials-form");
var goBackBtn = document.querySelector("#go-back");
var clearScoresBtn = document.querySelector("#clear-scores");
var olHighestScoresList = document.querySelector("#high-score-list");
var questionCounter = 0;
var timeCounter = 0;
var intervalCtrl = 0;
var currentScorePair = {
   initials: "",
   score: 0,
};
var highestScores = [];

// Copying DOM sections into Global variables; to manage page display.
var myMain = document.querySelector("main");
var topBlockDiv = document.querySelector("#top-block");
var startQuizDiv = document.querySelector("#start-page");
var qAndADiv = document.querySelector("#quiz-questions");
var allDoneDiv = document.querySelector("#all-done");
var highScoresDiv = document.querySelector("#high-scores");

// Removing DOM sections from display but stored in memory.
myMain.removeChild(startQuizDiv);
myMain.removeChild(qAndADiv);
myMain.removeChild(allDoneDiv);
myMain.removeChild(highScoresDiv);
//#endregion variables

var processClearScores = function () {
   cleanHsList();
   localStorage.setItem(LOCAL_STG_KEY, JSON.stringify(highestScores));
};

var cleanHsList = function () {
   while (olHighestScoresList.firstChild) {
      olHighestScoresList.removeChild(olHighestScoresList.firstChild);
   }
   highestScores.length = 0;
};

var processGoBack = function () {
   myMain.removeChild(highScoresDiv);
   myMain.appendChild(topBlockDiv);
   myMain.appendChild(startQuizDiv);
   document.querySelector("#timer").innerHTML = "";
   cleanHsList();
};

var displayHighScores = function () {
   // Sort results in Descending order
   highestScores.sort((a, b) => (a.score > b.score ? -1 : 1));
   for (var i = 0; i < highestScores.length; i++) {
      var liElement = document.createElement("li");
      liElement.className = "hs-list";
      liElement.innerHTML = highestScores[i].initials + " - " + highestScores[i].score;
      olHighestScoresList.appendChild(liElement);
   }
};

var showHighScores = function () {
   myMain.removeChild(topBlockDiv);
   myMain.removeChild(allDoneDiv);
   myMain.appendChild(highScoresDiv);
   displayHighScores();
};

var processLocalStorage = function () {
   currentScorePair.initials = document.querySelector("#input-initials").value;
   currentScorePair.score = timeCounter;
   highestScores = [];
   var storedScores = localStorage.getItem(LOCAL_STG_KEY);
   if (!storedScores) {
      highestScores.push(currentScorePair);
      window.alert("Congrats " + currentScorePair.initials + "! Your first score is " + currentScorePair.score);
   } else {
      highestScores = JSON.parse(storedScores);
      var initialsIndex = highestScores.findIndex((i) => i.initials === currentScorePair.initials);

      if (initialsIndex < 0) {
         highestScores.push(currentScorePair);
         window.alert("Congrats " + currentScorePair.initials + "! Your first score is " + currentScorePair.score);
      } else {
         var previousScore = highestScores[initialsIndex].score;
         if (previousScore >= currentScorePair.score) {
            window.alert("You did not beat your previous high score... Keep trying!");
         } else {
            window.alert(
               "Congrats " +
                  currentScorePair.initials +
                  "! You beat your previous highest score!" +
                  "\n" +
                  "Previous score: " +
                  previousScore +
                  ". New Highest Score: " +
                  currentScorePair.score
            );
            highestScores[initialsIndex].score = currentScorePair.score;
         }
      }
   }
   localStorage.setItem(LOCAL_STG_KEY, JSON.stringify(highestScores));
};

var processAllDone = function (event) {
   event.preventDefault();
   if (document.querySelector("#input-initials").value === "") {
      window.alert("Please enter your initials!");
      return;
   }
   processLocalStorage();
   showHighScores();
};

var showAllDoneDiv = function () {
   myMain.removeChild(qAndADiv);
   myMain.appendChild(allDoneDiv);
   document.querySelector("#input-initials").value = "";
   document.querySelector("#final-score").innerHTML = timeCounter;
   document.querySelector("#timer").innerHTML = timeCounter;
};

var checkCorrectness = function () {
   var choice = event.target;
   var choiceIndex = choice.id.substring(4);
   var result = document.querySelector("#right-wrong");

   if (parseInt(choiceIndex) === QA_SET[questionCounter].correctAnswerIndex) {
      result.innerHTML = "Correct!";
   } else {
      result.innerHTML = "Wrong!";
      timeCounter -= WRONG_PENALTY;
      if (timeCounter <= 0) {
         timeCounter = 0;
         clearInterval(intervalCtrl);
         document.querySelector("#timer").innerHTML = timeCounter;
      }
   }
};

var processEachQuestion = function () {
   checkCorrectness();
   questionCounter++;

   if (questionCounter < EXAM_QUESTIONS && timeCounter > 0) {
      displayOneQuestion();
   } else {
      clearInterval(intervalCtrl);
      showAllDoneDiv();
   }
};

var displayOneQuestion = function () {
   var displayQuestion = qAndADiv.querySelector("#question");
   displayQuestion.innerHTML = QA_SET[questionCounter].question;

   for (var i = 0; i < BUTTONS; i++) {
      displayAnswers = qAndADiv.querySelector("#btn-" + i);
      displayAnswers.innerHTML = i + 1 + ". " + QA_SET[questionCounter].answer[i];
   }
};

var timeHandler = function () {
   if (timeCounter > 0) {
      timeCounter--;
   }
   document.querySelector("#timer").innerHTML = timeCounter;
   if (timeCounter === 0) {
      clearInterval(intervalCtrl);
      showAllDoneDiv();
   }
};

var startControls = function () {
   timeCounter = TIME_LIMIT;
   document.querySelector("#timer").innerHTML = timeCounter;
   intervalCtrl = setInterval(timeHandler, TIME_TICK);
   questionCounter = 0;
};

var showQAndADiv = function () {
   myMain.removeChild(startQuizDiv);
   myMain.appendChild(qAndADiv);
};

var processQAndADiv = function () {
   showQAndADiv();
   startControls();
   displayOneQuestion();

   // console.log(displayQuestion);
};

// Display start quiz page back to DOM.
myMain.appendChild(startQuizDiv);
startQuizBtn.addEventListener("click", processQAndADiv);
answerBtn.addEventListener("click", processEachQuestion);
initialsBtn.addEventListener("submit", processAllDone);
goBackBtn.addEventListener("click", processGoBack);
clearScoresBtn.addEventListener("click", processClearScores);
