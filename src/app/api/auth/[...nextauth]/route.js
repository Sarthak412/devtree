import NextAuth from "next-auth";

import clientPromise from "@/libs/mongoClient";

import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const gitHubClientId = process.env.GITHUB_CLIENT_ID;
const gitHubClientSecret = process.env.GITHUB_CLIENT_SECRET;

export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
    GitHubProvider({
      clientId: gitHubClientId,
      clientSecret: gitHubClientSecret,
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
