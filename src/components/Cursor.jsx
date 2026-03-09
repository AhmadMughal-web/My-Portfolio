import { useEffect, useRef } from 'react';
import './Cursor.css';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const onMove = e => { mouse.current.x = e.clientX; mouse.current.y = e.clientY; };
    document.addEventListener('mousemove', onMove);

    const tick = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.13;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.13;
      if (dotRef.current) {
        dotRef.current.style.left = mouse.current.x + 'px';
        dotRef.current.style.top = mouse.current.y + 'px';
      }
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px';
        ringRef.current.style.top = ring.current.y + 'px';
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const enter = () => ringRef.current?.classList.add('hov');
    const leave = () => ringRef.current?.classList.remove('hov');

    const attach = () => document.querySelectorAll('a, button, .skill-card, .proj-card, .id-card, .clink, .btn, .nav a').forEach(el => { el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave); });

    // re-attach on DOM changes
    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });
    attach();

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      <div className="c-dot" ref={dotRef} />
      <div className="c-ring" ref={ringRef} />
    </>
  );
}
