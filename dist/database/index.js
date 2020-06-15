"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _User = require('../app/models/User'); var _User2 = _interopRequireDefault(_User);
var _Event = require('../app/models/Event'); var _Event2 = _interopRequireDefault(_Event);
var _File = require('../app/models/File'); var _File2 = _interopRequireDefault(_File);
var _List = require('../app/models/List'); var _List2 = _interopRequireDefault(_List);
var _Order = require('../app/models/Order'); var _Order2 = _interopRequireDefault(_Order);
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);

const models = [_User2.default, _Event2.default, _File2.default,_List2.default,_Order2.default];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new (0, _sequelize2.default)(_database2.default);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}
exports. default = new Database();
