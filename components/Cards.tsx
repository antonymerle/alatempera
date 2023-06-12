import { ICartItem } from "@/context/StateContext";
import React from "react";
import Link from "next/link";
import Card from "./Card";
import styles from "@/styles/Home.module.css";
const { main, gallery } = styles;

const Cards: React.FC<{ products: ICartItem[] }> = ({ products }) => {
  console.log({ products });

  const tiles: Array<JSX.Element> = products.map((product, i) => {
    return (
      <Link
        href={
          (product.type === "original" ? "/work/" : "/print/") + product.title
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
