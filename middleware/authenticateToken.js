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
    },
    checkRole: async (req, res, next) => {
        try {
            const userId = req.user.id;
            const user = await db.user.findOne({
                where: { id: userId },
            });

            if (user.role !== "member") {
                return res
                    .status(403)
                    .json({ error: "Unauthorized. Only member can access this route" });
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
};