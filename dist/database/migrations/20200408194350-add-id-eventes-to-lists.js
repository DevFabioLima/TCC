"use strict";module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("lists", "id_events", {
      type: Sequelize.INTEGER,
      references: { model: "events", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      allowNull: true
    });
  },
  down: queryInterface => {
    return queryInterface.removeColumn("lists", "id_events");
  }
};
