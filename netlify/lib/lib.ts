import axios from "axios";
import { randomUUID } from "crypto";

const { GRAPH_API_TOKEN } = process.env;

const BASE_GRAPH_API_URL = "https://graph.facebook.com";
const GRAPH_API_VERSION = "v23.0";

const URL = `${BASE_GRAPH_API_URL}/${GRAPH_API_VERSION}`;

export const findUserByPhoneNumber = async (phone: string) => {
  // Simulated database lookup
  const fakeDB = [
    { name: "John", phone: "14155552671" },
    { name: "Jane", phone: "14155550000" },
    { name: "AdamPe", phone: "48786189122" },
  ];

  return fakeDB.find((user) => user.phone === phone);
};

export const sendMessage = async (
  to: string,
  message: string,
  businessPhoneNumberId: string,
  originalMessageId: string,
  flow?: any
) => {
  await axios({
    method: "POST",
    url: `${URL}/${businessPhoneNumberId}/messages`,
    headers: {
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
    },
    data: {
      messaging_product: "whatsapp",
      to,
      text: message,
      context: {
        message_id: originalMessageId,
      },
      ...(flow ?? {}),
    },
  });
};

export const readMessage = async (
  businessPhoneNumberId: string,
  originalMessageId: string
) => {
  await axios({
    method: "POST",
    url: `${URL}/${businessPhoneNumberId}/messages`,
    headers: {
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
    },
    data: {
      messaging_product: "whatsapp",
      status: "read",
      message_id: originalMessageId,
    },
  });
};
