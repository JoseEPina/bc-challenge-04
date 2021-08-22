//#region general variables
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
// Constants
const BUTTONS = 4;
const TIME_LIMIT = 100;
const TIME_TICK = 1000;
const WRONG_PENALTY = 10;
const EXAM_QUESTIONS = QA_SET.length;
const LOCAL_STG_KEY = "coding-quiz";
// DOM variables
var startQuizBtn = document.querySelector("#start-quiz");
var answerBtn = document.querySelector("#answer-buttons");
var allDoneBtn = document.querySelector("#initials-form");
var goBackBtn = document.querySelector("#go-back");
var clearScoresBtn = document.querySelector("#clear-scores");
var olHighestScoresList = document.querySelector("#high-score-list");
var viewHsBtn = document.querySelector("#view-hs");
// Program control variables
var questionCounter = 0;
var timeCounter = 0;
var intervalCtrl = 0;
// Object assigned for each player
var currentScorePair = {
   initials: "",
   score: 0,
};
// Array to hold array of objects
var highestScores = [];
//#endregion general variables

//#region DOM variables
// Copying DOM div elements into Global variables; to manage page display.
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
//#endregion DOM variables

//#region startQuizBtn
var displayOneQuestion = function () {
   var displayQuestion = qAndADiv.querySelector("#question"); // Gets the element needed to display the question
   displayQuestion.innerHTML = QA_SET[questionCounter].question; // displays the question from QA_SET

   for (var i = 0; i < BUTTONS; i++) {
      // Displays ALL available answer choices
      displayAnswers = qAndADiv.querySelector("#btn-" + i); // Gets the element needed to display the choice #"i"
      displayAnswers.innerHTML = i + 1 + ". " + QA_SET[questionCounter].answer[i]; // Displays the answer into the button
   }
};

var timeHandler = function () {
   // Utility func to manage the Timer
   if (timeCounter > 0) {
      // Validates to prevent Negative count.
      timeCounter--;
   }
   document.querySelector("#timer").innerHTML = timeCounter; // Displays current Timer countdown
   if (timeCounter === 0) {
      // Exam allowed time has been exhausted (reached 0).
      clearInterval(intervalCtrl); // STOPS Timer
      showAllDoneDiv(); // Displays AllDoneDiv page
   }
};

var startControls = function () {
   // Utility func to initialize program controls
   timeCounter = TIME_LIMIT; // Sets exam Time limit
   document.querySelector("#timer").innerHTML = timeCounter; // Display Timer
   intervalCtrl = setInterval(timeHandler, TIME_TICK); // STARTS Timer countdown with handler function to manage time
   questionCounter = 0; // Sets exam initial question index
};

var showQAndADiv = function () {
   // Displays exam question page
   myMain.removeChild(startQuizDiv);
   myMain.appendChild(qAndADiv);
};

var processQAndADiv = function () {
   // Callback func for startQuizBtn Event Listener
   showQAndADiv(); // Enables exam area page
   startControls(); // Initialize program controls
   displayOneQuestion(); // Displays first question
};
//#endregion startQuizBtn

//#region answerBtn
var showAllDoneDiv = function () {
   // Displays allDone page
   myMain.removeChild(qAndADiv);
   myMain.appendChild(allDoneDiv);
   document.querySelector("#input-initials").value = ""; // Clear input field
   document.querySelector("#final-score").innerHTML = timeCounter; // display final score
   document.querySelector("#timer").innerHTML = timeCounter; // displays final timer
};

var checkCorrectness = function () {
   // Determines if answer is correct or incorrect
   var choice = event.target; // Identifies which answer (button-clicked) was selected
   var choiceIndex = choice.id.substring(4); // Get Index ID number off from button element (of button-clicked)
   var result = document.querySelector("#right-wrong"); // Store user selection into result variable
   // Compare user selection (choiceIndex) with correct answer property
   if (parseInt(choiceIndex) === QA_SET[questionCounter].correctAnswerIndex) {
      result.innerHTML = "Correct!";
      setTimeout(function () {
         result.innerHTML = "";
      }, 1000);
   } else {
      result.innerHTML = "Wrong!";
      setTimeout(function () {
         result.innerHTML = "";
      }, 1000);
      timeCounter -= WRONG_PENALTY; // Apply penalty time deduction
      if (timeCounter <= 0) {
         // Checks if penalty exhausted available exam time
         timeCounter = 0;
         clearInterval(intervalCtrl); // STOPS Timer
         document.querySelector("#timer").innerHTML = timeCounter; // Update and Display Timer when stopped (back to 0)
      }
   }
};

var processEachQuestion = function () {
   checkCorrectness();
   questionCounter++; // increase exam question Index

   // If exam has not finished AND there is still time available
   if (questionCounter < EXAM_QUESTIONS && timeCounter > 0) {
      displayOneQuestion(); // Display next question
   } else {
      // Exam is Finished OR time is exhausted
      clearInterval(intervalCtrl); // STOPS Timer
      showAllDoneDiv(); // Displays allDoneDiv page
   }
};
//#endregion answerBtn

