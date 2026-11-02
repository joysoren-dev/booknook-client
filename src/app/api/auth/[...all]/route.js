import { betterAuth } from 'better-auth';
import { toNextJsHandler } from 'better-auth/next-js';

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});

export const { GET, POST } = toNextJsHandler(auth);