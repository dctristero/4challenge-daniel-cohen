var startBtn = document.querySelector("#start");
var timeEl = document.getElementById("time");
var mainEl = document.getElementById("main");
var initEl = document.getElementById("init");
var qArea = document.getElementById("Q-area");
var aArea = document.getElementById("A-area");
var secondsLeft = 90;
var a1Btn = document.getElementById("a1");
var a2Btn = document.getElementById("a2");
var a3Btn = document.getElementById("a3");
var a4Btn = document.getElementById("a4");
var form = document.getElementById("form");
var aBtn = document.querySelectorAll(".A-btn");
var feedback = document.getElementById("feedback");
var feedbackExpiration;
var message = document.getElementById("message");
var initials = document.getElementById("initials");
var inputField = document.getElementById("input");
var submitBtn = document.getElementById("submit");
var scoresArea = document.getElementById("scores-area");
var scoreList = document.getElementById("scorelist");
var reloadBtn = document.getElementById("reload");


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
  correct: "all of the above"},

  {question: "who deserves kindness",
  ans1: "steve",
  ans2: "everyone but steve",
  ans3: "hugh grant",
  ans4: "hugh grant",
  correct: "everyone but steve"},

  {question: "why am i sad",
  ans1: "because of the horrors",
  ans2: "pizza",
  ans3: "rats", 
  ans4: "hugh grant",
  correct: "because of the horrors"},
];

var current = 0;
var Q = quizChunks[current].question;
var A1 = quizChunks[current].ans1;
var A2 = quizChunks[current].ans2;
var A3 = quizChunks[current].ans3;
var A4 = quizChunks[current].ans4;

showInit();


function showInit(event) {
  initEl.classList.toggle("hide");
}

var timerInterval;

function setTime() {
  timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft;
    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      endQuiz();
    }

  }, 1000);
}


startBtn.addEventListener("click", function() {
    setTime();
    showQuiz();
});


function showQuiz() {
  timeEl.classList.toggle("hide");
  timeEl.textContent = secondsLeft;
  initEl.classList.toggle( 'hide' );
  qArea.classList.toggle( 'hide' );
  aArea.classList.toggle( 'hide' );
  qArea.innerHTML = Q;
  a1Btn.innerHTML = A1;
  a2Btn.innerHTML = A2;
  a3Btn.innerHTML = A3;
  a4Btn.innerHTML = A4;
}



aArea.addEventListener("click", check);


function check(event) {
  var right = quizChunks[current].correct;
  
  if (event.target.textContent == right) {
    next();
    feedback.innerHTML = "good doggy";
    feedbackExpiration = setTimeout(function () {
      feedback.innerHTML = "";
    }, 1000);
  }
  else {
    punish(10);
    next();
    feedback.innerHTML = "how dare you";
    feedbackExpiration = setTimeout(function () {
      feedback.innerHTML = "";
    }, 1000);
    stopAtZero();
    timeEl.textContent = secondsLeft;
  };
}

function stopAtZero() {
  if (secondsLeft <= 0) {
    secondsLeft = 0;
  endQuiz();
}}

function punish(seconds) {
  secondsLeft -= seconds;
}

function hideFeedback() {
  clearTimeout(feedbackExpiration);
}


function next() {
  current++;
  hideFeedback();

  if (current < 5) {
    var Q = quizChunks[current].question;
    var A1 = quizChunks[current].ans1;
    var A2 = quizChunks[current].ans2;
    var A3 = quizChunks[current].ans3;
    var A4 = quizChunks[current].ans4;
 
    qArea.innerHTML = Q;
    a1Btn.innerHTML = A1;
    a2Btn.innerHTML = A2;
    a3Btn.innerHTML = A3;
    a4Btn.innerHTML = A4;
  }

  else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timerInterval);
  qArea.classList.toggle("hide");
  aArea.classList.toggle("hide");
  form.classList.toggle("hide");
  timeEl.classList.toggle("hide");
  message.textContent = 
  "I'm so proud of you just for existing. Your score is " + secondsLeft + ".";
  initials.textContent = 
  "put your initials here or whatever you feel like"
}

submitBtn.addEventListener("click", record);


function record(event) {
  event.preventDefault();
  var input = inputField.value.trim();
  var score = secondsLeft;
  var game = {
    player: input,
    number: score,
  };
  var storedGames = JSON.parse(localStorage.getItem("storedgames"))||[];
  storedGames.push(game);
  localStorage.setItem("storedgames", JSON.stringify(storedGames));
  
  console.log(storedGames);
  showScores();
}



function showScores() {
  form.classList.toggle("hide");
  scoresArea.classList.toggle("hide");
  var storedGames = JSON.parse(localStorage.getItem("storedgames"))||[];
  storedGames.sort(function(a,b){
    return b.number - a.number
  });

  for(var i=0; i < storedGames.length; i++) {
 
      var createLi = document.createElement("li");
      createLi.textContent = storedGames[i].player + " " + storedGames[i].number;
      scoreList.appendChild(createLi);
  
  }
}

reloadBtn.addEventListener("click", reload);

function reload() {
  location.reload();
}