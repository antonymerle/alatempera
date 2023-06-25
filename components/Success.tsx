import { useEffect, useState } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useStateContext } from "@/context/StateContext";
import { runFireworks } from "@/utils/lib";
import style from "../styles/Success.module.css";
import { useSearchParams } from "next/navigation";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { SessionDetails } from "@/types/types";

const { container, icon, emailMsg, description, email } = style;

const getPreviousPageUrl = () => {
  const { length } = window.history;
  const previousPageUrl = length > 2 ? document.referrer : "/";
  return previousPageUrl;
};

const Success: React.FC<SessionDetails> = ({
  sessionStatus,
  customerFirstName,
}) => {
  console.log({ customerFirstName });
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  const { t } = useTranslation("success");
  const searchParams = useSearchParams();
  const router = useRouter();

  const successCallback = searchParams.get("success");

  console.log(successCallback);

  useEffect(() => {
    if (sessionStatus === "complete") {
      console.log("useeffect");
      // updateInventory
      localStorage.clear();
      setCartItems([]);
      setTotalPrice(0);
      setTotalQuantities(0);
      runFireworks();
    }
  }, []);

  const successMarkup = (
    <>
      <BsBagCheckFill className={icon} color="#785e21" />
      <h2>
        {t("title")}, {customerFirstName}!
      </h2>
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
    </>
  );
  const nothingMarkup = <p>{t("nothing")}</p>;
  const markup = sessionStatus === "complete" ? successMarkup : nothingMarkup;

  return <div className={container}>{markup}</div>;
};

export default Success;
