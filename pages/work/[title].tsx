import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import dbConnect from "@/models/connection";
import { useState, useCallback } from "react";
import ImageViewer from "react-simple-image-viewer";
import Work from "@/models/works";
import { ICartItem, useStateContext } from "@/context/StateContext";
import Image from "next/image";
import Quantity from "@/components/Quantity";
import { getQtyOfSameItemInCart } from "../../components/Quantity";
import ArrowBack from "@/components/ArrowBack";
import useTranslation from "next-translate/useTranslation";
import Product from "@/components/Product";

const WorkDetails: React.FC<{ work: ICartItem }> = ({ work }) => {
  return <Product product={work} />;
};

export default WorkDetails;

export const getStaticPaths: GetStaticPaths = async () => {
  await dbConnect();

  const data = await Work.find({});

  const works: Array<ICartItem> = JSON.parse(JSON.stringify(data));

  const paths = works.map((work) => {
    return {
      params: {
        title: work.title,
      },
    };
  });

  console.log({ pathsExample: paths[0].params.title });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log({ params });

  await dbConnect();

  const data = await Work.find({ title: params!.title });
  console.log({ data });

  const work = JSON.parse(JSON.stringify(data))[0];

  if (!work) {
    return {
      notFound: true, // redirects to 404 page
    };
  }

  return {
    props: {
      work: work,
    },
  };
};
