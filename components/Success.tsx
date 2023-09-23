// import { useEffect } from "react";
// import Link from "next/link";
// import { BsBagCheckFill } from "react-icons/bs";
// import { useStateContext } from "@/context/StateContext";
// import { runFireworks } from "@/utils/lib";
// import style from "../styles/Success.module.css";
// import useTranslation from "next-translate/useTranslation";

// const { container, icon, emailMsg, description, email } = style;

// const Success: React.FC = ({ ...customer, ...session }: any) => {
//   const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
//   const { t } = useTranslation("success");

//   useEffect(() => {
//     if (sessionStatus === "complete") {
//       console.log("useeffect");
//       localStorage.clear();
//       setCartItems([]);
//       setTotalPrice(0);
//       setTotalQuantities(0);
//       runFireworks();
//     }
//   }, []);

//   const successMarkup = (
//     <>
//       <BsBagCheckFill className={icon} color="#785e21" />
//       <h2>
//         {t("title")}, {customerFirstName}!
//       </h2>
//       <p className={emailMsg}>{t("confirmationEmail")}</p>
//       <p className={description}>
//         {t("question")}{" "}
//         <Link href="/contact" className={email}>
//           contact
//         </Link>
//       </p>
//       <Link href="/">
//         <button type="button">{t("btn")}</button>
//       </Link>
//     </>
//   );
//   const nothingMarkup = <p>{t("nothing")}</p>;
//   const markup = sessionStatus === "complete" ? successMarkup : nothingMarkup;

//   return <div className={container}>{markup}</div>;
//   // return <div className={container}>Success {customerFirstName}</div>;
// };

// export default Success;
