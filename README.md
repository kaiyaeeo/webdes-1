# ✦ BookCircle

> **Buku Bekas, Nilai Baru.** > Platform sirkulasi buku teks dan catatan kuliah khusus untuk mahasiswa Indonesia.

BookCircle adalah aplikasi web marketplace berbasis komunitas yang dirancang untuk membantu mahasiswa menghemat pengeluaran akademik. Melalui platform ini, mahasiswa dapat menjual, membeli, menukar (swap), atau mendonasikan buku pelajaran dan catatan kuliah secara mudah.

## ✨ Fitur Utama

- **Katalog Terpadu:** Cari buku berdasarkan mata kuliah, dosen pengampu, kategori, rentang harga, hingga kondisi buku (seperti baru, ada coretan, fotokopi).
- **Multi-Transaksi:** Mendukung berbagai jenis transaksi, mulai dari Jual-Beli standar, Tukar Tambah (Swap), hingga Donasi Gratis.
- **Wishlist & Permintaan Komunitas (Request):** Tidak menemukan buku yang dicari? Pasang permintaan (request) agar mahasiswa lain yang memiliki buku tersebut bisa menawarkannya kepadamu.
- **Keranjang & Simulasi Checkout:** Sistem keranjang belanja yang menghitung total harga secara otomatis (mengabaikan harga buku donasi/tukar).
- **Dashboard Pengguna:** Manajemen profil, pantau status pesanan, kelola listing buku yang dijual, dan sistem pesan (chat) antar mahasiswa.
- **Simulasi Autentikasi:** Sistem Login dan Registrasi interaktif (menggunakan `localStorage` browser).

## 🛠️ Teknologi yang Digunakan

Proyek ini dibangun menggunakan teknologi *Frontend* murni (tanpa framework/library berat) untuk memastikan performa yang ringan dan mudah dipelajari:

- **HTML5:** Struktur semantik halaman web.
- **CSS3 (Custom):** Styling responsif dengan CSS Variables, Flexbox, dan CSS Grid.
- **Vanilla JavaScript (ES6+):** Logika aplikasi, DOM Manipulation, dan manajemen *state*.
- **Browser LocalStorage:** Digunakan sebagai basis data simulasi (Mock Database) untuk menyimpan status sesi (login), keranjang, wishlist, dan profil pengguna tanpa memerlukan server *Backend*.
- **Font & Ikon:**
  - Font: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) & [DM Sans](https://fonts.google.com/specimen/DM+Sans) (Google Fonts).
  - Ikon: [FontAwesome 6](https://fontawesome.com/).
  - Avatar: [DiceBear API](https://www.dicebear.com/).

## 📁 Struktur Direktori

```text
toko-buku/
├── css/
│   ├── components.css    # Styling untuk komponen reusable (navbar, footer, tombol, card)
│   ├── main.css          # Variabel global, reset CSS, dan animasi dasar
│   └── pages.css         # Styling spesifik untuk masing-masing halaman
├── js/
│   ├── app.js            # Utilitas UI (Chat simulasi, password strength, dll)
│   ├── auth.js           # Logika Autentikasi (Login, Register, Logout)
│   └── data.js           # Database simulasi (Mock data) dan State Management (AppState)
├── pages/
│   ├── cart.html         # Halaman keranjang belanja
│   ├── catalog.html      # Halaman pencarian dan filter katalog buku
│   ├── dashboard.html    # Panel kontrol pengguna
│   ├── detail.html       # Halaman detail spesifik suatu buku
│   ├── login.html        # Halaman masuk akun
│   ├── register.html     # Halaman pendaftaran akun
│   ├── sell.html         # Form multi-step untuk menjual/mendonasikan buku
│   └── wishlist.html     # Halaman buku tersimpan dan permintaan komunitas
└── index.html            # Halaman utama (Landing Page)