const quizzes = [
    {
        perguntas: [
            {
                pergunta: "Qual é a fórmula química da água?",
                opcoes: ["CO2", "H2SO4", "H2O"],
                respostaCorreta: "c"
            },
            {
                pergunta: "Qual é o nome do processo pelo qual as plantas produzem seu próprio alimento usando luz solar, dióxido de carbono e água?",
                opcoes: ["Respiração", "Fotossíntese", "Transpiração"],
                respostaCorreta: "b"
            },
            {
                pergunta: "Qual é a unidade básica de hereditariedade em um organismo e que carrega as informações genéticas?",
                opcoes: ["Célula", "Órgão", "Gene"],
                respostaCorreta: "c"
            }
        ]
    },

];

let currentQuizIndex = 0;
let currentQuestionIndex = 0;
let score = 0;

function createQuiz() {
    const quizContainer = document.getElementById("quiz-container");
    const currentQuiz = quizzes[currentQuizIndex];
    const currentQuestion = currentQuiz.perguntas[currentQuestionIndex];

    let quizHTML = `<section class="quiz">
                        <h2>Pergunta ${currentQuestionIndex + 1}:</h2>
                        <p>${currentQuestion.pergunta}</p>
                        <ul>`;

    for (let i = 0; i < currentQuestion.opcoes.length; i++) {
        quizHTML += `<li><input type="radio" name="q${currentQuestionIndex}" value="${String.fromCharCode(97 + i)}"> ${currentQuestion.opcoes[i]}</li>`;
    }

    quizHTML += `</ul>
                 <button onclick="nextQuestion()">Próxima Pergunta</button>
              </section>`;

    quizContainer.innerHTML = quizHTML;
}

function validateAnswer() {
    const selectedOption = document.querySelector(`input[name="q${currentQuestionIndex}"]:checked`);
    if (!selectedOption) {
        alert('Selecione uma opção antes de prosseguir.');
        return false;
    }

    const currentQuiz = quizzes[currentQuizIndex];
    const currentQuestion = currentQuiz.perguntas[currentQuestionIndex];
    if (selectedOption.value === currentQuestion.respostaCorreta) {
        score++;
    }

    return true;
}

function nextQuestion() {
    if (!validateAnswer()) {
        return;
    }

    const currentQuiz = quizzes[currentQuizIndex];
    currentQuestionIndex++;

    if (currentQuestionIndex < currentQuiz.perguntas.length) {
        createQuiz();
    } else {
        currentQuizIndex++;
        currentQuestionIndex = 0;

        if (currentQuizIndex < quizzes.length) {
            createQuiz();
        } else {
            const quizContainer = document.getElementById("quiz-container");
            quizContainer.innerHTML = '';
            finishQuiz();
        }
    }
}

function finishQuiz() {

    const quizSection = document.querySelector('.quiz-selection');
    quizSection.innerHTML = `<h2>Quiz de Ciências Finalizado!</h2><p>Você acertou ${score} perguntas de um total de ${quizzes[currentQuizIndex - 1].perguntas.length} no quiz atual.</p> <a href="home.html">Início</a>`;
}


createQuiz();