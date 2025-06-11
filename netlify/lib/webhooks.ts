import "dotenv/config";
import {
  findUserByPhoneNumber,
  sendMessage,
  readMessage,
  sendFlowMessage,
} from "./lib";
import { Request, Response } from "express";

const { WEBHOOK_VERIFY_TOKEN } = process.env;

export const webhookPost = async (req: Request, res: Response) => {
  console.log("Incoming webhook message:", JSON.stringify(req.body, null, 2));

  const message = req.body.entry?.[0]?.changes[0]?.value?.messages?.[0];

  if (message?.type === "text") {
    const businessPhoneNumberId =
      req.body.entry?.[0].changes?.[0].value?.metadata?.phone_number_id;

    // mark incoming message as read
    await readMessage(businessPhoneNumberId, message.id);

    const user = await findUserByPhoneNumber(message.from);

    if (user) {
      console.log("User found:", user);
      await sendMessage(
        message.from,
        `Hello ${user.name}! How can I assist you today?`,
        businessPhoneNumberId,
        message.id
      );

      await sendFlowMessage(message.from, businessPhoneNumberId);
      // TODO: Send message or start Flow
    } else {
      console.log("User not found");
      await sendMessage(
        message.from,
        `Hello! Seems like you don't have an account yet, do you want to create one?`,
        businessPhoneNumberId,
        message.id
      );
      // Optionally send a reply or trigger an onboarding flow
    }
  }

  res.sendStatus(200);
};

export const webhookGet = (req: Request, res: Response) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === WEBHOOK_VERIFY_TOKEN) {
    res.status(200).send(challenge);
    console.log("Webhook verified successfully!");
  } else {
    res.sendStatus(403);
  }
};
