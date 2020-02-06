import Event from "../models/Event";
import File from '../models/File';
import { Op } from "sequelize";
class EventMonthController {
  async index(req, res) {
    const firstDay = req.query.firstDayFormat;
    const lastDay = req.query.lastDayFormat;
   
    const events = await Event.findAll({
      where: {
        date: {
          [Op.between]: [firstDay, lastDay]
        }
      },
      include: [
        {
          model: File,
          attributes: ["id", "path", "url"]
        }
      ],
      order: ["date"]
    });
    return res.json(events);
  }
}
export default new EventMonthController();
