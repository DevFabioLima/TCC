"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('events', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      attraction: {
        type: Sequelize.STRING,
        allowNull: false,
       
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      hours: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      valuepistaf:{
        type: Sequelize.DECIMAL,
        allowNull:false
      },
      valuepistam:{
        type: Sequelize.DECIMAL,
        allowNull:false
      },
      valuecamarotef:{
        type: Sequelize.DECIMAL,
        allowNull:false
      },
      valuecamarotem:{
        type: Sequelize.DECIMAL,
        allowNull:false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('events');
  },
};
