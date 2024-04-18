import {
    pgTable,
    serial,
    text,
} from 'drizzle-orm/pg-core'
import { InferSelectModel, InferInsertModel } from 'drizzle-orm'
import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'

export const TestTable = pgTable(
    'test',
    {
        id: serial('id').primaryKey(),
        name: text('name').notNull(),
    }
)

export type Test = InferSelectModel<typeof TestTable>
export type NewTest = InferInsertModel<typeof TestTable>

// Connect to Vercel Postgres
export const db = drizzle(sql)