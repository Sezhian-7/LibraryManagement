

module.exports = function modelRole(sequelize, Sequelize) {
    const Token = sequelize.define('token', {
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
        }
    });

    return Token;
}

