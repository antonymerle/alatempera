import { useStateContext } from "@/context/StateContext";
import { AiOutlineShopping } from "react-icons/ai";
import Image from "next/image";
import Cart from "./Cart";
import style from "../styles/Navbar.module.css";
import Link from "next/link";

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
} = style;

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
        <h1>A la tempera</h1>
      </div>

      <div className={menuSide}>
        <ul className={menu}>
          <li>A propos</li>
          <li>Originaux</li>
          <li>Impressions</li>
          <li>Carnet</li>
          <li>
            <button
              type="button"
              className={cartIcon}
              onClick={() => setShowCart(true)}
            >
              <AiOutlineShopping size={30} />
              <span>{totalQuantities}</span>
            </button>
          </li>
        </ul>
        {showCart && <Cart />}
      </div>
    </nav>
  );
};

export default Navbar;
