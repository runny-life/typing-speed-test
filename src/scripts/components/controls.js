import { els } from './dom';
import { state } from './state';
import { pickRandomPassage } from '../api/passages';
import { renderText } from './render';
import { stopTimer } from './timer';

// Toggle

export function resetTest(pickNew = true) {
  stopTimer();

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

  renderText();
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

export function bindModeControls() {
  els.modeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      setMode(mode);
    });
  });
}

function setDifficulty(difficulty) {
  if (state.difficulty === difficulty) return;
  state.difficulty = difficulty;
  updateDifficultyButtons();
  updateSelectLabels();
  resetTest();
}

function setMode(mode) {
  if (state.mode === mode) return;
  state.mode = mode;
  updateModeButtons();
  updateSelectLabels();
  updateSelectLabels();
}

function updateDifficultyButtons() {
  els.difficultyBtns.forEach((btn) => {
    const isActive = btn.dataset.difficulty === state.difficulty;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });
}

function updateModeButtons() {
  els.modeBtns.forEach((btn) => {
    const isActive = btn.dataset.mode === state.mode;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });
}

//Select
export function bindSelectControls() {
  const selects = document.querySelectorAll('.select');

  selects.forEach((select) => {
    const button = select.querySelector('.select__button');
    const items = select.querySelectorAll('.select__item');

    button.addEventListener('click', (e) => {
      e.stopPropagation();
      select.classList.toggle('open');
    });

    items.forEach((item) => {
      item.addEventListener('click', () => {
        const value = item.textContent.toLowerCase().trim();
        const type = select.dataset.type;

        if (type === 'difficulty') {
          setDifficulty(value);
        } else if (type === 'mode') {
          setMode(value.includes('timed') ? 'timed' : 'passage');
        }
      });
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.open').forEach((openElement) => {
      openElement.classList.remove('open');
    });
  });
}

function updateSelectLabels() {
  const diffSelect = document.querySelector('.select[data-type="difficulty"]');
  const modeSelect = document.querySelector('.select[data-type="mode"]');

  if (diffSelect) {
    const label = diffSelect.querySelector('.select__label');

    if (label) {
      label.textContent = capitalize(state.difficulty);
    }
    diffSelect.querySelectorAll('.select__item').forEach((item) => {
      const isActive = item.textContent.trim().toLowerCase() === state.difficulty;
      item.setAttribute('aria-pressed', String(isActive));
    });
  }

  if (modeSelect) {
    const label = modeSelect.querySelector('.select__label');

    if (label) {
      label.textContent = state.mode === 'timed' ? 'Timed (60s)' : 'Passage';
      els.time.textContent = state.mode === 'timed' ? '1:00' : '0:00';
    }
    modeSelect.querySelectorAll('.select__item').forEach((item) => {
      const text = item.textContent.trim().toLowerCase();
      const isActive =
        (state.mode === 'timed' && text.includes('timed')) ||
        (state.mode === 'passage' && text.includes('passage'));
      item.setAttribute('aria-pressed', String(isActive));
    });
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
