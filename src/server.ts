const express = require("express");
const app = express();
const cors = require("cors");
const { createCheckoutSession, getSessionStatus } = require("./session");

app.use(express.static("public"));
app.use(cors());

app.post("/create-checkout-session", createCheckoutSession);
app.get("/session-status", getSessionStatus);

const PORT = 4242;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
