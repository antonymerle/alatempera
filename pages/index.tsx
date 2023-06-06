import Head from "next/head";
import React from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Card from "@/components/Card";
import dbConnect from "@/models/connection";
import Work from "@/models/works";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import Link from "next/link";
import { ICartItem } from "@/context/StateContext";

const inter = Inter({ subsets: ["latin"] });

const { main, gallery, opus, imgContainer, opusDescription } = styles;

export const Home: React.FC<{ works: ICartItem[] }> = ({ works }) => {
  // let tiles: Array<JSX.Element> = [];
  // for (let i = 0; i < 21; i++) {
  //   tiles.push(<Card />);
  // }

  const tiles: Array<JSX.Element> = works.map((work, i) => {
    return (
      <Link href={"/work/" + work.title} key={i}>
        <Card {...work} />
      </Link>
    );
  });

  console.log(works);

  return (
    <>
      <Head>
        <title>A la tempera</title>
        <meta name="Art gallery" content="Paintings on wood a la tempera" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={main}>
        <section className={gallery}>
          {tiles}
          {/* <div className={opus}>
            <div className={imgContainer}>
              <Image
                alt="francis"
                fill={true}
                objectFit="cover"
                src="/francis-stigmata.jpg"
              />
            </div>
            <div className={opusDescription}>
              <p>City in the sky</p>
              <p>330€</p>
            </div>
          </div> */}
        </section>
        {/* <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>pages/index.tsx</code>
          </p>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </div>

        <div className={styles.grid}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Docs <span>-&gt;</span>
            </h2>
            <p>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Learn <span>-&gt;</span>
            </h2>
            <p>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Templates <span>-&gt;</span>
            </h2>
            <p>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Deploy <span>-&gt;</span>
            </h2>
            <p>
              Instantly deploy your Next.js site to a shareable URL
              with&nbsp;Vercel.
            </p>
          </a>
        </div> */}
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  await dbConnect();

  const data = await Work.find({});

  const works = JSON.parse(JSON.stringify(data));

  return {
    props: {
      works,
    },
  };
};

export default Home;
