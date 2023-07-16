import React from "react";
import { useRouter } from "next/router";
import { MdKeyboardBackspace } from "react-icons/md";
import useTranslation from "next-translate/useTranslation";
import style from "../styles/ArrowBack.module.css";

const { container } = style;

const ArrowBack = () => {
  const router = useRouter();
  const { t } = useTranslation("navigation");

  return (
    <div className={container} onClick={() => router.back()}>
      <MdKeyboardBackspace /> <span>{t("goBack")}</span>
    </div>
  );
};

export default ArrowBack;
