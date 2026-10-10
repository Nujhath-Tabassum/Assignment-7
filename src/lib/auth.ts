import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoUrl = process.env.MONGO_DB_URL;

if (!mongoUrl) {
    throw new Error("MONGO_DB_URL is missing from your environment variables.");
}

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

const baseURL = process.env.BETTER_AUTH_URL;

if (!baseURL) {
    throw new Error("BETTER_AUTH_URL is missing from your environment variables.");
}

if (!googleClientId || !googleClientSecret) {
    console.warn(
        "Google OAuth credentials are missing. Google sign-in will not work."
    );
}

if (!githubClientId || !githubClientSecret) {
    console.warn(
        "GitHub OAuth credentials are missing. GitHub sign-in will not work."
    );
}

const client = new MongoClient(mongoUrl);
const db = client.db("bazar-dor");

export const auth = betterAuth({
    baseURL,

    emailAndPassword: {
        enabled: true,
    },

    socialProviders: {
        ...(googleClientId && googleClientSecret
            ? {
                  google: {
                      clientId: googleClientId,
                      clientSecret: googleClientSecret,
                  },
              }
            : {}),

        ...(githubClientId && githubClientSecret
            ? {
                  github: {
                      clientId: githubClientId,
                      clientSecret: githubClientSecret,
                  },
              }
            : {}),
    },

    account: {
        accountLinking: {
            enabled: true,
            trustedProviders: ["google", "github"],
        },
    },

    database: mongodbAdapter(db, {
        client,
    }),
});