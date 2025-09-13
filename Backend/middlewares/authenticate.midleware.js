const jwt = require('jsonwebtoken');

function authenticateUser(req, res, next) {
    try {
        let token;

        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        } else if (req.headers['authorization']) {
            const authHeader = req.headers['authorization'];
            token = authHeader.startsWith('Bearer ')
                ? authHeader.split(' ')[1]
                : authHeader;
        }

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized - No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
}

module.exports = authenticateUser;
