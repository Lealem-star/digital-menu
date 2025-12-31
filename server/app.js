require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDatabase } = require('./config/db');
const Admin = require('./models/Admin');
const bcrypt = require('bcryptjs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Routes
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

const menuRoutes = require('./routes/menuRoutes');
app.use('/api/menu', menuRoutes);

const PORT = process.env.PORT || 5000;

connectDatabase()
    .then(async () => {
        // Create initial admin if not exists
        const adminEmail = 'admin@gmail.com';
        const adminPassword = 'admin@123';

        const existingAdmin = await Admin.findOne({ email: adminEmail });
        if (!existingAdmin) {
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(adminPassword, salt);
            await Admin.create({ email: adminEmail, passwordHash });
            console.log('Initial admin created: admin@gmail.com');
        }

        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
        console.error('Failed to connect to DB', err);
        process.exit(1);
    });


