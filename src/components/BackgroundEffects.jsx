import React, { useEffect, useRef } from 'react';

export const BackgroundEffects = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle types: 'sparkle', 'bokeh', 'heart', 'star'
    const particles = [];
    const particleCount = Math.min(Math.floor(width / 18), 75);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height + height;
        this.size = Math.random() * 4 + 1.5;
        this.speedY = Math.random() * 0.6 + 0.2;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.6 + 0.2;
        this.fadeSpeed = Math.random() * 0.005 + 0.002;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.03 + 0.01;
        
        const types = ['sparkle', 'bokeh', 'heart', 'star'];
        this.type = types[Math.floor(Math.random() * types.length)];
        
        const colors = [
          'rgba(244, 114, 182, ', // pink
          'rgba(168, 85, 247, ', // purple
          'rgba(251, 191, 36, ', // warm gold
          'rgba(192, 132, 252, ', // lavender
          'rgba(236, 72, 153, '  // magenta
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.y -= this.speedY;
        this.x += Math.sin(this.pulse) * 0.5 + this.speedX;
        this.pulse += this.pulseSpeed;

        if (this.y < -30 || this.x < -30 || this.x > width + 30) {
          this.reset();
          this.y = height + 20;
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity * (0.8 + Math.sin(this.pulse) * 0.2);

        if (this.type === 'bokeh') {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = this.color + (this.opacity * 0.3) + ')';
          ctx.shadowBlur = 15;
          ctx.shadowColor = this.color + '0.6)';
          ctx.fill();
        } else if (this.type === 'heart') {
          ctx.fillStyle = this.color + this.opacity + ')';
          ctx.font = `${this.size * 3.5}px sans-serif`;
          ctx.fillText('💖', this.x, this.y);
        } else if (this.type === 'star') {
          ctx.fillStyle = this.color + this.opacity + ')';
          ctx.font = `${this.size * 3}px sans-serif`;
          ctx.fillText('✨', this.x, this.y);
        } else {
          // Sparkle dot
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = this.color + this.opacity + ')';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#ffffff';
          ctx.fill();
        }

        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      const p = new Particle();
      p.y = Math.random() * height; // Distribute initially across screen
      particles.push(p);
    }

    const render = () => {
      // Soft background clear with slight alpha to produce magical trail effects
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Animated Gradient Background */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(88, 28, 135, 0.45) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(190, 24, 93, 0.35) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.95) 0%, #030712 100%)
          `
        }}
      />

      {/* Floating Ambient Glowing Orbs */}
      <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />

      {/* Dynamic Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
