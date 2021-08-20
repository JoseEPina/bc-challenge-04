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
      correctAnswerIndex: 3,
   },
   {
      question: "3RD QUESTION - What are the three foundational web tecknologies?",
      answer: ["HTML, CSS, Node", "Javascript, CSS, HTML", "Node, JSON, CSS", "HTML, Java, JQuery"],
      correctAnswerIndex: 2,
   },
   {
      question: "4TH QUESTION - What are the three foundational web tecknologies?",
      answer: ["HTML, CSS, Node", "Javascript, CSS, HTML", "Node, JSON, CSS", "HTML, Java, JQuery"],
      correctAnswerIndex: 0,
   },
];

const BUTTONS = 4;
const TIME_LIMIT = 20;
const TIME_TICK = 1000;
const WRONG_PENALTY = 10;
const EXAM_QUESTIONS = QA_SET.length;

var startQuizBtn = document.querySelector("#start-quiz");
var answerBtn = document.querySelector("#answer-buttons");
var questionCounter = 0;
var timeCounter = 0;
var intervalCtrl = 0;

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

var showAllDoneDiv = function () {
   clearInterval(intervalCtrl);
   console.log("Entering showAllDoneDiv");
   myMain.removeChild(qAndADiv);
   console.log("removed qAndADiv");
   myMain.appendChild(allDoneDiv);
   console.log("appended allDoneDiv");
   // document.querySelector("#timer").innerHTML = timeCounter;
   document.querySelector("#final-score").innerHTML = timeCounter;
   console.log("updated final-score");
};

var timeHandler = function () {
   console.log("timeHandler " + questionCounter);
   timeCounter--;
   document.querySelector("#timer").innerHTML = timeCounter;
   if (timeCounter === 0) {
      console.log("timeHandler-showAllDoneDiv");
      clearInterval(intervalCtrl);
      showAllDoneDiv();
   }
};

var checkCorrectness = function () {
   console.log("checkCorrectness: " + questionCounter);
   var choice = event.target;
   var choiceIndex = choice.id.substring(4);
   var result = document.querySelector("#right-wrong");

   if (parseInt(choiceIndex) === QA_SET[questionCounter].correctAnswerIndex) {
      console.log("Correct: " + timeCounter);
      result.innerHTML = "Correct!";
   } else {
      result.innerHTML = "Wrong!";
      timeCounter -= WRONG_PENALTY;
      console.log(timeCounter);
      if (timeCounter <= 0) {
         console.log("checkcorrectness-showAllDoneDiv");
         timeCounter = 0;
         clearInterval(intervalCtrl);
         document.querySelector("#timer").innerHTML = timeCounter;
         showAllDoneDiv();
      }
   }
};

var processEachQuestion = function () {
   console.log("Process each: " + questionCounter);
   if (questionCounter < EXAM_QUESTIONS) {
      checkCorrectness();
   }
   questionCounter++;
   if (questionCounter < EXAM_QUESTIONS) {
      console.log("Display One Question: ", questionCounter);
      displayOneQuestion();
   } else {
      // clearInterval(intervalCtrl);
      console.log("processEach-showAllDoneDiv");
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

var startControls = function () {
   timeCounter = TIME_LIMIT;
   document.querySelector("#timer").innerHTML = timeCounter;
   intervalCtrl = setInterval(timeHandler, TIME_TICK);
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
