import { useWishlist } from '../../context/WishlistContext';
import { products } from '../../data/products';
import ProductCard from '../../components/product/ProductCard';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DashboardWishlistPage() {
  const { wishlist } = useWishlist();
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-gray-900">Wishlist Saya</h1>

      {wishlistProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <Heart size={40} className="text-gray-200 mx-auto mb-4" />
          <h3 className="font-bold text-gray-900 mb-2">Wishlist kosong</h3>
          <p className="text-gray-500 text-sm mb-4">Simpan produk favorit Anda di sini</p>
          <Link to="/shop" className="btn-primary">Jelajahi Produk</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
