import { useEffect, useState } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useStateContext } from "@/context/StateContext";
import { runFireworks } from "@/utils/lib";
import style from "../styles/Success.module.css";
import { useSearchParams } from "next/navigation";
import useTranslation from "next-translate/useTranslation";

const { container, icon, emailMsg, description, email } = style;

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  const { t } = useTranslation("success");
  const searchParams = useSearchParams();

  const successCallback = searchParams.get("success");

  console.log(successCallback);

  useEffect(() => {
    if (successCallback) {
      console.log("useeffect");
      // updateInventory
      localStorage.clear();
      setCartItems([]);
      setTotalPrice(0);
      setTotalQuantities(0);
      runFireworks();
    }
  }, [successCallback]);

  return (
    <div className={container}>
      <BsBagCheckFill className={icon} color="#785e21" />

      <h2>{t("title")}</h2>
      <p className={emailMsg}>{t("confirmationEmail")}</p>
      <p className={description}>
        {t("question")}{" "}
        <a href={`mailto:${process.env.CONTACT_EMAIL}`} className={email}>
          {process.env.CONTACT_EMAIL}
        </a>
      </p>
      <Link href="/">
        <button type="button">{t("btn")}</button>
      </Link>
    </div>
  );
};

export default Success;
