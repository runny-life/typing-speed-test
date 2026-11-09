export const state = {
  difficulty: 'easy', // 'easy' | 'medium' | 'hard'
  mode: 'timed', // 'timed' | 'passage'
  passage: '',
  passageId: '',
  typed: '',
  status: 'idle', // 'idle' | 'running' | 'finished'
  startTime: null,
  timeLeft: 60,
  elapsed: 0,
  totalKeystrokes: 0,
  errors: 0,
  personalBest: null, // 'number' | 'null'
};
