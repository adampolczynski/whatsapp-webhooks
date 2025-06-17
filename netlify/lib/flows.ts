import { randomUUID } from "crypto";

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
      text: "Send money to your loved ones in minutes!",
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
        },
      },
    },
  },
});

export const dropdownFlow = () => ({
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
      text: `Pick to continue`,
    },
    footer: {
      text: "Send money to your loved ones in minutes!",
    },
    action: {
      name: "flow",
      parameters: {
        flow_message_version: "3",
        flow_token: randomUUID(),
        flow_id: "1828442997756651",
        flow_cta: "Pick",
        flow_action: "navigate", // navigate | data_exchange
        flow_action_payload: {
          screen: "PICK",
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

async function buildFlowWithDynamicOptions() {
  // Step 1: Fetch options from your API
  // const response = await axios.get("https://yourapi.com/items");
  // const items = response.data; // assume array of { id, name }

  // // Step 2: Map items to WhatsApp Flow option format
  // const options = items.map((item, index) => ({
  //   ref: `option_${index + 1}`,
  //   title: item.name,
  // }));

  // Step 3: Build flow JSON
  const flowJson = {
    name: "dynamic_options_flow",
    description: "Select an item from the list",
    screens: [
      {
        ref: "screen_1",
        title: "Choose an Option",
        blocks: [
          {
            type: "question",
            ref: "dropdown_question",
            text: "Please select an option from the list below:",
            response_type: "selection",
            options: [
              {
                ref: "option_1",
                title: "Loading...",
              },
            ],
          },
        ],
      },
    ],
    version: "1.0",
  };

  return flowJson;
}
