import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Phone, MapPin, Save, ArrowLeft, CheckCircle, Pencil } from 'lucide-react';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    province: user?.address?.province || '',
    postalCode: user?.address?.postalCode || '',
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Nama tidak boleh kosong';
    if (form.phone && !/^0[0-9]{8,12}$/.test(form.phone.trim())) {
      newErrors.phone = 'Format nomor telepon tidak valid (contoh: 08123456789)';
    }
    if (form.postalCode && !/^[0-9]{5}$/.test(form.postalCode.trim())) {
      newErrors.postalCode = 'Kode pos harus 5 digit angka';
    }
    return newErrors;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    updateProfile({
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: {
        name: form.name.trim(),
        phone: form.phone.trim(),
        street: form.street.trim(),
        city: form.city.trim(),
        province: form.province.trim(),
        postalCode: form.postalCode.trim(),
      },
    });
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  const handleCancel = () => {
    setForm({
      name: user?.name || '',
      phone: user?.phone || '',
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      province: user?.address?.province || '',
      postalCode: user?.address?.postalCode || '',
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="space-y-5">
      {/* Back navigation */}
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors group"
      >
        <span className="w-7 h-7 bg-gray-100 group-hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
          <ArrowLeft size={14} />
        </span>
        Kembali ke Dashboard
      </button>

      {/* Header: title + edit button side by side */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-gray-900">Profil & Akun</h1>
        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-black text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <Pencil size={14} /> Edit Profil
          </button>
        )}
        {isEditing && (
          <span className="text-sm font-semibold text-lime-600 bg-lime-50 px-3 py-1.5 rounded-full border border-lime-200">
            ✎ Mode Edit Aktif
          </span>
        )}
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6">
        {/* Avatar section */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
          <div className="w-16 h-16 bg-lime-400 rounded-full flex items-center justify-center font-black text-xl text-black select-none">
            {user?.name?.slice(0, 2).toUpperCase() || 'U'}
          </div>
          <div>
            <h2 className="font-bold text-gray-900 text-lg">{user?.name}</h2>
            <p className="text-gray-500 text-sm">{user?.email}</p>
            <span className="badge bg-lime-100 text-lime-700 capitalize mt-1 inline-block">{user?.role}</span>
          </div>
        </div>

        {/* Success message */}
        {saved && (
          <div className="mb-4 bg-green-50 text-green-700 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
            <CheckCircle size={16} />
            Profil berhasil diperbarui dan disimpan.
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nama */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <User size={14} /> Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                disabled={!isEditing}
                className={`input-field transition-all ${
                  isEditing
                    ? 'bg-white border-gray-300 focus:ring-2 focus:ring-lime-400'
                    : 'bg-gray-50 cursor-not-allowed'
                } ${errors.name ? 'ring-2 ring-red-400 border-transparent' : ''}`}
                placeholder="Nama lengkap"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email (read-only always) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Mail size={14} /> Email
              </label>
              <input
                value={user?.email || ''}
                disabled
                className="input-field bg-gray-50 cursor-not-allowed text-gray-500"
              />
              <p className="text-xs text-gray-400 mt-1">Email tidak dapat diubah</p>
            </div>

            {/* Telepon */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Phone size={14} /> No. Telepon
              </label>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                disabled={!isEditing}
                className={`input-field transition-all ${
                  isEditing
                    ? 'bg-white border-gray-300 focus:ring-2 focus:ring-lime-400'
                    : 'bg-gray-50 cursor-not-allowed'
                } ${errors.phone ? 'ring-2 ring-red-400 border-transparent' : ''}`}
                placeholder="08123456789"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>

          {/* Alamat */}
          <div className="border-t border-gray-100 pt-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <MapPin size={16} /> Alamat Default
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                <input
                  value={form.street}
                  onChange={(e) => setForm({ ...form, street: e.target.value })}
                  disabled={!isEditing}
                  className={`input-field transition-all ${isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 cursor-not-allowed'}`}
                  placeholder="Nama jalan, nomor, RT/RW"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kota</label>
                <input
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  disabled={!isEditing}
                  className={`input-field transition-all ${isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 cursor-not-allowed'}`}
                  placeholder="Nama kota"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Provinsi</label>
                <input
                  value={form.province}
                  onChange={(e) => setForm({ ...form, province: e.target.value })}
                  disabled={!isEditing}
                  className={`input-field transition-all ${isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 cursor-not-allowed'}`}
                  placeholder="Nama provinsi"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kode Pos</label>
                <input
                  value={form.postalCode}
                  onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                  disabled={!isEditing}
                  className={`input-field transition-all ${
                    isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 cursor-not-allowed'
                  } ${errors.postalCode ? 'ring-2 ring-red-400 border-transparent' : ''}`}
                  placeholder="12345"
                  maxLength={5}
                />
                {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
              </div>
            </div>
          </div>

          {/* Action buttons — only shown when editing */}
          {isEditing && (
            <div className="flex gap-3 pt-2 border-t border-gray-100">
              <button type="submit" className="btn-dark gap-2">
                <Save size={16} /> Simpan Perubahan
              </button>
              <button type="button" onClick={handleCancel} className="btn-secondary">
                Batal
              </button>
            </div>
          )}

          {!isEditing && (
            <p className="text-xs text-gray-400 pt-2">
              * Klik "Edit Profil" di atas untuk mengubah data. Data disimpan secara lokal di perangkat ini.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
