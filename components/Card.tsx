import Image from "next/image";
import { ICartItem } from "@/context/StateContext";
import useTranslation from "next-translate/useTranslation";

import styles from "@/styles/Home.module.css";

const {
  opusPortrait,
  opusLandscape,
  imgContainerPortrait,
  imgContainerLandscape,
  image,
  soldOutImage,
  opusDescription,
  soldOut,
} = styles;

enum Picture {
  mini,
  full,
  print,
}

export const Card: React.FC<{ product: ICartItem }> = ({ product }) => {
  const { lang } = useTranslation();
  const title = lang === "fr" ? product.title_fr : product.title_en;
  const alt =
    lang === "fr" ? product.pictures[0].alt_fr : product.pictures[0].alt_en;
  const width = product.pictures[0].width;
  const height = product.pictures[0].height;

  const opus = product.format === "landscape" ? opusLandscape : opusPortrait;

  const index = product.type === "original" ? Picture.mini : Picture.print;

  const imgContainer =
    product.format === "landscape"
      ? imgContainerLandscape
      : imgContainerPortrait;

  const containerStyle = `${imgContainer} ${
    product.inventory > 0 ? null : soldOut
  }`;
  const imgStyle = product.inventory > 0 ? image : `${soldOutImage}`;

  return (
    <div className={opus}>
      <div className={containerStyle}>
        <Image
          alt={alt}
          fill={true}
          sizes={`(max-width: ${width}px), (max-height: ${height}px) (min-width: 394px)`}
          priority={
            product.pictures[0].src === "/la-brouette-d'abondance.jpg" ||
            product.pictures[0].src === "/sous-le-tilleul.jpg"
              ? true
              : false
          }
          src={product.pictures[index].src}
          className={imgStyle}
        />
      </div>
      <div className={opusDescription}>
        <p>{title}</p>
        <p>{product.priceTTC.toFixed(2)}€</p>
      </div>
    </div>
  );
};

export default Card;
