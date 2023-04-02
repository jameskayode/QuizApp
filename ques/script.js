const quizData = [
    {
        question: "Which of the following can be used to call a JavaScript Code Snippet?",
        a: "Function/Method",
        b: "Preprocessor",
        c: "Triggering Event",
        d: "RMI",
        correct: "a",
    },
    {
        question: "What does CSS stand for?",
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cascading Simple Sheets",
        d: "Cars SUVs Sailboats",
        correct: "b",
    },
    {
        question: "Which of the following object is the main entry point to all client-side JavaScript features and APIs?",
        a: "Position",
        b: "Window",
        c: "Standard",
        d: "Location",
        correct: "b",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
    {
        question: "how does DOM stand for?",
        a: "Document object Manager",
        b: "Document object Management",
        c: "Document Object Model",
        d: "none of the above",
        correct: "c",
    },

];

//timer
var countDownDate = new Date().getTime() + 60000; // Set the countdown timer for 30 seconds from now

var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;
  
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  document.getElementById("countdown").innerHTML = seconds + "s";
  
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "Time's up!";
  }
}, 1000);







// bring quiz,answertext,answerelement and submit button

const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')

// define global variables for progress bar
var progressBarWidth = 0;
var progressBarInterval;

function update(progress) {
    var element = document.getElementById("progress-bar");
    element.style.width = `${progress}%`;
  }
  

// define currentquiz and score element

let currentQuiz = 0
let score = 0

// call loadQuiz function
loadQuiz()

// create loadQuize function

function loadQuiz()
{
    // deselect all answer first so call deselectAnswer function
    deselectAnswers()

    const currentQuizData = quizData[currentQuiz]

    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d

    // update progress bar
  progressBarWidth = ((currentQuiz + 1) / quizData.length) * 100;
  clearInterval(progressBarInterval);
  progressBarInterval = setInterval(updateProgressBar, 10);

}
// create updateProgressBar function
function updateProgressBar() {
    var element = document.getElementById("myprogressBar");
    if (progressBarWidth >= 100) {
      clearInterval(progressBarInterval);
    } else {
      progressBarWidth++;
      element.style.width = progressBarWidth + "%";
    }
  }

// create function deselct answer
function deselectAnswers()
{
    answerEls.forEach(answerEl => answerEl.checked = false)
}

// create function for getting selectd answer

function  getSelected()
{
    let answer
    answerEls.forEach(answerEl =>{
        if(answerEl.checked)
        {
            answer = answerEl.id
        }
    })
    return answer
}

// add event listeneron submit button

submitBtn.addEventListener('click' , () => {
    const answer = getSelected()
    if(answer)
    {
        if(answer === quizData[currentQuiz].correct)
        {
            score++
        }
        currentQuiz++;
        const progress = (currentQuiz / quizData.length) * 100;
        update(progress);

        if(currentQuiz < quizData.length)
        {
            loadQuiz()
        }
        else{
            // clear progress bar interval
      clearInterval(progressBarInterval);
            quiz.innerHTML = `

            <h2>You answered ${score} out of ${quizData.length} questions correctly</h2>

            <button onclick="location.reload()">Reload</button>`;
        }
    }
}
);
