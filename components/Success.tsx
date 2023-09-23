import { useState, useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useStateContext } from "@/context/StateContext";
import { runFireworks } from "@/utils/lib";
import style from "../styles/Success.module.css";
import useTranslation from "next-translate/useTranslation";
import { SessionDetails } from "@/types/types";
import { useRouter } from "next/router";

const { container, icon, emailMsg, description, email } = style;

const Success: React.FC = () => {
  // console.log({ sessionStatus, customerFirstName });
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  const { t } = useTranslation("success");

  const [sessionDetails, setSessionDetails] = useState({} as any);

  const router = useRouter();
  const { session_id } = router.query;

  useEffect(() => {
    if (session_id) {
      // You can now use the session_id in your component
      console.log("Session ID:", session_id);

      const fetchData = async () => {
        const res = await fetch(`${process.env.BASE_DOMAIN_URL}/api/checkout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            // "Content-length": "0",
          },
          body: JSON.stringify({ session_id: session_id }),
        });

        const sessionDetails = await res.json();
        console.log("*** api_checkout response ***");
        console.log({ sessionDetails });
        // return sessionDetails;
        setSessionDetails(sessionDetails);
      };
      fetchData();
    }
  }, [session_id]);

  // useEffect(() => {
  //   if (sessionStatus === "complete") {
  //     console.log("useeffect");
  //     localStorage.clear();
  //     setCartItems([]);
  //     setTotalPrice(0);
  //     setTotalQuantities(0);
  //     runFireworks();
  //   }
  // }, []);

  if (sessionDetails) {
    const successMarkup = (
      <>
        <BsBagCheckFill className={icon} color="#785e21" />
        <h2>
          {t("title")}, {sessionDetails?.customerFirstName}!
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

    const nothingMarkup = <p>{t("nothing")}</p>;
    const markup =
      sessionDetails.sessionStatus === "complete"
        ? successMarkup
        : nothingMarkup;

    return <div className={container}>{markup}</div>;
  }
  return <div className={container}>error</div>;
};

export default Success;
