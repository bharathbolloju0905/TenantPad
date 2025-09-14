const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cors = require('cors');
const ConnectToDB = require('./DB/connection.DB');
const authRoutes = require('./routes/auth.routes');
const notesRoutes = require('./routes/notes.route');
const adminRoutes = require('./routes/admin.route');
const tenantRoutes = require('./routes/tenant.route');

const app = express();

app.use(cors({ origin: (origin, callback) => { callback(null, origin || true); }, credentials: true, }))

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/auth', authRoutes);
app.use('/notes', notesRoutes);
app.use('/users', adminRoutes);
app.use('/tenants', tenantRoutes);

app.get('/health', (req, res) => res.json({ status: "ok" }));

// connect to DB once
ConnectToDB();

// IMPORTANT: do NOT call app.listen() on Vercel
module.exports = app;
