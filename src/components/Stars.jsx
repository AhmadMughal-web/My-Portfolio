import { useRef } from 'react';
import './Stars.css';

export default function Stars() {
  const stars = useRef(null);

  if (!stars.current) {
    stars.current = Array.from({ length: 200 }, (_, i) => ({
      id: i,
      top:   (Math.random() * 100).toFixed(2),
      left:  (Math.random() * 100).toFixed(2),
      size:  (Math.random() * 2.2 + 0.4).toFixed(2),
      dur:   (Math.random() * 4 + 2).toFixed(1),
      delay: (Math.random() * 7).toFixed(1),
      minO:  (Math.random() * 0.1).toFixed(2),
      maxO:  (Math.random() * 0.6 + 0.3).toFixed(2),
    }));
  }

  return (
    <div className="stars-bg">
      {stars.current.map(s => (
        <div
          key={s.id}
          className="star"
          style={{
            top: `${s.top}%`, left: `${s.left}%`,
            width: `${s.size}px`, height: `${s.size}px`,
            '--dur':   `${s.dur}s`,
            '--delay': `${s.delay}s`,
            '--min-o': s.minO,
            '--max-o': s.maxO,
          }}
        />
      ))}

      {/* Nebula orbs */}
      <div className="orb o1" />
      <div className="orb o2" />
      <div className="orb o3" />
    </div>
  );
}
