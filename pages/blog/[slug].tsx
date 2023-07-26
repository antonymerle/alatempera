import fs from "fs";
import path from "path";
import { InferGetStaticPropsType } from "next";
import { GetStaticProps, GetStaticPaths } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Head from "next/head";
import H2 from "@/components/blog/mdx/H2";
import H3 from "@/components/blog/mdx/H3";
import HeroImage from "@/components/blog/mdx/HeroImage";
import P from "@/components/blog/mdx/P";
import ArrowBack from "@/components/ArrowBack";
import style from "../../styles/PostPage.module.css";

const { arrowBackContainer } = style;

export default function PostPage({
  source,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <Head>
        <title>{source.frontmatter.title as string}</title>
      </Head>
      <MDXRemote
        {...source}
        // specifying the custom MDX components
        components={{
          h1: H2,
          h2: H3,
          p: P,
          HeroImage,
        }}
      />
      <div className={arrowBackContainer}>
        <ArrowBack />
      </div>
    </div>
  );
}
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

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // retrieve the MDX blog post file associated
  // with the specified slug parameter
  const postFile = fs.readFileSync(`_posts/${params!.slug}.mdx`);

  // MDX content gets converted into JSX by the serialize() function
  // read the MDX serialized content along with the frontmatter
  // from the .mdx blog post file
  const mdxSource = await serialize(postFile, { parseFrontmatter: true });
  return {
    props: {
      source: mdxSource,
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
