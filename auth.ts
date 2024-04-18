import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import vercelPostgresAdapter from "./app/lib/postgresAdapter";

export const { handlers, auth } = NextAuth({
    debug: true,
    secret: process.env.AUTH_SECRET,
    adapter: vercelPostgresAdapter(),
    providers: [
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID as string,
            clientSecret: process.env.AUTH_GITHUB_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
})