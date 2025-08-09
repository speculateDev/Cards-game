import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";

config();

export const sql = neon(process.env.DATABASE_URL);

/*
// Test the connection
export async function testConnection() {
  try {
    const result = await sql`SELECT 1`;
    console.log("Database connection test successful:", result);
  } catch (err) {
    console.error("Database connection test failed:", err);
  }
}
*/
