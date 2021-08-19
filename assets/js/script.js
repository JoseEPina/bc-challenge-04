// var to keep track of correct answers
var correct = 0;

// Obj array to store Q's and Ans'
const QA_SET = [
   {
      question: "1RST QUESTION - What are the three foundational web technologies?",
      answer: ["HTML, CSS, Node", "Javascript, CSS, HTML", "Node, JSON, CSS", "HTML, Java, JQuery"],
      correctAnswerIndex: 1,
   },
   {
      question: "2ND QUESTION - What are the three foundational web tecknologies?",
      answer: ["HTML, CSS, Node", "Javascript, CSS, HTML", "Node, JSON, CSS", "HTML, Java, JQuery"],
      correctAnswerIndex: 4,
   },
   {
      question: "3RD QUESTION - What are the three foundational web tecknologies?",
      answer: ["HTML, CSS, Node", "Javascript, CSS, HTML", "Node, JSON, CSS", "HTML, Java, JQuery"],
      correctAnswerIndex: 3,
   },
   {
      question: "4TH QUESTION - What are the three foundational web tecknologies?",
      answer: ["HTML, CSS, Node", "Javascript, CSS, HTML", "Node, JSON, CSS", "HTML, Java, JQuery"],
      correctAnswerIndex: 2,
   },
];

const BUTTONS = 4;
const TIME_LIMIT = 75;

var myMain = document.querySelector("main");
// Copying DOM sections into Global variables; to manage page display.
var startQuizDiv = document.querySelector("#start-page");
var qAndADiv = document.querySelector("#quiz-questions");
var allDoneDiv = document.querySelector("#all-done");
var highScoresDiv = document.querySelector("#high-scores");

// Removing DOM sections from display but stored in memory.
myMain.removeChild(startQuizDiv);
myMain.removeChild(qAndADiv);
myMain.removeChild(allDoneDiv);
myMain.removeChild(highScoresDiv);

var showQAndADiv = function () {
   myMain.removeChild(startQuizDiv);
   myMain.appendChild(qAndADiv);
};

var startControls = function () {
   var timeCounter = TIME_LIMIT;
   document.querySelector("#timer").innerHTML = timeCounter;
};

var displayOneQuestion = function () {
   var displayQuestion = qAndADiv.querySelector("#question");
   displayQuestion.innerHTML = QA_SET[0].question;

   for (var i = 0; i < BUTTONS; i++) {
      displayAnswers = qAndADiv.querySelector("#btn-" + i);
      displayAnswers.innerHTML = i + 1 + ". " + QA_SET[0].answer[i];
   }
};

var processQAndADiv = function () {
   showQAndADiv();
   displayOneQuestion();
   startControls();
   // console.log(displayQuestion);
};

// Display start quiz page back to DOM.
myMain.appendChild(startQuizDiv);
var startQuizBtn = document.querySelector("#start-quiz");
startQuizBtn.addEventListener("click", processQAndADiv);
