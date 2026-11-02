import { Link } from 'react-router-dom';
import { Zap, Mail, Phone, MapPin, Globe, MessageCircle, PlayCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-black text-xl tracking-tight mb-4">
              <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center">
                <Zap size={18} className="text-black" fill="black" />
              </div>
              <span>Kicks<span className="text-lime-400">Care</span>.id</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Platform digital terpadu untuk berbelanja sepatu premium dan merawat koleksi sneakers Anda.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-white/10 hover:bg-lime-400 hover:text-black rounded-full flex items-center justify-center transition-all">
                <Globe size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 hover:bg-lime-400 hover:text-black rounded-full flex items-center justify-center transition-all">
                <MessageCircle size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 hover:bg-lime-400 hover:text-black rounded-full flex items-center justify-center transition-all">
                <PlayCircle size={16} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-4">Marketplace</h4>
            <ul className="space-y-2.5">
              {['All Products', 'Nike', 'Adidas', 'Vans', 'New Arrivals', 'Sale'].map((item) => (
                <li key={item}>
                  <Link to="/shop" className="text-gray-400 hover:text-lime-400 text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Care */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-4">Shoes Care</h4>
            <ul className="space-y-2.5">
              {['Basic Cleaning', 'Deep Cleaning', 'Unyellowing', 'Repaint', 'Reglue', 'Leather Treatment'].map((item) => (
                <li key={item}>
                  <Link to="/shoe-care" className="text-gray-400 hover:text-lime-400 text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-4">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin size={16} className="text-lime-400 shrink-0 mt-0.5" />
                <span>Jl. Sudirman No. 88, Jakarta Selatan, DKI Jakarta 12190</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone size={16} className="text-lime-400 shrink-0" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail size={16} className="text-lime-400 shrink-0" />
                <span>hello@kickscare.id</span>
              </li>
            </ul>
            <div className="mt-5">
              <h5 className="text-sm font-semibold mb-2">Jam Operasional</h5>
              <p className="text-gray-400 text-xs leading-relaxed">
                Senin – Sabtu: 09.00 – 21.00 WIB<br />
                Minggu: 10.00 – 18.00 WIB
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">© 2025 KicksCare.id. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">Kebijakan Privasi</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
