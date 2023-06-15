import React from "react";
import { useRouter } from "next/router";
import { MdKeyboardBackspace } from "react-icons/md";
import style from "../styles/ArrowBack.module.css";

const { container } = style;

const ArrowBack = ({ previousLocation }: { previousLocation?: string }) => {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  return (
    <div className={container} onClick={handleGoBack}>
      <MdKeyboardBackspace /> <span>Revenir</span>
    </div>
  );
};

export default ArrowBack;
