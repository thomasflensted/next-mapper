import 'dotenv/config';
import { migrate } from 'drizzle-orm/vercel-postgres/migrator'
import { db } from './db';

// This will run migrations on the database, skipping the ones already applied
async function main() {
    await migrate(db, { migrationsFolder: './drizzle' });
}

main();