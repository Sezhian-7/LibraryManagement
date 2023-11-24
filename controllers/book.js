const db = require("../models");

module.exports = {
    getBookDetailAll: async (req, res) => {
        try {
            const data = await db.book.findAll();
            return res.status(200).json(data);
        } catch (error) {
            console.log(error);
        }
    },
    getBookById: async (req, res) => {
        try {
            const data = await db.book.findOne({
                where: {
                    id: req.params.bookId,
                },
            });

            return res.status(200).json(data);
        } catch (error) {
            console.log(error);
        }
    },
    postBookDetail: async (req, res) => {
        try {
            const data = await db.book.create({
                bookName: req.body.bookName,
                author: req.body.author,
            });

            return res.status(200).json(data);
        } catch (error) {
            console.log(error);
        }
    },
    editBookDetail: async (req, res) => {
        try {
            const bookData = await db.book.findOne({
                where: {
                    id: req.params.bookId,
                },
            });

            if (bookData) {
                bookData.bookName = req.body.bookName;
                bookData.author = req.body.author;
            }

            await bookData.save();
            res.status(200).send(bookData);

        } catch (error) {
            res.status(500).json({ error: errorMessage })
        }
    },
    deleteBookId: async (req, res) => {
        try {
            const getBookDelete = await db.book.destroy({
                where: {
                    id: req.params.bookId
                }
            })
            if (getBookDelete === 0) {
                return res.status(404).send({
                    msg: "Book not found",
                });
            }
            res.send({
                delete: getBookDelete,
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};