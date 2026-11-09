const STORAGE_KEY = 'typing-test-personal-best';

export function getPersonalBest() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (raw === null) return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}

export function savePersonalBest(wpm) {
  localStorage.setItem(STORAGE_KEY, wpm);
}
