import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Zap, X, Minus, Plus, Check } from 'lucide-react';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatPrice } from '../../utils';

interface ProductCardProps {
  product: Product;
}

type ModalMode = 'buy' | 'cart' | null;

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();
  const inWishlist = isInWishlist(product.id);

  // Modal state
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [cartSuccess, setCartSuccess] = useState(false);

  const openModal = (mode: ModalMode, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Reset selections each time modal opens
    setSelectedSize('');
    setSelectedColor('');
    setQuantity(1);
    setCartSuccess(false);
    setModalMode(mode);
  };

  const closeModal = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setModalMode(null);
  };

  const handleConfirmBuy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selectedSize || !selectedColor) return;
    const buyNowItem = { product, size: selectedSize, color: selectedColor, quantity };
    sessionStorage.setItem('kickscare_buynow', JSON.stringify(buyNowItem));
    setModalMode(null);
    navigate('/checkout?mode=buynow');
  };

  const handleConfirmCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selectedSize || !selectedColor) return;
    addToCart(product, selectedSize, selectedColor, quantity);
    setCartSuccess(true);
    setTimeout(() => {
      setModalMode(null);
      setCartSuccess(false);
    }, 1200);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const canConfirm = selectedSize && selectedColor;

  return (
    <>
      <Link to={`/shop/${product.id}`} className="group block">
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          {/* Image */}
          <div className="relative bg-gray-50 aspect-square overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.isNew && <span className="badge bg-lime-400 text-black">NEW</span>}
              {product.isBestseller && <span className="badge bg-black text-white">BESTSELLER</span>}
              {product.isTrending && <span className="badge bg-orange-400 text-white">TRENDING</span>}
              {product.discount && <span className="badge bg-red-500 text-white">-{product.discount}%</span>}
            </div>
            {/* Wishlist */}
            <button
              onClick={handleWishlist}
              className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                inWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:text-red-500 shadow-sm'
              }`}
              aria-label={inWishlist ? 'Hapus dari wishlist' : 'Tambah ke wishlist'}
            >
              <Heart size={16} fill={inWishlist ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Info */}
          <div className="p-4">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">{product.brand}</p>
            <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-2 line-clamp-1">{product.name}</h3>
            <div className="flex items-center gap-1.5 mb-2">
              <Star size={12} className="text-yellow-400" fill="currentColor" />
              <span className="text-xs font-medium text-gray-700">{product.rating}</span>
              <span className="text-xs text-gray-400">({product.reviewCount.toLocaleString()})</span>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-bold text-gray-900">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={(e) => openModal('buy', e)}
                disabled={product.stock === 0}
                className="flex-1 bg-black text-white text-xs font-semibold py-2.5 rounded-xl flex items-center justify-center gap-1.5 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Zap size={13} fill="currentColor" />
                Beli
              </button>
              <button
                onClick={(e) => openModal('cart', e)}
                disabled={product.stock === 0}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all flex-shrink-0 bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Tambah ke keranjang"
              >
                <ShoppingCart size={16} />
              </button>
            </div>
            {product.stock === 0 && (
              <p className="text-xs text-red-500 font-medium mt-2 text-center">Stok Habis</p>
            )}
          </div>
        </div>
      </Link>

      {/* Modal overlay */}
      {modalMode && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          onClick={(e) => { e.stopPropagation(); closeModal(); }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Panel */}
          <div
            className="relative bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl shadow-2xl z-10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle bar (mobile) */}
            <div className="sm:hidden flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-gray-200 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-start gap-3 px-5 pt-4 pb-4 border-b border-gray-100">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{product.brand}</p>
                <p className="font-bold text-gray-900 leading-tight">{product.name}</p>
                <p className="font-black text-lg text-gray-900 mt-0.5">{formatPrice(product.price)}</p>
              </div>
              <button
                onClick={closeModal}
                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-5 pt-4 pb-5 space-y-5">
              {/* Title */}
              <p className="text-sm font-semibold text-gray-700">
                {modalMode === 'buy' ? '⚡ Pilih opsi untuk pembelian' : '🛒 Pilih opsi untuk keranjang'}
              </p>

              {/* Size selection */}
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-2">
                  Ukuran (EU)
                  {selectedSize && <span className="font-normal text-gray-500 ml-1">— {selectedSize}</span>}
                  {!selectedSize && <span className="text-red-400 text-xs ml-1">* wajib dipilih</span>}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-11 h-11 rounded-xl text-sm font-medium border-2 transition-all ${
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

              {/* Color selection */}
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-2">
                  Warna
                  {selectedColor && <span className="font-normal text-gray-500 ml-1">— {selectedColor}</span>}
                  {!selectedColor && <span className="text-red-400 text-xs ml-1">* wajib dipilih</span>}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3.5 py-2 rounded-xl text-sm border-2 transition-all ${
                        selectedColor === color
                          ? 'bg-black text-white border-black font-semibold'
                          : 'border-gray-200 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-2">Jumlah</p>
                <div className="inline-flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <Minus size={15} />
                  </button>
                  <span className="w-12 text-center font-bold text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <Plus size={15} />
                  </button>
                </div>
                <span className="text-xs text-gray-400 ml-3">Stok tersedia: {product.stock}</span>
              </div>

              {/* Subtotal preview */}
              {canConfirm && (
                <div className="bg-gray-50 rounded-xl px-4 py-3 flex items-center justify-between">
                  <span className="text-sm text-gray-500">Subtotal ({quantity} item)</span>
                  <span className="font-black text-gray-900">{formatPrice(product.price * quantity)}</span>
                </div>
              )}

              {/* CTA Button */}
              {modalMode === 'buy' ? (
                <button
                  onClick={handleConfirmBuy}
                  disabled={!canConfirm}
                  className="w-full bg-black text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Zap size={16} fill="currentColor" />
                  {canConfirm ? `Beli Sekarang — ${formatPrice(product.price * quantity)}` : 'Pilih ukuran & warna dulu'}
                </button>
              ) : cartSuccess ? (
                <div className="w-full bg-lime-400 text-black font-bold py-3.5 rounded-xl flex items-center justify-center gap-2">
                  <Check size={18} />
                  Berhasil ditambahkan ke keranjang!
                </div>
              ) : (
                <button
                  onClick={handleConfirmCart}
                  disabled={!canConfirm}
                  className="w-full bg-gray-100 text-gray-900 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ShoppingCart size={16} />
                  {canConfirm ? `Tambah ke Keranjang — ${formatPrice(product.price * quantity)}` : 'Pilih ukuran & warna dulu'}
                </button>
              )}

              {!canConfirm && (
                <p className="text-xs text-center text-gray-400 -mt-2">Pilih ukuran dan warna terlebih dahulu</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
