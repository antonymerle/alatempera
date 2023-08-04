import { useState, useEffect } from "react";
import Editor from "@/components/Editor";
import Router, { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";
import { InferGetStaticPropsType } from "next";
import style from "../../../styles/Editorpage.module.css";

const { container, editor } = style;

type EditBlogPostFormProps = {
  title: string;
  description: string;
  previewImage: string;
  timestamp: number;
  content: string;
};

const EditorPage = ({
  data,
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(data);
  console.log(content);

  const [metadata, setMetadata] = useState(data);

  const [values, setValues] = useState<EditBlogPostFormProps>({
    title: data.title,
    description: data.description,
    previewImage: data.previewImage,
    timestamp: data.timestamp,
    content,
  });

  const { data: session } = useSession();
  const { pathname: currentPathname } = useRouter();

  useEffect(() => {
    if (!session)
      setTimeout(() => {
        Router.push("/");
      }, 2000);
  });

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
        body: JSON.stringify({ values }),
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
            />
          </div>
          <div>
            <label htmlFor="timestamp">Timestamp</label>
            <input
              type="number"
              id="timestamp"
              name="timestamp"
              value={values.timestamp}
              onChange={handleChange}
              required
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
  const postFile = fs.readFileSync(`_posts/${params!.slug}.mdx`);
  const { data, content } = matter(postFile);

  console.log({ data });
  console.log({ content });

  return {
    props: {
      // postContent: postFile.toString("utf-8"),
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
