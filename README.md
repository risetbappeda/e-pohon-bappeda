# 🌿 PUSPA

### Platform Informasi Digital Flora Bappeda Kabupaten Sleman

> Proyek magang — Badan Perencanaan Pembangunan Daerah (Bappeda) Kabupaten Sleman  
> Tahun 2025/2026

---

## Tentang Proyek

PUSPA adalah platform web berbasis QR Code untuk pendataan dan edukasi aset flora di lingkungan kantor Bappeda Kabupaten Sleman. Setiap tanaman di lingkungan kantor dilengkapi label QR Code fisik yang ketika di-scan akan mengarahkan pengunjung ke halaman informasi digital tanaman tersebut secara langsung.

Platform ini dibangun sebagai bagian dari program digitalisasi aset dan edukasi publik Bappeda Sleman.

---

## Fitur Utama

- Katalog seluruh tanaman di lingkungan Bappeda Sleman
- Halaman detail per tanaman (nama lokal, nama latin, klasifikasi, asal, manfaat, perawatan)
- QR Code otomatis di setiap halaman detail — siap cetak dan tempel
- Pencarian tanaman secara real-time (nama lokal, nama latin, klasifikasi)
- Desain mobile-first (dioptimalkan untuk pengguna yang scan QR via HP)
- Fallback gambar otomatis jika foto belum tersedia

---

## Teknologi yang Digunakan

| Teknologi       | Kegunaan                  |
| --------------- | ------------------------- |
| React 18        | UI framework utama        |
| Vite            | Build tool & dev server   |
| Tailwind CSS    | Styling                   |
| React Router v6 | Routing antar halaman     |
| QR Server API   | Generate QR Code otomatis |
| Vercel          | Hosting & deployment      |

---

## Struktur Folder

```
puspa/
│
├── public/
│   └── images/                  ← Semua aset gambar diletakkan di sini
│       ├── logo-sleman.png      ← Logo Kabupaten Sleman
│       ├── kantor-bappeda.jpeg  ← Foto hero di halaman beranda
│       ├── placeholder.jpg      ← Gambar fallback jika foto tanaman belum ada
│       └── [nama-tanaman].jpg   ← Foto masing-masing tanaman
│
├── src/
│   ├── data/
│   │   └── tanaman.js           ← ⭐ File utama data tanaman (edit di sini)
│   │
│   ├── pages/
│   │   ├── Home.jsx             ← Halaman beranda + katalog tanaman
│   │   └── Detail.jsx           ← Halaman detail tanaman (target scan QR)
│   │
│   ├── components/
│   │   ├── Navbar.jsx           ← Komponen navigasi atas
│   │   └── PlantCard.jsx        ← Komponen kartu tanaman di katalog
│   │
│   ├── App.jsx                  ← Konfigurasi routing
│   ├── main.jsx                 ← Entry point aplikasi
│   └── index.css                ← Style global + animasi
│
├── index.html                   ← Template HTML utama
├── vite.config.js               ← Konfigurasi Vite
├── tailwind.config.js           ← Konfigurasi Tailwind CSS
├── postcss.config.js            ← Konfigurasi PostCSS
├── vercel.json                  ← Konfigurasi routing untuk Vercel (SPA)
├── package.json                 ← Daftar dependensi & script
└── README.md                    ← Dokumentasi ini
```

---

## Cara Menjalankan di Lokal

### Prasyarat

- [Node.js](https://nodejs.org) versi LTS (18 ke atas)
- Terminal / Command Prompt

### Langkah-langkah

```bash
# 1. Masuk ke folder project
cd puspa

# 2. Install semua dependensi
npm install

# 3. Jalankan server development
npm run dev
```

Buka browser dan akses **http://localhost:5173**

---

## Cara Menambah atau Mengubah Data Tanaman

Semua data tanaman tersimpan di satu file: **`src/data/tanaman.js`**

Untuk menambah tanaman baru, tambahkan objek berikut ke dalam array `tanamanData`:

```js
{
  id: "nama-unik",           // Dipakai di URL & QR. Gunakan huruf kecil & tanda hubung, tanpa spasi.
                             // Contoh: "pohon-mangga", "lidah-buaya"
  nama_lokal: "Nama Tanaman",
  nama_latin: "Nama Ilmiah",
  klasifikasi: "Famili ...",
  asal: "Negara / Daerah Asal",
  mengenal: "Paragraf deskripsi singkat tentang tanaman ini.",
  manfaat: [
    { kategori: "Kesehatan", isi: "Penjelasan manfaat pertama." },
    { kategori: "Estetika",  isi: "Penjelasan manfaat kedua." },
    { kategori: "Ekologi",   isi: "Penjelasan manfaat ketiga." },
  ],
  perawatan: "Tips perawatan tanaman ini.",
  foto: "/images/nama-file-foto.jpg",  // Letakkan file foto di folder public/images/
}
```

> **Penting:** Nilai `id` harus unik dan tidak boleh sama dengan tanaman lain. Nilai ini yang akan tertanam di dalam QR Code sebagai bagian dari URL.

---

## Cara Deploy ke Vercel

### 1. Upload ke GitHub

Jika belum punya akun, daftar di [github.com](https://github.com).

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/USERNAME/puspa.git
git push -u origin main
```

### 2. Deploy ke Vercel

1. Login ke [vercel.com](https://vercel.com) menggunakan akun GitHub
2. Klik **"Add New Project"**
3. Pilih repository `puspa`
4. Biarkan semua pengaturan default (Vercel otomatis mendeteksi Vite + React)
5. Klik **"Deploy"**

Setelah deploy selesai, website akan aktif di URL seperti:

```
https://puspa-bappeda-sleman.vercel.app
```

URL setiap tanaman akan otomatis menjadi:

```
https://puspa-bappeda-sleman.vercel.app/tanaman/[id-tanaman]
```

URL inilah yang tertanam di dalam QR Code.

### 3. Update setelah perubahan data

Setiap kali ada perubahan (misalnya menambah tanaman baru), cukup jalankan:

```bash
git add .
git commit -m "tambah tanaman baru: [nama tanaman]"
git push
```

Vercel akan otomatis rebuild dan deploy dalam beberapa menit.

---

## Catatan Teknis

- File `vercel.json` berisi konfigurasi rewrite yang diperlukan agar routing React (SPA) berjalan dengan benar di Vercel. **Jangan hapus file ini.**
- Semua gambar harus diletakkan di folder `public/images/`. Gambar di luar folder ini tidak akan terbaca setelah di-build.
- Jika foto tanaman belum tersedia, sistem akan otomatis menampilkan gambar `placeholder.jpg`. Pastikan file tersebut ada di `public/images/`.
- QR Code di-generate secara otomatis menggunakan [QR Server API](https://goqr.me/api/) berdasarkan URL halaman — tidak memerlukan library tambahan.

---

## Kontak & Pengembang

|                   |                                                                 |
| ----------------- | --------------------------------------------------------------- |
| **Nama**          | Haqi Dhiya' Firmana                                             |
| **NIM**           | 23051130016                                                     |
| **Program Studi** | Teknologi Informasi                                             |
| **Universitas**   | Universitas Negeri Yogyakarta                                   |
| **Status**        | Mahasiswa Magang                                                |
| **Instansi**      | Badan Perencanaan Pembangunan Daerah (Bappeda) Kabupaten Sleman |

---

<p align="center">
  © 2026 • PUSPA • Digitalisasi Flora Bappeda Kabupaten Sleman
</p>
