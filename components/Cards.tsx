import { ICartItem } from "@/context/StateContext";
// import { useState, useEffect } from "react";
import Link from "next/link";
import Card from "./Card";
import useTranslation from "next-translate/useTranslation";
import styles from "@/styles/Home.module.css";
const { main, gallery } = styles;

const Cards: React.FC<{ products: ICartItem[] }> = ({ products }) => {
  console.log({ products });
  const { lang } = useTranslation();
  // const [viewPort, setViewPort] = useState<ViewportSz>({ width: 0, height: 0 });

  // useEffect(() => {
  //   function handleResize() {
  //     setViewPort({ width: window.innerWidth, height: window.innerHeight });
  //   }

  //   window.addEventListener("resize", handleResize);

  //   // call handleResize to set the initial viewport size
  //   handleResize();

  //   // cleanup the event listener on component unmount
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  const tiles: Array<JSX.Element> = products.map((product, i) => {
    return (
      <Link
        href={
          (product.type === "original" ? "/work/" : "/print/") +
          (lang === "en" ? product.title_fr : product.title_fr) // TODO adapt routing
        }
        key={i}
      >
        <Card product={product} />
      </Link>
    );
  });
  return <section className={gallery}>{tiles}</section>;
};

export default Cards;
