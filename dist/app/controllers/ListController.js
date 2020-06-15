"use strict"; function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _List = require('../models/List'); var _List2 = _interopRequireDefault(_List);
var _Event = require('../models/Event'); var _Event2 = _interopRequireDefault(_Event);

class ListController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      cpf: Yup.string().required()
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const { name, cpf } = await _List2.default.create(req.body);

    const list2 = await _List2.default.findOne({
      where: { cpf: req.body.cpf },
      order: [["createdAt", "DESC"]]
    });

    const { id_events } = await _List2.default.update(req.params, {
      where: { id: list2.id }
    });

    const event_id = req.params.id_events;

    const list4 = await _List2.default.findAndCountAll({
      where: { id_events: event_id, cpf: req.body.cpf }
    });

    if (list4.count > 1) {
      await _List2.default.destroy({ where: { id: list2.id } });
      return res.status(400).json({ error: "This name already in List" });
    }

    return res.json({
      name,
      cpf
    });
  }
  async index(req, res) {
    const { page = 1 } = req.query;
    const list = await _List2.default.findAll({
      attributes: ["name", "cpf"],
      include: [
        {
          model: _Event2.default,

          attributes: ["name", "attraction"]
        }
      ],
      limit: 20,
      offset: (page - 1) * 20
    });
    return res.json(list);
  }
}

exports. default = new ListController();
