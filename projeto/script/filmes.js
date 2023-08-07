const quizzes = [
    {
        perguntas: [
            {
                pergunta: "Qual filme ganhou o Oscar de Melhor Filme em 2020?",
                opcoes: ["1917", "Parasita", "Coringa"],
                respostaCorreta: "b"
            },
            {
                pergunta: "Qual filme foi dirigido por Christopher Nolan e lançado em 2010?",
                opcoes: ["A Origem", "Interestelar", "Dunkirk"],
                respostaCorreta: "a"
            },
            {
                pergunta: "Qual filme da saga 'Harry Potter' é o último?",
                opcoes: ["Harry Potter e a Pedra Filosofal", "Harry Potter e o Prisioneiro de Azkaban", "Harry Potter e as Relíquias da Morte - Parte 2"],
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
    quizSection.innerHTML = `<h2>Quiz de Filmes Finalizado!</h2><p>Você acertou ${score} perguntas de um total de ${quizzes[currentQuizIndex - 1].perguntas.length} no quiz atual.</p><a href="home.html">Início</a>`;
}

createQuiz();