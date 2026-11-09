import { state } from './state';
import { els } from './dom';
import { renderText } from './render';
import { calcAccuracy, calcMPW, countCorrectChar } from './stats';
import { startTimer, stopTimer } from './timer';

export function startTest() {
  if (state.status !== 'idle') return;

  state.status = 'running';
  state.startTime = Date.now();

  els.startOverlay.classList.add('hidden');
  els.typingInput.focus();
  renderText();
  startTimer();
  els.restartCard.classList.remove('hidden');

  console.log('[startTest] timer would start here');
}

export function bindTypingInput() {
  els.typingInput.addEventListener('input', handleInput);
}

function handleInput() {
  if (state.status === 'idle') return;

  const newValue = els.typingInput.value;
  const oldValue = state.typed;

  updateCounters(oldValue, newValue);
  state.typed = newValue;
  renderText();
  updateStats();
  checkFinish();
}

function updateCounters(oldValue, newValue) {
  const delta = newValue.length - oldValue.length;

  if (delta > 0) {
    state.totalKeystrokes += delta;
    for (let i = oldValue.length; i < newValue.length; i++) {
      if (newValue[i] !== state.passage[i]) {
        state.errors += 1;
      }
    }
  } else if (delta === 0 && newValue !== oldValue) {
    state.totalKeystrokes += 1;
  }
}

function checkFinish() {
  if (state.typed.length >= state.passage.length) {
    state.status = 'finished';
    stopTimer();
    console.log('[checkFinish] test finished');
  }
}

function updateStats() {
  const elapseMs = Date.now() - state.startTime;
  const correctChars = countCorrectChar();
  const wpm = calcMPW(correctChars, elapseMs);
  const accuracy = calcAccuracy(state.totalKeystrokes, state.errors);

  els.wpm.textContent = String(wpm);
  els.accuracy.textContent = `${accuracy}%`;
}
