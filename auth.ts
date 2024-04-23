import NextAuth, { NextAuthConfig } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import TwitterProvider from "next-auth/providers/twitter";
import GoogleProvider from "next-auth/providers/google";
import { db } from "./app/db/db"
import { DrizzleAdapter } from "@auth/drizzle-adapter"

export const authConfig = {
    adapter: DrizzleAdapter(db),
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_AUTH_CLIENT_ID,
            clientSecret: process.env.GITHUB_AUTH_CLIENT_ID
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_AUTH_CLIENT_ID,
            clientSecret: process.env.TWITTER_AUTH_CLIENT_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
        }),
    ]
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)