import { Link } from 'react-router-dom';
import { ArrowRight, Target, Heart, Shield, Users, Zap, TrendingUp, Award, Star, CheckCircle } from 'lucide-react';

const stats = [
  { value: '500+', label: 'Produk Sepatu', desc: 'dari brand premium dunia' },
  { value: '10K+', label: 'Pelanggan Puas', desc: 'di seluruh Indonesia' },
  { value: '98%', label: 'Satisfaction Rate', desc: 'berdasarkan ulasan pelanggan' },
  { value: '2 Tahun', label: 'Berpengalaman', desc: 'di industri shoes care' },
];

const values = [
  { icon: Target, title: 'Kualitas', desc: 'Kami hanya menjual produk original dan memberikan layanan dengan standar tertinggi' },
  { icon: Heart, title: 'Passion', desc: 'Setiap langkah yang kami ambil didorong oleh kecintaan tulus terhadap sneaker culture' },
  { icon: Shield, title: 'Kepercayaan', desc: 'Transparansi dan kejujuran adalah fondasi dari setiap interaksi kami dengan pelanggan' },
  { icon: Users, title: 'Komunitas', desc: 'Kami membangun komunitas yang solid untuk sesama pecinta sepatu di Indonesia' },
];

const team = [
  { name: 'Raka Adiputra', role: 'CEO & Co-Founder', desc: 'Ex-Nike Indonesia, 8 tahun di industri fashion dan sneakers', initials: 'RA', color: 'bg-lime-400' },
  { name: 'Dian Maharani', role: 'Head of Care Services', desc: 'Teknisi bersertifikat internasional dengan pengalaman 6 tahun', initials: 'DM', color: 'bg-black' },
  { name: 'Fajar Nugroho', role: 'CTO', desc: 'Full-stack engineer, passionate tentang e-commerce dan platform digital', initials: 'FN', color: 'bg-gray-700' },
  { name: 'Selly Wulandari', role: 'Head of Marketing', desc: 'Digital marketer berpengalaman di brand fashion dan lifestyle', initials: 'SW', color: 'bg-orange-400' },
];

