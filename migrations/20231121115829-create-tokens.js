"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tokens", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.STRING,       
      },  
      token: {
        type: Sequelize.STRING, 
        allowNull: false,
      }, 
      tokenType: {
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
    await queryInterface.dropTable("tokens");
  },
};