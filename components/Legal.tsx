import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import style from "../styles/Privacy.module.css";

const Legal = () => {
  const { t } = useTranslation("legal");
  const content = t("body")
    .split("\n")
    .map((p, i) => {
      return <p key={i}>{p}</p>;
    });

  const host = t("host")
    .split("\n")
    .map((p, i) => {
      return <p key={i}>{p}</p>;
    });
  return (
    <div>
      <h2>{t("title")}</h2>
      <br></br>
      {content}
      <br></br>
      <div>{host}</div>
    </div>
  );
};

export default Legal;
