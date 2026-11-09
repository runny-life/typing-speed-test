// results.js
import { state } from './state.js';
import { els } from './dom.js';
import { stopTimer } from './timer.js';
import { calcAccuracy, calcMPW, countCorrectChar } from './stats.js';
import { getPersonalBest, savePersonalBest } from './storage.js';

export function finishTest() {
  state.status = 'finished';
  stopTimer();

  const elapsedMs = state.mode === 'timed' ? (60 - state.timeLeft) * 1000 : state.elapsed * 1000;

  const correctChars = countCorrectChar();
  const wpm = calcMPW(correctChars, elapsedMs);
  const accuracy = calcAccuracy(state.totalKeystrokes, state.errors);

  const previousBest = getPersonalBest();
  const isNewBest = previousBest === null || wpm > previousBest;

  if (isNewBest) {
    savePersonalBest(wpm);
    state.personalBest = wpm;
    const bestSpan = document.querySelector('.header__personal-best-text span');
    if (bestSpan) bestSpan.textContent = `${wpm} WPM`;
  }

  showResults({ wpm, accuracy, correctChars, previousBest });

  console.log('[finishTest]', { wpm, accuracy, correctChars, previousBest });
}

function showResults({ wpm, accuracy, previousBest, correctChars }) {
  els.resultWpm.textContent = String(wpm);
  els.resultAccuracy.textContent = `${accuracy}%`;
  els.resultAccuracy.classList.toggle('good', accuracy === 100);

  let titleText, messageText;

  if (previousBest === null) {
    titleText = 'Baseline Established!';
    messageText = "You've set the bar. Now the real challenge begins—time to beat it.";
    els.resultModalIconNewBest.classList.add('hidden');
    els.resultModalIconComplete.classList.remove('hidden');
  } else if (wpm > previousBest) {
    // High Score — побил рекорд
    titleText = 'High Score Smashed!';
    messageText = "You're getting faster. That was incredible typing.";
    els.resultModalIconComplete.classList.add('hidden');
    els.resultModalIconNewBest.classList.remove('hidden');
  } else {
    titleText = 'Test Complete!';
    messageText = 'Solid run. Keep pushing to beat your high score.';
    els.resultModalIconNewBest.classList.add('hidden');
    els.resultModalIconComplete.classList.remove('hidden');
  }

  els.resultsTitle.textContent = titleText;
  els.resultMessage.textContent = messageText;
  els.resultChars.textContent = correctChars;
  els.resultErrorChars.textContent = String(state.errors);

  els.resultsModal.classList.remove('hidden');
}
