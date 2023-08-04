import { useEffect } from "react";
import Editor from "@/components/Editor";
import Router, { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import fs from "node:fs";
import path from "node:path";
import { GetStaticPaths, GetStaticProps } from "next";
import { InferGetStaticPropsType } from "next";

const EditorPage = ({
  postContent,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: session } = useSession();
  const { pathname: currentPathname } = useRouter();

  useEffect(() => {
    if (!session)
      setTimeout(() => {
        Router.push("/");
      }, 2000);
  });

  if (session)
    return (
      <div>
        {currentPathname}
        <textarea>{postContent}</textarea>
      </div>
    );
  else {
    return (
      <div>
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
  console.log({ paths });

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postFile = fs.readFileSync(`_posts/${params!.slug}.mdx`);

  return {
    props: {
      postContent: postFile.toString("utf-8"),
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
