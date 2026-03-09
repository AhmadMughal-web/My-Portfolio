import { useState } from 'react';
import './Navbar.css';

const LINKS = ['home', 'about', 'skills', 'projects', 'contact'];

export default function Navbar({ scrolled, activeSection }) {
  const [open, setOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 10, behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-logo">M<span>.</span>Ahmad</div>

      <ul className={`nav-links${open ? ' open' : ''}`}>
        {LINKS.map(l => (
          <li key={l}>
            <a
              href={`#${l}`}
              className={activeSection === l ? 'active' : ''}
              onClick={e => { e.preventDefault(); scrollTo(l); }}
            >
              {l.charAt(0).toUpperCase() + l.slice(1)}
            </a>
          </li>
        ))}
      </ul>

      <button className={`hamburger${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)}>
        <span /><span /><span />
      </button>
    </nav>
  );
}
