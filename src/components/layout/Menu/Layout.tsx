import cn from "classnames";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store/store";
import { getData, userActions } from "../../../store/user.slice";
import Button from "../../Button/Button";
import { UserProfile } from "../../UserProfile/UserProfile";
import styles from "./Layout.module.css";

export function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { jwt } = useSelector((s: RootState) => s.user);
  const items = useSelector((s: RootState) => s.cart.items);
  const [burgerIsOpen, setBurgerIsOpen] = useState(false);

  const toggleBurgerMenu = () => {
    setBurgerIsOpen(!burgerIsOpen);
  };
  const logout = () => {
    dispatch(userActions.logout());
    navigate("/auth/login");
  };

  useEffect(() => {
    if (jwt) {
      dispatch(getData({ jwt }));
    }
  }, [dispatch]);

  return (
    <div className={styles.layout}>
      <NavLink
        to="/cart"
        className={({ isActive }) =>
          cn(styles.cartButtonFixed, {
            [styles.filled]: items.length > 0 && !isActive,
            // [styles.hidden]: isActive,
          })
        }
      >
        <img src="/cart-orange.svg" alt="иконка корзины" />
        <span>{items.reduce((acc, item) => (acc += item.count), 0)}</span>
      </NavLink>
      <div
        className={cn(styles.burgerBtn, { [styles.active]: burgerIsOpen })}
        id="burgerBtn"
        onClick={toggleBurgerMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={cn(styles.sidebar, { [styles.active]: burgerIsOpen })}>
        <div className={styles.user}>
          <UserProfile />
        </div>

        <div className={styles.menu}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(styles.link, {
                [styles.active]: isActive,
              })
            }
            onClick={toggleBurgerMenu}
          >
            <img src="./menu-icon.svg" alt="иконка меню" />
            Меню
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              cn(styles.link, {
                [styles.active]: isActive,
              })
            }
            onClick={toggleBurgerMenu}
          >
            <img src="./cart-icon.svg" alt="иконка корзины" />
            Корзина
            <span className={styles.cartCount}>
              {items.reduce((acc, item) => (acc += item.count), 0)}
            </span>
          </NavLink>
        </div>
        <Button className={styles.exit} onClick={logout}>
          <img src="/logoutBtn.svg" alt="иконка выйти" />
          Выйти
        </Button>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
