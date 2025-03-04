import { useDispatch, useSelector } from "react-redux";
import Headling from "../../components/Headling/Headling";
import { AppDispatch, RootState } from "../../store/store";
import CartItem from "../../components/CartItem/CartItem";
import { useEffect, useMemo, useState } from "react";
import { IProduct } from "../../interfaces/product.interface";
import axios from "axios";
import { PREFIX } from "../../helpers/API";
import styles from "../Cart/Cart.module.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../store/cart.slice";
import { Loading } from "../../components/Loading/Loading";

const DELIVERY_FEE = 169;

export function Cart() {
  const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
  const items = useSelector((s: RootState) => s.cart.items);
  const jwt = useSelector((s: RootState) => s.user.jwt);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const total = useMemo(
    () =>
      items
        .map((i) => {
          const product = cartProducts.find((p) => p.id === i.id);
          if (!product) {
            return 0;
          }
          return i.count * product.price;
        })
        .reduce((acc, i) => (acc += i), 0),
    [items, cartProducts]
  );
  const getItem = async (id: number) => {
    const { data } = await axios.get<IProduct>(`${PREFIX}/products/${id}`);
    return data;
  };

  const loadAllItems = async () => {
    const res = await Promise.all(items.map((i) => getItem(i.id)));
    setCartProducts(res);
  };

  const checkout = async () => {
    await axios.post(
      `${PREFIX}/order`,
      {
        products: items,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    dispatch(cartActions.clean());
    navigate("/success");
  };
  const navigateToMenu = () => {
    navigate("/");
  };
  useEffect(() => {
    loadAllItems();
  }, [items]);

  return (
    <>
      <Headling className={styles.head}>Корзина</Headling>
      {!total && (
        <div className={styles.emptyCartWrapper}>
          <img
            className={styles.emptyCartImg}
            src="/empty-cart.png"
            alt="изображение пустой корзины"
          />
          <div>Ваша корзина пуста</div>
          <Button
            className={styles.toMenuBtn}
            appearance="big"
            onClick={navigateToMenu}
          >
            За покупками!
          </Button>
        </div>
      )}
      {total > 0 && (
        <div className={styles.wrapper}>
          {items.map((i) => {
            const product = cartProducts.find((p) => p.id === i.id);
            if (!product) {
              return;
            }
            return <CartItem key={i.id} count={i.count} {...product} />;
          })}
          <div className={styles.line}>
            <div className={styles.text}>Итог</div>
            <div className={styles.price}>
              {total}&nbsp;
              <span>₽</span>
            </div>
          </div>
          <hr className={styles.hr} />
          <div className={styles.line}>
            <div className={styles.text}>Доставка</div>
            <div className={styles.price}>
              {DELIVERY_FEE}&nbsp;
              <span>₽</span>
            </div>
          </div>
          <hr className={styles.hr} />
          <div className={styles.line}>
            <div className={styles.text}>
              Итог <span className={styles.totalCount}>({items.length})</span>
            </div>
            <div className={styles.price}>
              {total + DELIVERY_FEE}&nbsp;
              <span>₽</span>
            </div>
          </div>
          <div className={styles.checkout}>
            <Button appearance="big" onClick={checkout}>
              Оформить
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
