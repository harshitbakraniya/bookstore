import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import Favorites from "../pages/Favorites/index.tsx";
import Home from "../pages/Home/index.tsx";
import ProductDetailSkeleton from "../components/Skeletons/ProductDetail.tsx";

const BookDetails = React.lazy(
  () => import("../pages/BooksDetail/index.tsx"),
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/books/:id",
        element: (
          <React.Suspense fallback={<ProductDetailSkeleton />}>
            <BookDetails />
          </React.Suspense>
        ),
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
    ],
  },
]);
