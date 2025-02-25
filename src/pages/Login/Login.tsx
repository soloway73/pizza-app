import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Headling from "../../components/Headling/Headling";
import Input from "../../components/Input/Input";
import { AppDispatch, RootState } from "../../store/store";
import { login, userActions } from "../../store/user.slice";
import styles from "./Login.module.css";

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { jwt, loginErrorMessage } = useSelector((s: RootState) => s.user);

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearLoginError());
    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    await sendLogin(email.value, password.value);
  };

  const sendLogin = async (email: string, password: string) => {
    dispatch(login({ email, password }));
    // try {
    //   const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
    //     email,
    //     password,
    //   });
    //   dispatch(userActions.addJwt(data.access_token));
    //   navigate("/");
    // } catch (e) {
    //   if (e instanceof AxiosError) {
    //     console.log("e :>> ", e);
    //     setError(e.response?.data.message);
    //   }
    // }
  };

  return (
    <>
      <form className={styles.form} onSubmit={submit}>
        <Headling>Вход</Headling>
        {loginErrorMessage && (
          <div className={styles.error}>{loginErrorMessage}</div>
        )}
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
          <Input placeholder="Пароль" id="password" type="password" />
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
