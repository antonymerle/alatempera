import { useState } from "react";
import { PostPreview } from "@/types/types";
import BlogPostPreview from "@/components/blog/mdx/BlogPostPreview";
import style from "../../styles/Blog.module.css";

const {
  blogContainer,
  title,
  postPreviewsContainer,
  form,
  searchBox,
  titleContainer,
} = style;

const Blog: React.FC<{ postPreviews: PostPreview[] }> = ({ postPreviews }) => {
  const [search, setSearch] = useState("");

  const results: PostPreview[] =
    search.length > 1
      ? postPreviews?.filter(
          (postPreview) =>
            postPreview.title.toLowerCase().includes(search.toLowerCase()) ||
            postPreview.description.toLowerCase().includes(search.toLowerCase())
        )
      : postPreviews;

  return (
    <div className={blogContainer}>
      <div className={titleContainer}>
        <h2 className={title}>Blog</h2>
        <form className={form}>
          <input
            className={searchBox}
            placeholder="Rechercher dans les posts"
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        </form>
      </div>

      <div className={postPreviewsContainer}>
        {results
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

export default Blog;
