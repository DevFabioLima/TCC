module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("orders", "event_id", {
      type: Sequelize.INTEGER,
      references: { model: "events", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      allowNull: true
    });
  },
  down: queryInterface => {
    return queryInterface.removeColumn("orders", "event_id");
  }
};