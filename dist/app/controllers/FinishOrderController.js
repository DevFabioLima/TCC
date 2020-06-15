"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _qrcodegenerator = require('../utils/qrcode-generator'); var _qrcodegenerator2 = _interopRequireDefault(_qrcodegenerator);
var _nodeboleto = require('node-boleto');
var _Order = require('../models/Order'); var _Order2 = _interopRequireDefault(_Order);
var _Event = require('../models/Event'); var _Event2 = _interopRequireDefault(_Event);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Mail = require('../../lib/Mail'); var _Mail2 = _interopRequireDefault(_Mail);
var _htmlpdf = require('html-pdf'); var _htmlpdf2 = _interopRequireDefault(_htmlpdf);

class FinishOrderController {
  async finishOrder(req, res) {
    const camaroteQuantityMen = req.body.camaroteQuantityMen;
    const camaroteQuantityWoman = req.body.camaroteQuantityWoman;
    const pistaQuantityMen = req.body.pistaQuantityMen;
    const pistaQuantityWoman = req.body.pistaQuantityWoman;
    const userId = req.body.userId;
    const eventId = req.body.eventId;
    const orders = await _Order2.default.create({
      payed: false,
      user_id: userId,
      event_id: eventId
    });

    const evento = await _Event2.default.findByPk(eventId);

    const user = await _User2.default.findByPk(userId);

    const pagador = user.name;

    const valueTotalPistaWoman = evento.valuepistaf * pistaQuantityWoman;
    const valueTotalPistaMen = evento.valuepistam * pistaQuantityMen;
    const valueTotalCamaroteWoman = evento.valuecamarotef * camaroteQuantityWoman;
    const valueTotalCamaroteMen = evento.valuecamarotem * camaroteQuantityMen;
    
    const valueTotal = valueTotalPistaWoman + valueTotalPistaMen + 
                       valueTotalCamaroteWoman + valueTotalCamaroteMen;
    

    //é gerado uma imagem base 64, tem que ver como colocar isso no corpo do email
    //acredito de só mandar já vai ir certo
    const qrCodeGerado = await _qrcodegenerator2.default.call(void 0, {
      userId,
      eventId,
      valueTotal,
      camaroteQuantityMen,
      camaroteQuantityWoman,
      pistaQuantityMen,
      pistaQuantityWoman
    });
    


    const boleto = new (0, _nodeboleto.Boleto)({
      'banco': "santander", // nome do banco dentro da pasta 'banks'
      'data_emissao': new Date(),
      'data_vencimento': new Date(new Date().getTime() + 5 * 24 * 3600 * 1000), // 5 dias futuramente
      'valor': valueTotal * 100, // R$ 15,00 (valor em centavos)
      'nosso_numero': (Math.floor(Math.random() * 101) + 50000),
      'numero_documento': (Math.floor(Math.random() * 101) + 7000),
      'cedente': "Tia Nena Pagamentos S/A",
      'cedente_cnpj': `1872705${(Math.floor(Math.random() * 101) + 30)}`, // sem pontos e traços
      'agencia': "0005",
      'codigo_cedente': `1254865${(Math.floor(Math.random() * 101) + 30)}`, // PSK (código da carteira)
      'carteira': "005",
      'pagador': pagador,
      
    });
    const options = { format: 'A3' };
    boleto.renderHTML(function (html) {
      _htmlpdf2.default.create(html, options).toFile('./src/app/boleto/boleto.pdf', function(err, res){
         _Mail2.default.sendMail({
          to: 'Fabio Lima <fabio.lucaslima@outlook.com>',
          subject: 'Boleto',
          template: 'boleto',
          context: {
            conteudo: res,
          },
          attachments: [
            {
                filename: 'boleto.pdf',                                         
                path: './src/app/boleto/boleto.pdf',
                contentType: 'application/pdf'
            },
            {
              filename: 'Ingresso',
              path: qrCodeGerado
            }
            
          ]
        })
      })
      
    });
    console.log(qrCodeGerado); //só mandar o qrCode pelo email
    return res.send();
  }
}
exports. default = new FinishOrderController();