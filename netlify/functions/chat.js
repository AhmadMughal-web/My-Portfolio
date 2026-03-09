exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { messages } = JSON.parse(event.body);

    const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 1000,
            system: `You are an AI assistant for M Ahmad's portfolio website.
M Ahmad is a Junior Full Stack Developer from Pakistan.
Skills: HTML, CSS, JavaScript, React, Tailwind, Bootstrap, Node.js, Express, MongoDB, REST APIs, GitHub, AI tools.
Projects: Portfolio website, AI Agency website, Full Stack App (in progress).
Contact: ahmadkhadim238@gmail.com, WhatsApp: +92 324 9425513.
He is open to work, self-taught, came from pre-medical background.
Answer questions about M Ahmad's portfolio, skills, projects, and contact info.
Also answer general coding and web development questions helpfully.
Keep answers concise and friendly.`,
            messages,
        }),
    });

    const data = await res.json();

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
};