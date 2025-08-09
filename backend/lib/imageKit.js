import { config } from "dotenv";
import fs from "fs";
import path from "path";
import ImageKit from "imagekit";

config();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL,
});

export const uploadImage = async (filePath, folder, options = {}) => {
  try {
    // Create folder if it does not exist
    await createFolder(folder);

    // Read file as base64
    const fileData = await fs.promises.readFile(filePath, {
      encoding: "base64",
    });

    // Extract filename from filePath if fileName is not provided
    const finalFileName = path.basename(filePath);

    const file = `data:image/png;base64,${fileData}`;

    const result = await imagekit.upload({
      file: file, // Required: Can be a URL, base64, or binary
      fileName: finalFileName, // Use extracted or provided filename
      folder,
      ...options, // Optional: Additional parameters like tags, transformations, etc.
    });

    return result;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

const createFolder = async (folderName, parentFolderPath = "/") => {
  try {
    // Check if folder already exists
    const folderPath = `${parentFolderPath}${folderName}/`;
    const existingFiles = await imagekit.listFiles({
      path: folderPath,
      limit: 1, // Only need to check if any files/folders exist
    });

    // If no files/folders exist at the path, create the folder
    if (existingFiles.length === 0) {
      await deleteFolder(folderName);
      await imagekit.createFolder({
        folderName: folderName,
        parentFolderPath: parentFolderPath,
      });

      console.log("Folder created");
    }
  } catch (error) {
    console.error("Error checking/creating folder:", error);
    throw error;
  }
};

export const deleteFolder = async (folder, parentFolderPath = "/") => {
  try {
    await imagekit.deleteFolder(`${parentFolderPath}${folder}`);
  } catch (error) {
    console.error("Error deleting folder: ", error);
  }
};
