import Image from "next/image";
import styles from "@/styles/Home.module.css";
const { main, gallery, opus, imgContainer, opusDescription } = styles;

const Card = () => {
  return (
    <div className={opus}>
      <div className={imgContainer}>
        <Image
          alt="francis"
          fill={true}
          objectFit="cover"
          src="/francis-stigmata.jpg"
        />
      </div>
      <div className={opusDescription}>
        <p>City in the sky</p>
        <p>330€</p>
      </div>
    </div>
  );
};

export default Card;
