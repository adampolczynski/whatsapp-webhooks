import express, { Router } from "express";
import serverless from "serverless-http";
import { webhookGet, webhookPost } from "../lib/webhooks";

const api = express();
api.use(express.json());

api.use((req, res, next) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    try {
      req.body = JSON.parse(data); // Manually parse to JSON
    } catch (e) {
      req.body = data; // fallback
    }
    next();
  });
});

const router = Router();
router.post("/webhook", webhookPost);
router.get("/webhook", webhookGet);

api.use("/api/", router);

export const handler = serverless(api);
