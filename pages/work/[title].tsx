import { useState, useCallback } from "react";
import ImageViewer from "react-simple-image-viewer";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import Work from "@/models/works";
import { ICartItem, useStateContext } from "@/context/StateContext";
import Image from "next/image";
import dbConnect from "@/models/connection";
import Quantity from "@/components/Quantity";
import { getQtyOfSameItemInCart } from "../../components/Quantity";
import ArrowBack from "@/components/ArrowBack";
import useTranslation from "next-translate/useTranslation";
import style from "../../styles/WorkSlug.module.css";

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

const WorkDetails: React.FC<{ work: ICartItem }> = ({ work }) => {
  console.log({ work });
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const { onAdd, qty, setQty, setShowCart, cartItems } = useStateContext();
  const { t, lang } = useTranslation("work");
  console.log({ lang });

  const handleBuyNow = () => {
    console.log({ qty });
    console.log({ work });

    onAdd(work, qty);
    setQty(1);
    // setShowCart(true);
  };

  const openImageViewer = useCallback(() => {
    // setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  return (
    <div className={navContainer}>
      <div className={arrowBackContainer}>
        <ArrowBack />
      </div>

      <div className={container}>
        {/* adapt the format of container for better use of screen real estate */}
        <div
          className={`${imgContainer} ${
            work.format === "landscape"
              ? landscapeImgContainer
              : classicContainer
          }`}
        >
          <Image
            alt={work.title}
            // width={965}
            // height={950}
            fill={true}
            objectFit="scale-down"
            src={work.imgURL[0]}
            onClick={() => openImageViewer()}
          />
          {isViewerOpen && (
            <ImageViewer
              src={[work.imgURL[1] ?? work.imgURL[0]]}
              // currentIndex={ currentImage }
              disableScroll={false}
              closeOnClickOutside={true}
              onClose={() => setIsViewerOpen(false)}
            />
          )}
          {/* <img src={work.imgURL[0]}></img> */}
        </div>
        <div
          className={`${detailsContainer} ${
            work.format === "landscape"
              ? landscapeDetailsContainer
              : classicContainer
          }`}
        >
          <h2>{work.title}</h2>
          <h3>{work.priceTTC.toFixed(2)}€</h3>
          <p>{lang === "en" ? work.description_en : work.description_fr}</p>
          {getQtyOfSameItemInCart(cartItems, work) >= work.inventory ? (
            <p>{t("soldOut")}</p>
          ) : (
            <div className={btns}>
              <Quantity context="slug" work={work} />
              <button
                onClick={handleBuyNow}
                disabled={
                  getQtyOfSameItemInCart(cartItems, work) + qty > work.inventory
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
