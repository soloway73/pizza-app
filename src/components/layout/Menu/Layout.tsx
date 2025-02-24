import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Button from "../../Button/Button";
import styles from "./Layout.module.css";
import cn from "classnames";

export function Layout() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("jwt");
    navigate("/auth/login");
  };

  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <div className={styles.user}>
          <img className={styles.avatar} src="/avatar.png" alt="avatar" />
          <div className={styles.name}>Антон Ларичев</div>
          <div className={styles.email}>alaricode@ya.ru</div>
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
