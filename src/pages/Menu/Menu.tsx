import { ChangeEvent, useEffect, useState } from "react";
import Headling from "../../components/Headling/Headling";
import Search from "../../components/Search/Search";
import { PREFIX } from "../../helpers/API";
import { IProduct } from "../../interfaces/product.interface";
import styles from "./Menu.module.css";
import axios, { AxiosError } from "axios";
import { MenuList } from "./MenuList/MenuList";
import { Loading } from "../../components/Loading/Loading";

export function Menu() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [searchInputValue, setSearchInputValue] = useState<string>("");

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

  const filterList = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  const getFilteredMenu = async (value: string) => {
    try {
      setIsloading(true);
      const { data } = await axios.get<IProduct[]>(
        `${PREFIX}/products?name=${value}`
      );
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
  };
  useEffect(() => {
    getMenu();
  }, []);

  useEffect(() => {
    getFilteredMenu(searchInputValue);
  }, [searchInputValue]);

  return (
    <>
      <div className={styles.head}>
        <Headling>Меню</Headling>
        <Search
          placeholder="Введите блюдо или состав"
          value={searchInputValue}
          onChange={filterList}
        />
      </div>
      <>
        {error && <>{error}</>}
        {!isLoading && products.length > 0 && <MenuList products={products} />}
        {isLoading && <Loading />}
        {!isLoading && products.length === 0 && <>Ничего не найдено</>}
      </>
    </>
  );
}

export default Menu;
