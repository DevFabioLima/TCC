import QRCode from "qrcode";
const generateQR = async data => {
  try {
    const response = await QRCode.toDataURL(JSON.stringify(data));
    return response;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default generateQR;