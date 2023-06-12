import React from "react";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import Print from "@/models/print";
import { ICartItem, useStateContext } from "@/context/StateContext";
import Image from "next/image";
import dbConnect from "@/models/connection";
import style from "../../styles/WorkSlug.module.css";
import Quantity from "@/components/Quantity";
import { getQtyOfSameItemInCart } from "../../components/Quantity";

const { container, imgContainer, detailsContainer } = style;

const PrintDetails: React.FC<{ print: ICartItem }> = ({ print }) => {
  console.log({ print });
  const { onAdd, qty, setQty, setShowCart, cartItems } = useStateContext();

  const handleBuyNow = () => {
    console.log({ qty });
    console.log({ print });

    onAdd(print, qty);
    setQty(1);
    // setShowCart(true);
  };

  return (
    <div className={container}>
      <div className={imgContainer}>
        <Image alt="test" fill={true} objectFit="cover" src={print.imgURL[0]} />
      </div>
      <div className={detailsContainer}>
        <h2>{print.title}</h2>
        <h3>{print.priceHT + print.priceTTC}</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
          dignissimos delectus, omnis velit expedita laborum eaque neque quaerat
          deleniti vero consectetur deserunt tempora corrupti dolorem cumque
          maxime voluptate dolores et quo quasi ullam labore adipisci! Quidem
          quo incidunt tempora optio obcaecati nemo, fugit cumque amet quasi
          aperiam molestiae sint accusantium modi atque rerum quod? Corporis
          minus aperiam amet eligendi aliquam quae rem cum! Non inventore harum
          earum architecto iusto quasi, culpa eum magni nisi eos reiciendis,
          perspiciatis officiis, voluptate sequi ut. Dolore reprehenderit sed
          praesentium illo delectus qui voluptas aliquam, adipisci blanditiis
          dolorem aperiam laudantium sint dolorum asperiores porro esse modi
          debitis, obcaecati odit, enim laboriosam. Exercitationem voluptatem
          rerum, quam, sint ab maxime eos cupiditate non dolores perferendis
          excepturi atque maiores.
        </p>
        {getQtyOfSameItemInCart(cartItems, print) >= print.inventory ? (
          <p>Quantité maximale atteinte</p>
        ) : (
          <>
            <Quantity context="slug" work={print} />
            <button
              onClick={handleBuyNow}
              disabled={
                getQtyOfSameItemInCart(cartItems, print) + qty > print.inventory
              }
            >
              Ajouter au panier
            </button>
          </>
        )}
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
