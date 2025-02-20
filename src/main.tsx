import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout/Menu/Layout";
import "./index.css";
import { Cart } from "./pages/Cart/Cart";
import { Error as ErrorPage } from "./pages/Error/Error";
import { Product } from "./pages/Product/Product";
import { PREFIX } from "./helpers/API";
import axios from "axios";

const Menu = lazy(() => import("./pages/Menu/Menu"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<>Загрузка...</>}>
            <Menu />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
      {
        path: "/product/:id",
        element: <Product />,
        errorElement: <>Ошибка</>,
        loader: async ({ params }) => {
          await new Promise<void>((resolve) => {
            setTimeout(() => {
              resolve();
            }, 2000);
          });
          const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
          return data;
        },
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
