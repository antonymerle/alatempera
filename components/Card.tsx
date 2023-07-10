import Image from "next/image";
import { ICartItem } from "@/context/StateContext";
import useTranslation from "next-translate/useTranslation";

import styles from "@/styles/Home.module.css";

const { main, gallery, opus, imgContainer, image, opusDescription, soldOut } =
  styles;

export const Card: React.FC<ICartItem> = ({
  pictures,
  priceHT,
  priceTTC,
  title_fr,
  title_en,
  inventory,
}) => {
  const { lang } = useTranslation();
  const title = lang === "en" ? title_en : title_fr;
  // console.log({ pictures, priceHT, priceTTC, title_fr, title_en, inventory });

  return (
    <div className={opus}>
      <div className={`${imgContainer} ${inventory > 0 ? null : soldOut}`}>
        <Image
          alt={title}
          fill={true}
          // objectFit="scale-down"
          src={pictures[0].src}
          className={image}
        />
      </div>
      <div className={opusDescription}>
        <p>{title}</p>
        <p>{priceTTC.toFixed(2)}€</p>
      </div>
    </div>
  );
};

export default Card;
