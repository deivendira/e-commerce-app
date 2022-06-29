//import { useContext } from "react";
///import { CartContext } from "../../contexts/cart.context";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector.js";
import "./checkout-item.styles.scss";
import {
  addItemToCart,
  clearItemFromCart,
  removeItemToCart,
} from "../../store/cart/cart.action";

const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  //const { clearItemFromCart, addItemToCart, removeItemToCart } =
  //   useContext(CartContext);
  const { name, price, quantity, imageUrl } = cartItem;

  const clearItemHandler = () =>
    dispatch(clearItemFromCart(cartItems, cartItem));

  const incrementHandler = () => dispatch(addItemToCart(cartItems, cartItem));

  const decrementHandler = () =>
    dispatch(removeItemToCart(cartItems, cartItem));

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={incrementHandler}>
          &#10094;
        </div>
        {quantity}
        <div className="arrow" onClick={decrementHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={clearItemHandler}>
        &#10005;
      </div>
    </div>
  );
};
export default CheckoutItem;
