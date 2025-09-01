const canvases = document.querySelectorAll(".canvastwo");
const canvasCount = canvases.length;

for (let i = 0; i < canvasCount; i++) {
  const canvas = canvases[i];
  const ctx = canvas.getContext("2d");
  const branding = `rgba(175, 235, 255, 1), ${Math.random() * 0.3 + 0.3})`;
  const particles = [];
  const particleCount = 20;

  let w = (canvas.width = innerWidth);
  let h = (canvas.height = innerHeight);

  function resize() {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
  }

  window.addEventListener("resize", resize);

  class Particle {
    constructor() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.size = Math.random() * 5 + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
      this.color = branding;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x > w || this.x < 0) this.speedX *= -1;
      if (this.y > h || this.y < 0) this.speedY *= -1;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function init() {
    for (let j = 0; j < particleCount; j++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });
    requestAnimationFrame(animate);
  }

  init();
  animate();
}