import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { IWork } from "@/models/works";
const { main, gallery, opus, imgContainer, opusDescription } = styles;

export const Card: React.FC<IWork> = ({
  description,
  imgURL,
  priceHT,
  priceTTC,
  qty,
  title,
}) => {
  // const { description, imgURL, priceHT, priceTTC, qty, title } = work;
  return (
    <div className={opus}>
      <div className={imgContainer}>
        <Image alt={title} fill={true} objectFit="cover" src={imgURL[0]} />
      </div>
      <div className={opusDescription}>
        <p>{title}</p>
        <p>{(priceHT + priceTTC).toFixed(2)}€</p>
      </div>
    </div>
  );
};

export default Card;
