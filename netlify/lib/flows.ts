import { randomUUID } from "crypto";

export const signUpFlow = {
  type: "interactive",
  interactive: {
    type: "flow",
    header: {
      type: "text",
      text: "SignUp header",
    },
    body: {
      text: "SignUp body",
    },
    footer: {
      text: "SignUp footer",
    },
    action: {
      name: "flow",
      parameters: {
        flow_message_version: "3",
        flow_token: randomUUID(),
        flow_id: "1828442997756651",
        flow_cta: "SignUp!",
        flow_action: "navigate", // navigate | data_exchange
        flow_action_payload: {
          screen: "SIGN_IN", // only with navigate
          data: {
            product_name: "name",
            product_description: "description",
            product_price: 100,
          },
        },
      },
    },
  },
};
