const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

const questions = [
    {
        question: "What does AWD stand for in the context of cybersecurity?",
        answers: 
        [
         { text: "Advanced Web Design", correct: false},
         { text: "Application and Web Development", correct: false},
         { text: "Application and Web Design", correct: false},
         { text: "Application and Web Defense", correct: true},
        ]
     },
     {
        question: "Which of the following best describes SQL Injection?",
        answers: 
        [
         { text: "Injecting malicious code into a web application's database", correct: true},
         { text: " Sending excessive traffic to a website to crash it", correct: false},
         { text: "Hiding sensitive data within images", correct: false},
         { text: "Forcing a user to perform unintended actions", correct: false},
        ]
     },
     {
     question: "In HTML4, which tag is used to create a hyperlink?",
     answers:
     [
      { text: "link", correct: false},
      { text: "hyperlink", correct: false},
      { text: "a", correct: true},
      { text: "url", correct: false},
     ]
     },
     {
     question: "Which attribute is used to define the alternative text for an image in HTML4?",
     answers: 
     [
      { text: "alt", correct: true},
      { text: "src", correct: false},
      { text: "title",correct: false},
      { text: "image", correct: false},
     ]
     },
];

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
