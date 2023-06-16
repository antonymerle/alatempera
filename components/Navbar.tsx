import { useStateContext } from "@/context/StateContext";
import { AiOutlineShopping } from "react-icons/ai";
import Image from "next/image";
import Cart from "./Cart";
import style from "../styles/Navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const {
  navbarContainer,
  logoContainer,
  logo,
  cartIcon,
  search,
  cartItemQty,
  menu,
  logoSide,
  menuSide,
  menuItem,
  active,
  qty,
  smCartIcon,
} = style;

const isLinkActive = (currentPath: string, navbarPath: string) => {
  // 1. tokenize path ["", "prints", "blog"]
  const currentPathTokens: Array<string> = currentPath
    .split("/")
    .filter((token) => token !== "");

  if (!currentPathTokens.length && navbarPath === "/") {
    // we're in the homepage
    return currentPath === navbarPath;
  } else if (currentPathTokens[0]?.match(/work/) && navbarPath === "/") {
    // we're in the work section
    return true;
  } else if (currentPathTokens[0]?.match(/print/) && navbarPath === "/print") {
    return true;
  } else if (currentPathTokens[0] === "blog" && navbarPath === "/blog") {
    return true;
  } else if (currentPathTokens[0] === "about" && navbarPath === "/about") {
    return true;
  }
  return false;
};

const Navbar: React.FC = () => {
  const { pathname: currentPathname } = useRouter();

  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <nav className={navbarContainer}>
      <div className={logoSide}>
        <Link href={"/"}>
          <div className={logoContainer}>
            <Image
              fill={true}
              src="/logo.jpg"
              alt="logo"
              className={logo}
            ></Image>
          </div>
        </Link>
        <Link href={"/"}>
          <h1>A la tempera</h1>
        </Link>
        <div className={smCartIcon} onClick={() => setShowCart(true)}>
          <AiOutlineShopping />
          <span>{totalQuantities}</span>
        </div>
      </div>

      <div className={menuSide}>
        <ul className={menu}>
          <Link href={"/"}>
            <li className={isLinkActive(currentPathname, "/") ? active : ""}>
              Originaux
            </li>
          </Link>
          <Link href={"/prints"}>
            <li
              className={isLinkActive(currentPathname, "/print") ? active : ""}
            >
              Impressions
            </li>
          </Link>
          <Link href={"/blog"}>
            <li
              className={isLinkActive(currentPathname, "/blog") ? active : ""}
            >
              Carnet
            </li>
          </Link>
          <Link href={"/about"}>
            <li
              className={isLinkActive(currentPathname, "/about") ? active : ""}
            >
              A propos
            </li>
          </Link>
          <li>
            <div className={cartIcon} onClick={() => setShowCart(true)}>
              <AiOutlineShopping size={"2em"} />
              <span>{totalQuantities}</span>
            </div>
          </li>
        </ul>
        {showCart && <Cart />}
      </div>
    </nav>
  );
};

export default Navbar;
