const axios = require("axios");

const SHIPROCKET_EMAIL = process.env.SR_EMAIL;
const SHIPROCKET_PASSWORD = process.env.SR_PASSWORD;

let tokenCache = null;
let tokenExpiry = null;

async function loginShiprocket() {
  const res = await axios.post("https://apiv2.shiprocket.in/v1/external/auth/login", {
    email: SHIPROCKET_EMAIL,
    password: SHIPROCKET_PASSWORD
  });
  tokenCache = res.data.token;
  tokenExpiry = Date.now() + 9 * 24 * 60 * 60 * 1000; // 9 days for safety
  return tokenCache;
}

async function getToken() {
  if (!tokenCache || Date.now() > tokenExpiry) {
    return await loginShiprocket();
  }
  return tokenCache;
}

async function createOrder(order) {
  const token = await getToken();

  const res = await axios.post(
    "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
    order,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

async function generateLabel(shipmentId) {
  const token = await getToken();

  const res = await axios.post(
    "https://apiv2.shiprocket.in/v1/external/courier/generate/label",
    { shipment_id: [shipmentId] },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

async function trackOrder(awbCode) {
  const token = await getToken();

  const res = await axios.get(
    `https://apiv2.shiprocket.in/v1/external/courier/track/awb/${awbCode}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

module.exports = { createOrder, generateLabel, trackOrder };