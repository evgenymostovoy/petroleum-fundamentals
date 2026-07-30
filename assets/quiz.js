/* Shared quiz widget — immediate-feedback multiple choice for retrieval practice.
   Usage in a lesson:
     <div id="quiz"></div>
     <script src="../assets/quiz.js"></script>
     <script>
       renderQuiz('quiz', [
         { q: 'Question text?', options: ['A', 'B', 'C', 'D'],
           answer: 1, explain: 'Why B is right.' },
       ]);
     </script>
   Options are shuffled per render so position gives no clue. */

(function () {
  'use strict';

  var css = [
    '.quiz-container { margin: 1.5rem 0; }',
    '.quiz-q { background: var(--card, #fff); border: 1px solid var(--border, #ddd);',
    '  border-radius: 8px; padding: 1rem 1.1rem; margin-bottom: 1rem; }',
    '.quiz-q .q-text { font-weight: 700; margin-bottom: 0.7rem; }',
    '.quiz-q .q-num { color: var(--accent, #b45309); margin-right: 0.4rem; }',
    '.quiz-opt { display: block; width: 100%; text-align: left; margin: 0.35rem 0;',
    '  padding: 0.55rem 0.8rem; border: 1px solid var(--border, #ccc); border-radius: 6px;',
    '  background: transparent; color: inherit; font: inherit; cursor: pointer; }',
    '.quiz-opt:hover:not(:disabled) { border-color: var(--accent, #b45309); }',
    '.quiz-opt:disabled { cursor: default; opacity: 0.85; }',
    '.quiz-opt.correct { border-color: var(--good, #15803d); background: color-mix(in srgb, var(--good, #15803d) 12%, transparent); }',
    '.quiz-opt.wrong { border-color: var(--bad, #b91c1c); background: color-mix(in srgb, var(--bad, #b91c1c) 12%, transparent); }',
    '.quiz-explain { margin-top: 0.6rem; font-size: 0.95rem; padding: 0.6rem 0.8rem;',
    '  border-left: 3px solid var(--accent, #b45309); background: var(--formula-bg, #f4f1ea);',
    '  border-radius: 4px; display: none; }',
    '.quiz-explain.show { display: block; }',
    '.quiz-score { font-weight: 700; padding: 0.8rem 1rem; border: 1px solid var(--border, #ccc);',
    '  border-radius: 8px; display: none; }',
    '.quiz-score.show { display: block; }'
  ].join('\n');

  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  window.renderQuiz = function (containerId, questions) {
    var container = document.getElementById(containerId);
    if (!container) return;
    container.classList.add('quiz-container');

    var answered = 0, correct = 0;
    var scoreEl = document.createElement('div');
    scoreEl.className = 'quiz-score';

    questions.forEach(function (item, qi) {
      var qEl = document.createElement('div');
      qEl.className = 'quiz-q';

      var qText = document.createElement('div');
      qText.className = 'q-text';
      var qNum = document.createElement('span');
      qNum.className = 'q-num';
      qNum.textContent = (qi + 1) + '.';
      qText.appendChild(qNum);
      qText.appendChild(document.createTextNode(item.q));
      qEl.appendChild(qText);

      var explainEl = document.createElement('div');
      explainEl.className = 'quiz-explain';
      explainEl.textContent = item.explain || '';

      var indices = shuffle(item.options.map(function (_, i) { return i; }));
      var buttons = [];

      indices.forEach(function (optIdx) {
        var btn = document.createElement('button');
        btn.className = 'quiz-opt';
        btn.type = 'button';
        btn.textContent = item.options[optIdx];
        btn.addEventListener('click', function () {
          buttons.forEach(function (b) { b.disabled = true; });
          var isRight = optIdx === item.answer;
          btn.classList.add(isRight ? 'correct' : 'wrong');
          if (!isRight) {
            buttons.forEach(function (b) {
              if (b.dataset.optIdx == item.answer) b.classList.add('correct');
            });
          }
          explainEl.classList.add('show');
          answered++;
          if (isRight) correct++;
          if (answered === questions.length) {
            scoreEl.textContent = 'Score: ' + correct + ' / ' + questions.length +
              (correct === questions.length ? ' — full recall. ' :
               ' — revisit the misses above, then retry tomorrow. ') +
              'Wrong answers are the most valuable: they show exactly what to strengthen.';
            scoreEl.classList.add('show');
          }
        });
        btn.dataset.optIdx = optIdx;
        buttons.push(btn);
        qEl.appendChild(btn);
      });

      qEl.appendChild(explainEl);
      container.appendChild(qEl);
    });

    container.appendChild(scoreEl);
  };
})();
