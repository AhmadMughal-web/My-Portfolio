import { useState, useEffect, useCallback } from 'react';
import './styles/global.css';

import Loader from './components/Loader';
import Cursor from './components/Cursor';
import Stars from './components/Stars';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActive] = useState('home');

  /* ── scroll listener (fast, passive) ── */
  useEffect(() => {
    if (!loaded) return;

    const SECTIONS = ['home', 'about', 'skills', 'projects', 'contact'];

    const onScroll = () => {
      /* navbar blur */
      setScrolled(window.scrollY > 60);

      /* active nav link */
      let cur = 'home';
      SECTIONS.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 220) cur = id;
      });
      setActive(cur);

      /* reveal sections via IntersectionObserver in each component,
         but also trigger here as fallback */
      document.querySelectorAll('.reveal:not(.on)').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 80)
          el.classList.add('on');
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener('scroll', onScroll);
  }, [loaded]);

  const onLoaded = useCallback(() => setLoaded(true), []);

  return (
    <>
      <Loader onDone={onLoaded} />

      {loaded && (
        <>
          <Cursor />
          <Stars />
          <Navbar scrolled={scrolled} activeSection={activeSection} />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </>
      )}
      {loaded && <Chatbot />}
    </>
  );
}
