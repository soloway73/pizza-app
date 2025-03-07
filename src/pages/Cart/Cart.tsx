import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import CartItem from "../../components/CartItem/CartItem";
import Headling from "../../components/Headling/Headling";
import LazyImage from "../../components/LazyImage/LazyImage";
import { PREFIX } from "../../helpers/API";
import { IProduct } from "../../interfaces/product.interface";
import { cartActions } from "../../store/cart.slice";
import { AppDispatch, RootState } from "../../store/store";
import styles from "../Cart/Cart.module.css";

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
          <LazyImage
            src="/empty-cart.png"
            alt="изображение пустой корзины"
            className={styles.emptyCartImg}
            placeholder="./placeholder.svg"
          />
          {/* <LoadableImage
            src="/empty-cart.png"
            alt="изображение пустой корзины"
            className={styles.emptyCartImg}
          /> */}
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
