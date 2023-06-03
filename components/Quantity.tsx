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
  cartItem: ICartItem;
}

// Two different logics wether if the component is in the Cart component or slug page.
// context parameter is either "cart" or "slug"
// If context === "cart", cartItem must be provided
const Quantity: React.FC<IQuantityProps> = ({ context, cartItem }) => {
  const { qty, setQty, decQty, incQty, toggleCartItemQuantity } =
    useStateContext();

  const { asPath } = useRouter();
  useEffect(() => {
    setQty(1);
  }, [asPath]); // access the router object and reset qty each time the user navigates to another product page.

  if (context === "cart" && cartItem) {
    return (
      <div className={quantityDesc}>
        <div
          className={minus}
          onClick={() => toggleCartItemQuantity(cartItem._id, "dec")}
        >
          <AiOutlineMinus />
        </div>
        <div className={num}>{cartItem.cartQty}</div>
        <div
          className={cartItem.cartQty >= cartItem.inventory ? disabled : plus}
          onClick={() => {
            // console.log(cartItem.cartQty, cartItem.inventory);
            cartItem.cartQty >= cartItem.inventory
              ? toast.error("Quantité maximale atteinte !")
              : toggleCartItemQuantity(cartItem._id, "inc");
          }}
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
          className={qty >= cartItem.inventory ? disabled : plus}
          onClick={() =>
            qty >= cartItem.inventory
              ? toast.error("Quantité maximale atteinte !")
              : incQty()
          }
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
