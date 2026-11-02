import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { Eye, EyeOff, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Jika sudah login, redirect sesuai role
  if (isAuthenticated) {
    return <Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const success = await login(email, password);
    setIsLoading(false);
    if (success) {
      const userData = JSON.parse(localStorage.getItem('kickscare_user') || '{}');
      navigate(userData.role === 'admin' ? '/admin' : '/dashboard');
    } else {
      setError('Email atau password salah. Coba lagi.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 font-black text-2xl tracking-tight mb-2">
            <div className="w-9 h-9 bg-lime-400 rounded-lg flex items-center justify-center">
              <Zap size={20} className="text-black" fill="black" />
            </div>
            <span>Kicks<span className="text-lime-500">Care</span>.id</span>
          </Link>
          <h1 className="text-2xl font-black text-gray-900 mt-4">Selamat datang kembali</h1>
          <p className="text-gray-500 text-sm mt-1">Masuk ke akun KicksCare.id Anda</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-11"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-dark justify-center py-3.5"
            >
              {isLoading ? 'Masuk...' : 'Masuk'}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-gray-100">
            <p className="text-sm text-gray-500 text-center">
              Belum punya akun?{' '}
              <Link to="/register" className="font-semibold text-black hover:text-gray-700">Daftar Sekarang</Link>
            </p>
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-xl text-xs text-gray-500 space-y-1">
            <p className="font-semibold text-gray-700">Demo Akun:</p>
            <p>👤 Customer: user@kickscare.id / password123</p>
            <p>🔑 Admin: admin@kickscare.id / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
