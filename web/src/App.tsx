import { Routes, Route, Navigate } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import CreateOrderPage from "./pages/CreateOrderPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrdersPage from "./pages/OrdersPage";
import AuthPage from "./pages/AuthPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/orders/new" element={<CreateOrderPage />} />
      <Route path="/orders/confirmation" element={<OrderConfirmationPage />} />
      <Route path="/auth/*" element={<AuthPage />} />
    </Routes>
  );
}