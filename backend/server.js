import express from "express";
import { config } from "dotenv";

config();

const app = express();

app.get("/", (req, res) => {
  res.send("hello there");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listenning on port ${port}`);
});
