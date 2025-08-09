import express from "express";
import { config } from "dotenv";
import { getCards } from "./controllers/getCards.js";

config();

const app = express();

app.get("/", getCards);

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  console.log(`Listenning on port ${port}`);
});
