import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

// Layouts
import MainLayout from './components/layout/MainLayout';
import CustomerDashboardLayout from './components/layout/CustomerDashboardLayout';
import AdminLayout from './components/layout/AdminLayout';

// Public Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ShoeCarePage from './pages/ShoeCarePage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import BookingPage from './pages/BookingPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import WishlistPage from './pages/WishlistPage';

// Customer Dashboard
import DashboardHome from './pages/dashboard/DashboardHome';
import OrdersPage from './pages/dashboard/OrdersPage';
import CareBookingsPage from './pages/dashboard/CareBookingsPage';
import DashboardWishlistPage from './pages/dashboard/DashboardWishlistPage';
import ProfilePage from './pages/dashboard/ProfilePage';

// Admin Pages
import AdminOverview from './pages/admin/AdminOverview';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCare from './pages/admin/AdminCare';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminReports from './pages/admin/AdminReports';
import AdminProfilePage from './pages/admin/AdminProfilePage';

function ProtectedRoute({ children, adminOnly = false }: { children: React.ReactNode; adminOnly?: boolean }) {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (adminOnly && user?.role !== 'admin') return <Navigate to="/dashboard" replace />;
  // Customer-only: admin tidak boleh masuk dashboard customer
  if (!adminOnly && user?.role === 'admin') return <Navigate to="/admin" replace />;
  return <>{children}</>;
}

// Redirect admin ke /admin jika mencoba akses halaman publik marketplace
function PublicOnlyLayout() {
  const { user } = useAuth();
  if (user?.role === 'admin') return <Navigate to="/admin" replace />;
  return <MainLayout />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes — admin diredirect ke /admin */}
      <Route element={<PublicOnlyLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:id" element={<ProductDetailPage />} />
        <Route path="/shoe-care" element={<ShoeCarePage />} />
        <Route path="/shoe-care/book" element={<BookingPage />} />
        <Route path="/shoe-care/:id" element={<ServiceDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
      </Route>

      {/* Auth Pages — redirect jika sudah login */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Customer Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <CustomerDashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="care" element={<CareBookingsPage />} />
        <Route path="wishlist" element={<DashboardWishlistPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* Admin Dashboard */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminOverview />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="care" element={<AdminCare />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="profile" element={<AdminProfilePage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <AppRoutes />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
