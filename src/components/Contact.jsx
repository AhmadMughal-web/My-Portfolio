import { useState, useEffect, useRef } from 'react';
import './Contact.css';

export default function Contact() {

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://formsubmit.co/ajax/ahmadkhadim238@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ ...form, _captcha: 'false' }),
      });
      if (res.ok) { setStatus('success'); setForm({ name: '', email: '', message: '' }); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };
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
    <section id="contact" className="section reveal" ref={ref}>
      <div className="sec-label">04 — Contact</div>
      <h2 className="sec-title">Let's Build <span>Together</span></h2>
      <p className="sec-sub">Got a project or opportunity? I'd love to hear about it.</p>

      <div className="contact-grid">
        {/* Left */}
        <div className="contact-left">
          <div className="contact-hl" >
            Drop me a <span>message 📬</span>
          </div>
          <p className="contact-desc">
            I'm actively looking for opportunities as a <strong>junior developer</strong>. Whether it's
            a freelance project, internship, or full-time role — I'd love to connect!
          </p>

          <div className="contact-links">
            <div className="c-link" onClick={() => window.open('mailto:ahmadkhadim238@gmail.com')}>
              <div className="c-icon"><i className="fa-solid fa-envelope" /></div>
              <div className="c-text">
                <span className="c-lbl">Email</span>
                <span className="c-val">ahmadkhadim238@gmail.com</span>
              </div>
              <i className="fa-solid fa-arrow-up-right-from-square c-arr" />
            </div>

            <div className="c-link" onClick={() => window.open('https://wa.me/923249425513')}>
              <div className="c-icon wa"><i className="fa-brands fa-whatsapp" /></div>
              <div className="c-text">
                <span className="c-lbl">WhatsApp</span>
                <span className="c-val">+92 324 9425513</span>
              </div>
              <i className="fa-solid fa-arrow-up-right-from-square c-arr" />
            </div>
          </div>
        </div>

        {/* Right — Form */}
        <form className="cf" onSubmit={handleSubmit}>
          <div className="fg">
            <label>Your Name</label>
            <input name="name" placeholder="John Doe" value={form.name} onChange={onChange} required />
          </div>
          <div className="fg">
            <label>Email Address</label>
            <input type="email" name="email" placeholder="john@example.com" value={form.email} onChange={onChange} required />
          </div>
          <div className="fg">
            <label>Message</label>
            <textarea name="message" placeholder="Tell me about your project or opportunity..." value={form.message} onChange={onChange} required />
          </div>

          {/* Notification */}
          {status === 'success' && (
            <div className="notif notif-success">
              <i className="fa-solid fa-circle-check" />
              <div>
                <strong>Message Sent!</strong>
                <p>I'll get back to you very soon 🚀</p>
              </div>
            </div>
          )}
          {status === 'error' && (
            <div className="notif notif-error">
              <i className="fa-solid fa-circle-xmark" />
              <div>
                <strong>Something went wrong</strong>
                <p>Please try again or WhatsApp me directly.</p>
              </div>
            </div>
          )}

          <button type="submit" className="btn btn-p btn-full" disabled={status === 'sending'}>
            {status === 'sending'
              ? <><i className="fa-solid fa-spinner fa-spin" /> Sending...</>
              : <><i className="fa-solid fa-paper-plane" /> Send Message</>}
          </button>
        </form>
      </div>
    </section>
  );
}
