import { useStateContext } from "@/context/StateContext";
import { AiOutlineShopping } from "react-icons/ai";
import Image from "next/image";
import Cart from "./Cart";
import style from "../styles/Navbar.module.css";
import Link from "next/link";

const { navbarContainer, logo, cartIcon, navIcons, search, cartItemQty } =
  style;

const Navbar: React.FC = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  // const { setShowCart } = useStateContext();

  return (
    <nav>
      <Link href={"/"}>
        <div className="logo">
          <Image width={100} height={100} src="/logo.jpg" alt="logo"></Image>
        </div>
      </Link>
      <h1>A la tempera</h1>
      <ul>
        <li>A propos</li>
        <li>Originaux</li>
        <li>Impressions</li>
        <li>Contact</li>
        <li>
          <button
            type="button"
            className={cartIcon}
            onClick={() => setShowCart(true)}
          >
            <AiOutlineShopping size={24} color="grey" />

            <span
            // className={cartItemQty}
            >
              {totalQuantities}
            </span>
          </button>
        </li>
      </ul>
      {showCart && <Cart />}
    </nav>
  );
};

export default Navbar;
