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
} = style;

const isLinkActive = (currentPath: string, path: string) => {
  return currentPath === path;
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
              width={100}
              height={100}
              src="/logo.jpg"
              alt="logo"
              className={logo}
            ></Image>
          </div>
        </Link>
        <Link href={"/"}>
          <h1>A la tempera</h1>
        </Link>
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
          <li className={isLinkActive(currentPathname, "/blog") ? active : ""}>
            Carnet
          </li>
          <li
            className={isLinkActive(currentPathname, "/apropos") ? active : ""}
          >
            A propos
          </li>
          <li>
            <button
              type="button"
              className={cartIcon}
              onClick={() => setShowCart(true)}
            >
              <AiOutlineShopping size={"2em"} style={{ color: "#373737" }} />
              <span className={qty}>{totalQuantities}</span>
            </button>
          </li>
        </ul>
        {showCart && <Cart />}
      </div>
    </nav>
  );
};

export default Navbar;
