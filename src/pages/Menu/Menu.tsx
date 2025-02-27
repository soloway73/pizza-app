import { useEffect, useState } from "react";
import Headling from "../../components/Headling/Headling";
import Search from "../../components/Search/Search";
import { PREFIX } from "../../helpers/API";
import { IProduct } from "../../interfaces/product.interface";
import styles from "./Menu.module.css";
import axios, { AxiosError } from "axios";
import { MenuList } from "./MenuList/MenuList";

export function Menu() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const getMenu = async () => {
    try {
      setIsloading(true);
      const { data } = await axios.get<IProduct[]>(`${PREFIX}/products`);
      setProducts(data);
      setIsloading(false);
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.message);
      }
      console.error(e);
      setIsloading(false);
      return;
    }

    // try {
    //   const res = await fetch(`${PREFIX}/products`);
    //   if (!res.ok) {
    //     return;
    //   }
    //   const data = (await res.json()) as Product[];
    //   setProducts(data);
    // } catch (e) {
    //   console.error(e);
    //   return;
    // }
  };
  useEffect(() => {
    getMenu();
  }, []);
  return (
    <>
      <div className={styles.head}>
        <Headling>Меню</Headling>
        <Search placeholder="Введите блюдо или состав" />
      </div>
      <>
        {error && <>{error}</>}
        {!isLoading && <MenuList products={products} />}
        {isLoading && <>Загружаем продукты...</>}
      </>
    </>
  );
}

export default Menu;
