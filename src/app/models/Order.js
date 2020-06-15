import Sequelize, { Model } from "sequelize";

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        payed: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        tableName: "orders"
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id" });
    this.belongsTo(models.Event, { foreignKey: "event_id" });
  }

}
export default Order;