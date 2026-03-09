import { useEffect, useRef } from 'react';
import './Skills.css';

const SKILLS = [
  { icon: 'fa-brands fa-html5', label: 'HTML5', color: '#e34f26' },
  { icon: 'fa-brands fa-css3-alt', label: 'CSS3', color: '#1572b6' },
  { icon: 'fa-brands fa-square-js', label: 'JavaScript', color: '#f7df1e' },
  { icon: 'fa-brands fa-react', label: 'React', color: '#61dafb' },
  { icon: 'fa-solid fa-wind', label: 'Tailwind', color: '#06b6d4' },
  { icon: 'fa-brands fa-bootstrap', label: 'Bootstrap', color: '#7952b3' },
  { icon: 'fa-brands fa-node-js', label: 'Node.js', color: '#339933' },
  { icon: 'fa-solid fa-server', label: 'Express.js', color: '#ffffff' },
  { icon: 'fa-solid fa-database', label: 'MongoDB', color: '#47a248' },
  { icon: 'fa-solid fa-code-branch', label: 'REST APIs', color: '#00f7ff' },
  { icon: 'fa-brands fa-github', label: 'GitHub', color: '#ffffff' },
  { icon: 'fa-solid fa-layer-group', label: 'Full Stack', color: '#a855f7' },
  { icon: 'fa-solid fa-robot', label: 'ChatGPT', color: '#10a37f' },
  { icon: 'fa-solid fa-wand-magic-sparkles', label: 'Claude AI', color: '#d97706' },
  { icon: 'fa-solid fa-code', label: 'GitHub Copilot', color: '#ffffff' },
  { icon: 'fa-solid fa-brain', label: 'AI Integration', color: '#a855f7' },
];

function SkillCard({ icon, label }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `translateY(-8px) rotateX(${-y * 14}deg) rotateY(${x * 14}deg)`;
  };
  const onLeave = () => { ref.current.style.transform = ''; };

  return (
    // updated
    <div className="skill-card" ref={ref}

      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        const cx = x / r.width - 0.5;
        const cy = y / r.height - 0.5;
        e.currentTarget.style.transform = `perspective(600px) rotateX(${-cy * 20}deg) rotateY(${cx * 20}deg) translateY(-8px) scale(1.05)`;
        e.currentTarget.style.setProperty('--mx', `${x}px`);
        e.currentTarget.style.setProperty('--my', `${y}px`);
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = '';
      }}
    >
      <div className="sk-icon"><i className={icon} /></div>
      <span>{label}</span>
      <div className="sk-glow" />
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { ref.current?.classList.add('on'); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" className="section reveal" ref={ref}>
      <div className="sec-label">02 — Skills</div>
      <h2 className="sec-title">My <span>Toolkit</span></h2>
      <p className="sec-sub">Frontend & Backend technologies I'm working with</p>

      <div className="skills-grid">
        {SKILLS.map((s, i) => <SkillCard key={i} {...s} />)}
      </div>

      <div className="stack-note">
        <i className="fa-solid fa-circle-info" />
        Currently mastering <strong>Node.js, Express & MongoDB</strong> to complete the full stack journey 🚀
      </div>
    </section>
  );
}
