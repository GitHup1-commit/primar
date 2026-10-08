# Katalog UMKM + Order WhatsApp

Template workshop vibe coding Creative Hub App Talent (CHAT) 2026. Repo ini berisi aplikasi katalog UMKM Toko Primar yang terhubung langsung ke Supabase, memiliki login admin, keamanan terproteksi, dan pemesanan otomatis lewat WhatsApp.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FGitHup1-commit%2Fprimar)

## Langkah awal

1. **Salin repo ke akun GitHub-mu.** Klik tombol **Deploy with Vercel** di atas. Vercel akan membuat repo baru di akun GitHub-mu dan langsung men-deploy-nya. Setelah selesai, buka link Vercel-mu: katalog tampil dengan data contoh.
2. **Buat proyek Supabase.** Masuk ke [supabase.com](https://supabase.com) dengan akun GitHub, lalu buat proyek baru. Simpan password database di tempat aman.
3. **Siapkan database.** Di Supabase, buka **SQL Editor**, tempel seluruh isi `docs/schema.sql`, lalu klik **Run**. Tabel `produk` beserta data awal akan terbentuk.
4. **Siapkan akun admin.** Ikuti panduan akun admin yang dibagikan mentor. Setelah itu matikan pendaftaran akun baru di **Authentication > Sign In / Providers**.
5. **Isi environment variable di Vercel.** Buka proyekmu di Vercel > **Settings > Environment Variables**, lalu isi tiga variabel dari `.env.example`. Nilainya ada di Supabase > **Project Settings > API**. Setelah itu lakukan **Redeploy**.
6. **Clone repo ke laptop.**

   ```bash
   git clone https://github.com/GitHup1-commit/primar.git
   cd primar
   npm install
   ```

7. **Buat file `.env.local`.** Salin `.env.example` menjadi `.env.local`, lalu isi dengan nilai yang sama seperti di Vercel.
8. **Jalankan di laptop.**

   ```bash
   npm run dev
   ```

   Buka `http://localhost:3000`.

## Alur kerja

Kerjakan satu user story setiap kali, lalu simpan dan kirim perubahan:

```bash
git add .
git commit -m "US-01: katalog dari database"
git push
```

Setiap `git push`, Vercel otomatis men-deploy versi terbaru. Cek hasilnya di link Vercel-mu.

Urutan yang disarankan: US-01, US-02, US-03, US-04, US-05, US-06, lalu fitur bonus. Daftar lengkap ada di `docs/user-stories.md`.

## Isi repo

| File atau folder | Isi |
| --- | --- |
| `AGENTS.md` | Aturan untuk AI agent, dibaca sebelum setiap prompt |
| `DESIGN.md` | Panduan warna, huruf, dan komponen |
| `PROMPTS.md` | Jurnal prompt, wajib diisi |
| `docs/` | Problem statement, PRD, user story, rancangan teknis, skema database, checklist |
| `lib/toko.js` | Nama toko, nomor WhatsApp, alamat, jam buka |
| `app/` | Halaman aplikasi |
| `components/` | Komponen tampilan |

## Menyesuaikan dengan usahamu

- Identitas toko: ubah `lib/toko.js`.
- Warna: ubah bagian `@theme` di `app/globals.css` (lihat `DESIGN.md`).
- Produk: ubah langsung di Supabase > **Table Editor > produk**.

## Aturan penting

- Jangan menyimpan kunci atau password di kode, dan jangan push file `.env.local`.
- Jangan memberi awalan `NEXT_PUBLIC_` pada environment variable.
- Isi `PROMPTS.md` setiap menyelesaikan fitur.

## Sebelum mengumpulkan

1. Jalankan semua poin di `docs/checklist-keamanan.md` dan `docs/checklist-pengujian.md` pada link Vercel.
2. Lengkapi bagian di bawah ini.
3. Push perubahan terakhir sebelum batas waktu.

## Tentang aplikasi ini

- **Nama usaha:** Toko Primar
- **Pembuat:** Mahfudh Al Rafif
- **Link aplikasi:** https://primar-kohl.vercel.app/
- **Penjelasan aplikasi:** Aplikasi web katalog produk UMKM Toko Primar yang memungkinkan pelanggan melihat katalog dan detail produk yang disajikan secara server-side dari database Supabase, serta memesan produk secara langsung ke penjual via WhatsApp dengan pesan otomatis terisi nama dan harga produk. Aplikasi juga menyediakan area dashboard admin terlindungi untuk mengelola sesi dan mengubah password akun toko.
- **Fitur wajib yang sudah diimplementasikan:**
  - **US-01 (Katalog dari database):** Mengambil daftar produk dari tabel `produk` di Supabase pada sisi server, menampilkannya dengan format rupiah, dan menangani state kosong/error.
  - **US-02 (Detail produk):** Halaman dinamis `/produk/[id]` menyajikan data produk dari database dan memanggil `notFound()` jika produk tidak ada.
  - **US-03 (Pesan via WhatsApp):** Tombol pemesanan WhatsApp otomatis mengarahkan ke nomor toko dengan pesan nama produk dan harga rupiah yang ter-encode.
  - **US-04 (Login admin):** Autentikasi admin berbasis Supabase Auth dengan `@supabase/ssr` dan cookie, dilengkapi fitur login dan logout.
  - **US-05 (Ganti password):** Fitur ganti password admin yang tervalidasi di server (minimal 8 karakter dan verifikasi konfirmasi).
  - **US-06 (Proteksi halaman admin):** Proteksi seluruh rute admin via `proxy.js` Next.js 16 dan verifikasi autentikasi pada Server Action.
- **Status fitur bonus:** Belum diimplementasikan. Dashboard admin saat ini dipertahankan strukturnya dan disiapkan untuk implementasi US-07 sampai US-10 setelah Tahap 15 selesai.
