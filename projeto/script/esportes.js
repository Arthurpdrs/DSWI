const quizzes = [
    {
        perguntas: [
            {
                pergunta: "Qual seleção venceu a Copa do Mundo de 2018?",
                opcoes: ["Brasil", "França", "Alemanha"],
                respostaCorreta: "b"
            },
            {
                pergunta: "Em que esporte Usain Bolt é famoso por competir?",
                opcoes: ["Basquete", "Futebol", "Atletismo"],
                respostaCorreta: "c"
            },
            {
                pergunta: "Qual seleção ganhou o maior número de Copas do Mundo?",
                opcoes: ["Alemanha", "Brasil", "Itália"],
                respostaCorreta: "b"
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
    quizSection.innerHTML = `<h2>Quiz de Esportes Finalizado!</h2><p>Você acertou ${score} perguntas de um total de ${quizzes[currentQuizIndex - 1].perguntas.length} no quiz atual.</p><a href="home.html">Início</a>`;
}

createQuiz();