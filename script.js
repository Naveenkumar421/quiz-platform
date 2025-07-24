let quiz = {
    title: '',
    questions: []
  };
  
  function addQuestion() {
    const container = document.getElementById('questions-container');
  
    const qIndex = quiz.questions.length;
  
    const block = document.createElement('div');
    block.className = 'question-block';
    block.innerHTML = `
      <input type="text" placeholder="Question text" class="question-input" data-index="${qIndex}" />
      <input type="text" placeholder="Option A" class="option-input" data-q="${qIndex}" data-opt="0" />
      <input type="text" placeholder="Option B" class="option-input" data-q="${qIndex}" data-opt="1" />
      <input type="text" placeholder="Option C" class="option-input" data-q="${qIndex}" data-opt="2" />
      <input type="text" placeholder="Option D" class="option-input" data-q="${qIndex}" data-opt="3" />
      <label>Correct Answer (0-3): <input type="number" min="0" max="3" class="correct-input" data-index="${qIndex}" /></label>
    `;
  
    container.appendChild(block);
    quiz.questions.push({ question: '', options: ['', '', '', ''], correctIndex: 0 });
  }
  
  function saveQuiz() {
    quiz.title = document.getElementById('quiz-title').value;
  
    document.querySelectorAll('.question-input').forEach(input => {
      const index = input.dataset.index;
      quiz.questions[index].question = input.value;
    });
  
    document.querySelectorAll('.option-input').forEach(input => {
      const q = input.dataset.q;
      const opt = input.dataset.opt;
      quiz.questions[q].options[opt] = input.value;
    });
  
    document.querySelectorAll('.correct-input').forEach(input => {
      const index = input.dataset.index;
      quiz.questions[index].correctIndex = parseInt(input.value);
    });
  
    renderQuizTaker();
  }
  
  function renderQuizTaker() {
    document.getElementById('quiz-builder').style.display = 'none';
    document.getElementById('quiz-taker').style.display = 'block';
    document.getElementById('quiz-result').style.display = 'none';
  
    document.getElementById('quiz-take-title').textContent = quiz.title;
    const form = document.getElementById('quiz-form');
    form.innerHTML = '';
  
    quiz.questions.forEach((q, i) => {
      const fieldset = document.createElement('fieldset');
      fieldset.innerHTML = `<legend>${q.question}</legend>`;
      q.options.forEach((opt, j) => {
        fieldset.innerHTML += `
          <label>
            <input type="radio" name="question-${i}" value="${j}" required />
            ${opt}
          </label><br />
        `;
      });
      form.appendChild(fieldset);
    });
  }
  
  function submitQuiz() {
    const form = document.getElementById('quiz-form');
    const formData = new FormData(form);
    let score = 0;
  
    quiz.questions.forEach((q, i) => {
      const answer = parseInt(formData.get(`question-${i}`));
      if (answer === q.correctIndex) {
        score++;
      }
    });
  
    document.getElementById('quiz-taker').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'block';
    document.getElementById('score-output').textContent = `You scored ${score} out of ${quiz.questions.length}`;
  }
  
  function resetQuiz() {
    location.reload(); // simple page reload to start over
  }
  