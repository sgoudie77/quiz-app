let quizData = [
    {
        question: "What is the capital of Canada?",
        options: ["Ottawa", "Toronto", "Montreal", "Vancouver"],
        correct: "Ottawa",
    },
    {
        question: "What is the capital of Korea?",
        options: ["Busan", "Seoul", "Daejeon", "Incheon"],
        correct: "Seoul",
    },
    {
        question: "What is the capital of the US?",
        options: ["Washington DC", "Seattle", "New York", "Las Vegas"],
        correct: "Washington DC",
    },
    {
        question: "What is the capital of Japan?",
        options: ["Kyoto", "Osaka", "Tokyo", "Sapporo"],
        correct: "Tokyo",
    },
    {
        question: "What is the capital of Thailand?",
        options: ["Bangkok", "Chiang Mai", "Phuket", "Udon"],
        correct: "Bangkok",
    },
];

// set quiz variables
const quizContainer = document.querySelector(".quiz-container");
const question = document.querySelector(".quiz-container .question");
const options = document.querySelector(".quiz-container .options");
const nextBtn = document.querySelector(".quiz-container .next-btn");
const quizResult = document.querySelector(".quiz-result");

// set initial question variables from array
let questionNumber = 0;
let score = 0;
const MAX_QUESTIONS = 5;

// shuffle order of array questions
const shuffleArray = (array) => {
    return array.slice().sort(() => Math.random() - 0.5);
}

quizData = shuffleArray(quizData);

const resetLocalStorage = () => {
    for (i = 0; i < MAX_QUESTIONS; i++) {
        localStorage.removeItem(`userAnswer_${i}`);
    }
}

resetLocalStorage();

const checkAnswer = (e) => {
    let userAnswer = e.target.textContent;
    // console.log(userAnswer);
    if (userAnswer === quizData[questionNumber].correct) {
      score++;
      e.target.classList.add("correct");
    } else {
      e.target.classList.add("incorrect");
    }

    localStorage.setItem(`userAnswer_${questionNumber}`, userAnswer);

    let allOptions = document.querySelectorAll(".quiz-container .option");
    allOptions.forEach((o) => {
        o.classList.add("disabled");
    });
};

// display questions from array
const createQuestion = () => {
    options.innerHTML = "";
    question.innerHTML = `<span class='question-number'>${questionNumber + 1}/${MAX_QUESTIONS}</span>${quizData[questionNumber].question}`;

    const shuffledOptions = shuffleArray(quizData[questionNumber].options);

    shuffledOptions.forEach((o) => {
        const option = document.createElement("button");
        option.classList.add("option");
        option.innerHTML = o;
        option.addEventListener("click", (e) => {
            checkAnswer(e);
          });
        options.appendChild(option);
    });
};

const retakeQuiz = () => {
    questionNumber = 0;
    score = 0;
    quizData = shuffleArray(quizData);
    resetLocalStorage();

    createQuestion();
    quizResult.style.display = "none";
    quizContainer.style.display = "block";
};

const displayQuizResult = () => {
    quizResult.style.display = "flex";
    quizContainer.style.display = "none";
    quizResult.innerHTML = "";

    const resultHeading = document.createElement("h2");
    resultHeading.innerHTML = `You have scored ${score} out of ${MAX_QUESTIONS}`
    quizResult.appendChild(resultHeading);

    for (let i = 0; i < MAX_QUESTIONS; i++) {
        const resultItem = document.createElement("div");
        resultItem.classList.add("question-container");

        const userAnswer = localStorage.getItem(`userAnswer_${i}`);
        const correctAnswer = quizData[i].correct;

        let answeredCorrectly = userAnswer === correctAnswer;

        if (!answeredCorrectly) {
            resultItem.classList.add("incorrect");
        }

        resultItem.innerHTML = `
            <div class="question">Question ${i + 1}: ${quizData[i].question}</div>
            <div class="user-answer">Your answer: ${userAnswer || "Not Answered"}</div>
            <div class="correct-answer">Correct answer: ${correctAnswer}</div>
        `;
        quizResult.appendChild(resultItem);
    }

    const retakeBtn = document.createElement("button");
    retakeBtn.classList.add("retake-btn");
    retakeBtn.innerHTML = "Retake Quiz";
    retakeBtn.addEventListener("click", retakeQuiz);
    quizResult.appendChild(retakeBtn);
};

createQuestion();

const displayNextQuestion = () => {
    if (questionNumber >= MAX_QUESTIONS - 1) {
        displayQuizResult();
        return;
      }

      questionNumber++;
      createQuestion();
};

nextBtn.addEventListener("click", displayNextQuestion);
