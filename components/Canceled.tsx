import Link from "next/link";
import { MdRemoveShoppingCart } from "react-icons/md";
import styles from "../styles/Success.module.css";

const { container, icon, emailMsg, email, description } = styles;

const Canceled = () => {
  return (
    <div className={container}>
      <MdRemoveShoppingCart className={icon} color="#785e21" />

      <h2>La commande a échoué...</h2>
      <p className={emailMsg}>
        Vous n'avez pas été débité. Les articles dans votre panier ont été
        sauvegardés.
      </p>
      <p className={description}>
        Pour toute question, n'hésitez pas à nous{" "}
        <Link href={"/contact"} className={email}>
          écrire
        </Link>
        .
      </p>
      <Link href="/">
        <button type="button" className="btn">
          Continuer mes achats
        </button>
      </Link>
    </div>
  );
};

export default Canceled;
