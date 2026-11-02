import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Truck, RefreshCw, Sparkles, ChevronRight, Zap } from 'lucide-react';
import { products } from '../data/products';
import { careServices } from '../data/careServices';
import { formatPrice } from '../utils';
import ProductCard from '../components/product/ProductCard';

const featuredProducts = products.filter((p) => p.isBestseller || p.isTrending || p.isNew).slice(0, 4);
const popularCare = careServices.filter((s) => s.popular);

// Hitung jumlah produk per kategori secara dinamis dari data produk nyata
const countByCategory = (cat: string) =>
  products.filter((p) => p.category.toLowerCase() === cat.toLowerCase()).length;

const testimonials = [
  { id: 1, name: 'Budi Santoso', role: 'Sneaker Collector', rating: 5, comment: 'KicksCare.id benar-benar mengubah cara saya merawat koleksi sneakers. Hasilnya luar biasa bersih!', avatar: 'BS' },
  { id: 2, name: 'Sari Dewi', role: 'Fashion Blogger', rating: 5, comment: 'Belanja sepatu di sini sangat mudah dan produknya original. Sudah beli 3 kali dan selalu puas!', avatar: 'SD' },
  { id: 3, name: 'Rizal Fauzi', role: 'Streetwear Enthusiast', rating: 5, comment: 'Layanan perawatan professionalnya top. Nike Air Max saya jadi kayak baru lagi setelah deep cleaning.', avatar: 'RF' },
];

