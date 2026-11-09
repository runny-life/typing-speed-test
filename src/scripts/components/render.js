import { els } from './dom';
import { state } from './state';

export function renderText() {
  els.typingText.innerHTML = '';

  const passage = state.passage;
  const typed = state.typed;

  for (let i = 0; i < passage.length; i++) {
    const char = passage[i];
    const span = document.createElement('span');
    span.textContent = char;

    if (i < typed.length) {
      // Символ уже напечатан — сравниваем
      if (typed[i] === char) {
        span.classList.add('correct');
      } else {
        span.classList.add('incorrect');
      }
    }
    els.typingText.appendChild(span);
  }
}

export function updateCursor() {
  els.typingText.querySelectorAll('.current').forEach((el) => {
    el.classList.remove('current');
  });
  const spans = els.typingText.querySelectorAll('span');
  const currentSpan = spans[state.typed.length];
  if (currentSpan) currentSpan.classList.add('current');
}
