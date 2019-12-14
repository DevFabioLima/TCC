import Sequelize from "sequelize";
import User from "../app/models/User";
import Event from "../app/models/Event";
import File from "../app/models/File";
import databaseConfig from "../config/database";

const models = [User, Event, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}
export default new Database();
