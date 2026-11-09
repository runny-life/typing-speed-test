let data = null;

export async function loadPassages() {
  if (data) return data;
  const response = await fetch('/data.json');
  if (!response.ok) {
    throw new Error(`Failed to load passages: ${response.status}`);
  }
  data = await response.json();
  return data;
}

export function pickRandomPassage(difficulty, currentId = null) {
  const pool = data[difficulty];
  const candidates = currentId && pool.length > 1 ? pool.filter((p) => p.id !== currentId) : pool;
  const randomIndex = Math.floor(Math.random() * candidates.length);
  return candidates[randomIndex];
}
