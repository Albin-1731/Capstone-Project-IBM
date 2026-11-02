import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Shield, Truck, RefreshCw, Minus, Plus, ChevronRight, Zap, Check } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../utils';
import ProductCard from '../components/product/ProductCard';

type Tab = 'description' | 'specs' | 'reviews';

const MOCK_REVIEWS = [
  { id: 1, name: 'Budi S.', rating: 5, date: '2025-03-15', comment: 'Produk original, kualitas top. Pengiriman cepat, packaging aman. Sangat puas!' },
  { id: 2, name: 'Rina P.', rating: 5, date: '2025-02-28', comment: 'Sesuai deskripsi, fit sempurna. Udah beli 2x di sini dan gak pernah kecewa.' },
  { id: 3, name: 'Toni M.', rating: 4, date: '2025-01-10', comment: 'Sepatu bagus banget, bahan premium. Ukurannya sedikit besar, sarankan order setengah ukuran lebih kecil.' },
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = products.find((p) => p.id === id);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('description');
  const [sizeError, setSizeError] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <p className="text-5xl">😕</p>
        <h2 className="font-bold text-xl">Produk tidak ditemukan</h2>
        <Link to="/shop" className="btn-primary">Kembali ke Shop</Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.brand === product.brand || p.category === product.category))
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2500);
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    if (!selectedSize || !selectedColor) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2500);
      return;
    }
    const buyNowItem = { product, size: selectedSize, color: selectedColor, quantity };
    sessionStorage.setItem('kickscare_buynow', JSON.stringify(buyNowItem));
    navigate('/checkout?mode=buynow');
  };

  const ratingDist = [
    { stars: 5, pct: 72 },
    { stars: 4, pct: 18 },
    { stars: 3, pct: 7 },
    { stars: 2, pct: 2 },
    { stars: 1, pct: 1 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-gray-900">Home</Link>
        <ChevronRight size={14} />
        <Link to="/shop" className="hover:text-gray-900">Shop</Link>
        <ChevronRight size={14} />
        <Link to={`/shop?category=${product.category}`} className="hover:text-gray-900">{product.category}</Link>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10 mb-12">
        {/* Image Gallery */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex sm:flex-col gap-3 order-2 sm:order-1">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImg === i ? 'border-black' : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
          {/* Main Image */}
          <div className="flex-1 order-1 sm:order-2">
            <div className="aspect-square bg-gray-50 rounded-3xl overflow-hidden relative">
              <img
                src={product.images[activeImg]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.discount && (
                <span className="absolute top-4 left-4 badge bg-red-500 text-white text-sm">-{product.discount}%</span>
              )}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm ${
                  isInWishlist(product.id) ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:text-red-500'
                }`}
                aria-label={isInWishlist(product.id) ? 'Hapus dari wishlist' : 'Tambah ke wishlist'}
              >
                <Heart size={18} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="tag uppercase tracking-wider">{product.brand}</span>
            <span className="tag">{product.category}</span>
            {product.isNew && <span className="badge bg-lime-400 text-black">NEW</span>}
            {product.isBestseller && <span className="badge bg-black text-white">BESTSELLER</span>}
            {product.isTrending && <span className="badge bg-orange-400 text-white">TRENDING</span>}
          </div>

          <h1 className="text-3xl font-black text-gray-900 mb-2">{product.name}</h1>

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-200'} fill="currentColor" />
              ))}
              <span className="text-sm font-semibold ml-1">{product.rating}</span>
            </div>
            <span className="text-sm text-gray-500">({product.reviewCount.toLocaleString()} ulasan)</span>
            <span className={`text-sm font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
              {product.stock > 10 ? `Stok: ${product.stock}` : product.stock > 0 ? `⚠ Sisa ${product.stock}` : 'Habis'}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-black text-gray-900">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
            )}
            {product.discount && (
              <span className="text-lime-600 font-bold text-sm bg-lime-50 px-2 py-0.5 rounded-full">Hemat {product.discount}%</span>
            )}
          </div>

          {/* Error hint */}
          {sizeError && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-2.5 text-sm font-medium mb-4">
              ⚠ Silakan pilih ukuran dan warna terlebih dahulu
            </div>
          )}

          {/* Color Selection */}
          <div className="mb-5">
            <p className="text-sm font-semibold text-gray-900 mb-2">
              Warna {selectedColor && <span className="font-normal text-gray-500">— {selectedColor}</span>}
            </p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-xl text-sm border-2 transition-all ${
                    selectedColor === color
                      ? 'border-black bg-black text-white font-semibold'
                      : 'border-gray-200 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-gray-900">
                Ukuran (EU) {selectedSize && <span className="font-normal text-gray-500">— {selectedSize}</span>}
              </p>
              <span className="text-xs text-gray-400 underline cursor-pointer">Panduan Ukuran</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-xl text-sm font-medium border-2 transition-all ${
                    selectedSize === size
                      ? 'bg-black text-white border-black'
                      : 'border-gray-200 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <p className="text-sm font-semibold text-gray-900">Jumlah:</p>
            <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="w-12 text-center font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
            <span className="text-xs text-gray-400">Stok: {product.stock}</span>
          </div>

          {/* Subtotal preview */}
          {selectedSize && selectedColor && (
            <div className="bg-gray-50 rounded-xl px-4 py-3 flex items-center justify-between mb-5">
              <span className="text-sm text-gray-500">Subtotal ({quantity} item)</span>
              <span className="font-black text-gray-900">{formatPrice(product.price * quantity)}</span>
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 flex items-center justify-center gap-2 font-semibold py-3.5 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                addedToCart
                  ? 'bg-lime-400 text-black'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              {addedToCart ? <><Check size={18} /> Ditambahkan!</> : <><ShoppingCart size={18} /> Tambah ke Keranjang</>}
            </button>
            <button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="flex-1 btn-dark py-3.5 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Zap size={16} fill="currentColor" /> Beli Sekarang
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Shield, text: 'Produk Original' },
              { icon: Truck, text: 'Gratis Ongkir >500K' },
              { icon: RefreshCw, text: 'Return 7 Hari' },
            ].map((b) => (
              <div key={b.text} className="flex flex-col items-center gap-1 p-3 bg-gray-50 rounded-xl">
                <b.icon size={16} className="text-gray-500" />
                <span className="text-xs text-gray-500 text-center">{b.text}</span>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-5 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs: Description / Specs / Reviews */}
      <div className="mb-12">
        <div className="flex border-b border-gray-200 mb-6">
          {(['description', 'specs', 'reviews'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all capitalize -mb-px ${
                activeTab === tab
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab === 'description' ? 'Deskripsi' : tab === 'specs' ? 'Spesifikasi' : `Ulasan (${product.reviewCount.toLocaleString()})`}
            </button>
          ))}
        </div>

        {activeTab === 'description' && (
          <div className="max-w-3xl">
            <p className="text-gray-600 leading-relaxed text-base">{product.description}</p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {[
                { label: 'Brand', value: product.brand },
                { label: 'Kategori', value: product.category },
                { label: 'Rating', value: `${product.rating} / 5.0` },
                { label: 'Total Ulasan', value: product.reviewCount.toLocaleString() },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">{item.label}</span>
                  <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="max-w-xl">
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
              {[
                { label: 'Merek', value: product.brand },
                { label: 'Model', value: product.name },
                { label: 'Kategori', value: product.category },
                { label: 'Ukuran Tersedia', value: product.sizes.join(', ') + ' (EU)' },
                { label: 'Pilihan Warna', value: product.colors.join(', ') },
                { label: 'Stok', value: product.stock > 0 ? `${product.stock} unit` : 'Habis' },
                { label: 'Harga', value: formatPrice(product.price) },
              ].map((row, i) => (
                <div key={row.label} className={`flex items-center justify-between px-5 py-3 text-sm ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <span className="text-gray-500 font-medium">{row.label}</span>
                  <span className="font-semibold text-gray-900 text-right">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="max-w-3xl">
            {/* Rating summary */}
            <div className="flex flex-col sm:flex-row gap-6 mb-6 bg-gray-50 rounded-2xl p-5">
              <div className="text-center shrink-0">
                <p className="text-5xl font-black text-gray-900">{product.rating}</p>
                <div className="flex gap-0.5 justify-center my-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-200'} fill="currentColor" />
                  ))}
                </div>
                <p className="text-xs text-gray-500">{product.reviewCount.toLocaleString()} ulasan</p>
              </div>
              <div className="flex-1 space-y-1.5">
                {ratingDist.map((r) => (
                  <div key={r.stars} className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-4 text-right">{r.stars}</span>
                    <Star size={10} className="text-yellow-400" fill="currentColor" />
                    <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                      <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: `${r.pct}%` }} />
                    </div>
                    <span className="text-xs text-gray-400 w-8">{r.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Review items */}
            <div className="space-y-4">
              {MOCK_REVIEWS.map((rev) => (
                <div key={rev.id} className="bg-white border border-gray-100 rounded-2xl p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center font-bold text-xs text-black">
                        {rev.name.slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-900">{rev.name}</p>
                        <p className="text-xs text-gray-400">{new Date(rev.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} size={12} className="text-yellow-400" fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">"{rev.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-gray-900">Produk Terkait</h2>
            <Link to={`/shop?category=${product.category}`} className="text-sm text-gray-500 hover:text-black flex items-center gap-1">
              Lihat Semua <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
