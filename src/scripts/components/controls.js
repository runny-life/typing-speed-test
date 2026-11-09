import { els } from './dom';
import { state } from './state';

export function bindDifficultyControls() {
  els.difficultyBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const difficulty = btn.dataset.difficulty;
      setDifficulty(difficulty);
    });
  });
}

function setDifficulty(difficulty) {
  if (state.difficulty === difficulty) return;
  state.difficulty = difficulty;
  updateDifficultyButtons();
}

function updateDifficultyButtons() {
  els.difficultyBtns.forEach((btn) => {
    const isActive = btn.dataset.difficulty === state.difficulty;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });
}
