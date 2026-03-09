import { useEffect, useRef } from 'react';
import './Projects.css';

const PROJECTS = [
  {
    img: './images/Awwwards.jpeg',
    tag: 'React • Animations • Video',
    title: 'Gaming Trailer Website',
    desc: 'An immersive gaming trailer website built with React — featuring video integration, smooth animations and cinematic UI.',
    link: 'https://soft-belekoy-cc58c4.netlify.app',
    featured: true,
    coming: false,
  },
  {
    img: './images/Agency.ai.jpeg',
    tag: 'React • Tailwind',
    title: 'AI Agency Landing',
    desc: 'An AI-based agency landing page built with React & Tailwind. Fully responsive with interactive components.',
    link: 'https://shiny-begonia-42fbfe.netlify.app',
    featured: true,
    coming: false,
  },
  {
    img: './images/project3.jpeg',
    tag: 'React • Node • MongoDB',
    title: 'Full Stack App',
    desc: 'A full-stack web application in progress — REST API backend, MongoDB database, and modern React frontend.',
    link: '#',
    featured: false,
    coming: true,
  },
];

function ProjectCard({ img, tag, title, desc, link, featured, coming }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `translateY(-8px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
  };
  const onLeave = () => { ref.current.style.transform = ''; };

  const handleImgError = (e) => {
    e.target.style.display = 'none';
    const wrap = e.target.closest('.proj-img');
    if (wrap) { wrap.style.background = 'linear-gradient(135deg,#1e1b4b,#0c4a6e)'; wrap.style.display = 'flex'; wrap.style.alignItems = 'center'; wrap.style.justifyContent = 'center'; }
  };

  return (
    <div
      className={`proj-card${featured ? ' feat' : ''}`}
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="proj-img">
        {coming && <div className="cs-badge">In Progress</div>}
        <img src={img} alt={title} onError={handleImgError} />
        <div className="proj-overlay">
          {coming
            ? <span className="proj-btn">🚀 Coming Soon</span>
            : <a href={link} target="_blank" rel="noreferrer" className="proj-btn">
              <i className="fa-solid fa-arrow-up-right-from-square" /> Live Demo
            </a>
          }
        </div>
      </div>
      <div className="proj-info">
        <span className="proj-tag">{tag}</span>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </div>
  );
}

export default function Projects() {
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
    <section id="projects" className="section reveal" ref={ref}>
      <div className="sec-label">03 — Work</div>
      <h2 className="sec-title">Featured <span>Projects</span></h2>
      <p className="sec-sub">Things I've built with love &amp; code</p>

      <div className="proj-grid">
        {PROJECTS.map((p, i) => <ProjectCard key={i} {...p} />)}
      </div>
    </section>
  );
}
