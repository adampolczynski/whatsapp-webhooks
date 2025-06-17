import { randomUUID } from "crypto";
import { logoBase64 } from "./logo";

export const signUpFlow = (mode: "sign_up" | "sign_in") => ({
  type: "interactive",
  interactive: {
    type: "flow",
    header: {
      type: "image",
      image: {
        link: "https://scontent.fpoz3-1.fna.fbcdn.net/v/t39.30808-6/295057881_548111403567075_6430731063966312323_n.png?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=VarMZ7FZREYQ7kNvwF9OM5I&_nc_oc=Adk1QVl5B2gO-Nwv9UIBr7LLGHo_AL4u5Mo_yYc5E7UebHI_2t8tCSbzrJCCI0RxlIY&_nc_zt=23&_nc_ht=scontent.fpoz3-1.fna&_nc_gid=tRzZgMWo0k8DnnGOrfIMLw&oh=00_AfM0L3hbFZIOcm2rKHuW7ateP2fJsWuyNTOwiTku3rW0ug&oe=6857084E",
      },
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
