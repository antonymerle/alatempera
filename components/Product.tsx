import { useState, useCallback } from "react";
import ImageViewer from "react-simple-image-viewer";
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
  smImgContainer,
} = style;

const Product: React.FC<{ product: ICartItem }> = ({ product }) => {
  console.log({ product });
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const { onAdd, qty, setQty, setShowCart, cartItems } = useStateContext();
  const { t, lang } = useTranslation("work");
  console.log({ lang });

  const title = lang === "fr" ? product.title_fr : product.title_en;
  const alt =
    lang === "fr" ? product.pictures[0].alt_fr : product.pictures[0].alt_en;

  const width = product.pictures[0].width;
  const height = product.pictures[0].height;

  const handleBuyNow = () => {
    console.log({ qty });
    console.log({ product });

    onAdd(product, qty);
    setQty(1);
  };

  const openImageViewer = useCallback(() => {
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
          className={`${
            product.format === "landscape" ? smImgContainer : imgContainer
          } ${
            product.format === "landscape"
              ? landscapeImgContainer
              : classicContainer
          }`}
        >
          <Image
            alt={alt}
            fill={true}
            sizes={`(max-width: ${width}px), (max-height: ${height}px) (min-width: 394px)`}
            src={product.pictures[0].src}
            onClick={() => openImageViewer()}
          />
          {isViewerOpen && (
            <ImageViewer
              src={[product.pictures[1].src ?? product.pictures[0].src]}
              disableScroll={false}
              closeOnClickOutside={true}
              onClose={() => setIsViewerOpen(false)}
            />
          )}
        </div>
        <div
          className={`${detailsContainer} ${
            product.format === "landscape"
              ? landscapeDetailsContainer
              : classicContainer
          }`}
        >
          <h2>{title}</h2>
          <p>
            <em>{`${lang === "fr" ? product.medium_fr : product.medium_en}, ${
              product.mediumWidth
            }cm x ${product.mediumHeight}cm`}</em>
          </p>
          <h3>{product.priceTTC.toFixed(2)}€</h3>
          <p>
            {lang === "fr" ? product.description_fr : product.description_en}
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

export default Product;
