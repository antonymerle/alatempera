import {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { toast } from "react-hot-toast";
// import { computeTTC } from "@/lib/utils";
import { IWork } from "@/models/works";

type children = any;

interface IContextMembers {
  showCart: boolean;
  setShowCart: Dispatch<SetStateAction<boolean>>;
  cartItems: ICartItem[];
  totalPrice: number;
  totalQuantities: number;
  qty: number;
  setQty: Dispatch<SetStateAction<number>>;
  incQty: () => void;
  decQty: () => void;
  onAdd: (product: ICartItem, quantity: number) => void;
  toggleCartItemQuantity: (id: string, operation: Operation) => void;
  onRemove: (product: ICartItem) => void;
  setCartItems: Dispatch<SetStateAction<ICartItem[]>>;
  setTotalPrice: Dispatch<SetStateAction<number>>;
  setTotalQuantities: Dispatch<SetStateAction<number>>;
}

export const Context = createContext({} as IContextMembers);

export interface ICartItem extends IWork {
  cartQty: number;
}

type Operation = "inc" | "dec";

export const StateContext: React.FC<children> = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState(Array<ICartItem>);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct: ICartItem;
  let index;

  const onAdd = (product: ICartItem, quantity: number) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.priceTTC * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.cartQty + quantity,
          };
      });

      setCartItems(updatedCartItems as Array<ICartItem>); // TODO : remove type hack
    } else {
      product.cartQty = quantity;

      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.title} ajouté au panier.`);
  };

  const onRemove = (product: ICartItem) => {
    foundProduct = cartItems.find((item) => item._id === product._id)!; // TODO : remove type hack
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.priceTTC * foundProduct.cartQty
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.cartQty
    );
    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (id: string, operation: Operation) => {
    foundProduct = cartItems.find((item) => item._id === id)!;
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (operation === "inc") {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, cartQty: foundProduct.cartQty + 1 },
      ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.priceTTC);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (operation === "dec") {
      if (foundProduct.cartQty > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, cartQty: foundProduct.cartQty - 1 },
        ]);
        setTotalPrice(
          (prevTotalPrice) => prevTotalPrice - foundProduct.priceTTC
        );
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  const contextMembers = {
    showCart,
    setShowCart,
    cartItems,
    totalPrice,
    totalQuantities,
    qty,
    setQty,
    incQty,
    decQty,
    onAdd,
    toggleCartItemQuantity,
    onRemove,
    setCartItems,
    setTotalPrice,
    setTotalQuantities,
  };

  return <Context.Provider value={contextMembers}>{children}</Context.Provider>;
};

export const useStateContext = () => useContext(Context);
