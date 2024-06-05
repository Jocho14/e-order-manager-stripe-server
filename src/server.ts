const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

const {
  createCheckoutSession,
  getSessionStatus,
  getTestLog,
} = require("./session");

app.post("/create-checkout-session", createCheckoutSession);
app.get("/session-status", getSessionStatus);
app.get("/test-log", getTestLog);

const PORT = 8080;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