const milestones = [
  { year: '2024', title: 'Lahirnya KicksCare.id', desc: 'Platform diluncurkan dengan 50 produk dan 3 jenis layanan perawatan' },
  { year: '2024', title: '1.000 Pelanggan Pertama', desc: 'Dalam 6 bulan, mencapai milestone 1.000 pelanggan aktif' },
  { year: '2025', title: 'Ekspansi Layanan', desc: 'Menambah 3 jenis layanan baru dan kemitraan dengan 8 brand internasional' },
  { year: '2025', title: '10.000+ Pelanggan', desc: 'Telah melayani lebih dari 10.000 pelanggan di seluruh Indonesia' },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-black text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }} />
        </div>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-lime-400 rounded-full blur-3xl opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 text-lime-400 text-xs font-bold px-4 py-2 rounded-full mb-6 tracking-widest uppercase border border-lime-400/20">
              <Zap size={12} fill="currentColor" />
              About KicksCare.id
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              We Love<br /><span className="text-lime-400">Sneakers.</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
              KicksCare.id lahir dari kecintaan mendalam terhadap sneaker culture dan kebutuhan akan platform yang benar-benar memahami gaya hidup para sneakerhead Indonesia.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-lime-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-black">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl font-black mb-1">{s.value}</p>
                <p className="font-bold text-sm">{s.label}</p>
                <p className="text-black/60 text-xs mt-0.5">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-lime-600 mb-2">Our Story</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-5">Ekosistem Digital untuk Sneaker Lovers</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Dimulai pada 2024, KicksCare.id hadir dengan misi sederhana: menjadi platform satu atap yang memenuhi semua kebutuhan sneaker para pecinta sepatu Indonesia.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Kami menggabungkan marketplace sepatu premium dengan layanan perawatan profesional, menciptakan pengalaman yang tidak hanya membantu kamu menemukan sepatu impian, tetapi juga menjaga koleksimu tetap dalam kondisi terbaik.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Dengan tim yang berpengalaman di bidang fashion, teknologi, dan perawatan sepatu, kami berkomitmen untuk menghadirkan layanan yang profesional, terpercaya, dan menyenangkan.
            </p>
            <ul className="space-y-2">
              {['Produk 100% original & bergaransi', 'Teknisi shoes care bersertifikat', 'Layanan pelanggan 7 hari seminggu', 'Gratis konsultasi perawatan sepatu'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle size={16} className="text-lime-500 shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80"
              alt="KicksCare Story"
              className="rounded-3xl w-full object-cover aspect-square"
            />
            <div className="absolute -bottom-4 -left-4 bg-lime-400 rounded-2xl p-4 shadow-xl">
              <p className="font-black text-2xl text-black">2024</p>
              <p className="text-black/60 text-xs">Founded</p>
            </div>
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
              <div className="flex gap-0.5 mb-1">
                {[1,2,3,4,5].map((i) => <Star key={i} size={12} className="text-yellow-400" fill="currentColor" />)}
              </div>
              <p className="font-bold text-sm text-gray-900">4.9 Rating</p>
              <p className="text-xs text-gray-500">dari 10K+ ulasan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-lime-600 mb-2">Values</p>
            <h2 className="section-title">Nilai-Nilai Kami</h2>
            <p className="section-subtitle mt-2 mx-auto">Prinsip yang menjadi dasar setiap keputusan dan tindakan kami</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="text-center p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-all">
                <div className="w-14 h-14 bg-lime-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <v.icon size={24} className="text-lime-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline / Milestones */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-lime-600 mb-2">Journey</p>
          <h2 className="section-title">Perjalanan Kami</h2>
        </div>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-100" />
          <div className="space-y-8">
            {milestones.map((m, i) => (
              <div key={i} className="relative flex gap-6 pl-16">
                <div className="absolute left-0 top-0 w-16 flex justify-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 relative font-bold text-xs ${i === milestones.length - 1 ? 'bg-lime-400 text-black' : 'bg-white border-2 border-gray-200 text-gray-500'}`}>
                    {i === milestones.length - 1 ? <TrendingUp size={16} /> : m.year.slice(2)}
                  </div>
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl p-5 flex-1">
                  <span className="text-xs font-bold text-lime-600 uppercase tracking-widest">{m.year}</span>
                  <h3 className="font-bold text-gray-900 mt-1 mb-1">{m.title}</h3>
                  <p className="text-sm text-gray-500">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-lime-600 mb-2">Team</p>
            <h2 className="section-title">Tim Kami</h2>
            <p className="section-subtitle mt-2 mx-auto">Orang-orang berdedikasi di balik KicksCare.id</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl border border-gray-100 p-5 text-center hover:shadow-md transition-all">
                <div className={`w-16 h-16 ${member.color} rounded-2xl flex items-center justify-center mx-auto mb-4 font-black text-lg ${member.color === 'bg-black' || member.color === 'bg-gray-700' ? 'text-white' : 'text-black'}`}>
                  {member.initials}
                </div>
                <h3 className="font-bold text-gray-900 mb-0.5">{member.name}</h3>
                <p className="text-xs text-lime-600 font-semibold uppercase tracking-wide mb-2">{member.role}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards / Recognition */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-black rounded-3xl p-8 md:p-12 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-lime-400 rounded-2xl flex items-center justify-center shrink-0">
                <Award size={28} className="text-black" />
              </div>
              <div>
                <p className="font-black text-xl">Best Shoes Platform 2025</p>
                <p className="text-gray-400 text-sm">Penghargaan dari Indonesia E-Commerce Summit</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/20" />
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                <Star size={28} className="text-lime-400" fill="currentColor" />
              </div>
              <div>
                <p className="font-black text-xl">4.9 App Store Rating</p>
                <p className="text-gray-400 text-sm">Berdasarkan lebih dari 5.000 ulasan</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/20" />
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                <Shield size={28} className="text-lime-400" />
              </div>
              <div>
                <p className="font-black text-xl">Trusted Seller</p>
                <p className="text-gray-400 text-sm">Verified & certified by Sneakers Authenticators</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
          Siap Bergabung dengan <span className="text-lime-500">KicksCare.id</span>?
        </h2>
        <p className="text-gray-500 mb-8 max-w-lg mx-auto">
          Temukan ribuan produk sepatu premium dan layanan perawatan terbaik, semua dalam satu platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/shop" className="btn-primary text-base px-8 py-4">
            Explore Marketplace <ArrowRight size={18} />
          </Link>
          <Link to="/shoe-care" className="btn-secondary text-base px-8 py-4">
            Layanan Perawatan
          </Link>
        </div>
      </section>
    </div>
  );
}
