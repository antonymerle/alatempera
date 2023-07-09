import { ICartItem } from "@/context/StateContext";
import React from "react";
import Link from "next/link";
import Card from "./Card";
import useTranslation from "next-translate/useTranslation";
import styles from "@/styles/Home.module.css";
const { main, gallery } = styles;

const Cards: React.FC<{ products: ICartItem[] }> = ({ products }) => {
  console.log({ products });
  const { lang } = useTranslation();

  const tiles: Array<JSX.Element> = products.map((product, i) => {
    return (
      <Link
        href={
          (product.type === "original" ? "/work/" : "/print/") +
          (lang === "en" ? product.title_fr : product.title_fr) // TODO adapt routing
        }
        key={i}
      >
        <Card {...product} />
      </Link>
    );
  });
  return <section className={gallery}>{tiles}</section>;
};

export default Cards;
