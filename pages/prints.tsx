import Head from "next/head";
import React from "react";
import Card from "@/components/Card";
import dbConnect from "@/models/connection";
import Print from "@/models/print";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { ICartItem } from "@/context/StateContext";
import Cards from "@/components/Cards";
import styles from "@/styles/Home.module.css";

const { galleryContainer, gallery } = styles;

const prints: React.FC<{ prints: ICartItem[] }> = ({ prints }) => {
  return (
    <>
      <Head>
        <title>A la tempera</title>
        <meta name="Art gallery" content="Paintings on wood a la tempera" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={galleryContainer}>
        <Cards products={prints} />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  await dbConnect();

  const data = await Print.find({});

  const prints = JSON.parse(JSON.stringify(data));

  return {
    props: {
      prints,
    },
  };
};

export default prints;
