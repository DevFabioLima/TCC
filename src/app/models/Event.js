import Sequelize, { Model } from "sequelize";

import bcrypt from "bcryptjs";

class Event extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        attraction: Sequelize.STRING,
        description: Sequelize.STRING,
        date: Sequelize.DATE,
        hours: Sequelize.STRING,
        valuepistaf: Sequelize.DECIMAL,
        valuepistam: Sequelize.DECIMAL,
        valuecamarotef: Sequelize.DECIMAL,
        valuecamarotem: Sequelize.DECIMAL,
        lote: Sequelize.INTEGER,
        aux: Sequelize.DATE,
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
export default Event;
