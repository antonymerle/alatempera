import Image from "next/image";
import { ICartItem } from "@/context/StateContext";
import styles from "@/styles/Home.module.css";

const { main, gallery, opus, imgContainer, opusDescription, soldOut } = styles;

export const Card: React.FC<ICartItem> = ({
  imgURL,
  priceHT,
  priceTTC,
  title,
  inventory,
}) => {
  // const { description, imgURL, priceHT, priceTTC, qty, title } = work;
  return (
    <div className={opus}>
      <div className={`${imgContainer} ${inventory > 0 ? null : soldOut}`}>
        <Image alt={title} fill={true} objectFit="scale-down" src={imgURL[0]} />
      </div>
      <div className={opusDescription}>
        <p>{title}</p>
        <p>{priceTTC.toFixed(2)}€</p>
      </div>
    </div>
  );
};

export default Card;
