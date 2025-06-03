import express, { Router } from "express";
import serverless from "serverless-http";
import { webhookGet, webhookPost } from "../../webhooks";

const api = express();

const router = Router();
router.post("/webhook", webhookPost);
router.get("/webhook", webhookGet);

api.use("/api/", router);

export const handler = serverless(api);
