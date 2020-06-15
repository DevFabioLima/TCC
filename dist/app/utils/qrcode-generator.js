"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _qrcode = require('qrcode'); var _qrcode2 = _interopRequireDefault(_qrcode);
const generateQR = async data => {
  try {
    const response = await _qrcode2.default.toDataURL(JSON.stringify(data));
    return response;
  } catch (err) {
    console.error(err);
    return null;
  }
}

exports. default = generateQR;