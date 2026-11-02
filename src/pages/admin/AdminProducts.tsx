import { useState } from 'react';
import { products as initialProducts } from '../../data/products';
import { formatPrice } from '../../utils';
import { Plus, Pencil, Trash2, Search, Package } from 'lucide-react';
import type { Product } from '../../types';

export default function AdminProducts() {
  const [productList, setProductList] = useState([...initialProducts]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '', brand: '', category: '', price: '', stock: '', description: '',
  });

  const filtered = productList.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditProduct(null);
    setForm({ name: '', brand: '', category: '', price: '', stock: '', description: '' });
    setShowModal(true);
  };

  const openEdit = (p: Product) => {
    setEditProduct(p);
    setForm({
      name: p.name, brand: p.brand, category: p.category,
      price: String(p.price), stock: String(p.stock), description: p.description,
    });
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editProduct) {
      setProductList((prev) =>
        prev.map((p) =>
          p.id === editProduct.id
            ? { ...p, ...form, price: Number(form.price), stock: Number(form.stock) }
            : p
        )
      );
    } else {
      const newProduct: Product = {
        id: 'p' + Date.now(),
        name: form.name, brand: form.brand, category: form.category,
        price: Number(form.price), stock: Number(form.stock), description: form.description,
        images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'],
        sizes: ['40', '41', '42', '43'],
        colors: ['Default'],
        rating: 4.5, reviewCount: 0, tags: [],
      };
      setProductList((prev) => [...prev, newProduct]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setProductList((prev) => prev.filter((p) => p.id !== id));
    setDeleteId(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-gray-900">Product Management</h1>
        <button onClick={openAdd} className="btn-dark text-sm py-2 px-4">
          <Plus size={16} /> Tambah Produk
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari produk atau merek..."
          className="input-field pl-10"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Produk</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Merek</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Kategori</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Harga</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Stok</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Rating</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                        <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-medium text-gray-900 line-clamp-1">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{p.brand}</td>
                  <td className="px-4 py-3 text-gray-600">{p.category}</td>
                  <td className="px-4 py-3 font-semibold">{formatPrice(p.price)}</td>
                  <td className="px-4 py-3">
                    <span className={`badge ${p.stock > 10 ? 'bg-green-100 text-green-700' : p.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">⭐ {p.rating}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(p)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => setDeleteId(p.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Package size={32} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500">Tidak ada produk ditemukan</p>
          </div>
        )}
      </div>

      {/* Modal Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="font-bold text-gray-900 text-lg mb-4">
              {editProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
            </h2>
            <form onSubmit={handleSave} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="Nama sepatu" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Merek</label>
                  <input required value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} className="input-field" placeholder="Nike, Adidas..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field">
                    <option value="">Pilih kategori</option>
                    <option>Lifestyle</option>
                    <option>Running</option>
                    <option>Skateboarding</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Harga (IDR)</label>
                  <input required type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="input-field" placeholder="1500000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stok</label>
                  <input required type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="input-field" placeholder="20" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field resize-none" rows={3} placeholder="Deskripsi produk..." />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="btn-dark flex-1 justify-center">Simpan</button>
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1 justify-center">Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h3 className="font-bold text-gray-900 mb-2">Hapus Produk?</h3>
            <p className="text-gray-500 text-sm mb-5">Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteId)} className="btn-dark flex-1 justify-center bg-red-600 hover:bg-red-700">Hapus</button>
              <button onClick={() => setDeleteId(null)} className="btn-secondary flex-1 justify-center">Batal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
