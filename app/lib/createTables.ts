import { sql } from '@vercel/postgres'
import { db } from './drizzle'
import { TestTable, NewTest, Test } from './drizzle'

//const newTests: NewTest[] = [{ name: 'Guillermo Rauch' }, { name: 'Lee Robinson' }, { name: 'Steven Tey' }]

export async function seed() {

  // Create table with raw SQL
  await sql.query(`
        CREATE TABLE IF NOT EXISTS test (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL
        );
    `)
  console.log(`Created "test" table`)

  // const insertedTests: Test[] = await db
  //     .insert(TestTable)
  //     .values(newTests)
  //     .returning()
  // console.log(`Seeded ${insertedTests.length} users`)
}