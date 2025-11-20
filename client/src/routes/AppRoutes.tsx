import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import PageLoader from "../components/pageloader/PageLoader.tsx";

//Auth
import Login from "../pages/Auth/Login.tsx";

//Landing
import LandingPage from "../pages/Landing/LandingPage.tsx";

//core
import App from "../App.tsx";
import Categories from "../pages/Categories/Categories.tsx";
import Product from "@/pages/Products/Product.tsx";
import AllProducts from "@/pages/Products/AllProducts.tsx";
import CategoryProducts from "@/pages/Products/CategoryProducts.tsx";
import Customers from "@/pages/Customers/Customers.tsx";
import Customer from "@/pages/Customers/Customer.tsx";
import CustomerBuying from "@/pages/Customers/CustomerBuying.tsx";
import ProductCreate from "@/pages/Products/ProductCreate.tsx";
import CustomerCreate from "@/pages/Customers/CustomerCreate.tsx";

export const AppRoutes = () => {
  const routes = createRoutesFromElements(
    <Route element={<PageLoader />}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<App />}>
        <Route index element={<Categories />} />
        <Route path="products" element={<AllProducts />} />
        <Route path="customers" element={<Customers />} />
        <Route path="customers/create" element={<CustomerCreate />} />
        <Route path="products/category/:id" element={<CategoryProducts />} />
        <Route path="customers/:id" element={<Customer />} />
        <Route path="products/:id" element={<Product />} />
        <Route path="customers/:id/buy" element={<CustomerBuying />} />
        <Route
          path="products/category/:id/create"
          element={<ProductCreate />}
        />
      </Route>
    </Route>
  );
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};
