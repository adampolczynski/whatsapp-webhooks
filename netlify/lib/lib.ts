import axios from "axios";

const { GRAPH_API_TOKEN } = process.env;

export const findUserByPhoneNumber = async (phone: string) => {
  // Simulated database lookup
  const fakeDB = [
    { name: "John", phone: "14155552671" },
    { name: "Jane", phone: "14155550000" },
    { name: "AdamPe", phone: "48786189122" },
  ];

  return fakeDB.find((user) => user.phone === phone);
};

export const sendWhatsAppMessage = async (
  to: string,
  message: string,
  business_phone_number_id: string
) => {
  // Implement your logic to send a WhatsApp message
  // This could involve calling the WhatsApp Business API or another service
  console.log(`Sending message to ${to}: ${message}`);

  const url = `https://graph.facebook.com/v18.0/${business_phone_number_id}/messages`;

  const headers = {
    Authorization: `Bearer ${GRAPH_API_TOKEN}`,
    "Content-Type": "application/json",
  };

  const data = {
    messaging_product: "whatsapp",
    to: to,
    type: "text",
    text: {
      body: message,
    },
  };

  axios
    .post(url, data, { headers })
    .then((response) => {
      console.log("Message sent successfully:", response.data);
    })
    .catch((error) => {
      console.error(
        "Error sending message:",
        error.response ? error.response.data : error.message
      );
    });
};
