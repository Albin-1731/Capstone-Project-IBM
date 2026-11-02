import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { products } from '../data/products';
import ProductCard from '../components/product/ProductCard';

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-black text-gray-900 mb-2">Wishlist Saya</h1>
      <p className="text-gray-500 text-sm mb-6">{wishlistProducts.length} produk tersimpan</p>

      {wishlistProducts.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart size={40} className="text-gray-300" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Wishlist Kosong</h2>
          <p className="text-gray-500 mb-6">Simpan produk yang Anda sukai untuk mudah ditemukan kembali</p>
          <Link to="/shop" className="btn-primary">
            <ShoppingBag size={16} /> Jelajahi Produk
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
