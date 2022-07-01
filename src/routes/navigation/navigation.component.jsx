import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import {
  NavigationContainer,
  NavLink,
  NavLinks,
  LogoContainer,
} from "./navigation.styles.jsx";
import { useSelector, useDispatch } from "react-redux";
//import { useContext } from "react";
//import { UserContext } from "../../contexts/user.contexts";
//import { CartContext } from "../../contexts/cart.context";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
//import { SignOutUser } from "../../utils/firebase/firebase.utils.js";
import { signOutStart } from "../../store/user/user.action.js";
import CartIcon from "../../components/cart-icon/cart-icon.components";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { selectCurrentUser } from "../../store/user/user.selector.js";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

const Navigation = () => {
  const dispatch = useDispatch();
  //const { currentUser } = useContext(UserContext);
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  const signOutHandler = async () => {
    dispatch(signOutStart());
  };
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>

        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>

          {currentUser ? (
            <NavLink as="span" onClick={signOutHandler}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}

          <CartIcon />
        </NavLinks>

        {isCartOpen && <CartDropdown />}
      </NavigationContainer>

      <Outlet />
    </Fragment>
  );
};
export default Navigation;
