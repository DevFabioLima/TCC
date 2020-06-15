"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

class Event extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: _sequelize2.default.STRING,
        attraction: _sequelize2.default.STRING,
        description: _sequelize2.default.STRING,
        date: _sequelize2.default.DATE,
        hours: _sequelize2.default.STRING,
        valuepistaf: _sequelize2.default.DECIMAL,
        valuepistam: _sequelize2.default.DECIMAL,
        valuecamarotef: _sequelize2.default.DECIMAL,
        valuecamarotem: _sequelize2.default.DECIMAL,
        lote: _sequelize2.default.INTEGER,
        aux: _sequelize2.default.DATE,
      },
      {
        sequelize
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: "avatar_id" });
  }
}
exports. default = Event;
