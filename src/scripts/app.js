import '../styles/style.scss';
import { state } from './components/state';
import { loadPassages, pickRandomPassage } from './api/passages';
import { getPersonalBest } from './components/storage.js';
import { els } from './components/dom';

async function init() {
  console.log('[init] app starting...');

  state.personalBest = getPersonalBest();
  console.log('[init] state:', state);

  await loadPassages();
  const passage = pickRandomPassage(state.difficulty);
  state.passage = passage.text;
  state.passageId = passage.id;

  console.log('[init] selected passage:', passage.id);
  renderPersonalBest();
}

function renderPersonalBest() {
  if (els.personalBest === null) return;

  if (state.personalBest === null) {
    els.personalBest.textContent = '0 WPM';
  } else {
    els.personalBest.textContent = `${state.personalBest} WPM`;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
