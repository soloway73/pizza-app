import { Await, useLoaderData, useNavigate } from "react-router-dom";
import { IProduct } from "../../interfaces/product.interface";
import { Suspense } from "react";
import Headling from "../../components/Headling/Headling";
import styles from "./Product.module.css";
import Button from "../../components/Button/Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { cartActions } from "../../store/cart.slice";

export function Product() {
  // const { id } = useParams();
  const data = useLoaderData() as { data: IProduct };
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const add = (id: number) => {
    dispatch(cartActions.add(id));
  };

  return (
    <>
      <Suspense fallback={"Загружаю..."}>
        <Await resolve={data.data}>
          {({ data }: { data: IProduct }) => (
            <>
              <div className={styles.head}>
                <button
                  className={styles.backBtn}
                  onClick={() => navigate("/")}
                >
                  <img src="/backBtn.svg" alt="Назад" />
                </button>
                <Headling>{data.name}</Headling>
                <Button
                  className={styles.toCartBtn}
                  onClick={() => add(data.id)}
                  appearance="small"
                >
                  <img src="/cart-button-icon.svg" alt="иконка корзины" />В
                  корзину
                </Button>
              </div>
              <div className={styles.product}>
                <img
                  className={styles.image}
                  src={data.image}
                  alt="Изображение продукта"
                />
                <div className={styles.description}>
                  <div className={styles.line}>
                    <div className={styles.text}>Цена</div>
                    <div className={styles.price}>
                      {data.price}&nbsp;
                      <span>₽</span>
                    </div>
                  </div>
                  <hr className={styles.hr} />
                  <div className={styles.line}>
                    <div className={styles.text}>Рейтинг</div>
                    <div className={styles.rating}>
                      {data.rating}&nbsp;
                      <img src="/star.svg" alt="иконка звезды" />
                    </div>
                  </div>
                  <div className={styles.ingredients}>
                    Состав:
                    <ul>
                      {data.ingredients.map((i, j) => {
                        return <li key={j}>{i}</li>;
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </Await>
      </Suspense>
    </>
  );
}
