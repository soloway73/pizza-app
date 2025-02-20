import { useLoaderData /*, useParams*/ } from "react-router-dom";
import { IProduct } from "../../interfaces/product.interface";

export function Product() {
  // const { id } = useParams();
  const data = useLoaderData() as IProduct;
  return <>Product - {data.name}</>;
}
