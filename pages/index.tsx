import Head from "next/head";
import React from "react";
import dbConnect from "@/models/connection";
import Work from "@/models/works";
import { GetServerSideProps } from "next";
import { ICartItem } from "@/context/StateContext";
import Cards from "@/components/Cards";
import styles from "@/styles/Home.module.css";

const { galleryContainer } = styles;

export const Home: React.FC<{ works: ICartItem[] }> = ({ works }) => {
  return (
    <>
      <Head>
        <title>A la tempera</title>
        <meta name="Art gallery" content="Paintings on wood a la tempera" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={galleryContainer}>
        <Cards products={works} />
      </div>
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
