import { state } from './state';
import { els } from './dom';
import { renderText } from './render';

export function startTest() {
  if (state.status !== 'idle') return;

  state.status = 'running';
  state.startTime = Date.now();

  els.startOverlay.classList.add('hidden');
  els.typingInput.focus();
  renderText();
  els.restartCard.classList.remove('hidden');

  console.log('[startTest] timer would start here');
}
