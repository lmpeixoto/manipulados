const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token || !req.session.isLoggedIn) {
        return res.status(400).json({ errorMessage: 'Access Denied' });
    }
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

module.exports = isAuth;
