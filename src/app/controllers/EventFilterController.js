import Events from "../models/Event";
class EventFilterController {
  async index(req, res) {
   const events = await Events.findByPk(req.params.id);
   console.log(req.params.id);
    return res.json(events);
  }
}
export default new EventFilterController();
