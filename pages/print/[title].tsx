import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Print from "@/models/print";
import { ICartItem } from "@/context/StateContext";
import dbConnect from "@/models/connection";
import Product from "@/components/Product";

const PrintDetails: React.FC<{ print: ICartItem }> = ({ print }) => {
  return <Product product={print} />;
};

export default PrintDetails;

export const getStaticPaths: GetStaticPaths = async () => {
  await dbConnect();

  const data = await Print.find({});

  const prints: Array<ICartItem> = JSON.parse(JSON.stringify(data));

  const paths = prints.map((print) => {
    return {
      params: {
        title: print.title_fr, // TODO : language switch
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

  const data = await Print.find({ title_fr: params!.title });
  console.log({ data });

  const print = JSON.parse(JSON.stringify(data))[0];

  if (!print) {
    return {
      notFound: true, // redirects to 404 page
    };
  }

  return {
    props: {
      print,
    },
  };
};
