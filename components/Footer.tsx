import React from "react";
import { FaInstagramSquare } from "react-icons/fa";
import style from "../styles/Footer.module.css";
import Link from "next/link";

const { footerContainer, footerList } = style;

const Footer = () => {
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
          <li>
            <Link href={"/contact"}>Contact</Link>
          </li>
          <li>
            <Link href={"/terms"}>Conditions générales</Link>
          </li>
          <li>
            <Link href={"/privacy"}>Politique de confidentialité</Link>
          </li>
          <li>
            <Link href={"/shipping"}>Livraison</Link>
          </li>
          <li>
            <Link href={"/legal"}>Mentions légales</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
