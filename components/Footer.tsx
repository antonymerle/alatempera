import React from "react";
import { FaInstagramSquare } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import style from "../styles/Footer.module.css";

const { footerContainer, footerList, active } = style;

const isLinkActive = (currentPath: string, navbarPath: string) => {
  // 1. tokenize path ["", "prints", "blog"]
  const currentPathTokens: Array<string> = currentPath
    .split("/")
    .filter((token) => token !== "");

  if (currentPathTokens[0] === "contact" && navbarPath === "/contact") {
    return true;
  } else if (currentPathTokens[0] === "terms" && navbarPath === "/terms") {
    return true;
  } else if (currentPathTokens[0] === "privacy" && navbarPath === "/privacy") {
    return true;
  } else if (
    currentPathTokens[0] === "shipping" &&
    navbarPath === "/shipping"
  ) {
    return true;
  } else if (currentPathTokens[0] === "legal" && navbarPath === "/legal") {
    return true;
  }
  return false;
};

const Footer = () => {
  const { pathname: currentPathname } = useRouter();

  return (
    <div className={footerContainer}>
      <p>{new Date().getFullYear()} &copy; Alatempera</p>
      <div>
        <ul className={footerList}>
          <a
            href="https://www.instagram.com/a.la.tempera/"
            target="blank"
            rel="noopener noreferrer"
            aria-label="Compte Instagram de Alatempera"
          >
            <li>
              <FaInstagramSquare size={30} />
            </li>
          </a>
          <li
            className={isLinkActive(currentPathname, "/contact") ? active : ""}
          >
            <Link href={"/contact"}>Contact</Link>
          </li>
          <li className={isLinkActive(currentPathname, "/terms") ? active : ""}>
            <Link href={"/terms"}>Conditions générales</Link>
          </li>
          <li
            className={isLinkActive(currentPathname, "/privacy") ? active : ""}
          >
            <Link href={"/privacy"}>Politique de confidentialité</Link>
          </li>
          <li
            className={isLinkActive(currentPathname, "/shipping") ? active : ""}
          >
            <Link href={"/shipping"}>Livraison</Link>
          </li>
          <li className={isLinkActive(currentPathname, "/legal") ? active : ""}>
            <Link href={"/legal"}>Mentions légales</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
