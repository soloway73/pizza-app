import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Headling from "../../components/Headling/Headling";
import Input from "../../components/Input/Input";
import { AppDispatch, RootState } from "../../store/store";
import { registerUser, userActions } from "../../store/user.slice";
import styles from "./Register.module.css";

export type RegisterForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
  name: {
    value: string;
  };
};

export function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { jwt, registerErrorMessage } = useSelector((s: RootState) => s.user);

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearLoginError());
    const target = e.target as typeof e.target & RegisterForm;
    const { email, password, name } = target;
    await sendData(email.value, password.value, name.value);
  };

  const sendData = async (email: string, password: string, name: string) => {
    dispatch(registerUser({ email, password, name }));
  };

  return (
    <>
      <form className={styles.form} onSubmit={submit}>
        <Headling>Регистрация</Headling>
        {registerErrorMessage && (
          <div className={styles.error}>{registerErrorMessage}</div>
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
        <div className={styles.inputWrapper}>
          <label className={styles.label} htmlFor="name">
            Ваше имя
          </label>
          <Input placeholder="Имя" id="name" />
        </div>
        <Button className={styles.enterBtn} appearance="big">
          Зарегистрироваться
        </Button>
      </form>
      <div className={styles.paragraph}>Есть аккаунт?</div>
      <Link to={"/auth/login"} className={styles.link}>
        Войти
      </Link>
    </>
  );
}
