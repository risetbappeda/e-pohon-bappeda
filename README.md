# PUSPA - Platform Informasi Digital Flora Bappeda Sleman

## Struktur Folder

```
puspa/
├── public/
│   └── images/          ← Letakkan semua foto tanaman di sini
│       ├── logo-sleman.png
│       ├── kantor-bappeda.jpeg
│       ├── placeholder.jpg
│       ├── mangkokan.jpeg
│       ├── beringin.jpg
│       └── ... (foto tanaman lainnya)
├── src/
│   ├── data/
│   │   └── tanaman.js   ← Edit file ini untuk tambah/ubah data tanaman
│   ├── pages/
│   │   ├── Home.jsx     ← Halaman beranda + katalog
│   │   └── Detail.jsx   ← Halaman detail tanaman (via QR)
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── PlantCard.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── vercel.json
├── package.json
└── vite.config.js
```

---

## Cara Menjalankan di Lokal

### 1. Install Node.js
Download dan install Node.js dari https://nodejs.org (pilih versi LTS)

### 2. Buka terminal di folder project
```bash
cd puspa
```

### 3. Install dependensi
```bash
npm install
```

### 4. Jalankan server development
```bash
npm run dev
```
Buka browser ke http://localhost:5173

---

## Cara Tambah Tanaman Baru

Edit file `src/data/tanaman.js`, tambahkan objek baru ke array:

```js
{
  id: "nama-unik-tanaman",        // dipakai di URL dan QR, tanpa spasi
  nama_lokal: "Nama Tanaman",
  nama_latin: "Nama Ilmiah",
  klasifikasi: "Famili ...",
  asal: "Negara / Daerah Asal",
  mengenal: "Deskripsi singkat tanaman...",
  manfaat: [
    { kategori: "Kesehatan", isi: "Manfaat 1..." },
    { kategori: "Estetika",  isi: "Manfaat 2..." },
  ],
  perawatan: "Tips perawatan tanaman...",
  foto: "/images/nama-foto.jpg",  // letakkan foto di folder public/images/
}
```

---

## Deploy ke Vercel

### 1. Upload ke GitHub
- Buat akun di https://github.com (jika belum punya)
- Buat repository baru (klik tombol "+")
- Di terminal folder project:
```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/USERNAME/puspa.git
git push -u origin main
```

### 2. Deploy ke Vercel
- Daftar / login di https://vercel.com menggunakan akun GitHub
- Klik "Add New Project"
- Pilih repository `puspa` yang baru dibuat
- Klik "Deploy" (Vercel otomatis detect Vite + React)
- Tunggu beberapa menit, website langsung online!

### 3. URL QR otomatis menyesuaikan domain Vercel
Setelah deploy, URL setiap tanaman akan jadi seperti:
`https://puspa-xxx.vercel.app/tanaman/beringin`

QR code di halaman detail langsung generate dengan URL ini.

---

## Catatan Penting
- File `vercel.json` sudah dikonfigurasi agar routing React berjalan dengan benar di Vercel
- Semua foto harus diletakkan di folder `public/images/`
- Jika foto belum ada, sistem akan otomatis menampilkan placeholder
