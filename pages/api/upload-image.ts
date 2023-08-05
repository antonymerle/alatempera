import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

// TODO : protect ROUTE

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { filename, dataUrl } = req.body;
    const publicFolderPath = path.join(process.cwd(), "public");
    const imageFolderPath = path.join(publicFolderPath, "blogPictures");
    const imagePath = path.join(imageFolderPath, filename);

    // Create the 'blogPictures' folder if it doesn't exist
    if (!fs.existsSync(imageFolderPath)) {
      fs.mkdirSync(imageFolderPath);
    }

    // Save the image file in the 'blogPictures' folder
    fs.writeFileSync(
      imagePath,
      dataUrl.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
      "base64"
    );

    // Respond with the public URL of the uploaded image
    const publicUrl = `/blogPictures/${filename}`;
    res.status(200).json({ publicUrl });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
