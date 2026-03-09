import { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const SYSTEM = `You are an AI assistant for M Ahmad's portfolio website. 
M Ahmad is a Junior Full Stack Developer from Pakistan.
Skills: HTML, CSS, JavaScript, React, Tailwind, Bootstrap, Node.js, Express, MongoDB, REST APIs, GitHub, AI tools.
Projects: Portfolio website, AI Agency website, Full Stack App (in progress).
Contact: ahmadkhadim238@gmail.com, WhatsApp: +92 324 9425513.
He is open to work, self-taught, came from pre-medical background.
Answer questions about M Ahmad's portfolio, skills, projects, and contact info.
Also answer general coding and web development questions helpfully.
Keep answers concise and friendly.`;

export default function Chatbot() {
    const [open, setOpen] = useState(false);
    const [msgs, setMsgs] = useState([
        { role: 'assistant', content: "Hi! I'm Ahmad's AI assistant 👋 Ask me anything about his skills, projects, or coding!" }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [msgs]);

    const API_KEY = 'TUMHARI_GEMINI_KEY_YAHAN';

    const send = async () => {
        if (!input.trim() || loading) return;
        const userMsg = { role: 'user', content: input.trim() };
        const newMsgs = [...msgs, userMsg];
        setMsgs(newMsgs);
        setInput('');
        setLoading(true);

        try {
            const geminiMsgs = newMsgs.map(m => ({
                role: m.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: m.content }]
            }));

            const res = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        system_instruction: { parts: [{ text: SYSTEM }] },
                        contents: geminiMsgs,
                    }),
                }
            );
            const data = await res.json();
            const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, try again!';
            setMsgs(prev => [...prev, { role: 'assistant', content: reply }]);
        } catch {
            setMsgs(prev => [...prev, { role: 'assistant', content: 'Network error. Please try again!' }]);
        }
        setLoading(false);
    };

    const onKey = e => { if (e.key === 'Enter') send(); };

    return (
        <>
            {open && (
                <div className="chat-window">
                    <div className="chat-header">
                        <div className="chat-header-info">
                            <div className="chat-avatar"><i className="fa-solid fa-robot" /></div>
                            <div>
                                <p className="chat-name">Ahmad's AI</p>
                                <p className="chat-status"><span className="chat-dot" /> Online</p>
                            </div>
                        </div>
                        <button className="chat-close" onClick={() => setOpen(false)}>
                            <i className="fa-solid fa-xmark" />
                        </button>
                    </div>

                    <div className="chat-msgs">
                        {msgs.map((m, i) => (
                            <div key={i} className={`chat-msg ${m.role}`}>
                                {m.role === 'assistant' && (
                                    <div className="chat-msg-avatar"><i className="fa-solid fa-robot" /></div>
                                )}
                                <div className="chat-bubble">{m.content}</div>
                            </div>
                        ))}
                        {loading && (
                            <div className="chat-msg assistant">
                                <div className="chat-msg-avatar"><i className="fa-solid fa-robot" /></div>
                                <div className="chat-bubble typing">
                                    <span /><span /><span />
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    <div className="chat-input-wrap">
                        <input
                            className="chat-input"
                            placeholder="Ask me anything..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={onKey}
                        />
                        <button className="chat-send" onClick={send} disabled={loading}>
                            <i className="fa-solid fa-paper-plane" />
                        </button>
                    </div>

                    {/* FAB inside window bottom */}
                    <button className="chat-fab-inside" onClick={() => setOpen(false)}>
                        <i className="fa-solid fa-xmark" />
                    </button>
                </div>
            )}

            {!open && (
                <button className="chat-fab" onClick={() => setOpen(true)}>
                    <i className="fa-solid fa-robot" />
                    <span className="chat-fab-ping" />
                </button>
            )}
        </>
    );
}