import React from "react";
import { InferGetStaticPropsType } from "next";
import { GetStaticProps } from "next";

import fs from "fs";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import { PostPreview } from "@/types/types";
import style from "../styles/blog.module.css";
import BlogPostPreview from "@/components/blog/mdx/BlogPostPreview";

const { title, postPreviewsContainer } = style;

const blog: React.FC<{ postPreviews: PostPreview[] }> = ({ postPreviews }) => {
  return (
    <div>
      <h2 className={title}>Blog</h2>
      <div className={postPreviewsContainer}>
        {postPreviews
          .sort((a, b) => b.timestamp - a.timestamp)
          .map((postPreview, i) => {
            return (
              <div key={i}>
                <BlogPostPreview postPreview={postPreview} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // get all MDX files
  const postFilePaths = fs
    .readdirSync("_posts")
    .filter(
      (postFilePath) => path.extname(postFilePath).toLowerCase() === ".mdx"
    );

  let postPreviews: PostPreview[] = [];

  // read frontmatter for each blog post

  for (const postFilePath of postFilePaths) {
    const postFile = fs.readFileSync(`_posts/${postFilePath}`, "utf-8");

    // serialize the MDX content into JSX
    // and parse the frontmatter
    const serializedPost = await serialize(postFile, {
      parseFrontmatter: true,
    });

    postPreviews.push({
      ...serializedPost?.frontmatter,
      // add the slug to the frontmatter data
      slug: `/blog/${postFilePath.replace(".mdx", "")}`,
    } as PostPreview);
  }

  return {
    props: {
      postPreviews,
    },
    // enable ISR
    revalidate: 60,
  };
};

export default blog;
