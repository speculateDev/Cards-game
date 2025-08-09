import { sql } from "../lib/db.js";

export async function getCards() {
  try {
    const data = await sql`SELECT * FROM cards`;
    return data;
  } catch (error) {
    console.error("error in getCards: ", error);
    // res.status(500).json({ error: "Internal server error" });
  }
}
