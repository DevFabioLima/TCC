"use strict"; function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Event = require('../models/Event'); var _Event2 = _interopRequireDefault(_Event);
var _File = require('../models/File'); var _File2 = _interopRequireDefault(_File);

class EventController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      attraction: Yup.string().required(),
      description: Yup.string().required(),
      date: Yup.date().required(),
      hours: Yup.string().required(),
      valuepistaf: Yup.number().required(),
      valuepistam: Yup.number().required(),
      valuecamarotef: Yup.number().required(),
      valuecamarotem: Yup.number().required(),
      lote: Yup.number(),
      aux: Yup.date()
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }
    const eventExist = await _Event2.default.findOne({
      where: { attraction: req.body.attraction, date: req.body.date }
    });
    const eventDate = await _Event2.default.findOne({
      where: { date: req.body.date }
    });
    if (eventDate) {
      return res.status(400).json({ error: "This date already exist event" });
    }
    if (eventExist) {
      return res.status(400).json({ error: "Event already exist" });
    }

    const {
      id,
      name,
      attraction,
      description,
      date,
      hours,
      valuepistaf,
      valuepistam,
      valuecamarotem,
      valuecamarotef,
      lote,
      aux
    } = await _Event2.default.create(req.body);
    return res.json({
      id,
      name,
      attraction,
      description,
      date,
      hours,
      valuepistaf,
      valuepistam,
      valuecamarotem,
      valuecamarotef,
      lote,
      aux
    });
  }
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      attraction: Yup.string(),
      description: Yup.string(),
      date: Yup.date(),
      hours: Yup.string(),
      valuepistaf: Yup.number(),
      valuepistam: Yup.number(),
      valuecamarotef: Yup.number(),
      valuecamarotem: Yup.number(),
      lote: Yup.number(),
      aux: Yup.date(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "error formulario" });
    }
    const event = await _Event2.default.findByPk(req.params.id);

    if (!event) {
      return res.status(400).json({ error: "This event not exist" });
    }

    const {
      name,
      attraction,
      description,
      date,
      hours,
      valuepistaf,
      valuepistam,
      valuecamarotem,
      valuecamarotef,
      lote,
      aux,
    } = await event.update(req.body);
    return res.json({
      name,
      attraction,
      description,
      date,
      hours,
      valuepistaf,
      valuepistam,
      valuecamarotem,
      valuecamarotef,
      lote,
      aux,
    });
  }
  async index(req, res) {
    const { page = 1 } = req.query;
    const events = await _Event2.default.findAll({
      attributes: [
        "id",
        "name",
        "attraction",
        "description",
        "date",
        "hours",
        "valuepistaf",
        "valuepistam",
        "valuecamarotef",
        "valuecamarotem",
        "lote"
      ],
      include: [
        {
          model: _File2.default,
          attributes: ["id", "path", "url"]
        }
      ],
      limit: 20,
      offset: (page - 1) * 20
    });
    return res.json(events);
  }
  async delete(req, res) {
    const event = await _Event2.default.findByPk(req.params.id);
    if (!event) {
      return res.status(400).json({ error: "Event not exist" });
    }
    await _Event2.default.destroy({ where: { id: req.params.id } });
    const event2 = await _Event2.default.findAll();
    return res.json(event2);
  }
}
exports. default = new EventController();
