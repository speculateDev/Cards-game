import path from "path";
import fs from "fs";

import { sql } from "./lib/db.js";
import { uploadImage } from "./lib/imageKit.js";

// Get path of images folder
const assetsFolder = path.join(process.cwd(), "assets");

async function createTableDB() {
  try {
    // drop table
    await sql`DROP TABLE IF EXISTS cards`;
    await sql`CREATE TABLE cards (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      image VARCHAR(250) NOT NULL
    )`;
    console.log("Successfully created the table");
  } catch (error) {
    console.error("Faild to create the table: ", error);
    throw error;
  }
}

async function uploadAllImages() {
  try {
    await createTableDB();

    // Read all files in the assets folder
    const files = await fs.promises.readdir(assetsFolder);

    // Filter to keep only images
    const imageFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return [".png", ".jpg", ".jpeg", ".gif", ".webp"].includes(ext);
    });

    // Upload each image and populate cardsData
    for (const file of imageFiles) {
      const filePath = path.join(assetsFolder, file);
      const cardName = file.split(".").at(0);

      try {
        const result = await uploadImage(filePath, "cards");
        console.log(`Successfully uploaded ${file}:`);

        try {
          await sql`INSERT INTO cards (name, image) VALUES (${cardName.toLowerCase()}, ${
            result.url
          })`;
          console.log("Successfully inserted data into the 'cards' table.");
        } catch (error) {
          console.error(`Failed to insert into the DB: ${error}`);
        }
      } catch (error) {
        console.error(`Failed to upload ${file}:`, error.message);
      }
    }
  } catch (error) {
    console.error("Error reading assets folder:", error);
  }
}

uploadAllImages();
