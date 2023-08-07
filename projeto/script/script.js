// Função para aplicar animação de crescimento no hover
function animateQuizItem(event) {
    const quizItem = event.currentTarget;
    quizItem.classList.add('grow'); // Adiciona a classe "grow" no item
}

// Função para remover a animação quando o mouse sair
function removeAnimation(event) {
    const quizItem = event.currentTarget;
    quizItem.classList.remove('grow'); // Remove a classe "grow" do item
}

// Obtém todos os elementos com a classe "quiz-item"
const quizItems = document.querySelectorAll('.quiz-item');

// Adiciona os ouvintes de evento para cada item do quiz
quizItems.forEach(item => {
    item.addEventListener('mouseenter', animateQuizItem);
    item.addEventListener('mouseleave', removeAnimation);
});

