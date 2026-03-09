import { useState, useEffect } from 'react';
import './Loader.css';

export default function Loader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [out, setOut] = useState(false);

  useEffect(() => {
    let p = 0;
    const iv = setInterval(() => {
      p++;
      setPct(p);
      if (p >= 100) {
        clearInterval(iv);
        setTimeout(() => {
          setOut(true);
          setTimeout(onDone, 700);
        }, 300);
      }
    }, 22);
    return () => clearInterval(iv);
  }, [onDone]);

  return (
    <div className={`loader${out ? ' out' : ''}`}>
      <div className="loader-inner">
        <div className="loader-logo">M<span>.</span>A</div>
        <div className="loader-bar-wrap">
          <div className="loader-bar" style={{ width: `${pct}%` }} />
        </div>
        <div className="loader-pct">{pct}%</div>
      </div>
    </div>
  );
}
