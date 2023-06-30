import React from "react";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import style from "../styles/Privacy.module.css";

const { container } = style;

const Privacy = () => {
  const { t } = useTranslation("privacy");
  const content = t("body")
    .split("\n")
    .map((p) => {
      return <p>{p}</p>;
    });

  return (
    <div className={container}>
      <h2>{t("title")}</h2>
      {content}
      <b>
        <Link href={"/contact"}>{t("form")}</Link>
      </b>
    </div>
  );
};

export default Privacy;
