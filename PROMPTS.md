# Jurnal Prompt

Catat prompt penting selama membangun aplikasi: apa yang kamu minta, hasilnya, dan perbaikan yang dilakukan. Beri tanda **[SENDIRI]** untuk prompt yang kamu tulis sendiri (bukan dari lembar kerja).

## US-01 Katalog dari database

**Prompt:**
```text
Baca AGENTS.md dan docs/user-stories.md bagian US-01.

Ubah app/page.jsx supaya daftar produk diambil dari tabel "produk" di Supabase, di sisi server, memakai SUPABASE_URL dan SUPABASE_SECRET_KEY dari environment variable. Buat koneksi Supabase untuk server di folder lib/supabase.

Tampilkan produk dengan komponen KartuProduk yang sudah ada, tanpa mengubah tampilannya. Kalau gagal mengambil data, tampilkan pesan error yang jelas di halaman. Kalau tabel kosong, tampilkan tulisan "Belum ada produk". Hapus CatatanBelumAktif dari halaman ini.
```

**Hasil:**
- Berhasil membuat `lib/supabase/server.js` dan `lib/supabase/index.js` untuk inisialisasi koneksi Supabase server menggunakan `SUPABASE_URL` dan `SUPABASE_SECRET_KEY`.
- `app/page.jsx` diubah menjadi Server Component yang membaca data produk dari tabel `produk` di Supabase.
- Produk ditampilkan menggunakan komponen `KartuProduk`.
- Pesan error ditampilkan jika pengambilan data gagal, dan teks `"Belum ada produk"` muncul jika tabel kosong.
- Komponen `CatatanBelumAktif` dan data tiruan `produkContoh` berhasil dihapus.
- Pengujian build dan akses lokal mengembalikan status HTTP 200 dengan data produk Supabase.

**Perbaikan:**
- Menambahkan konfigurasi `export const dynamic = "force-dynamic"` agar katalog selalu menyajikan data terbaru secara langsung dari database.

---

## US-02 Detail produk

**Prompt:**
```text
Baca docs/user-stories.md bagian US-02.

Ubah app/produk/[id]/page.jsx supaya mengambil satu produk dari tabel "produk" di Supabase berdasarkan id di URL, di sisi server, memakai koneksi Supabase yang sudah dibuat di lib/supabase. Kalau produk tidak ditemukan, panggil notFound(). Jangan ubah tampilannya. Hapus CatatanBelumAktif dari halaman ini, tapi biarkan tombol WhatsApp.
```

**Hasil:**
- `app/produk/[id]/page.jsx` berhasil mengambil data produk individual dari tabel `produk` di Supabase berdasarkan `id`.
- Parameter `params` di-await sesuai konvensi Next.js 16 (`const { id } = await params`).
- Jika produk tidak ditemukan atau ID tidak valid, fungsi `notFound()` dipanggil untuk merender halaman 404 (`app/not-found.jsx`).
- Menghapus komponen `CatatanBelumAktif` tanpa mengubah tata letak halaman dan mempertahankan `TombolWhatsApp`.
- Pengujian berhasil: `/produk/1` menyajikan detail produk secara benar, sementara `/produk/999999` dan `/produk/invalid-id` mengembalikan HTTP 404 Not Found.

**Perbaikan:**
- Memastikan pemanggilan `notFound()` berada di luar penanganan `try/catch` agar tidak tertangkap oleh mekanisme internal redirect/not-found Next.js.

---

## US-03 Pesan via WhatsApp

**Prompt:**
```text
Baca docs/rancangan-teknis.md bagian "Pesan WhatsApp (US-03)".

Ubah components/TombolWhatsApp.jsx menjadi tautan yang membuka https://wa.me/ ke nomor di lib/toko.js, dengan pesan otomatis berisi nama dan harga produk dalam format rupiah. Pesan di-encode dengan encodeURIComponent dan dibuka di tab baru. Pertahankan tampilan tombolnya. Hapus CatatanBelumAktif yang menyebut US-03 di halaman detail produk.
```

**Hasil:**
- `components/TombolWhatsApp.jsx` diubah menjadi elemen tautan `<a>` menuju URL WhatsApp: `https://wa.me/<nomor>?text=<pesan>`.
- Nomor WhatsApp diambil dari `lib/toko.js`.
- Pesan otomatis memuat nama produk dan harga terformat rupiah (`formatRupiah`), serta di-encode dengan `encodeURIComponent`.
- Membuka tab baru dengan `target="_blank"` dan `rel="noopener noreferrer"`.
- Gaya visual dan kelas CSS tombol tetap dipertahankan.
- Pengujian inspeksi HTML pada `/produk/1` mengonfirmasi link dan pesan ter-encode dengan benar.

**Perbaikan:**
- Tidak ada perbaikan khusus; format link dan teks pesan sudah sesuai rancangan teknis.

---

## US-04 Login admin

