import express from "express";
import { config } from "dotenv";
import { getCards } from "./controllers/getCards.js";
import serverless from "serverless-http";

config();

const api = express();
api.get("/cards", getCards);

const port = process.env.PORT || 5000;

// For local development
if (process.env.NODE_ENV === "development") {
  api.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

// Export the app wrapped in serverless-http for Netlify
export const handler = serverless(api);

api.listen(port, async () => {
  console.log(`Listenning on port ${port}`);
});
