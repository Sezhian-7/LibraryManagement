module.exports = function modelRole(sequelize, Sequelize) {
    const Book = sequelize.define('book', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
          },
        bookName: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        author: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
    });

    return Book;

}