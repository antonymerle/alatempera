import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { NextApiRequest, NextApiResponse } from "next";

// TODO : protect ROUTE

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { postPath, values, previousImgPath } = req.body;
    const newPostContent = matter.stringify(values.content, {
      title: values.title,
      description: values.description,
      previewImage: values.previewImage,
      timestamp: values.timestamp,
    });

    try {
      const filename = values.previewImage.split("/blogPictures/")[1];
      const oldfilename = previousImgPath.split("/blogPictures/")[1];
      console.log({ filename });
      const publicFolderPath = path.join(process.cwd(), "public");
      const imageFolderPath = path.join(publicFolderPath, "blogPictures");
      const tmpImageFolderPath = path.join(
        publicFolderPath,
        "blogPictures",
        "tmp"
      );
      const tmpImagePath = path.join(tmpImageFolderPath, filename);
      const imagePath = path.join(imageFolderPath, filename);
      const oldImagePath = path.join(imageFolderPath, oldfilename);

      // remove previous blog post image (if it exists) before saving the new one
      if (previousImgPath) fs.unlinkSync(oldImagePath);
      fs.renameSync(tmpImagePath, imagePath);

      fs.writeFileSync(postPath, newPostContent, {
        encoding: "utf-8",
        flag: "w",
      });
      res
        .status(200)
        .json({ success: true, msg: `${values.title} successfully edited.` });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: error });
    }
  }
}
