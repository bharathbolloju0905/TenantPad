const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const ConnectToDB = require('./DB/connection.DB');
const authRoutes = require('./routes/auth.routes');
const notesRoutes = require('./routes/notes.route');
const adminRoutes = require('./routes/admin.route');
const tenantRoutes = require('./routes/tenant.route');
const app = express();


app.use(cors({
  origin: (origin, callback) => {
    callback(null, origin || true); 
  },
  credentials: true,
}));



app.use(express.json());

app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/notes', notesRoutes);
app.use('/users', adminRoutes);
app.use('/tenants', tenantRoutes);

app.get('/health', (req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    ConnectToDB();
});


