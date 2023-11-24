
const express = require('express');

const router = express.Router();

const profileControl = require("../controllers/profile");
const bookControl = require("../controllers/book");
const { authenticateToken } = require('../middleware/authenticateToken');


router.get('/profile', profileControl.getProfileDetails);
router.get('/profile/:profileId', profileControl.getProfileId);
router.post('/profile', profileControl.postProfileDetail);
router.patch('/profile/:profileId', profileControl.editProfileId);
router.delete('/profile/:profileId', profileControl.deleteProfileId);


router.get('/book', authenticateToken, bookControl.getBookDetailAll);
router.get('/book/:bookId', bookControl.getBookById);
router.post('/book', bookControl.postBookDetail);
router.put('/book/:bookId', bookControl.editBookDetail);
router.delete('/book/:bookId', bookControl.deleteBookId);






module.exports = router;