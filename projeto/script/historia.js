const quizzes = [
    {
        perguntas: [
            {
                pergunta: "Qual foi o primeiro presidente do Brasil?",
                opcoes: ["Getúlio Vargas", "Juscelino Kubitschek", "Marechal Deodoro da Fonseca"],
                respostaCorreta: "c"
            },
            {
                pergunta: "Qual foi o líder que comandou a Revolução Russa em 1917 e se tornou o primeiro governante da União Soviética?",
                opcoes: ["Vladimir Lenin", "Joseph Stalin", "Mikhail Gorbachev"],
                respostaCorreta: "a"
            },
            {
                pergunta: "Qual evento histórico marcou o início da Idade Moderna e foi caracterizado pelo fim da hegemonia da Igreja Católica e o início de uma era de exploração e descobrimentos?",
                opcoes: ["Queda do Império Romano", "Renascimento Cultural", "Descobrimento da América"],
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
    quizSection.innerHTML = `<h2>Quiz de História Finalizado!</h2><p>Você acertou ${score} perguntas de um total de ${quizzes[currentQuizIndex - 1].perguntas.length} no quiz atual.</p><a href="home.html">Início</a>`;
}


createQuiz();