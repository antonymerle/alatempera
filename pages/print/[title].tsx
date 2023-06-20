import React from "react";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import Print from "@/models/print";
import { ICartItem, useStateContext } from "@/context/StateContext";
import Image from "next/image";
import dbConnect from "@/models/connection";
import style from "../../styles/WorkSlug.module.css";
import Quantity from "@/components/Quantity";
import ArrowBack from "@/components/ArrowBack";
import { getQtyOfSameItemInCart } from "../../components/Quantity";
import useTranslation from "next-translate/useTranslation";

const {
  container,
  imgContainer,
  detailsContainer,
  btns,
  navContainer,
  arrowBackContainer,
  landscapeImgContainer,
  landscapeDetailsContainer,
  classicContainer,
} = style;

const PrintDetails: React.FC<{ print: ICartItem }> = ({ print }) => {
  console.log({ print });
  const { onAdd, qty, setQty, setShowCart, cartItems } = useStateContext();
  const { t, lang } = useTranslation("work");

  const handleBuyNow = () => {
    console.log({ qty });
    console.log({ print });

    onAdd(print, qty);
    setQty(1);
    // setShowCart(true);
  };

  return (
    <div className={navContainer}>
      <div className={arrowBackContainer}>
        <ArrowBack />
      </div>
      <div className={container}>
        <div
          className={`${imgContainer} ${
            print.format === "landscape"
              ? landscapeImgContainer
              : classicContainer
          }`}
        >
          <Image
            alt="test"
            fill={true}
            objectFit="scale-down"
            src={print.imgURL[0]}
          />
        </div>
        <div
          className={`${detailsContainer} ${
            print.format === "landscape"
              ? landscapeDetailsContainer
              : classicContainer
          }`}
        >
          <h2>{print.title}</h2>
          <h3>{print.priceTTC.toFixed(2)}€</h3>
          <p>{lang === "en" ? print.description_en : print.description_fr}</p>
          {getQtyOfSameItemInCart(cartItems, print) >= print.inventory ? (
            <p>{t("soldOut")}</p>
          ) : (
            <div className={btns}>
              <Quantity context="slug" work={print} />
              <button
                onClick={handleBuyNow}
                disabled={
                  getQtyOfSameItemInCart(cartItems, print) + qty >
                  print.inventory
                }
              >
                {t("addToCart")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrintDetails;

export const getStaticPaths: GetStaticPaths = async () => {
  await dbConnect();

  const data = await Print.find({});

  const prints: Array<ICartItem> = JSON.parse(JSON.stringify(data));

  const paths = prints.map((print) => {
    return {
      params: {
        title: print.title,
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

  const data = await Print.find({ title: params!.title });
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
