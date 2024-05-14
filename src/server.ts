import { NextFunction } from "express";

const express = require("express");
const app = express();
const cors = require("cors");
const {
  createCheckoutSession,
  getSessionStatus,
  getTestLog,
} = require("./session");

app.use(cors({ origin: "*" }));
app.use(express.static("public"));

//app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"] }));

app.post("/create-checkout-session", createCheckoutSession);
app.get("/session-status", getSessionStatus);
app.get("/test-log", getTestLog);

const PORT = 8080;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
