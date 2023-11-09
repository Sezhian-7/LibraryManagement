
const express = require('express');

const router = express.Router();

const profileControl = require("../controllers/profile");


router.get('/profile', profileControl.getProfileDetails);
router.get('/profile/:profileId', profileControl.getProfileId);
router.post('/profile', profileControl.postProfileDetail);
router.patch('/profile/:profileId', profileControl.editProfileId);
router.delete('/profile/:profileId', profileControl.deleteProfileId);


module.exports = router;