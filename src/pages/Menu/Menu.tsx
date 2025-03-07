import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import Headling from "../../components/Headling/Headling";
import Search from "../../components/Search/Search";
import { PREFIX } from "../../helpers/API";
import { IProduct } from "../../interfaces/product.interface";
import styles from "./Menu.module.css";
import axios, { AxiosError } from "axios";
import { MenuList } from "./MenuList/MenuList";
import { Loading } from "../../components/Loading/Loading";
import { useDebounce } from "use-debounce";

export function Menu() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [debouncedText] = useDebounce(searchInputValue, 1000);

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
  };

  const filterList = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  const getFilteredMenu = useCallback(
    async (value: string, abortController: AbortController) => {
      try {
        setIsloading(true);
        const { data } = await axios.get<IProduct[]>(
          `${PREFIX}/products?name=${value}`,
          { signal: abortController.signal }
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
    },
    []
  );
  useEffect(() => {
    getMenu();
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    getFilteredMenu(debouncedText, abortController);
    return () => {
      abortController.abort("Component unmounted or new request initiated");
    };
  }, [debouncedText, getFilteredMenu]);

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
        {error && error != "canceled" && <>{error}</>}
        {!isLoading && products.length > 0 && <MenuList products={products} />}
        {isLoading && <Loading />}
        {!isLoading && products.length === 0 && <>Ничего не найдено</>}
      </>
    </>
  );
}

export default Menu;
