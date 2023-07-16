import React from "react";
import useTranslation from "next-translate/useTranslation";
import style from "../styles/Shipping.module.css";

const { container } = style;

const shippingFeesEn = [
  "For France: €7",
  "For Europe (excluding Great Britain): €9",
  "For Great Britain and North America: €10",
  "For other destinations: €12",
];

const shippingFeesFr = [
  "Pour la France : 7€",
  "Pour l’Europe (hors Grande-Bretagne) : 9€",
  "Pour la Grande-Bretagne et l’Amérique du nord : 10€",
  "Pour les autres destinations : 12€",
];

const feesMarkupList = (lang: string) => {
  const fees = lang === "fr" ? shippingFeesFr : shippingFeesEn;
  return fees.map((li) => {
    return <li>{li}</li>;
  });
};

const Shipping = () => {
  const { t, lang } = useTranslation("shipping");

  return (
    <div className={container}>
      <h2>{t("title")}</h2>
      <p>{t("details")}</p>
      <h3>{t("subtitle")}</h3>
      <ul>{feesMarkupList(lang)}</ul>
      <p>{t("exclusions")}</p>
      <p>{t("delays")}</p>
    </div>
  );
};

export default Shipping;
