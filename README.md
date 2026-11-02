# KicksCare.id — Shoes Marketplace & Care Management System

<div align="center">

![KicksCare.id](https://img.shields.io/badge/KicksCare.id-Shoes%20Marketplace%20%26%20Care-a3e635?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?style=flat-square&logo=tailwindcss)

**Platform digital terpadu untuk berbelanja sepatu premium dan merawat koleksi sneakers Anda.**

</div>

---

## 📖 Tentang Aplikasi

### Gambaran Umum

**KicksCare.id** adalah platform digital berbasis web yang dirancang untuk menjadi solusi terpadu bagi para pecinta sepatu dan sneaker di Indonesia. Project ini hadir untuk menyelesaikan dua permasalahan utama yang selama ini terpisah: sulitnya menemukan dan membeli sepatu premium yang terjamin keasliannya secara online, serta belum adanya platform yang mengintegrasikan layanan perawatan sepatu profesional dalam satu ekosistem digital. Dengan menggabungkan **Shoes Marketplace** dan **Shoes Care Management System** dalam satu aplikasi, KicksCare.id memberikan kemudahan kepada pengguna untuk berbelanja sepatu dari brand ternama seperti Nike, Adidas, Vans, dan Converse, sekaligus memesan layanan perawatan seperti Deep Cleaning, Unyellowing, hingga Leather Treatment — semua tanpa harus berpindah platform.

Target pengguna utama aplikasi ini adalah para penggemar sneakers dan pengguna sepatu secara umum di Indonesia yang menginginkan pengalaman berbelanja yang modern, terpercaya, dan praktis. Aplikasi ini dikembangkan sebagai **frontend web application** menggunakan React.js, TypeScript, dan Tailwind CSS, dengan arsitektur berbasis komponen yang modular dan siap diintegrasikan dengan backend di masa mendatang. Dalam konteks pengembangan berbasis AI Agent, peran AI di sini adalah sebagai **Senior Frontend Engineer** yang secara mandiri menganalisis kebutuhan sistem, merancang arsitektur aplikasi, membangun seluruh antarmuka pengguna, mengimplementasikan logika fungsional seperti routing, state management, filter produk, sistem booking, dan tracking layanan, serta memastikan kualitas kode melalui linting dan production build — mulai dari nol hingga aplikasi yang siap digunakan.

---

### Layanan Utama

1. **Shoes Marketplace** — Platform e-commerce untuk mencari, melihat, dan membeli berbagai produk sepatu dari brand ternama seperti Nike, Adidas, Vans, Converse, ASICS, Reebok, Puma, dan New Balance.

2. **Shoes Care Management** — Platform pemesanan dan pengelolaan layanan perawatan sepatu profesional, lengkap dengan sistem tracking status pengerjaan secara real-time.

Aplikasi ini ditujukan untuk para pecinta sneakers dan pengguna sepatu secara umum yang ingin mendapatkan pengalaman **berbelanja sepatu sekaligus merawatnya** melalui satu platform digital yang modern, premium, dan mudah digunakan.

> ⚠️ **Catatan**: Aplikasi ini adalah **frontend-only simulation**. Semua data menggunakan mock data dan LocalStorage. Belum terhubung dengan backend/server nyata.

---

## ✨ Fitur Lengkap Aplikasi

### 🏠 Homepage
- Hero section dengan headline dan Call to Action
- Koleksi produk unggulan (Featured Products)
- Kategori sepatu dengan jumlah produk dinamis
- Layanan Shoes Care populer
- Banner promosi dengan kode diskon
- Testimoni pelanggan
- Section statistik KicksCare.id
- Form newsletter subscription
- Footer informatif

### 🛍️ Marketplace Sepatu
- **Katalog produk** — 12 produk dari 8 brand premium
- **Pencarian** — Cari berdasarkan nama, merek, kategori, atau tags
- **Filter** — Kategori (Lifestyle, Running, Skateboarding), Merek, Ukuran (EU 37–45), Rentang Harga
- **Pengurutan** — Most Popular, Newest, Price Low to High, Price High to Low, Best Rating
- **Badge produk** — NEW, BESTSELLER, TRENDING, DISKON
- **Halaman detail produk**:
  - Galeri gambar produk dengan thumbnail
  - Pemilihan ukuran sepatu (EU)
  - Pemilihan warna
  - Pengatur jumlah item
  - Preview subtotal sebelum checkout
  - Tab: Deskripsi / Spesifikasi / Ulasan
  - Rating distribution chart pada tab ulasan
  - Produk terkait (related products)
- **Wishlist** — Simpan dan kelola produk favorit
- **Keranjang Belanja**:
  - Tambah, edit quantity, hapus item
  - Kode promo (`KICKS30` = diskon 30%, `CARE20` = diskon 20%)
  - Kalkulasi otomatis ongkos kirim (gratis di atas Rp500.000)
- **Checkout multi-step**:
  - Step 1: Form alamat pengiriman
  - Step 2: Pilih metode pembayaran (Transfer Bank BCA/Mandiri, GoPay, OVO, COD)
  - Step 3: Konfirmasi & sukses
  - Support mode **Beli Sekarang** (tanpa masuk keranjang)
- Semua harga dalam format **Rupiah (IDR)**

### 👟 Shoes Care Management
**6 Jenis Layanan Perawatan:**

| Layanan | Deskripsi |
|---------|-----------|
| Basic Cleaning | Pembersihan standar untuk sepatu sehari-hari |
| Deep Cleaning | Pembersihan mendalam untuk kotoran membandel |
| Unyellowing | Menghilangkan kekuningan pada outsole/midsole |
| Repaint | Pengecatan ulang untuk mengembalikan warna sepatu |
| Reglue | Perbaikan sol yang mengelupas atau terlepas |
| Leather Treatment | Perawatan khusus untuk sepatu berbahan kulit |

**Fitur Shoes Care:**
- Katalog lengkap semua layanan dengan harga dan durasi
- Halaman detail per layanan
- **Booking 3-step wizard**:
  - Step 1: Pilih jenis layanan
  - Step 2: Input info sepatu (brand, model, ukuran, warna, kondisi, catatan) + pilih tanggal + metode (Drop Off / Pick Up)
  - Step 3: Konfirmasi & ringkasan booking
- **Tracking 7-tahap** dengan visual progress bar:
  1. Booking Submitted
  2. Booking Confirmed
  3. Shoes Received
  4. Cleaning / Treatment in Progress
  5. Quality Control
  6. Ready for Pickup / Delivery
  7. Service Completed
- FAQ section dengan accordion
- Informasi lokasi toko/workshop

### 👤 Customer Dashboard
Halaman khusus pelanggan yang sudah login:

| Halaman | Fitur |
|---------|-------|
| **Dashboard** | Ringkasan stats, pesanan terbaru, booking aktif, quick actions |
| **Pesanan Saya** | Riwayat semua pesanan dengan detail item dan status |
| **Shoes Care** | Daftar booking dengan visual progress tracker 7-tahap |
| **Wishlist** | Produk tersimpan, langsung ke detail atau keranjang |
| **Profil & Akun** | Edit nama, email, telepon, alamat; simpan ke LocalStorage |

### 🔐 Admin Panel
Halaman khusus administrator:

| Halaman | Fitur |
|---------|-------|
| **Overview** | Stats total (pendapatan, pesanan, produk, pelanggan, booking), grafik bar pendapatan 6 bulan, pesanan terbaru, booking terbaru, quick links |
| **Products** | Tabel produk lengkap, tambah produk baru, edit produk, hapus produk (dengan konfirmasi), pencarian produk |
| **Orders** | Daftar semua pesanan, expand detail (items, alamat), update status pesanan (Menunggu → Dikonfirmasi → Diproses → Dikirim → Diterima) |
| **Shoes Care** | Daftar semua booking, expand detail (info sepatu, jadwal), update status pengerjaan (7 tahap) |
| **Customers** | Daftar pelanggan dengan jumlah pesanan & booking per customer, total belanja, expandable rows untuk riwayat pesanan, pencarian pelanggan |
| **Reports** | Ringkasan pendapatan marketplace vs care services, distribusi kategori produk, top produk |
| **Profil Admin** | Edit profil administrator |

### 🔑 Autentikasi & Keamanan
- Login / Register / Logout
- **Role-based access control**:
  - Customer hanya bisa akses marketplace + `/dashboard/*`
  - Admin hanya bisa akses `/admin/*`, tidak bisa akses marketplace
  - Halaman protected redirect ke login jika belum login
  - Admin yang mencoba akses halaman publik diredirect ke `/admin`

---

## 🛠️ Teknologi yang Digunakan

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **React** | 19.3 | Library utama frontend |
| **TypeScript** | 7.0 | Type safety & developer experience |
| **Vite** | 8.3 | Build tool & dev server |
| **Tailwind CSS** | v4 | Utility-first CSS framework |
| **React Router DOM** | v7 | Client-side routing & navigation |
| **Lucide React** | 1.66 | Icon library |
| **LocalStorage** | Browser API | Penyimpanan data sementara (cart, orders, bookings, auth) |
| **OxLint** | 1.89 | JavaScript/TypeScript linter |

---

## 📋 Persyaratan Sistem

Sebelum menjalankan aplikasi, pastikan sistem Anda sudah menginstal:

| Software | Versi Minimum | Cara Cek |
|----------|--------------|----------|
| **Node.js** | >= 18.0.0 | `node --version` |
| **npm** | >= 9.0.0 | `npm --version` |

> 💡 Download Node.js di: https://nodejs.org (pilih versi LTS)
> npm sudah termasuk otomatis saat menginstal Node.js.

---

## 🚀 Cara Menjalankan Aplikasi

### Langkah 1 — Clone atau Download Proyek

**Menggunakan Git:**
```bash
git clone <url-repository>
cd "Web-Based Shoe Marketplace & Care Management System"
```

**Atau download ZIP** dari repository, lalu extract dan buka folder proyeknya.

---

### Langkah 2 — Install Dependencies

Jalankan perintah berikut **satu kali** saat pertama kali setup atau setelah ada perubahan `package.json`:

```bash
npm install
```

Ini akan mendownload semua package yang dibutuhkan ke folder `node_modules/`.

> ⏳ Proses ini memerlukan koneksi internet dan mungkin memakan waktu 1–2 menit.

---

### Langkah 3 — Jalankan Aplikasi

Pilih salah satu cara berikut sesuai kebutuhan:

---

#### ▶️ Cara 1: Mode Development (Direkomendasikan untuk Developer)

> ⚠️ **Penting untuk Windows**: Karena nama folder proyek mengandung karakter `&`, perintah `npm run dev` biasa akan menyebabkan error seperti `'Care' is not recognized...`. Gunakan perintah di bawah ini.

**Windows — PowerShell (WAJIB pakai cara ini):**
```powershell
Set-Location -LiteralPath 'c:\SEMUA TENTANG KULIAH\SEMESTER 3\IBM\Web-Based Shoe Marketplace & Care Management System'
npm install
node_modules\.bin\vite
```

**Windows — Command Prompt (CMD):**
```cmd
cd "C:\SEMUA TENTANG KULIAH\SEMESTER 3\IBM\Web-Based Shoe Marketplace & Care Management System"
node_modules\.bin\vite
```

**Windows — Git Bash:**
```bash
cd "/c/SEMUA TENTANG KULIAH/SEMESTER 3/IBM/Web-Based Shoe Marketplace & Care Management System"
node_modules/.bin/vite
```

**macOS / Linux — Terminal:**
```bash
npm run dev
```

Setelah berhasil, terminal akan menampilkan:
```
  VITE v8.3.5  ready in 500ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
  ➜  press h + enter to show help
```

Buka browser dan akses: **http://localhost:5173**

> **Kenapa pakai `node_modules\.bin\vite` bukan `npm run dev`?**
> Karena `npm run dev` di Windows akan memecah path folder di karakter `&`, sehingga Node.js tidak bisa menemukan file vite. Memanggil vite langsung dari `node_modules` menghindari masalah ini.

> **Fitur mode development:**
> - Hot Module Replacement (HMR) — perubahan kode langsung terlihat tanpa refresh manual
> - Source maps untuk debugging yang mudah
> - Error overlay langsung di browser
> - Port default: `5173` (jika sudah dipakai, otomatis pindah ke port berikutnya)

---

#### 🏗️ Cara 2: Production Build

Gunakan ini untuk membuat versi final yang dioptimalkan:

**Windows — PowerShell:**
```powershell
node_modules\.bin\tsc -b; node_modules\.bin\vite build
```

**Windows — CMD / Git Bash / macOS / Linux:**
```bash
npm run build
```

Hasil build tersimpan di folder `dist/`. Untuk melihat hasilnya di browser, jalankan:

**Windows — PowerShell:**
```powershell
node_modules\.bin\vite preview
```

**CMD / Git Bash / macOS / Linux:**
```bash
npm run preview
```

Lalu buka: **http://localhost:4173**

> **Perbedaan dengan mode dev:**
> - Kode sudah diminifikasi dan dioptimalkan
> - Lebih cepat saat dijalankan di browser
> - Cocok untuk deployment ke server/hosting

---

#### 🧹 Cara 3: Lint (Cek Kualitas Kode)

Untuk mengecek apakah ada error atau warning pada kode:

```bash
npm run lint
```

---

### ⚠️ Perhatian Khusus untuk Windows

Nama folder proyek ini mengandung karakter `&` dan spasi:
```
Web-Based Shoe Marketplace & Care Management System
```

Karakter `&` di Windows diartikan sebagai **pemisah perintah**, sehingga `npm run dev` biasa akan selalu error. **Wajib** gunakan cara berikut:

**PowerShell — masuk folder & jalankan (DIREKOMENDASIKAN):**
```powershell
Set-Location -LiteralPath 'c:\SEMUA TENTANG KULIAH\SEMESTER 3\IBM\Web-Based Shoe Marketplace & Care Management System'
node_modules\.bin\vite
```

**CMD — masuk folder & jalankan:**
```cmd
cd "C:\SEMUA TENTANG KULIAH\SEMESTER 3\IBM\Web-Based Shoe Marketplace & Care Management System"
node_modules\.bin\vite
```

**Git Bash — masuk folder & jalankan:**
```bash
cd "/c/SEMUA TENTANG KULIAH/SEMESTER 3/IBM/Web-Based Shoe Marketplace & Care Management System"
node_modules/.bin/vite
```

> 💡 **Tips termudah**: Buka folder proyek di **VS Code** → menu Terminal → New Terminal → langsung ketik `node_modules\.bin\vite`. VS Code sudah otomatis berada di direktori yang benar.

---

### 🔍 Troubleshooting

**Error: `npm: command not found`**
→ Node.js belum terinstal. Download dari https://nodejs.org

**Error: `'Care' is not recognized` atau `Cannot find module '...\IBM\vite\bin\vite.js'`**
→ Ini terjadi karena `npm run dev` terpotong di karakter `&` pada nama folder
→ **Solusi**: Gunakan `node_modules\.bin\vite` sebagai pengganti `npm run dev` (lihat bagian Cara 1 di atas)

**Error: `Cannot find module` atau `Failed to resolve import`**
→ Jalankan ulang `npm install`, pastikan sudah berada di folder proyek yang benar

**Port 5173 sudah digunakan:**
→ Vite otomatis mencoba port berikutnya (5174, 5175, dst.)
→ Atau hentikan proses lain yang menggunakan port tersebut

**Gambar produk tidak muncul:**
→ Pastikan koneksi internet aktif. Gambar diambil dari Unsplash CDN.

**Data pesanan/booking hilang setelah refresh:**
→ Normal untuk mode incognito/private. Data disimpan di LocalStorage browser biasa.

**`npm run build` gagal dengan error TypeScript:**
→ Pastikan tidak ada syntax error di file `.tsx`/`.ts` sebelum build

---

## 🔑 Akun Demo

Gunakan akun berikut untuk mencoba semua fitur tanpa perlu registrasi:

| Peran | Email | Password | Akses |
|-------|-------|----------|-------|
| **Customer** | `user@kickscare.id` | `password123` | Marketplace + Customer Dashboard |
| **Admin** | `admin@kickscare.id` | `admin123` | Admin Panel saja |

> **Catatan akun:**
> - Customer dapat registrasi akun baru melalui halaman `/register`
> - Admin **tidak bisa** mengakses halaman marketplace (akan diredirect ke `/admin`)
> - Customer **tidak bisa** mengakses `/admin` (akan diredirect ke `/dashboard`)
> - Data login tersimpan di LocalStorage dan akan tetap ada sampai logout atau clear browser storage

---

## 🗺️ Peta Halaman (Routing)

### Halaman Publik (Bisa diakses tanpa login)

| URL | Halaman | Keterangan |
|-----|---------|------------|
| `/` | Homepage | Halaman utama |
| `/shop` | Marketplace | Katalog semua produk sepatu |
| `/shop/:id` | Detail Produk | Detail produk berdasarkan ID (contoh: `/shop/p001`) |
| `/shoe-care` | Shoes Care | Daftar semua layanan perawatan |
| `/shoe-care/:id` | Detail Layanan | Detail layanan berdasarkan ID |
| `/shoe-care/book` | Booking | Form pemesanan layanan perawatan |
| `/about` | About Us | Tentang KicksCare.id |
| `/cart` | Keranjang | Keranjang belanja |
| `/checkout` | Checkout | Proses pembayaran |
| `/wishlist` | Wishlist | Produk tersimpan |
| `/login` | Login | Halaman masuk |
| `/register` | Register | Halaman daftar akun baru |

### Customer Dashboard (Perlu login sebagai Customer)

| URL | Halaman |
|-----|---------|
| `/dashboard` | Overview Dashboard |
| `/dashboard/orders` | Riwayat Pesanan |
| `/dashboard/care` | Booking Shoes Care |
| `/dashboard/wishlist` | Wishlist |
| `/dashboard/profile` | Profil & Pengaturan Akun |

### Admin Panel (Perlu login sebagai Admin)

| URL | Halaman |
|-----|---------|
| `/admin` | Overview & Statistik |
| `/admin/products` | Manajemen Produk |
| `/admin/orders` | Manajemen Pesanan |
| `/admin/care` | Manajemen Booking Perawatan |
| `/admin/customers` | Manajemen Pelanggan |
| `/admin/reports` | Laporan & Analitik |
| `/admin/profile` | Profil Admin |

---

## 📁 Struktur Folder Proyek

```
src/
│
├── App.tsx                    # Root component, routing, protected routes
├── main.tsx                   # Entry point React
├── index.css                  # Global styles, Tailwind v4, design system classes
│
├── types/
│   └── index.ts               # Semua TypeScript interfaces (Product, Order, CareBooking, User, dll.)
│
├── data/
│   ├── products.ts            # 12 mock produk + data kategori & brand
│   └── careServices.ts        # 6 mock layanan care + careStatusSteps (7 tahap)
│
├── utils/
│   └── index.ts               # Helper: formatPrice (IDR), formatDate, generateId
│
├── context/
│   ├── AuthContext.tsx        # State autentikasi: login, register, logout, updateProfile
│   ├── CartContext.tsx        # State keranjang: add, remove, update, clear (LocalStorage)
│   └── WishlistContext.tsx    # State wishlist: toggle, isInWishlist (LocalStorage)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                   # Navbar publik (responsif, search, cart icon)
│   │   ├── Footer.tsx                   # Footer dengan links & social
│   │   ├── MainLayout.tsx               # Layout wrapper halaman publik
│   │   ├── CustomerDashboardLayout.tsx  # Sidebar layout customer dashboard
│   │   └── AdminLayout.tsx              # Sidebar layout admin panel (dark theme)
│   └── product/
│       └── ProductCard.tsx              # Card produk dengan modal Beli/Cart (size+color+qty)
│
└── pages/
    ├── HomePage.tsx           # Beranda
    ├── ShopPage.tsx           # Katalog dengan filter & search
    ├── ProductDetailPage.tsx  # Detail produk + tabs
    ├── CartPage.tsx           # Keranjang belanja
    ├── CheckoutPage.tsx       # Multi-step checkout
    ├── WishlistPage.tsx       # Halaman wishlist
    ├── ShoeCarePage.tsx       # Daftar layanan + FAQ
    ├── ServiceDetailPage.tsx  # Detail layanan
    ├── BookingPage.tsx        # 3-step booking wizard
    ├── AboutPage.tsx          # Tentang kami
    ├── LoginPage.tsx          # Halaman login
    ├── RegisterPage.tsx       # Halaman registrasi
    │
    ├── dashboard/
    │   ├── DashboardHome.tsx         # Overview customer
    │   ├── OrdersPage.tsx            # Riwayat pesanan
    │   ├── CareBookingsPage.tsx      # Booking + progress tracker
    │   ├── DashboardWishlistPage.tsx # Wishlist di dashboard
    │   └── ProfilePage.tsx           # Edit profil
    │
    └── admin/
        ├── AdminOverview.tsx    # Dashboard overview admin
        ├── AdminProducts.tsx    # CRUD produk
        ├── AdminOrders.tsx      # Manajemen pesanan
        ├── AdminCare.tsx        # Manajemen booking care
        ├── AdminCustomers.tsx   # Manajemen pelanggan
        ├── AdminReports.tsx     # Laporan & analitik
        └── AdminProfilePage.tsx # Profil admin
```

---

## 🎨 Design System

Aplikasi menggunakan design system yang konsisten:

**Warna:**
| Nama | Hex | Penggunaan |
|------|-----|------------|
| Lime Green (Accent) | `#a3e635` | Primary button, badge aktif, highlight |
| Black | `#111111` | Dark button, teks utama, background hero |
| White | `#ffffff` | Background halaman, card |
| Gray 50 | `#f9fafb` | Background section alternatif |
| Charcoal | `#2d2d2d` | Teks sekunder |

**Utility Classes (custom):**
```css
.btn-primary   /* Tombol lime green, rounded-full */
.btn-secondary /* Tombol outline hitam */
.btn-dark      /* Tombol hitam solid */
.input-field   /* Input form standar */
.badge         /* Label kecil rounded */
.card          /* Card dengan hover effect */
.tag           /* Tag/chip kecil */
.section-title /* Heading section */
```

---

## 📌 Catatan Teknis (Simulasi vs Backend)

Karena aplikasi ini adalah **frontend-only**, berikut yang perlu diganti saat integrasi backend:

| Fitur | Kondisi Sekarang | Untuk Backend |
|-------|-----------------|---------------|
| **Login/Register** | Mock users di `AuthContext.tsx` | Ganti dengan `POST /api/auth/login` |
| **Data Produk** | Statis di `data/products.ts` | Ganti dengan `GET /api/products` |
| **Keranjang** | LocalStorage (`kickscare_cart`) | Sinkronkan dengan backend cart API |
| **Pesanan** | LocalStorage (`kickscare_orders`) | Ganti dengan `POST /api/orders` |
| **Booking** | LocalStorage (`kickscare_bookings`) | Ganti dengan `POST /api/bookings` |
| **Pembayaran** | Simulasi delay 1.5 detik | Integrasi payment gateway (Midtrans, dll.) |
| **Gambar** | Unsplash CDN | Upload ke storage (S3, Cloudinary, dll.) |

---

## ✅ Checklist Fitur

### Marketplace
- [x] Katalog produk (12 produk, 8 brand)
- [x] Pencarian real-time
- [x] Filter kategori, merek, ukuran, harga
- [x] Pengurutan produk
- [x] Halaman detail produk dengan galeri
- [x] Tab Deskripsi / Spesifikasi / Ulasan
- [x] Pilih ukuran & warna
- [x] Keranjang belanja
- [x] Kode promo
- [x] Checkout multi-step
- [x] Beli Sekarang (tanpa masuk cart)
- [x] Wishlist
- [x] Format harga Rupiah

### Shoes Care
- [x] 6 jenis layanan perawatan
- [x] Detail layanan per halaman
- [x] Booking 3-step wizard
- [x] Progress tracker 7 tahap
- [x] Input info sepatu pelanggan
- [x] Pilihan Drop Off / Pick Up
- [x] FAQ accordion
- [x] Informasi lokasi toko

### Customer Dashboard
- [x] Overview statistik
- [x] Riwayat pesanan lengkap
- [x] Tracking status booking care
- [x] Wishlist management
- [x] Edit profil & alamat

### Admin Panel
- [x] Dashboard overview dengan grafik
- [x] CRUD produk
- [x] Update status pesanan
- [x] Update status booking care
- [x] Manajemen pelanggan + expandable history
- [x] Laporan pendapatan

### Teknis
- [x] Responsive design (mobile, tablet, desktop)
- [x] Role-based access control
- [x] LocalStorage persistence
- [x] Protected routes
- [x] TypeScript type safety
- [x] 0 lint errors
- [x] Production build berhasil

---

## 📞 Kontak & Informasi

**Aplikasi:** KicksCare.id  
**Versi:** 1.0.0  
**Kategori:** Shoes Marketplace & Care Management System  
**Teknologi Utama:** React 19 + TypeScript + Vite + Tailwind CSS v4
