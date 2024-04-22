import type { Config } from "drizzle-kit";

export default {
    schema: "app/db/schemas/*.ts",
    out: "app/db/drizzle",
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.POSTGRES_URL!,
    },
} satisfies Config;