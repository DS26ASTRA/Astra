import React, { useEffect, useRef } from 'react';

const EmbersCanvas = ({ className = "absolute inset-0 pointer-events-none z-10" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse tracking for gentle interactive breeze
    let mouseX = -1000;
    let mouseY = -1000;
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Particle settings
    const particleCount = Math.min(Math.floor((width * height) / 14000), 75);
    const particles = [];

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + Math.random() * 20;
        this.size = Math.random() * 2.4 + 0.6; // 0.6px to 3.0px
        this.speedY = -(Math.random() * 0.9 + 0.4); // upward drift
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.alpha = Math.random() * 0.6 + 0.3;
        this.maxAlpha = this.alpha;
        this.fadeSpeed = Math.random() * 0.003 + 0.002;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.03 + 0.01;
        this.hue = 40 + Math.random() * 15; // 40-55: warm golden amber to radiant yellow
      }

      update() {
        this.y += this.speedY;
        this.wobble += this.wobbleSpeed;
        this.x += this.speedX + Math.sin(this.wobble) * 0.4;

        // Interaction with mouse
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }

        // Fade out as it nears the top
        if (this.y < height * 0.25) {
          this.alpha -= this.fadeSpeed * 2;
        }

        if (this.y < -10 || this.alpha <= 0 || this.x < -20 || this.x > width + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        // Radial glow
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 2.8
        );
        gradient.addColorStop(0, `hsla(${this.hue}, 100%, 75%, ${this.alpha})`);
        gradient.addColorStop(0.4, `hsla(${this.hue - 5}, 95%, 55%, ${this.alpha * 0.65})`);
        gradient.addColorStop(1, `hsla(${this.hue - 10}, 90%, 40%, 0)`);

        ctx.fillStyle = gradient;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `hsla(${this.hue}, 100%, 60%, ${this.alpha * 0.8})`;
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
};

export default EmbersCanvas;
