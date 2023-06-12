import React from "react";
import { FaInstagramSquare } from "react-icons/fa";
import style from "../styles/Footer.module.css";

const { footerContainer, footerList } = style;

const Footer = () => {
  return (
    <div className={footerContainer}>
      <p>{new Date().getFullYear()} &copy; Alatempera</p>
      <div>
        <ul className={footerList}>
          <li>
            <FaInstagramSquare size={30} />
          </li>
          <li>Contact</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
