import Order from "../models/Order";

class OrderController {
  async getPayed(req, res) {
    const {userId, eventId} = req.params;
    if (!userId || !eventId) {
      return res.status(400).json({ message: "userId or eventId not provided"});
    }
    const order = await Order.findOne({ where: {
      user_id: userId,
      event_id: eventId
    }});
    if (!order) {
      return res.status(404).json({message: "Order not found"});
    }
    return res.status(200).json({ payed: order.payed });
  }

  async payOrder(req, res) {
    const {userId, eventId} = req.params;
    if (!userId || !eventId) {
      return res.status(400).json({ message: "userId or eventId not provided"});
    }
    const order = await Order.update({ payed: true }, { where: {
      user_id: userId,
      event_id: eventId
    }});
    if (order!=1) {
      return res.status(404).json({message: "Order not found"});
    }
    return res.status(200).json({message: "ok"});
  }
}
export default new OrderController();