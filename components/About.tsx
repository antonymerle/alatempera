import { useState } from "react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import { HiPaintBrush } from "react-icons/hi2";
import style from "../styles/About.module.css";

const { aboutContainer, imgContainer, aboutImage, textContainer, tab } = style;

enum Content {
  about = "aboutContent",
  technique = "techniqueContent",
}

const About = () => {
  const [content, setContent] = useState<Content>(Content.about);
  const { t } = useTranslation("about");

  const markup = t(content)
    .split("\n")
    .map((p, i) => {
      return (
        <div key={i}>
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
          src={content === Content.about ? "/manon.jpg" : "/technique.jpg"}
          width={936}
          height={1407}
          alt="Manon working at her desk"
        />
      </div>
      <div className={textContainer}>
        <h2>
          {t(content === Content.about ? "aboutTitle" : "techniqueTitle")}
        </h2>
        <div>{markup}</div>
        <div className={tab}>
          <button
            onClick={() =>
              setContent(
                content === Content.about ? Content.technique : Content.about
              )
            }
          >
            {t(content === Content.about ? "techniqueTitle" : "aboutTitle")}
            {content === Content.about && (
              <HiPaintBrush style={{ marginLeft: "1em" }} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
