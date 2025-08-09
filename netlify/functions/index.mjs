import { getCards } from "../../controllers/getCards.js";
import { config } from "dotenv";

config();

export default async (req, context) => {
  const data = await getCards();

  //   console.log({ data });
  return new Response(JSON.stringify(data), {
    headers: {
      "Access-Control-Allow-Origin": "https://cards-game-999.netlify.app",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json",
    },
  });
};

/*
import express, { Router } from "express";
import serverless from "serverless-http";

const router = Router();

const api = express();
api.get("/cards", getCards);
router.get("/hello", (req, res) => res.send("Hello World!"));

// Export the app wrapped in serverless-http for Netlify
export const handler = serverless(api);
*/
