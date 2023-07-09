import { useState, useCallback } from "react";
import ImageViewer from "react-simple-image-viewer";
import Work from "@/models/works";
import { ICartItem, useStateContext } from "@/context/StateContext";
import Image from "next/image";
import Quantity from "@/components/Quantity";
import { getQtyOfSameItemInCart } from "./Quantity";
import ArrowBack from "@/components/ArrowBack";
import useTranslation from "next-translate/useTranslation";
import style from "../styles/Product.module.css";

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

const Product: React.FC<{ product: ICartItem }> = ({ product }) => {
  // const WorkDetails: React.FC<{ work: ICartItem }> = ({ work }) => {
  console.log({ product });
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const { onAdd, qty, setQty, setShowCart, cartItems } = useStateContext();
  const { t, lang } = useTranslation("work");
  console.log({ lang });

  // useEffect(() => {
  //   const image: HTMLImageElement = document.querySelector(".mainImage")!;
  //   const topImagePosition = image.getBoundingClientRect().top;
  //   console.log({ topImagePosition });

  //   image?.addEventListener("load", () => {
  //     const imgHeight = image.clientHeight;
  //     const imgWidth = image.clientWidth;

  //     const containerHeight = image.parentElement!.offsetHeight;

  //     // const translateY = (containerHeight - imgHeight) / 2;
  //     const translateY = -96;
  //     console.log({ imgHeight });
  //     console.log({ imgWidth });
  //     console.log({ containerHeight });
  //     console.log({ translateY });

  //     image.style.transform = `translateY(${translateY}px)`;
  //   });
  // }, []);

  const handleBuyNow = () => {
    console.log({ qty });
    console.log({ product });

    onAdd(product, qty);
    setQty(1);
    // setShowCart(true);
  };

  const openImageViewer = useCallback(() => {
    // setCurrentImage(index);
    console.log("click");

    console.log("images", product.imgURL);

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
            product.format === "landscape"
              ? landscapeImgContainer
              : classicContainer
          }`}
        >
          <Image
            alt={product.title}
            // width={965}
            // height={950}
            fill={true}
            objectFit="scale-down"
            src={product.imgURL[0]}
            onClick={() => openImageViewer()}
            className="mainImage"
          />
          {isViewerOpen && (
            <ImageViewer
              src={[product.imgURL[1] ?? product.imgURL[0]]}
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
            product.format === "landscape"
              ? landscapeDetailsContainer
              : classicContainer
          }`}
        >
          <h2>{product.title}</h2>
          <h3>{product.priceTTC.toFixed(2)}€</h3>
          <p>
            {lang === "en" ? product.description_en : product.description_fr}
          </p>
          {getQtyOfSameItemInCart(cartItems, product) >= product.inventory ? (
            <p>{t("soldOut")}</p>
          ) : (
            <div className={btns}>
              <Quantity context="slug" work={product} />
              <button
                onClick={handleBuyNow}
                disabled={
                  getQtyOfSameItemInCart(cartItems, product) + qty >
                  product.inventory
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

// }

export default Product;
