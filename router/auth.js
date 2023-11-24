const express = require('express');

const authRouters = express.Router();

const loginControl = require("../controllers/auth");



authRouters.post('/login', loginControl.login)
authRouters.post('/sign-up', loginControl.signUp)
authRouters.post('/signupVerify', loginControl.signUpVerify)



module.exports = authRouters;
