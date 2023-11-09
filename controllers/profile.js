const db = require('../models');

module.exports = {
    getProfileDetails: async (req, res) => {
        try {
            const getProfileData = await db.profile.findAll({});
            res.status(200).send(getProfileData);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    postProfileDetail: async (req, res) => {
        try {

            const userPaylad = {
                name: req.body.name,
                email: req.body.email,
            };

            const newUser = await db.profile.create(userPaylad);
            return res.status(200).json(newUser);

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getProfileId: async (req, res) => {
        try {
            const getProfileData = await db.profile.findOne({
                where: {
                    id: req.params.profileId
                }
            });
            res.status(200).send(getProfileData);

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    editProfileId: async (req, res) => {
        try {
            const getProfileData = await db.profile.findOne({
                where: {
                    id: req.params.profileId
                }
            });
            if (getProfileData) {
                if (getProfileData.name) {
                    getProfileData.name = req.body.name
                }
            }
            await getProfileData.save();

            res.status(200).send(getProfileData);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    deleteProfileId: async (req, res) => {
        try {
            const getProfileDelete = await db.profile.destroy({
                where: {
                    id: req.params.profileId
                }
            })
            if (getProfileDelete === 0) {
                return res.status(404).send({
                    msg: "Profile not found",
                });
            }
            res.send({
                delete: getProfileDelete,
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}