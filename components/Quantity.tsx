import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { ICartItem, useStateContext } from "@/context/StateContext";
import { toast } from "react-hot-toast";
import styles from "../styles/Cart.module.css";

const { quantityDesc, minus, num, plus, disabled } = styles;

type Context = "cart" | "slug";

interface IQuantityProps {
  context: Context;
  work: ICartItem;
}

// Two different logics wether if the component is in the Cart component or slug page.
// context parameter is either "cart" or "slug"
// If context === "cart", work must be provided
const Quantity: React.FC<IQuantityProps> = ({ context, work }) => {
  // console.log({ work });

  const { qty, setQty, decQty, incQty, toggleCartItemQuantity, cartItems } =
    useStateContext();

  const { asPath } = useRouter();
  useEffect(() => {
    setQty(1);
  }, [asPath]); // access the router object and reset qty each time the user navigates to another product page.

  const onIncrement = () => {
    const numberOfSameItemAlreadyInCart = cartItems
      .filter((itemInCart) => itemInCart._id === work._id)
      .map((itemInCart) => itemInCart.cartQty)
      .reduce((sum, current) => sum + current, 0);
    console.log({ numberOfSameItemAlreadyInCart });

    if (context === "cart") {
      work.cartQty >= work.inventory
        ? toast.error("Quantité maximale atteinte !")
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
          <AiOutlinePlus />
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
          className={qty >= work.inventory ? disabled : plus}
          onClick={onIncrement}
        >
          <AiOutlinePlus />
        </div>
      </div>
    );
  } else {
    return <p>Error</p>;
  }
};

export default Quantity;
