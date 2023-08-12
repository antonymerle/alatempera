import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

// TODO : protect ROUTE

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { filename, dataUrl } = req.body;
    const publicFolderPath = path.join(process.cwd(), "public");
    const tmpImageFolderPath = path.join(
      publicFolderPath,
      "blogPictures",
      "tmp"
    );
    const imagePath = path.join(tmpImageFolderPath, filename);

    // Create the tmp folder in 'blogPictures' if it doesn't exist
    if (!fs.existsSync(tmpImageFolderPath)) {
      fs.mkdirSync(tmpImageFolderPath);
    }

    // clean all remaining tmp images before saving a new one
    const tmpFiles = fs.readdirSync(tmpImageFolderPath);
    tmpFiles.forEach((file) => {
      const filePath = path.join(tmpImageFolderPath, file);
      fs.unlinkSync(filePath);
    });

    // Save the image file in the 'blogPictures' folder
    fs.writeFileSync(
      imagePath,
      dataUrl.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
      "base64"
    );

    // save image to tmp folder until form is validated
    const publicUrl = `/blogPictures/tmp/${filename}`;
    // const publicUrl = imagePath;
    res.status(200).json({ publicUrl });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "6mb", // https://nextjs.org/docs/pages/building-your-application/routing/api-routes#custom-config
    },
  },
};
