import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Headling from "../../components/Headling/Headling";
import Input from "../../components/Input/Input";
import styles from "./Login.module.css";
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { PREFIX } from "../../helpers/API";

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

export function Login() {
  const [error, setError] = useState<string | null>();
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    await sendLogin(email.value, password.value);
  };

  const sendLogin = async (email: string, password: string) => {
    try {
      const { data } = await axios.post(`${PREFIX}/auth/login`, {
        email,
        password,
      });
      console.log("data :>> ", data);
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log("e :>> ", e);
        setError(e.response?.data.message);
      }
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={submit}>
        <Headling>Вход</Headling>
        {error && <div className={styles.error}>{error}</div>}
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
