import { NextFunction } from "express";

const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.static("public"));

app.use((req: any, res: any, next: any) => {
  res.header("Access-Control-Allow-Origin", "*"); // allows requests from all origins
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

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
