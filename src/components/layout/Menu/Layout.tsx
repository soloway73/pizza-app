import cn from "classnames";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store/store";
import { getData, userActions } from "../../../store/user.slice";
import Button from "../../Button/Button";
import styles from "./Layout.module.css";

export function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { userData, jwt } = useSelector((s: RootState) => s.user);
  const items = useSelector((s: RootState) => s.cart.items);

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
      <div className={styles.burgerBtn} id="burgerBtn">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={styles.sidebar}>
        <div className={styles.user}>
          <img className={styles.avatar} src="/avatar.png" alt="avatar" />
          <div className={styles.name}>{userData?.name}</div>
          <div className={styles.email}>{userData?.email}</div>
        </div>

        <div className={styles.menu}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(styles.link, {
                [styles.active]: isActive,
              })
            }
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
