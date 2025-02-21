import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Headling from "../../components/Headling/Headling";
import Input from "../../components/Input/Input";
import styles from "./Login.module.css";
import { FormEvent } from "react";

export function Login() {
  const submit = (e: FormEvent) => {
    e.preventDefault();
    console.log("submit");
  };
  return (
    <>
      <form className={styles.form} onSubmit={submit}>
        <Headling>Вход</Headling>
        <div className={styles.inputWrapper}>
          <label className={styles.label} htmlFor="email">
            Ваш email
          </label>
          <Input placeholder="Email" id="email" />
        </div>
        <div className={styles.inputWrapper}>
          <label className={styles.label} htmlFor="password">
            Ваш пароль
          </label>
          <Input placeholder="Пароль" id="password" />
        </div>
        <Button className={styles.enterBtn} appearance="big">
          Войти
        </Button>
      </form>
      <div className={styles.paragraph}>Нет аккаунта?</div>
      <Link to={"/auth/register"} className={styles.link}>
        Зарегистрироваться
      </Link>
    </>
  );
}
