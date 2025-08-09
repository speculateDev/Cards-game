import type { VercelRequest, VercelResponse } from "@vercel/node";
import { config } from "dotenv";
import { getCards } from "./controllers/getCards.js";

config();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const data = await getCards();
    return res.json({
      data,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error getting cards data",
    });
  }
}

/*
export default async function handler(req, res) {
  const data = await getCards();
  return res.status(200).json(data);
}
*/
/*
import express from "express";
import { getCards } from "./controllers/getCards.js";


export const app = express();


const port = process.env.PORT || 5000;

app.listen(port, async () => {
  console.log(`Listenning on port ${port}`);
});
*/