const features = [
  { icon: Shield, title: 'Produk Original', description: '100% produk authentic langsung dari brand resmi' },
  { icon: Truck, title: 'Pengiriman Cepat', description: 'Pengiriman ke seluruh Indonesia dalam 2-5 hari kerja' },
  { icon: RefreshCw, title: 'Garansi Return', description: 'Garansi pengembalian produk dalam 7 hari' },
  { icon: Sparkles, title: 'Perawatan Profesional', description: 'Tim ahli berpengalaman untuk merawat sepatu Anda' },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-black text-white overflow-hidden min-h-screen flex items-center">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }} />
        </div>
        {/* Lime accent blobs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-lime-400 rounded-full blur-3xl opacity-10" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-lime-400 rounded-full blur-3xl opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 text-lime-400 text-xs font-bold px-4 py-2 rounded-full mb-6 tracking-widest uppercase border border-lime-400/20">
                <Zap size={12} fill="currentColor" />
                Shoes Marketplace & Care Platform
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-6">
                Your Kicks.<br />
                <span className="text-lime-400">Our Care.</span>
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
                Platform digital terpadu untuk menemukan sepatu impian dan merawat koleksi sneakers Anda. Premium. Modern. Terpercaya.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/shop" className="btn-primary text-base px-8 py-4">
                  Explore Shoes <ArrowRight size={18} />
                </Link>
                <Link to="/shoe-care" className="bg-white/10 text-white border border-white/20 font-semibold px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-200 inline-flex items-center gap-2 text-base">
                  Shoes Care Services
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-8">
                <div>
                  <p className="font-black text-2xl">500+</p>
                  <p className="text-gray-500 text-xs">Produk Sepatu</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <p className="font-black text-2xl">10K+</p>
                  <p className="text-gray-500 text-xs">Pelanggan Puas</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <p className="font-black text-2xl">98%</p>
                  <p className="text-gray-500 text-xs">Satisfaction Rate</p>
                </div>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-lime-400/20 to-transparent rounded-3xl" />
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
                  alt="Featured Sneaker"
                  className="w-full h-full object-cover rounded-3xl"
                />
                {/* Floating cards */}
                <div className="absolute -bottom-6 -left-6 bg-white text-black rounded-2xl p-4 shadow-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-lime-400 rounded-xl flex items-center justify-center">
                      <Sparkles size={18} className="text-black" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">Deep Cleaning</p>
                      <p className="text-xs text-gray-500">Starting Rp150.000</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-lime-400 text-black rounded-2xl p-4 shadow-2xl">
                  <p className="font-black text-2xl">4.9</p>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="currentColor" />)}
                  </div>
                  <p className="text-xs font-medium mt-0.5">Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-lime-50 rounded-xl flex items-center justify-center shrink-0">
                  <f.icon size={20} className="text-lime-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">{f.title}</p>
                  <p className="text-xs text-gray-500 leading-tight">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-lime-600 mb-2">Collections</p>
            <h2 className="section-title">Produk Unggulan</h2>
          </div>
          <Link to="/shop" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-black transition-colors">
            Lihat Semua <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link to="/shop" className="btn-secondary">
            Lihat Semua Produk <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-lime-600 mb-2">Shop By</p>
            <h2 className="section-title">Kategori Sepatu</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: 'Lifestyle', count: countByCategory('Lifestyle'), img: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&q=80', query: 'Lifestyle' },
              { name: 'Running', count: countByCategory('Running'), img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&q=80', query: 'Running' },
              { name: 'Skateboarding', count: countByCategory('Skateboarding'), img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80', query: 'Skateboarding' },
              { name: 'Semua Produk', count: products.length, img: 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=400&q=80', query: '' },
            ].map((cat) => (
              <Link
                key={cat.name}
                to={`/shop?category=${encodeURIComponent(cat.query)}`}
                className="group relative overflow-hidden rounded-2xl aspect-[4/5]"
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-bold">{cat.name}</p>
                  <p className="text-lime-400 text-xs font-medium">{cat.count} Produk</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shoes Care Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-lime-600 mb-2">Shoes Care</p>
            <h2 className="section-title">Layanan Perawatan</h2>
            <p className="section-subtitle mt-2">Percayakan perawatan sneakers Anda kepada tim ahli kami</p>
          </div>
          <Link to="/shoe-care" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-black transition-colors">
            Lihat Semua <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {popularCare.map((service) => (
            <Link key={service.id} to={`/shoe-care/${service.id}`} className="group">
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-40 overflow-hidden bg-gray-50">
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute top-3 right-3 bg-lime-400 text-black text-xs font-bold px-2.5 py-1 rounded-full">POPULER</span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1">{service.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">{formatPrice(service.price)}</span>
                    <span className="text-xs text-gray-400">{service.duration}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-black rounded-3xl overflow-hidden relative">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '32px 32px'
            }} />
          </div>
          <div className="absolute -right-20 top-0 bottom-0 w-96 bg-lime-400/10 rounded-full blur-3xl" />
          <div className="relative flex flex-col md:flex-row items-center justify-between p-10 md:p-14 gap-6">
            <div>
              <span className="text-lime-400 text-xs font-bold uppercase tracking-widest">Limited Offer</span>
              <h2 className="text-3xl md:text-4xl font-black text-white mt-2 mb-3">
                Hemat s/d <span className="text-lime-400">30%</span><br />untuk Pembelian Pertama
              </h2>
              <p className="text-gray-400">Gunakan kode promo <span className="text-white font-mono font-bold bg-white/10 px-2 py-0.5 rounded">KICKS30</span> saat checkout</p>
            </div>
            <Link to="/shop" className="btn-primary text-base px-8 py-4 whitespace-nowrap shrink-0">
              Shop Now <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-lime-600 mb-2">Reviews</p>
            <h2 className="section-title">Apa Kata Mereka</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{t.comment}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-lime-400 rounded-full flex items-center justify-center font-bold text-sm text-black">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center max-w-xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-lime-600 mb-2">Newsletter</p>
          <h2 className="text-3xl font-black text-gray-900 mb-3">Stay in the Loop</h2>
          <p className="text-gray-500 mb-6">Dapatkan info produk terbaru, promo eksklusif, dan tips perawatan sepatu langsung di inbox Anda.</p>
          <form className="flex gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email Anda"
              className="input-field flex-1"
            />
            <button type="submit" className="btn-dark whitespace-nowrap">
              Subscribe
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-3">Kami tidak akan pernah mengirim spam. Anda dapat berhenti berlangganan kapan saja.</p>
        </div>
      </section>
    </div>
  );
}
