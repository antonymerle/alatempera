import React from "react";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import Work from "@/models/works";
import { ICartItem, useStateContext } from "@/context/StateContext";
import Image from "next/image";
import dbConnect from "@/models/connection";
import style from "../../styles/WorkSlug.module.css";
import Quantity from "@/components/Quantity";
import { getQtyOfSameItemInCart } from "../../components/Quantity";
import ArrowBack from "@/components/ArrowBack";

const {
  container,
  imgContainer,
  detailsContainer,
  btns,
  navContainer,
  arrowBackContainer,
} = style;

const WorkDetails: React.FC<{ work: ICartItem }> = ({ work }) => {
  console.log({ work });
  const { onAdd, qty, setQty, setShowCart, cartItems } = useStateContext();

  const handleBuyNow = () => {
    console.log({ qty });
    console.log({ work });

    onAdd(work, qty);
    setQty(1);
    // setShowCart(true);
  };

  return (
    <div className={navContainer}>
      <div className={arrowBackContainer}>
        <ArrowBack />
      </div>

      <div className={container}>
        <div className={imgContainer}>
          <Image
            alt={work.title}
            // width={965}
            // height={950}
            fill={true}
            objectFit="cover"
            src={work.imgURL[0]}
          />
          {/* <img src={work.imgURL[0]}></img> */}
        </div>
        <div className={detailsContainer}>
          <h2>{work.title}</h2>
          <h3>{work.priceTTC}€</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
            dignissimos delectus, omnis velit expedita laborum eaque neque
            quaerat deleniti vero consectetur deserunt tempora corrupti dolorem
            cumque maxime voluptate dolores et quo quasi ullam labore adipisci!
            Quidem quo incidunt tempora optio obcaecati nemo, fugit cumque amet
            quasi aperiam molestiae sint accusantium modi atque rerum quod?
            Corporis minus aperiam amet eligendi aliquam quae rem cum! Non
            inventore harum earum architecto iusto quasi, culpa eum magni nisi
            eos reiciendis, perspiciatis officiis, voluptate sequi ut. Dolore
            reprehenderit sed praesentium illo delectus qui voluptas aliquam,
            adipisci blanditiis dolorem aperiam laudantium sint dolorum
            asperiores porro esse modi debitis, obcaecati odit, enim laboriosam.
            Exercitationem voluptatem rerum, quam, sint ab maxime eos cupiditate
            non dolores perferendis excepturi atque maiores.
          </p>
          {getQtyOfSameItemInCart(cartItems, work) >= work.inventory ? (
            <p>Quantité maximale atteinte</p>
          ) : (
            <div className={btns}>
              <Quantity context="slug" work={work} />
              <button
                onClick={handleBuyNow}
                disabled={
                  getQtyOfSameItemInCart(cartItems, work) + qty > work.inventory
                }
              >
                Ajouter au panier
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
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
