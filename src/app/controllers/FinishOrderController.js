import generateQR from "../utils/qrcode-generator";
import { Boleto } from 'node-boleto';
import Order from "../models/Order";
import Event from '../models/Event';
import User from '../models/User';
import Mail from '../../lib/Mail';
import pdf from 'html-pdf';

class FinishOrderController {
  async finishOrder(req, res) {
    const camaroteQuantityMen = req.body.camaroteQuantityMen;
    const camaroteQuantityWoman = req.body.camaroteQuantityWoman;
    const pistaQuantityMen = req.body.pistaQuantityMen;
    const pistaQuantityWoman = req.body.pistaQuantityWoman;
    const userId = req.body.userId;
    const eventId = req.body.eventId;
    const orders = await Order.create({
      payed: false,
      user_id: userId,
      event_id: eventId
    });

    const evento = await Event.findByPk(eventId);

    const user = await User.findByPk(userId);

    const pagador = user.name;

    const valueTotalPistaWoman = evento.valuepistaf * pistaQuantityWoman;
    const valueTotalPistaMen = evento.valuepistam * pistaQuantityMen;
    const valueTotalCamaroteWoman = evento.valuecamarotef * camaroteQuantityWoman;
    const valueTotalCamaroteMen = evento.valuecamarotem * camaroteQuantityMen;
    
    const valueTotal = valueTotalPistaWoman + valueTotalPistaMen + 
                       valueTotalCamaroteWoman + valueTotalCamaroteMen;
    

    //é gerado uma imagem base 64, tem que ver como colocar isso no corpo do email
    //acredito de só mandar já vai ir certo
    const qrCodeGerado = await generateQR({
      userId,
      eventId,
      valueTotal,
      camaroteQuantityMen,
      camaroteQuantityWoman,
      pistaQuantityMen,
      pistaQuantityWoman
    });
    


    const boleto = new Boleto({
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
      pdf.create(html, options).toFile('./src/app/boleto/boleto.pdf', function(err, res){
         Mail.sendMail({
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
export default new FinishOrderController();