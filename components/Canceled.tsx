import Link from "next/link";
import { MdRemoveShoppingCart } from "react-icons/md";
import styles from "../styles/Canceled.module.css";

const { cancelWrapper, cancel, icon, emailMsg, email, description } = styles;

const Canceled = () => {
  return (
    <div className={cancel}>
      <MdRemoveShoppingCart className={icon} />

      <h2>La commande a échoué...</h2>
      <p className={emailMsg}>
        Vous n'avez pas été débité. Les articles dans votre panier ont été
        sauvegardés.
      </p>
      <p className={description}>
        Pour toute question, n'hésitez pas à nous écrire à cette adresse :{" "}
        <a href={`mailto:${process.env.CONTACT_EMAIL}`} className={email}>
          {process.env.CONTACT_EMAIL}
        </a>
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
