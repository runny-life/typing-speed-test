const COLORS = ['#4d9fff', '#ff6b6b', '#51cf66', '#ffd43b', '#cc5de8', '#ff922b'];

let canvas = null;
let ctx = null;
let particles = [];
let rafId = null;

export function launchConfetti() {
  canvas = document.getElementById('confetti');
  if (!canvas) return;

  ctx = canvas.getContext('2d');

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  particles = createParticles(150);

  if (rafId !== null) cancelAnimationFrame(rafId);
  animate();
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles(count) {
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 50,
      vx: (Math.random() - 0.5) * 6,
      vy: -(Math.random() * 10 + 10),
      size: Math.random() * 8 + 4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.3,
      life: 1,
      decay: Math.random() * 0.004 + 0.002,
    });
  }
  return particles;
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let aliveCount = 0;
  for (const p of particles) {
    if (p.life <= 0) continue;
    aliveCount++;

    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.15;
    p.rotation += p.rotationSpeed;
    p.life -= p.decay;

    ctx.save();
    ctx.globalAlpha = Math.max(0, p.life);
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    ctx.restore();
  }

  if (aliveCount === 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rafId = null;
    window.removeEventListener('resize', resizeCanvas);
    return;
  }

  rafId = requestAnimationFrame(animate);
}

export function stopConfetti() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  if (ctx && canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  window.removeEventListener('resize', resizeCanvas);
}
