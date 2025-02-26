import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Button from "../../Button/Button";
import styles from "./Layout.module.css";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { getData, userActions } from "../../../store/user.slice";
import { useEffect, useState } from "react";

export function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { userData, jwt } = useSelector((s: RootState) => s.user);

  const logout = () => {
    dispatch(userActions.logout());
    navigate("/auth/login");
  };

  useEffect(() => {
    if (jwt) {
      dispatch(getData({ jwt }));
    }
  }, []);
  return (
    <div className={styles.layout}>
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
