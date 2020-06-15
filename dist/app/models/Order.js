"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Order extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        payed: _sequelize2.default.BOOLEAN,
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
exports. default = Order;