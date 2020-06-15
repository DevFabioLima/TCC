"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _Event = require('../models/Event'); var _Event2 = _interopRequireDefault(_Event);
var _File = require('../models/File'); var _File2 = _interopRequireDefault(_File);
var _sequelize = require('sequelize');
class EventMonthController {
  async index(req, res) {
    const firstDay = req.query.firstDayFormat;
    const lastDay = req.query.lastDayFormat;
   
    const events = await _Event2.default.findAll({
      where: {
        date: {
          [_sequelize.Op.between]: [firstDay, lastDay]
        }
      },
      include: [
        {
          model: _File2.default,
          attributes: ["id", "path", "url"]
        }
      ],
      order: ["date"]
    });
    return res.json(events);
  }
}
exports. default = new EventMonthController();
