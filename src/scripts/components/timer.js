import { state } from './state';
import { els } from './dom.js';
import { finishTest } from './result';

let intervalId = null;

export function startTimer() {
  stopTimer();

  if (state.mode === 'timed') {
    intervalId = setInterval(() => {
      state.timeLeft -= 1;
      updateTimeDisplay();

      if (state.timeLeft <= 0) {
        stopTimer();
        finishTest();
      }
    }, 1000);
  } else {
    intervalId = setInterval(() => {
      state.elapsed += 1;
      updateTimeDisplay();
    }, 1000);
  }
}

export function stopTimer() {
  if (intervalId !== null) {
    clearInterval(intervalId);
    state.status = 'finished';
    intervalId = null;
  }
}

export function updateTimeDisplay() {
  const seconds = state.mode === 'timed' ? state.timeLeft : state.elapsed;
  els.time.textContent = formatTime(seconds);
}

function formatTime(totalSeconds) {
  const safe = Math.max(0, totalSeconds);
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}
