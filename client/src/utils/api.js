const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

function getToken() {
    return localStorage.getItem('token');
}

function setToken(token) {
    if (token) localStorage.setItem('token', token);
}

async function request(path, options = {}) {
    const headers = Object.assign({ 'Content-Type': 'application/json' }, options.headers || {});
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        const message = data?.message || 'Request failed';
        throw new Error(message);
    }
    return data;
}

export async function login(email, password) {
    const data = await request('/admin/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
    });
    setToken(data.token);
    return data;
}

export async function getMe() {
    return request('/admin/me');
}
