import '../styles/style.scss';
import { state } from './components/state';
import { els } from './components/dom';
import { loadPassages, pickRandomPassage } from './api/passages';

async function init() {
  console.log('[init] app starting...');
  console.log('[init] state:', state);
  console.log('[init] els:', els);

  await loadPassages();
  const passage = pickRandomPassage(state.difficulty);
  state.passage = passage.text;
  state.passageId = passage.id;

  console.log('[init] selected passage:', passage.id);
  console.log('[init] passage text:', passage.text);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
