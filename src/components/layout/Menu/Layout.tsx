import { Link, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import Button from "../../Button/Button";

export function Layout() {
  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <div className={styles.user}>
          <img className={styles.avatar} src="/avatar.png" alt="avatar" />
          <div className={styles.name}>Антон Ларичев</div>
          <div className={styles.email}>alaricode@ya.ru</div>
        </div>

        <div className={styles.menu}>
          <Link to="/" className={styles.link}>
            <img src="./menu-icon.svg" alt="иконка меню" />
            Меню
          </Link>
          <Link to="/cart" className={styles.link}>
            <img src="./cart-icon.svg" alt="иконка корзины" />
            Корзина
          </Link>
        </div>
        <Button className={styles.exit}>
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
