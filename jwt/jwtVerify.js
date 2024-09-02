const jwt = require('jsonwebtoken')


const jwtVerify = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            return res.json(
                { message: 'verifyToken is required' });
        } else {
            const decoded = jwt.verify(token, "secretKey");

            req.user = decoded
        }
        return next();
    } catch (err) {
        return res.json({ message: 'invalid token' });
    }
};
module.exports = jwtVerify
