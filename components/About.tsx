import React from "react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import style from "../styles/About.module.css";

const { aboutContainer, imgContainer, aboutImage, textContainer } = style;

const About = () => {
  const { t } = useTranslation("about");

  const markup = t("mainContent")
    .split("\n")
    .map((p) => {
      return (
        <div>
          <p>
            {p}
            <br></br>
            <br></br>
          </p>
        </div>
      );
    });
  return (
    <div className={aboutContainer}>
      <div className={imgContainer}>
        <Image
          className={aboutImage}
          src={"/art.jpg"}
          width={936}
          height={1436}
          // layout="fill"
          // objectFit="cover"
          // objectPosition="center"
          alt="art"
        />
      </div>
      <div className={textContainer}>
        <h2>{t("about")}</h2>
        <div>{markup}</div>
      </div>
    </div>
  );
};

export default About;
