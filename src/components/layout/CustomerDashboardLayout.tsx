import { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard, ShoppingBag, Sparkles, Heart, User, LogOut, Bell, Zap, Menu,
  Home, ShoppingCart, Scissors, ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/dashboard/orders', label: 'Pesanan Saya', icon: ShoppingBag },
  { to: '/dashboard/care', label: 'Shoes Care', icon: Sparkles },
  { to: '/dashboard/wishlist', label: 'Wishlist', icon: Heart },
  { to: '/dashboard/profile', label: 'Profil & Akun', icon: User },
];

// Link ke halaman marketplace (keluar dari dashboard)
const marketplaceLinks = [
  { to: '/', label: 'Beranda', icon: Home },
  { to: '/shop', label: 'Shop', icon: ShoppingCart },
  { to: '/shoe-care', label: 'Shoes Care', icon: Scissors },
];

export default function CustomerDashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-gray-100">
        <Link to="/" className="flex items-center gap-2 font-black text-lg tracking-tight mb-4">
          <div className="w-7 h-7 bg-lime-400 rounded-lg flex items-center justify-center">
            <Zap size={14} className="text-black" fill="black" />
          </div>
          <span>Kicks<span className="text-lime-500">Care</span>.id</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-lime-400 rounded-full flex items-center justify-center font-bold text-sm text-black select-none">
            {user?.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm text-gray-900 truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Dashboard navigation */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3 mb-2 mt-1">Akun Saya</p>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}

        {/* Separator */}
        <div className="border-t border-gray-100 my-3" />

        {/* Back to marketplace */}
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3 mb-2">Marketplace</p>
        {marketplaceLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-all"
          >
            <link.icon size={18} />
            {link.label}
            <ExternalLink size={12} className="ml-auto text-gray-300" />
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 w-full transition-all"
        >
          <LogOut size={18} />
          Keluar
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-gray-100 flex-col fixed top-0 left-0 bottom-0 z-30">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Mobile Top Bar */}
        <div className="lg:hidden bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-gray-100 rounded-xl">
            <Menu size={20} />
          </button>
          <Link to="/" className="font-black text-lg tracking-tight">
            Kicks<span className="text-lime-500">Care</span>.id
          </Link>
          <button className="p-2 hover:bg-gray-100 rounded-xl">
            <Bell size={20} />
          </button>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
