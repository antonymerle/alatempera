import { useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useStateContext } from "@/context/StateContext";
import { runFireworks } from "@/utils/lib";
import style from "../styles/Success.module.css";
import useTranslation from "next-translate/useTranslation";

const { container, icon, emailMsg, description, email } = style;

const Success: React.FC = ({ status, customer_details }: any) => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  const { t } = useTranslation("success");

  // console.log("session", session);
  console.log("customer_details", customer_details);
  console.log("status", status);

  // return <div className={container}>Success</div>;

  const customerName = customer_details?.name.split(" ");

  let customerFirstName = "";
  let customerLastName = "";

  if (customerName) {
    customerFirstName = customerName[0];
    customerLastName = customerName[1];
  }

  useEffect(() => {
    if (status === "complete") {
      console.log("useeffect");
      localStorage.clear();
      setCartItems([]);
      setTotalPrice(0);
      setTotalQuantities(0);
      runFireworks();
    }
  }, []);

  const nothingMarkup = <p>{t("nothing")}</p>;
  if (status === "complete") {
    const successMarkup = (
      <>
        <BsBagCheckFill className={icon} color="#785e21" />
        <h2>
          {t("title")}, {customerFirstName}!
        </h2>
        <p className={emailMsg}>{t("confirmationEmail")}</p>
        <p className={description}>
          {t("question")}{" "}
          <Link href="/contact" className={email}>
            contact
          </Link>
        </p>
        <Link href="/">
          <button type="button">{t("btn")}</button>
        </Link>
      </>
    );
    const markup = status === "complete" ? successMarkup : nothingMarkup;

    return <div className={container}>{markup}</div>;
  } else {
    return <div className={container}>{nothingMarkup}</div>;
    // return <div className={container}>Success {customerFirstName}</div>;
  }
};

export default Success;
