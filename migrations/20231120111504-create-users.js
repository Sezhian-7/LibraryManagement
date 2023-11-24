"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Please enter a valid email address',
          },
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};