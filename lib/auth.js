import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { MongoClient } from "mongodb";
import { passwordMessage } from "./password";
import { validateEmail, validateName } from "./validation";

// Trim every value: a stray space or newline pasted into Vercel breaks OAuth logins
const env = (key) => (process.env[key] || "").trim();

const appUrl = (env("BETTER_AUTH_URL") || "http://localhost:3000").replace(/\/$/, "");

// Reuse the Mongo client between hot reloads and serverless invocations
const client =
  globalThis.__hateyhatMongo ||
  new MongoClient(env("MONGODB_URI") || "mongodb://127.0.0.1:27017");
globalThis.__hateyhatMongo = client;

const db = client.db(env("DB_NAME") || "hateyhat");

const socialProviders = {};
if (env("GOOGLE_CLIENT_ID") && env("GOOGLE_CLIENT_SECRET")) {
  socialProviders.google = {
    clientId: env("GOOGLE_CLIENT_ID"),
    clientSecret: env("GOOGLE_CLIENT_SECRET"),
    prompt: "select_account",
  };
}
if (env("GITHUB_CLIENT_ID") && env("GITHUB_CLIENT_SECRET")) {
  socialProviders.github = {
    clientId: env("GITHUB_CLIENT_ID"),
    clientSecret: env("GITHUB_CLIENT_SECRET"),
  };
}

export const auth = betterAuth({
  baseURL: appUrl,
  secret: env("BETTER_AUTH_SECRET"),
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: true,
  },
  socialProviders,
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  hooks: {
    // Enforce the password rule on the server too, not only in the form
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        const message =
          validateName(ctx.body?.name) || validateEmail(ctx.body?.email) || passwordMessage(ctx.body?.password);
        if (message) {
          throw new APIError("BAD_REQUEST", { message });
        }
      }
      if (ctx.path === "/update-user" && ctx.body?.name !== undefined) {
        const message = validateName(ctx.body.name);
        if (message) {
          throw new APIError("BAD_REQUEST", { message });
        }
      }
    }),
  },
  plugins: [
    // Signs short-lived JWTs that the Express API verifies through /api/auth/jwks
    jwt({
      jwt: {
        issuer: appUrl,
        audience: appUrl,
        expirationTime: "1h",
        definePayload: ({ user }) => ({
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        }),
      },
    }),
    nextCookies(),
  ],
});
