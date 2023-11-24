const db = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = "secret"
const sendEmail = require("../controllers/sendEmail");


module.exports = {
    signUp: async (req, res) => {

        try {

            const username = req.body.username;
            const password = req.body.password;


            const existingUser = await db.user.findOne({
                where: {
                    username: username
                }
            });

            if (existingUser) {
                return res.status(403).send({ msg: "User already exist" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await db.user.create({
                username: username,
                password: hashedPassword
            })

            const verificationToken = jwt.sign({ id: newUser.id, username: newUser.username }, secretKey)

            // Save the token data in the database
            await db.token.create({
                userId: newUser.id,
                token: verificationToken
            })


            await sendEmail(username, verificationToken);

            return res.status(200).json({ msg: "user created. Check email" });

        }
        catch (error) {
            console.log(error);
        }
    },
    signUpVerify: async (req, res) => {
        try {
            const { token } = req.body;
            const tokenRecord = await db.token.findOne({
                where: {
                    token: token,
                },
            });

            if (!tokenRecord) {
                return res.status(404).json({ error: "Token not found or invalid" });
            }

            await db.user
                .update(
                    { status: "verified" },
                    {
                        where: {
                            id: tokenRecord.userId,
                        },
                    }
                )
                .catch((error) => {
                    console.error("Error updating user status:", error);
                });

            await db.token
                .destroy({
                    where: {
                        token: token,
                    },
                })
                .catch((error) => {
                    console.error("Error destroying token:", error);
                });

            res.json({ msg: "Account Verified" });
        } catch (error) {
            console.error("Error during verification:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    login: async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        try {
            const user = await db.user.findOne({
                where: {
                    username: username
                }
            });
            if (!user) {
                return res.status(403).send({ msg: "Invalid username" });
            }
            if (user.status !== "verified") {
                return res.status(403).send({ msg: "User is not verfied" });
            }
            if (!await bcrypt.compare(password, user.password)) {
                return res.status(403).send({ msg: "User password is not match" });
            }
            const token = jwt.sign({ id: user.id, username: user.username }, secretKey)

            await db.token.create({
                userId: user.id,
                tokenType: "login token",
                token: token,
            });

            return res.status(200).json({ accessToken: token });

        } catch (error) {
            console.log(error);
        }
    },

};