//#region allDoneBtn
var displayHighScores = function () {
   // Sort results in Descending order ( -1 : 1 ), use (1 : -1) for ascending order
   highestScores.sort((a, b) => (a.score > b.score ? -1 : 1));
   for (var i = 0; i < highestScores.length; i++) {
      var liElement = document.createElement("li"); // creates individual <li> elements

      // Build element with initials & score
      // This array contains only the highest Scores
      liElement.innerHTML = highestScores[i].initials + " - " + highestScores[i].score;
      olHighestScoresList.appendChild(liElement);
   }
};

var showHighScores = function () {
   // Displays highest score page
   myMain.removeChild(topBlockDiv);
   myMain.removeChild(allDoneDiv);
   myMain.appendChild(highScoresDiv);
   displayHighScores();
};

// Process current player initials & score and determines if currentScore is the highest.
// Displays status messages to the player by comparing current score with previous stored Score.
var processLocalStorage = function () {
   currentScorePair.initials = document.querySelector("#input-initials").value.toUpperCase(); // Get player initials off from input box
   currentScorePair.score = timeCounter; // Assign current score from current timer value
   highestScores = [];
   var storedScores = localStorage.getItem(LOCAL_STG_KEY); // Retrieve localStorage data
   if (!storedScores) {
      // Check if localStorage is empty of data
      highestScores.push(currentScorePair); // If empty, pushes currentScorePair
      window.alert("Congrats " + currentScorePair.initials + "! Your first score is " + currentScorePair.score);
   } else {
      // LocalStorage is NOT empty
      highestScores = JSON.parse(storedScores); // Get highestScores array populated with localStorage data
      // Checks if current initials exists in highestScores array and returns the index number, if it is found.
      var initialsIndex = highestScores.findIndex((i) => i.initials === currentScorePair.initials);

      if (initialsIndex < 0) {
         // initials are NOT in the array
         highestScores.push(currentScorePair); // These are new initials pushed into the array
         window.alert("Congrats " + currentScorePair.initials + "! Your first score is " + currentScorePair.score);
      } else {
         // initials ARE already in the array
         var previousScore = highestScores[initialsIndex].score; // Gets previous score from array
         if (previousScore >= currentScorePair.score) {
            // currentScore is less than or equal to previous score.
            window.alert("You did not beat your previous high score... Keep trying!");
         } else {
            // currentScore is greater than previousScore
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
            // Updates array with new highestScore.
            highestScores[initialsIndex].score = currentScorePair.score;
         }
      }
   }
   // Updates localStorage with new highestScore.
   localStorage.setItem(LOCAL_STG_KEY, JSON.stringify(highestScores));
};

var processAllDone = function (event) {
   // Callback func for allDoneBtn Event Listener
   event.preventDefault(); // prevent form submission
   if (document.querySelector("#input-initials").value === "") {
      // Validates for empty initials
      window.alert("Please enter your initials!");
      return;
   }
   processLocalStorage();
   showHighScores();
};
//#endregion allDoneBtn

//#region goBackBtn
var cleanHsList = function () {
   // Utility func to clear screen
   // Removes list of Scores
   while (olHighestScoresList.firstChild) {
      olHighestScoresList.removeChild(olHighestScoresList.firstChild);
   }
   highestScores.length = 0; // Initialize array for new list
};

var processGoBack = function () {
   // Callback func for goBackBtn Event Listener
   myMain.removeChild(highScoresDiv);
   myMain.appendChild(topBlockDiv);
   myMain.appendChild(startQuizDiv);
   timeCounter = 0; // Reset Timer for restart
   document.querySelector("#timer").innerHTML = ""; // Reset display of timeCounter on screen
   cleanHsList(); // Remove list of scores from screen
};
//#endregion goBackBtn

//#region clearScoresBtn
var processClearScores = function () {
   // Utility func to clear screen and localStorage
   cleanHsList();
   localStorage.setItem(LOCAL_STG_KEY, JSON.stringify(highestScores));
};
//#endregion clearScoresBtn

//#region viewHsBtn
var processViewHs = function () {
   clearInterval(intervalCtrl); // Stop timer to interrupt current process and view HighScores
   while (myMain.firstChild) {
      // Removes all DOM elements from display
      myMain.removeChild(myMain.firstChild);
   }
   myMain.appendChild(highScoresDiv); // Display HighScore page
   // Get current data from localStorage
   var storedScores = localStorage.getItem(LOCAL_STG_KEY);
   if (storedScores) {
      // If localStorage exists,
      highestScores = JSON.parse(storedScores);
   }
   displayHighScores();
};
//#endregion viewHsBtn

// Display start quiz page
myMain.appendChild(startQuizDiv);

// Event Listeners
startQuizBtn.addEventListener("click", processQAndADiv);
answerBtn.addEventListener("click", processEachQuestion);
allDoneBtn.addEventListener("submit", processAllDone);
goBackBtn.addEventListener("click", processGoBack);
clearScoresBtn.addEventListener("click", processClearScores);
viewHsBtn.addEventListener("click", processViewHs);
