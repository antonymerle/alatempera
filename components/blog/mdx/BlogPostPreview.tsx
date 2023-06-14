import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PostPreview } from "@/types/posts";
import style from "../../../styles/BlogPostPreview.module.css";

const { postContainer, postContents, postTitle, postDescription, postImage } =
  style;

const BlogPostPreview = ({ postPreview }: { postPreview: PostPreview }) => {
  return (
    <div
      className={postContainer}
      style={{ backgroundImage: `url(${postPreview.previewImage})` }}
    >
      {/* <Image
        src={postPreview.previewImage}
        fill={true}
        objectFit="cover"
        className={postImage}
        alt={postPreview.title}
      /> */}
      <Link href={postPreview.slug}>
        <div className={postContents}>
          <h2 className={postTitle}>
            <span>{postPreview.title}</span>
          </h2>
          <p className={postDescription}>
            <span>{postPreview.description}</span>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default BlogPostPreview;
