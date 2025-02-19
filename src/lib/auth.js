import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client } from "./mongodb";

export const auth = betterAuth({
  user: {
    additionalFields: {
      dogs: { type: "string[]", defaultValue: [] },
      phone: { type: "string", defaultValue: "" },
      location: { type: "string", defaultValue: "" },
      bio: { type: "string", defaultValue: "" },
    },
  },
  database: mongodbAdapter(client),
  emailAndPassword: { enabled: true },
});
