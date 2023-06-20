import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { ICartItem, useStateContext } from "@/context/StateContext";
import { toast } from "react-hot-toast";
import useTranslation from "next-translate/useTranslation";
import styles from "../styles/Cart.module.css";

const { quantityDesc, minus, num, plus, disabled } = styles;

type Context = "cart" | "slug";

interface IQuantityProps {
  context: Context;
  work: ICartItem;
}

export const getQtyOfSameItemInCart = (
  cartItems: Array<ICartItem>,
  work: ICartItem
) => {
  const numberOfSameItemAlreadyInCart = cartItems
    .filter((itemInCart) => itemInCart._id === work._id)
    .map((itemInCart) => itemInCart.cartQty)
    .reduce((sum, current) => sum + current, 0);
  console.log({ numberOfSameItemAlreadyInCart });

  return numberOfSameItemAlreadyInCart;
};

// Two different logics wether if the component is in the Cart component or slug page.
// context parameter is either "cart" or "slug"
// If context === "cart", work must be provided
const Quantity: React.FC<IQuantityProps> = ({ context, work }) => {
  const { qty, setQty, decQty, incQty, toggleCartItemQuantity, cartItems } =
    useStateContext();
  const { t } = useTranslation("work");

  // const [numberOfSameItemAlreadyInCart, setNumberOfSameItemAlreadyInCart] =
  //   useState(getQtyOfSameItemInCart(cartItems, work));

  const { asPath } = useRouter();
  useEffect(() => {
    setQty(1);
  }, [asPath]); // access the router object and reset qty each time the user navigates to another product page.

  const onIncrement = () => {
    const numberOfSameItemAlreadyInCart = getQtyOfSameItemInCart(
      cartItems,
      work
    );
    if (context === "cart") {
      work.cartQty >= work.inventory
        ? toast.error(t("soldOut"))
        : toggleCartItemQuantity(work._id, "inc");
    } else if (context === "slug") {
      qty + numberOfSameItemAlreadyInCart >= work.inventory
        ? toast.error("Quantité maximale atteinte !")
        : incQty();
    }
  };

  if (context === "cart" && work) {
    return (
      <div className={quantityDesc}>
        <div
          className={minus}
          onClick={() => toggleCartItemQuantity(work._id, "dec")}
        >
          <AiOutlineMinus />
        </div>
        <div className={num}>{work.cartQty}</div>
        <div
          className={work.cartQty >= work.inventory ? disabled : plus}
          onClick={onIncrement}
        >
          <AiOutlinePlus style={{ color: "#785e21" }} />
        </div>
      </div>
    );
  } else if (context === "slug") {
    return (
      <div className={quantityDesc}>
        <div className={minus} onClick={decQty}>
          <AiOutlineMinus />
        </div>
        <div className={num}>{qty}</div>
        <div
          className={
            qty + getQtyOfSameItemInCart(cartItems, work) >= work.inventory
              ? disabled
              : plus
          }
          onClick={onIncrement}
        >
          <AiOutlinePlus style={{ color: "#785e21" }} />
        </div>
      </div>
    );
  } else {
    return <p>Error</p>;
  }
};

export default Quantity;
