import { Await, useLoaderData } from "react-router-dom";
import { IProduct } from "../../interfaces/product.interface";
import { Suspense } from "react";

export function Product() {
  // const { id } = useParams();
  const data = useLoaderData() as { data: IProduct };
  console.log(data);
  return (
    <>
      <Suspense fallback={"Загружаю..."}>
        <Await resolve={data.data}>
          {(data: IProduct) => <>Product - {data.name}</>}
        </Await>
      </Suspense>
    </>
  );
}
