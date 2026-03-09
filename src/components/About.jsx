import { useEffect, useRef } from 'react';
import './About.css';

export default function About() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const canvasRef = useRef(null);
  const hintRef = useRef(null);

  /* reveal + hint trigger */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          sectionRef.current?.classList.add('on');
          setTimeout(() => {
            if (hintRef.current) {
              hintRef.current.style.opacity = '1';
              hintRef.current.style.transition = 'opacity 0.5s ease';
              setTimeout(() => {
                if (hintRef.current) {
                  hintRef.current.style.opacity = '0';
                }
              }, 3000);
            }
          }, 500);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  /* elastic lanyard */
  useEffect(() => {
    const card = cardRef.current;
    const canvas = canvasRef.current;
    const wrap = canvas?.parentElement;
    if (!card || !canvas || !wrap) return;

    const ctx = canvas.getContext('2d');
    let cx = 0, cy = 0, vx = 0, vy = 0;
    let isDragging = false;
    let dragStartX, dragStartY;
    let raf;

    const resize = () => {
      canvas.width = wrap.offsetWidth;
      canvas.height = wrap.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onDown = e => {
      isDragging = true;
      dragStartX = e.clientX - cx;
      dragStartY = e.clientY - cy;
      vx = 0; vy = 0;
      e.preventDefault();
    };
    const onMove = e => { if (!isDragging) return; cx = e.clientX - dragStartX; cy = e.clientY - dragStartY; };
    const onUp = () => { isDragging = false; };

    const animate = () => {
      if (!isDragging) {
        vx = vx * 0.88 - cx * 0.09;
        vy = vy * 0.88 - cy * 0.09 + 0.4;
        cx += vx; cy += vy;
      }

      card.style.transform = `translate(calc(-50% + ${cx}px), ${cy}px) rotate(${cx * 0.1}deg)`;
      card.style.transformOrigin = 'top center';

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const ax = canvas.width / 2;
      const ay = 6;

      const cardRect = card.getBoundingClientRect();
      const wrapRect = wrap.getBoundingClientRect();

      const hole = card.querySelector('.card-hole');
      const holeRect = hole.getBoundingClientRect();
      const holeX = holeRect.left + holeRect.width / 2 - wrapRect.left;
      const holeY = holeRect.top + holeRect.height / 2 - wrapRect.top + 6;

      const cp1x = ax + (holeX - ax) * 0.1;
      const cp1y = ay + (holeY - ay) * 0.5;
      const cp2x = holeX - (holeX - ax) * 0.1;
      const cp2y = holeY - (holeY - ay) * 0.2;

      const grad = ctx.createLinearGradient(ax, ay, holeX, holeY);
      grad.addColorStop(0, 'rgba(0,247,255,1)');
      grad.addColorStop(0.5, 'rgba(0,247,255,0.55)');
      grad.addColorStop(1, 'rgba(0,247,255,1)');

      ctx.shadowColor = 'rgba(0,247,255,0.7)';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, holeX, holeY);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(ax, ay, 5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,247,255,0.95)';
      ctx.shadowBlur = 16;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(holeX, holeY, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,247,255,0.85)';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(animate);
    };

    card.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    raf = requestAnimationFrame(animate);

    return () => {
      card.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="about" className="section reveal" ref={sectionRef}>
      <div className="sec-label">01 — About</div>
      <h2 className="sec-title">Who I <span>Am</span></h2>

      <div className="about-grid">

        <div className="iwrap">
          <canvas ref={canvasRef} className="rope-canvas" />
          <div className="id-card" ref={cardRef}>
            <div className="card-hole" />
            <div className="card-img">
              <img
                src="/images/my pic.jpeg"
                alt="M Ahmad"
                onError={e => e.target.style.display = 'none'}
              />
            </div>
            <div className="card-info">
              <span className="card-name">M Ahmad</span>
              <span className="card-role">Full Stack Dev</span>
              <div className="card-badge">
                <span className="card-dot" />
                Open to Work
              </div>
            </div>
          </div>
          <p className="drag-hint" ref={hintRef}>⟵ drag me ⟶</p>
        </div>

        <div className="about-text">
          <p className="ahi">Junior Full Stack Developer</p>
          <p className="abio">
            Hey! I'm <strong>M Ahmad</strong> — a passionate{' '}
            <strong>Junior Full Stack Developer</strong> who recently stepped into web
            development. I may be a fresher, but I bring{' '}
            <strong>strong dedication, curiosity</strong>, and a genuine love for
            building things that work beautifully.
          </p>
          <p className="abio" style={{ marginTop: '16px' }}>
            On the <strong>frontend</strong>, I work with HTML, CSS, JavaScript, and
            React. I'm actively growing on the <strong>backend</strong> side — learning
            Node.js, Express &amp; MongoDB to become a complete developer.
          </p>
          <p className="abio" style={{ marginTop: '16px' }}>
            I believe every expert was once a beginner. I'm here to{' '}
            <strong>learn fast, build real things</strong>, and grow with every
            project. 🚀
          </p>
          <div className="about-tags">
            {['🎓 Self-Taught', '⚡ Fast Learner', '💡 Problem Solver', '🌐 Open to Work'].map(t => (
              <span key={t} className="atag">{t}</span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}