import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Phone, Save, Shield } from 'lucide-react';

export default function AdminProfilePage() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name: form.name, phone: form.phone });
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-black text-gray-900">Profil Administrator</h1>

      <div className="bg-white border border-gray-100 rounded-2xl p-6">
        {/* Avatar */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
          <div className="w-16 h-16 bg-lime-400 rounded-full flex items-center justify-center font-black text-xl text-black">
            AD
          </div>
          <div>
            <h2 className="font-bold text-gray-900 text-lg">{user?.name}</h2>
            <p className="text-gray-500 text-sm">{user?.email}</p>
            <span className="inline-flex items-center gap-1.5 mt-1 text-xs font-semibold bg-black text-lime-400 px-2.5 py-1 rounded-full">
              <Shield size={11} /> Administrator
            </span>
          </div>
        </div>

        {saved && (
          <div className="mb-4 bg-green-50 text-green-700 text-sm px-4 py-3 rounded-xl">
            ✓ Profil berhasil diperbarui
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <User size={14} /> Nama Lengkap
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                disabled={!isEditing}
                className="input-field disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Mail size={14} /> Email
              </label>
              <input
                value={user?.email}
                disabled
                className="input-field bg-gray-50 cursor-not-allowed text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Phone size={14} /> No. Telepon
              </label>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                disabled={!isEditing}
                className="input-field disabled:bg-gray-50 disabled:cursor-not-allowed"
                placeholder="08xxx"
              />
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <p className="text-sm text-gray-500 bg-gray-50 rounded-xl px-4 py-3">
              <span className="font-semibold text-gray-700">Catatan:</span> Akun administrator hanya dapat mengakses halaman pengelolaan sistem. Fitur marketplace seperti keranjang belanja dan wishlist tidak tersedia untuk akun ini.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            {isEditing ? (
              <>
                <button type="submit" className="btn-dark gap-2">
                  <Save size={16} /> Simpan Perubahan
                </button>
                <button type="button" onClick={() => setIsEditing(false)} className="btn-secondary">Batal</button>
              </>
            ) : (
              <button type="button" onClick={() => setIsEditing(true)} className="btn-secondary">
                Edit Profil
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
