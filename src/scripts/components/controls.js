import { els } from './dom';
import { state } from './state';
import { pickRandomPassage } from '../api/passages';

export function resetTest(pickNew = true) {
  state.status = 'idle';
  state.typed = '';
  state.startTime = null;
  state.elapsed = 0;
  state.timeLeft = 60;
  state.totalKeystrokes = 0;
  state.errors = 0;

  if (pickNew) {
    const passage = pickRandomPassage(state.difficulty, state.passageId);
    state.passage = passage.text;
    state.passageId = passage.id;
    console.log('[resetTest] new passage:', passage.id);
  }

  els.typingInput.value = '';
  els.startOverlay.classList.remove('hidden');
  console.log('[resetTest] would render text:', state.passage.slice(0, 40) + '...');

  els.wpm.textContent = '0';
  els.accuracy.textContent = '100%';
  els.time.textContent = state.mode === 'timed' ? '1:00' : '0:00';
}

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
  resetTest();
}

function updateDifficultyButtons() {
  els.difficultyBtns.forEach((btn) => {
    const isActive = btn.dataset.difficulty === state.difficulty;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });
}
