import { useState, useEffect } from "react";
import ImageDropzone from "@/components/ImageDropzone";
import Router, { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";
import { InferGetStaticPropsType } from "next";
import style from "../../../styles/Editorpage.module.css";
import { url } from "node:inspector";

const { container, editor } = style;

type EditBlogPostFormProps = {
  title: string;
  description: string;
  previewImage: string;
  timestamp: number;
  content: string;
};

const EditorPage = ({
  postPath,
  data,
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // console.log(data);
  console.log(postPath);

  const [metadata, setMetadata] = useState(data);
  const [imageUrl, setImageUrl] = useState(null);

  const [values, setValues] = useState<EditBlogPostFormProps>({
    title: data.title,
    description: data.description,
    previewImage: data.previewImage,
    timestamp: data.timestamp,
    content,
  });

  const { data: session } = useSession();
  const { pathname: currentPathname } = useRouter();

  // ================= effects ====================

  useEffect(() => {
    if (!session)
      setTimeout(() => {
        Router.push("/");
      }, 2000);
  });

  // live edit the content w/ new image source
  useEffect(() => {
    if (imageUrl) {
      const lines = values.content.split("\n");

      let newContent: string = lines
        .map((line) =>
          line.includes(`src="${values.previewImage}"`)
            ? `  src="${imageUrl}"` // include two spaces for indentation
            : line
        )
        .join("\n");

      setValues({ ...values, previewImage: imageUrl, content: newContent });
    }
  }, [imageUrl]);

  // ================= handles ====================
  const handleFileUpload = (url: any) => {
    setImageUrl(url);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/admin/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postPath, values }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (session)
    return (
      <div className={container}>
        <h2>Editer un post</h2>
        <form onSubmit={handleSubmit} className={editor}>
          <div>
            <label htmlFor="title">Titre</label>
            <input
              type="text"
              id="title"
              name="title"
              value={values.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={values.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="previewImage">Image</label>
            <input
              type="text"
              id="previewImage"
              name="previewImage"
              value={values.previewImage}
              onChange={handleChange}
              required
              disabled={true}
            />
          </div>
          <div>Upload image</div>
          <ImageDropzone onFileUpload={handleFileUpload} />
          {imageUrl && (
            <img src={imageUrl} alt="Uploaded" style={{ width: "300px" }} />
          )}

          <div>
            <label htmlFor="timestamp">Timestamp</label>
            <input
              type="text"
              id="timestamp"
              name="timestamp"
              value={new Date(values.timestamp).toLocaleDateString()}
              onChange={handleChange}
              required
              disabled={true}
            />
          </div>
          <div>
            <label htmlFor="content">Contenu</label>
            <textarea
              id="content"
              name="content"
              value={values.content}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Sauvegarder</button>
        </form>
      </div>
    );
  else {
    return (
      <div className={container}>
        <h2>Unauthorized</h2>
        <p>Redirecting...</p>
      </div>
    );
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pathsEn = fs
    .readdirSync("_posts")
    .filter(
      (postFilePath) => path.extname(postFilePath).toLowerCase() === ".mdx"
    )
    .map((p) => {
      return {
        params: {
          slug: `${p.replace(".mdx", "")}`,
        },
        locale: "en",
      };
    });

  const pathsFr = fs
    .readdirSync("_posts")
    .filter(
      (postFilePath) => path.extname(postFilePath).toLowerCase() === ".mdx"
    )
    .map((p) => {
      return {
        params: {
          slug: `${p.replace(".mdx", "")}`,
        },
        locale: "fr",
      };
    });

  const paths = [...pathsEn, ...pathsFr];
  // console.log({ paths });

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postPath = `_posts/${params!.slug}.mdx`;
  const postFile = fs.readFileSync(postPath);
  const { data, content } = matter(postFile);

  return {
    props: {
      postPath,
      data,
      content,
    },
    /*
      Enable ISR
      Since blog posts are likely to be updated over time,
      we use the Incremental Static Regeneration (ISR) approach.
      That is enabled through the revalidate option and allows static pages
      to be incrementally updated without requiring a complete rebuild of the Next.js app.

    */
    revalidate: 60,
  };
};
export default EditorPage;
