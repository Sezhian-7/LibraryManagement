const jwt = require('jsonwebtoken');
const secretKey = 'secret';

module.exports = {
    authenticateToken: async (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) return res.status(401).send({ msg: "Unauthorized" });

        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.status(403).send({ msg: "Token parse failed to authenticate" });
            }

            req.user = user;
            next();
        });
    }
};