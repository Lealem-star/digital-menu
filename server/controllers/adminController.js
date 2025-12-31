const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

function signToken(admin) {
    const secret = process.env.JWT_SECRET || 'dev_secret_change_me';
    return jwt.sign({ id: admin._id, email: admin.email, role: 'admin' }, secret, { expiresIn: '7d' });
}

async function register(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
        const existing = await Admin.findOne({ email });
        if (existing) return res.status(409).json({ message: 'Email already registered' });
        const passwordHash = await bcrypt.hash(password, 10);
        const admin = await Admin.create({ email, passwordHash });
        const token = signToken(admin);
        return res.status(201).json({ token, admin: { id: admin._id, email: admin.email } });
    } catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
        const ok = await bcrypt.compare(password, admin.passwordHash);
        if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
        const token = signToken(admin);
        return res.json({ token, admin: { id: admin._id, email: admin.email } });
    } catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
}

async function me(req, res) {
    try {
        const admin = await Admin.findById(req.user.id).select('_id email');
        if (!admin) return res.status(404).json({ message: 'Not found' });
        return res.json({ admin });
    } catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { register, login, me };

