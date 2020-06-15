"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multer3 = require('./config/multer'); var _multer4 = _interopRequireDefault(_multer3);

var _UserController = require('./app/controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _SessionController = require('./app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
var _auth = require('./app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);
var _EventController = require('./app/controllers/EventController'); var _EventController2 = _interopRequireDefault(_EventController);
var _FileController = require('./app/controllers/FileController'); var _FileController2 = _interopRequireDefault(_FileController);
var _ListController = require('./app/controllers/ListController'); var _ListController2 = _interopRequireDefault(_ListController);
var _EventFilterController = require('./app/controllers/EventFilterController'); var _EventFilterController2 = _interopRequireDefault(_EventFilterController);
var _EventMonthController = require('./app/controllers/EventMonthController'); var _EventMonthController2 = _interopRequireDefault(_EventMonthController);
var _FinishOrderController = require('./app/controllers/FinishOrderController'); var _FinishOrderController2 = _interopRequireDefault(_FinishOrderController);
var _OrderController = require('./app/controllers/OrderController'); var _OrderController2 = _interopRequireDefault(_OrderController);
const routes = new (0, _express.Router)();
const upload = _multer2.default.call(void 0, _multer4.default);

routes.post("/sessions", _SessionController2.default.store);
routes.get("/events", _EventController2.default.index);

// routes.use(authMiddleware);
routes.get("/users", _UserController2.default.index);
routes.post("/users", _UserController2.default.store);
routes.put("/users", _UserController2.default.update);
routes.delete("/users/:id", _UserController2.default.delete);

routes.post("/events", _EventController2.default.store);
routes.put("/events/:id", _EventController2.default.update);

routes.delete("/events/:id", _EventController2.default.delete);

routes.post("/files", upload.single("file"), _FileController2.default.store);

routes.post("/list/:id_events", _ListController2.default.store);
routes.get("/list", _ListController2.default.index);
routes.get("/event-filter/:id", _EventFilterController2.default.index);
routes.get("/event-month", _EventMonthController2.default.index);

// finishOrder
routes.post("/orders", _FinishOrderController2.default.finishOrder);
routes.get("/orders/users/:userId/events/:eventId", _OrderController2.default.getPayed);
routes.post("/orders/users/:userId/events/:eventId", _OrderController2.default.payOrder); 

exports. default = routes;