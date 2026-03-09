import { useState, useEffect, useRef } from 'react';
import './Hero.css';

const PHRASES = [
  'Full Stack Developer',
  'React Enthusiast',
  'Node.js Learner',
  'UI/UX Craftsman',
  'Junior Developer',
];

export default function Hero() {
  const [typed, setTyped] = useState('');
  const state = useRef({ pi: 0, ci: 0, del: false });
 

  /* ── Typing effect ── */
  useEffect(() => {
    let timer;
    const tick = () => {
      const s = state.current;
      const cur = PHRASES[s.pi];
      if (s.del) { if (s.ci > 0) s.ci--; }
      else { if (s.ci < cur.length) s.ci++; }
      setTyped(cur.substring(0, s.ci));
      let spd = s.del ? 48 : 86;
      if (!s.del && s.ci === cur.length) { spd = 1600; s.del = true; }
      else if (s.del && s.ci === 0) { s.del = false; s.pi = (s.pi + 1) % PHRASES.length; spd = 400; }
      timer = setTimeout(tick, spd);
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, []);

  /* ── 3D Particle field ── */


  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">

    

      <div className="shooting-stars">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={i % 3 === 0 ? 'shoot shoot-purple' : i % 3 === 1 ? 'shoot shoot-white' : 'shoot'}
            style={{
              '--i': i % 6,
              top: (i * 4.7) % 88 + '%',
              animationDelay: i * 0.55 + 's',
              height: 35 + i * 7 + 'px',
            }}
          />
        ))}
      </div>

      <div className="hero-badge">
        <span className="badge-dot" />
        Available for Work — Junior Developer
      </div>

      <div className="hero-content">
        <p className="hero-eye">Hello World 👋</p>
        <h1>I'm <span className="grad">M.Ahmad</span></h1>
        <div className="typing-wrap">
          <span>{typed}</span>
          <span className="blink">|</span>
        </div>
        <p className="hero-sub">
          Building modern full-stack web experiences — pixel-perfect frontends &amp; clean backends.
        </p>
        <div className="hero-ctas">
          <a href="./images/resume.pdf" download className="btn btn-p">
            <i className="fa-solid fa-download" /> Download Resume
          </a>
          <button className="btn btn-g" onClick={() => scrollTo('projects')}>
            View Work <i className="fa-solid fa-arrow-right" />
          </button>
        </div>
      </div>

      <div className="scroll-ind">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}