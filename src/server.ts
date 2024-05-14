const express = require("express");
const app = express();
const cors = require("cors");
const {
  createCheckoutSession,
  getSessionStatus,
  getTestLog,
} = require("./session");

app.use(express.static("public"));

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.post("/create-checkout-session", createCheckoutSession);
app.get("/session-status", getSessionStatus);
app.get("/test-log", getTestLog);

const PORT = 8080;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
