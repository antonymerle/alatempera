import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { NextApiRequest, NextApiResponse } from "next";

// TODO : protect ROUTE

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { postPath, values } = req.body;
    const newPostContent = matter.stringify(values.content, {
      title: values.title,
      description: values.description,
      previewImage: values.previewImage,
      timestamp: values.timestamp,
    });

    try {
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
