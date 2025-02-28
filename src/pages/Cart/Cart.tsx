import { useSelector } from "react-redux";
import Headling from "../../components/Headling/Headling";
import { RootState } from "../../store/store";
import CartItem from "../../components/CartItem/CartItem";
import { useEffect, useState } from "react";
import { IProduct } from "../../interfaces/product.interface";
import axios from "axios";
import { PREFIX } from "../../helpers/API";

export function Cart() {
  const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
  const items = useSelector((s: RootState) => s.cart.items);

  const getItem = async (id: number) => {
    const { data } = await axios.get<IProduct>(`${PREFIX}/products/${id}`);
    return data;
  };

  const loadAllItems = async () => {
    const res = await Promise.all(items.map((i) => getItem(i.id)));
    setCartProducts(res);
  };

  useEffect(() => {
    loadAllItems();
  }, [items]);
  return (
    <>
      <Headling>Корзина</Headling>
      {items.map((i) => {
        const product = cartProducts.find((p) => p.id === i.id);
        if (!product) {
          return;
        }
        return <CartItem key={i.id} count={i.count} {...product} />;
      })}
    </>
  );
}
