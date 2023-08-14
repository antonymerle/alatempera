import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  // TODO harden route

  if (session) {
    if (req.method === "POST") {
      const { values } = req.body;

      const consolidatedContent = "# " + values.title + "\n" + values.content;
      const newPostContent = matter.stringify(consolidatedContent, {
        title: values.title,
        description: values.description,
        previewImage: values.previewImage,
        timestamp: Date.now(),
      });

      try {
        const pictureFilename = values.previewImage.split("/blogPictures/")[1];
        const publicFolderPath = path.join(process.cwd(), "public");
        const blogImgFolderPath = path.join(publicFolderPath, "blogPictures");
        const tmpImageFolderPath = path.join(
          publicFolderPath,
          "blogPictures",
          "tmp"
        );
        const tmpImagePath = path.join(tmpImageFolderPath, pictureFilename);
        const imagePath = path.join(blogImgFolderPath, pictureFilename);

        fs.renameSync(tmpImagePath, imagePath);

        const blogPostsFolderPath = path.join(process.cwd(), "_posts");
        const newPostTitle = values.title.toLowerCase() + ".mdx";
        const newBlogPostPath = path.join(blogPostsFolderPath, newPostTitle);

        fs.writeFileSync(newBlogPostPath, newPostContent, {
          encoding: "utf-8",
          flag: "w",
        });
        res.status(200).json({
          success: true,
          msg: `${newPostTitle} successfully created.`,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: error });
      }
    }
  } else {
    res.status(403).send({
      error: "You must be signed in to use this API.",
    });
  }
}
