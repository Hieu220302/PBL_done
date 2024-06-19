const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");
const bodyParser = require("body-parser");
const config = require("./config/config");
const crypto = require("crypto");

const port = process.env.PORT || 8888;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to my web server");
});

const usersRoutes = require("./src/routes/users.routes");
const groupServiceRoute = require("./src/routes/groupService.routes");
const inforServiceRoute = require("./src/routes/inforService.routes");
const orderServiceRoute = require("./src/routes/orderService.routes");
const servicePackageRoute = require("./src/routes/servicePackage.routes");
const staffRoutes = require("./src/routes/staff.routes");

app.post("/payment", async (req, res) => {
  let {
    accessKey,
    secretKey,
    orderInfo,
    partnerCode,
    redirectUrl,
    ipnUrl,
    requestType,
    extraData,
    orderGroupId,
    autoCapture,
    lang,
  } = config;
  var amount = req.body.amount;
  var orderId = partnerCode + new Date().getTime();
  var requestId = orderId;
  var rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    amount +
    "&extraData=" +
    extraData +
    "&ipnUrl=" +
    ipnUrl +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    requestType;
  //puts raw signature
  console.log("--------------------RAW SIGNATURE----------------");
  console.log(rawSignature);
  //signature
  const crypto = require("crypto");
  var signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");
  console.log("--------------------SIGNATURE----------------");
  console.log(signature);

  //json object send to MoMo endpoint
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    lang: lang,
    requestType: requestType,
    autoCapture: autoCapture,
    extraData: extraData,
    orderGroupId: orderGroupId,
    signature: signature,
  });
  //Create the HTTPS objects

  const options = {
    method: "POST",
    url: "https://test-payment.momo.vn/v2/gateway/api/create",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
    data: requestBody,
  };
  let result;
  try {
    result = await axios(options);
    return res.status(200).json(result.data);
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: "server error",
    });
  }
});

app.post("/callback", async (req, res) => {
  console.log("callback::");
  console.log(req.body);
  return res.status(200).json(req.body);
});

app.post("/check-status-transaction", async (req, res) => {
  const { orderId } = req.body;
  let { accessKey, secretKey } = config;
  const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;

  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  const requestBody = JSON.stringify({
    partnerCode: "MOMO",
    requestId: orderId,
    orderId: orderId,
    signature: signature,
    lang: "vi",
  });

  const options = {
    method: "POST",
    url: "https://test-payment.momo.vn/v2/gateway/api/query",
    headers: {
      "Content-Type": "application/json",
    },
    data: requestBody,
  };

  const result = await axios(options);

  return res.status(200).json(result.data);
});

app.use("/users", usersRoutes);
app.use("/groupService", groupServiceRoute);
app.use("/inforService", inforServiceRoute);
app.use("/orderService", orderServiceRoute);
app.use("/staff", staffRoutes);
app.use("/servicePackage", servicePackageRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
