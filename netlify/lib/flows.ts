import { randomUUID } from "crypto";
import { logoBase64 } from "./logo";

export const signUpFlow = (mode: "sign_up" | "sign_in") => ({
  type: "interactive",
  interactive: {
    type: "flow",
    header: {
      type: "image",
      src: logoBase64,
    },
    body: {
      text: `${mode === "sign_up" ? "Sign up" : "Login"} to continue`,
    },
    footer: {
      text: "Send money to your loved ones in minutes! Minit Money is an easy-to-use remittance app that makes sending money home easy, safe and affordable.",
    },
    action: {
      name: "flow",
      parameters: {
        flow_message_version: "3",
        flow_token: randomUUID(),
        flow_id: "1828442997756651",
        flow_cta: mode === "sign_up" ? "Sign Up" : "Login",
        flow_action: "navigate", // navigate | data_exchange
        flow_action_payload: {
          screen: mode === "sign_up" ? "SIGN_UP" : "SIGN_IN", // only with navigate
          data: {
            product_name: "name",
            product_description: "description",
            product_price: 100,
          },
        },
      },
    },
  },
});