**Prompt:**
```text
Baca AGENTS.md bagian aturan keamanan dan docs/user-stories.md bagian US-04.

Buat login admin memakai Supabase Auth (email dan password) dengan @supabase/ssr dan cookie, memakai SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY. Login diproses dengan Server Action di app/admin/actions.js dan disambungkan ke form di app/admin/login/page.jsx. Login berhasil diarahkan ke /admin; login gagal menampilkan pesan error yang jelas di halaman login. Buat juga tombol "Keluar" di components/NavAdmin.jsx berfungsi: mengakhiri sesi lalu kembali ke /admin/login. Jangan ubah tampilan. Hapus CatatanBelumAktif dari halaman login.
```

**Hasil:**
- Menambahkan helper `buatKoneksiSesiAdmin` di `lib/supabase/server.js` menggunakan `@supabase/ssr` (`createServerClient`) dengan cookie store dari `next/headers`.
- Membuat Server Action `loginAdmin` dan `keluarAdmin` di `app/admin/actions.js`.
- `app/admin/login/page.jsx` disambungkan ke `loginAdmin` menggunakan hook React 19 `useActionState` dan menampilkan pesan error jika autentikasi gagal.
- Tombol "Keluar" di `components/NavAdmin.jsx` dihubungkan ke `keluarAdmin` melalui form submit server.
- `CatatanBelumAktif` dihapus dari halaman login.
- Pengujian berhasil: autentikasi yang salah memunculkan pesan error, dan rute `/admin/login` dapat diakses normal (HTTP 200).

**Perbaikan:**
- Memastikan pemanggilan `redirect("/admin")` dan `redirect("/admin/login")` dilakukan di luar blok `try/catch` agar mekanisme redirect Next.js tidak terinterupsi.

---

## US-05 Ganti password

**Prompt:**
```text
Baca docs/user-stories.md bagian US-05.

Buat Server Action ganti password di app/admin/actions.js untuk admin yang sedang login, memakai Supabase Auth. Validasi di server: password baru minimal 8 karakter dan harus sama dengan konfirmasi. Tampilkan pesan berhasil atau pesan error yang jelas di halaman. Sambungkan ke form di app/admin/password/page.jsx tanpa mengubah tampilannya. Hapus CatatanBelumAktif dari halaman ini.
```

**Hasil:**
- Membuat Server Action `gantiPassword` di `app/admin/actions.js`.
- Menjalankan validasi server: mengecek sesi admin aktif via `auth.getUser()`, memastikan password minimal 8 karakter, dan memeriksa kesamaan password baru dengan konfirmasi.
- Password diperbarui melalui `supabase.auth.updateUser({ password })`.
- Form pada `app/admin/password/page.jsx` disambungkan ke Server Action via `useActionState`, serta menampilkan pesan sukses atau pesan error secara dinamis.
- `CatatanBelumAktif` dihapus dari halaman ganti password.
- Pengujian build Next.js berhasil tanpa ada error.

**Perbaikan:**
- Menggunakan token desain (`bg-permukaan border-garis text-bahaya` untuk error, `text-utama` untuk sukses) agar konsisten dengan panduan tampilan.

---

## US-06 Proteksi halaman admin

**Prompt:**
```text
Baca AGENTS.md aturan keamanan nomor 3 dan 4, dan docs/user-stories.md bagian US-06.

Buat file proxy.js di root proyek (Next.js 16). Semua rute /admin kecuali /admin/login wajib login dengan Supabase Auth; kalau belum login, alihkan ke /admin/login. Pastikan juga setiap Server Action yang mengubah data memeriksa login di server. Hapus CatatanBelumAktif dari halaman /admin.
```

**Hasil:**
- Dibuat file `proxy.js` di root proyek sebagai pengganti `middleware.js` sesuai standar Next.js 16.
- Rute `/admin` dan seluruh sub-rutenya diproteksi; permintaan tanpa sesi Supabase Auth langsung dialihkan (HTTP 307) ke `/admin/login`.
- Rute `/admin/login` dikecualikan untuk mencegah redirect loop.
- Server Action yang mengubah data (`gantiPassword`) wajib memverifikasi login admin di server melalui helper `periksaAdminLogin()`.
- `CatatanBelumAktif` dihapus dari `app/admin/page.jsx`.
- Pengujian curl membuktikan rute `/admin`, `/admin/password`, dan `/admin/produk/baru` dialihkan ke `/admin/login`, sedangkan `/admin/login` dan `/` dapat diakses normal.

**Perbaikan:**
- Menambahkan penanganan fail-safe pada `proxy.js`: jika variabel lingkungan autentikasi belum disetel atau `getUser()` mengalami error, rute admin tetap aman (dialihkan ke login) tanpa memicu redirect loop pada halaman `/admin/login`.

---

## Debugging dan fitur bonus

- **Audit Keamanan Tahap 15:**
  - File `.env.local` diverifikasi terdaftar di `.gitignore` dan tidak terlacak di Git repository.
  - Dipastikan tidak ada variabel rahasia `SUPABASE_SECRET_KEY` yang bocor ke browser maupun file bertanda `"use client"`.
  - Semua aksi mutasi data dipastikan memvalidasi autentikasi di server.
- **Rencana Fitur Bonus:**
  - Fitur bonus US-07 sampai US-10 dipertahankan strukturnya dan disiapkan untuk dikerjakan setelah penyelesaian Tahap 15.