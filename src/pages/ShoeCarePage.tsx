import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, CheckCircle, Sparkles, ChevronDown, ChevronUp, MapPin, Phone, Star } from 'lucide-react';
import { careServices, careStatusSteps } from '../data/careServices';
import { formatPrice } from '../utils';

const faqs = [
  {
    q: 'Berapa lama proses perawatan sepatu?',
    a: 'Tergantung jenis layanan. Basic Cleaning membutuhkan 1-2 hari kerja, Deep Cleaning 2-3 hari, sedangkan Repaint dan Unyellowing bisa memakan waktu 3-5 hari kerja. Anda akan diberitahu estimasi setelah inspeksi.'
  },
  {
    q: 'Apakah sepatu saya aman selama proses perawatan?',
    a: 'Ya, setiap sepatu diasuransikan selama berada di tangan kami. Kami menggunakan bahan-bahan khusus yang aman untuk semua jenis material sepatu, dari kanvas hingga kulit premium.'
  },
  {
    q: 'Bagaimana jika hasil perawatan tidak sesuai ekspektasi?',
    a: 'Kami memberikan garansi kepuasan selama 3 hari setelah sepatu diterima. Jika Anda tidak puas dengan hasilnya, hubungi kami dan kami akan melakukan perbaikan tanpa biaya tambahan.'
  },
  {
    q: 'Apakah tersedia layanan antar jemput?',
    a: 'Ya, kami menyediakan layanan Pick Up ke alamat Anda di area Jabodetabek. Untuk area lainnya, sepatu dapat dikirimkan melalui jasa pengiriman yang direkomendasikan.'
  },
  {
    q: 'Metode pembayaran apa yang diterima?',
    a: 'Kami menerima transfer bank (BCA, Mandiri, BRI), dompet digital (GoPay, OVO, DANA), dan QRIS. Pembayaran dilakukan setelah sepatu diterima dan sebelum proses pengerjaan dimulai.'
  },
  {
    q: 'Apakah bisa request layanan di luar yang tersedia?',
    a: 'Tentu! Hubungi tim kami melalui WhatsApp untuk diskusi kebutuhan perawatan khusus seperti custom painting, sole swap, atau perawatan spesifik lainnya.'
  },
];

