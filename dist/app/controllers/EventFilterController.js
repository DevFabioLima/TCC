"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _Event = require('../models/Event'); var _Event2 = _interopRequireDefault(_Event);
class EventFilterController {
  async index(req, res) {
   const events = await _Event2.default.findByPk(req.params.id);
   console.log(req.params.id);
    return res.json(events);
  }
}
exports. default = new EventFilterController();
