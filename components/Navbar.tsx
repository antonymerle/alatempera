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

const isLinkActive = (pathname: string) => {
  const { pathname: currentPathname } = useRouter();
  return currentPathname === pathname;
};

const Navbar: React.FC = () => {
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
            <li className={isLinkActive("/") ? active : ""}>Originaux</li>
          </Link>
          <li className={isLinkActive("/impressions") ? active : ""}>
            Impressions
          </li>
          <li className={isLinkActive("/blog") ? active : ""}>Carnet</li>
          <li className={isLinkActive("/apropos") ? active : ""}>A propos</li>
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
