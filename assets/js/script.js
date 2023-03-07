var startBtn = document.querySelector("#start");
var timeEl = document.querySelector(".time");
var mainEl = document.getElementById("main");
var qArea = document.getElementById("Q-area");
var AArea = document.getElementById("A-area");
var secondsLeft = 70;
var a1Btn = document.getElementById("a1");
var a2Btn = document.getElementById("a2");
var a3Btn = document.getElementById("a3");
var a4Btn = document.getElementById("a4");
var aBtn = document.querySelectorAll(".A-btn");

// object full of objects for Qs and corresponding A arrays

var quizChunks = [
  {question: "What are you wearing",
  ans1: "pizza",
  ans2: "rats",
  ans3: "skin suit",
  ans4: "music",
  correct: "skin suit"},

  {question: "why are we here on earth",
  ans1: "pizza",
  ans2: "rats",
  ans3: "boogers",
  ans4: "to fart around",
  correct: "to fart around"},

  {question: "what is food",
  ans1: "pizza",
  ans2: "rats",
  ans3: "food",
  ans4: "all of the above",
  correct: "all of the above"}
];

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft;

    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      sendMessage();
    }

  }, 1000);
}
// Function for message at end of timer
function sendMessage() {
  timeEl.textContent = "0";
// instead of img, append item to enter initials/score

//   var imgEl = document.createElement("img");
//   imgEl.setAttribute("src", "images/image_1.jpg");
//   mainEl.appendChild(imgEl);
}
startBtn.addEventListener("click", function() {
    setTime();
    startQuiz();
});

function startQuiz() {
    var current = 0;
    var Q = quizChunks[current].question;
    var A1 = quizChunks[current].ans1;
    var A2 = quizChunks[current].ans2;
    var A3 = quizChunks[current].ans3;
    var A4 = quizChunks[current].ans4;
    
    qArea.innerHTML = "<p>" + Q + "</p>";
    a1Btn.innerHTML = A1;
    a2Btn.innerHTML = A2;
    a3Btn.innerHTML = A3;
    a4Btn.innerHTML = A4;
};

AArea.addEventListener("click", check);

function check(event) {
  var current = 0;
  var right = quizChunks[current].correct;
  if (event.target.textContent == right) {
    qArea.innerHTML = "<p>ksghfuizgfksjfgsjkfgsukfgykugwfkaygfrakuegyweakgrywekauyeg</p>";
  }
  else {
    qArea.innerHTML = "<p>KKKKKKKKK</p>";
  };
};