export default function ShoeCarePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      {/* Hero */}
      <section className="bg-black text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }} />
        </div>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-lime-400 rounded-full blur-3xl opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-lime-400/10 text-lime-400 text-xs font-bold px-4 py-2 rounded-full mb-6 tracking-widest uppercase border border-lime-400/20">
              <Sparkles size={12} />
              Professional Shoes Care
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              Restore Your<br /><span className="text-lime-400">Kicks.</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Layanan perawatan sepatu profesional dengan teknisi berpengalaman. Dari pembersihan hingga restorasi penuh — kami merawat setiap pasang sepatu seperti milik kami sendiri.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/shoe-care/book" className="btn-primary text-base px-8 py-4">
                Pesan Layanan Sekarang <ArrowRight size={18} />
              </Link>
              <a href="https://wa.me/6281234567890" className="bg-white/10 text-white border border-white/20 font-semibold px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-200 inline-flex items-center gap-2 text-base">
                <Phone size={16} /> Konsultasi Gratis
              </a>
            </div>
            {/* Quick stats */}
            <div className="flex items-center gap-6 mt-10">
              <div>
                <p className="font-black text-2xl text-white">5K+</p>
                <p className="text-gray-500 text-xs">Sepatu Dirawat</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <p className="font-black text-2xl text-white">98%</p>
                <p className="text-gray-500 text-xs">Kepuasan Pelanggan</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="flex items-center gap-1">
                <Star size={18} className="text-yellow-400" fill="currentColor" />
                <p className="font-black text-2xl text-white">4.9</p>
                <p className="text-gray-500 text-xs ml-1">Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-lime-600 mb-2">Services</p>
          <h2 className="section-title">Pilih Layanan Perawatan</h2>
          <p className="section-subtitle mx-auto">Setiap layanan dikerjakan oleh teknisi bersertifikat dengan standar kualitas terbaik</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {careServices.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="relative h-48 overflow-hidden bg-gray-50">
                <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {service.popular && (
                  <span className="absolute top-3 right-3 badge bg-lime-400 text-black">POPULER</span>
                )}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs">
                  <Clock size={12} />
                  {service.duration}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-gray-900 text-lg mb-1.5">{service.name}</h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed flex-1">{service.description}</p>
                <ul className="space-y-1.5 mb-5">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-gray-600">
                      <CheckCircle size={12} className="text-lime-500 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-400">Mulai dari</p>
                    <p className="font-black text-xl text-gray-900">{formatPrice(service.price)}</p>
                  </div>
                  <Link to={`/shoe-care/${service.id}`} className="btn-dark text-sm px-5 py-2.5">
                    Pilih <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-lime-600 mb-2">Process</p>
            <h2 className="section-title">Proses Perawatan</h2>
            <p className="section-subtitle mt-2 mx-auto">Dari booking hingga selesai — kami jaga Anda tetap terinformasi</p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-5 left-0 right-0 h-0.5 bg-gray-200 mx-16" />
            <div className="grid grid-cols-2 md:grid-cols-7 gap-4 md:gap-2">
              {careStatusSteps.map((step, i) => (
                <div key={step.key} className="flex flex-col items-center text-center relative">
                  <div className={`w-10 h-10 border-2 rounded-full flex items-center justify-center font-bold text-sm mb-3 z-10 relative transition-all ${
                    i === 0 ? 'bg-lime-400 border-lime-400 text-black' : 'bg-white border-gray-200 text-gray-400'
                  }`}>
                    {i === 0 ? <CheckCircle size={16} /> : i + 1}
                  </div>
                  <p className="font-semibold text-xs text-gray-900 leading-tight mb-1">{step.label}</p>
                  <p className="text-xs text-gray-400 hidden md:block leading-tight">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-lime-600 mb-2">Why Us</p>
            <h2 className="text-3xl font-black text-gray-900 mb-5">Mengapa Pilih KicksCare.id?</h2>
            <div className="space-y-4">
              {[
                { title: 'Teknisi Bersertifikat', desc: 'Setiap teknisi kami telah melalui pelatihan intensif dan bersertifikasi resmi dalam perawatan berbagai jenis sepatu.' },
                { title: 'Bahan Premium & Aman', desc: 'Menggunakan produk perawatan impor berkualitas tinggi yang aman untuk semua material — kanvas, mesh, kulit, dan suede.' },
                { title: 'Garansi Kepuasan', desc: 'Jika tidak puas dengan hasilnya, kami akan melakukan perbaikan gratis dalam 3 hari setelah Anda menerima sepatu.' },
                { title: 'Tracking Real-Time', desc: 'Pantau status perawatan sepatu Anda secara real-time melalui dashboard pelanggan kami.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-6 h-6 bg-lime-400 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle size={14} className="text-black" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-0.5">{item.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1584735175315-9d5df23be1f2?w=400&q=80" alt="Care 1" className="rounded-2xl w-full aspect-square object-cover" />
            <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" alt="Care 2" className="rounded-2xl w-full aspect-square object-cover mt-8" />
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-lime-600 mb-2">Lokasi</p>
            <h2 className="text-2xl font-black text-gray-900">Toko & Workshop Kami</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {[
              { area: 'Jakarta Selatan', address: 'Jl. Kemang Raya No. 45, Kemang', hours: 'Senin–Sabtu: 09.00–20.00', phone: '0812-3456-7890' },
              { area: 'Jakarta Barat', address: 'Jl. Puri Indah No. 12, Puri Indah', hours: 'Senin–Sabtu: 10.00–20.00', phone: '0821-9876-5432' },
            ].map((loc) => (
              <div key={loc.area} className="bg-white border border-gray-100 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-lime-100 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-lime-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{loc.area}</h4>
                    <p className="text-sm text-gray-500 mt-0.5">{loc.address}</p>
                    <p className="text-xs text-gray-400 mt-1">{loc.hours}</p>
                    <p className="text-xs text-lime-600 font-semibold mt-1 flex items-center gap-1">
                      <Phone size={11} /> {loc.phone}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-lime-600 mb-2">FAQ</p>
          <h2 className="section-title">Pertanyaan Umum</h2>
          <p className="section-subtitle mt-2 mx-auto">Temukan jawaban atas pertanyaan yang sering ditanyakan</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                <div className="shrink-0 w-6 h-6 flex items-center justify-center">
                  {openFaq === i
                    ? <ChevronUp size={18} className="text-gray-500" />
                    : <ChevronDown size={18} className="text-gray-500" />
                  }
                </div>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5">
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
        <div className="bg-black text-white rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute -right-20 top-0 bottom-0 w-80 bg-lime-400/10 rounded-full blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Siap Merawat <span className="text-lime-400">Sneakers</span> Anda?
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Booking layanan perawatan sekarang dan percayakan koleksi berharga Anda kepada tim profesional kami.
            </p>
            <Link to="/shoe-care/book" className="btn-primary text-base px-10 py-4">
              Book Sekarang <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
