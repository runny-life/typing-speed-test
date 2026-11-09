import { state } from './state';

export function calcMPW(correctChar, elapsedMs) {
  const minutes = elapsedMs / 1000 / 60;
  if (minutes < 0.01) return 0;
  return Math.round(correctChar / 5 / minutes);
}

export function calcAccuracy(totalKeystrokes, errors) {
  if (totalKeystrokes === 0) return 100;
  const correct = totalKeystrokes - errors;
  return Math.round((correct / totalKeystrokes) * 100);
}

export function countCorrectChar() {
  const { passage, typed } = state;
  let correct = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === passage[i]) correct++;
  }

  return correct;
}
