# Asisten Chat AI Toko Online (LYRA)

Ini adalah proyek asisten chat AI yang terintegrasi dengan toko online **PLUS62STORE**, dirancang untuk membantu pengguna dalam menjelajahi produk, mengelola keranjang belanja, dan melakukan proses checkout. Asisten ini menggunakan Google Gemini AI untuk memberikan respons yang cerdas dan Cloudflare Workers + KV untuk fungsionalitas backend dan persistensi data.

```bash
/**
 * =============================================================================
 * Cloudflare Worker yang Dioptimalkan untuk Asisten AI Gemini Ramah (LYRA)
 * =============================================================================
 *
 * Peningkatan:
 * 1.  Kepribadian: Prompt untuk "LYRA" di "plus62store" kini jauh lebih mendetail agar terdengar ceria, ramah, dan membantu.
 * 2.  Efisiensi: Beralih ke 'gemini-2.5-flash', model cepat dan canggih yang cocok untuk aplikasi AI chat.
 * 3.  Penanganan Error: Memberikan pesan kesalahan yang lebih ramah pengguna jika terjadi kegagalan.
 * 4.  Fleksibilitas: Asal CORS dapat dikonfigurasi melalui variabel lingkungan.
 * 5.  Pembatasan Chat Harian menggunakan Cloudflare KV.
 * 6.  Peningkatan pemilihan URL gambar untuk AI.
 * 7.  [BARU] AI memberikan objek produk lebih lengkap untuk aksi 'viewProductDetails'.
 *
 */

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Membangun prompt yang komprehensif untuk asisten AI LYRA.
 * @param {string} userMessage - Pesan dari pengguna saat ini.
 * @param {Array<Object>} productData - Data produk yang tersedia.
 * @param {Array<Object>} cartItems - Item-item yang saat ini ada di keranjang simpleCart [modify].
 * @param {Array<Object>} fullChatHistory - Seluruh riwayat chat dari KV.
 * @returns {string} Prompt yang diformat untuk AI.
 */
```

## Fitur Utama

- **Asisten Chat AI Interaktif**: Pengguna dapat berinteraksi dengan AI untuk mendapatkan informasi produk dan bantuan belanja.
- **Detail Produk Dinamis**: AI dapat memberikan detail spesifik tentang produk, termasuk harga, diskon, stok, dan varian warna.
- **Manajemen Keranjang Belanja**: Mendukung aksi menambah, menghapus, memperbarui jumlah, dan melihat isi keranjang belanja melalui interaksi chat.
- **Status AI Real-time**: Menampilkan waktu aktif AI dan indikator "Online" yang berubah berdasarkan keberhasilan komunikasi dengan API.
- **Riwayat Chat Persisten**: Percakapan pengguna disimpan menggunakan Cloudflare KV, memungkinkan riwayat chat tetap ada bahkan setelah halaman dimuat ulang.
- **Opsi Hapus Riwayat Chat**: Pengguna memiliki kontrol untuk menghapus seluruh riwayat percakapan mereka.
- **Modal Chat Responsif**: Tampilan chat disesuaikan untuk desktop dan mobile, dengan modal chat otomatis muncul di perangkat mobile untuk pengalaman yang lebih baik.
- **Pengalihan Checkout**: AI dapat mengarahkan pengguna langsung ke halaman checkout khusus setelah konfirmasi pembayaran.

## Teknologi yang Digunakan

### Frontend:

- **Jekyll**: Sebagai generator situs statis (diasumsikan untuk struktur dasar HTML).
- **Ionic v8**: Untuk komponen UI yang modern dan responsif (modal, tombol, input, dll.).
- **Tailwind CSS**: Untuk styling yang cepat dan responsif.
- **simpleCart(js MODIFY)**: Pustaka JavaScript ringan untuk manajemen keranjang belanja di sisi klien.
- **Marked.js & DOMPurify**: Untuk merender respons AI yang diformat Markdown dengan aman.

### Backend:

- **Cloudflare Workers**: Lingkungan serverless untuk menjalankan kode backend.
- **Google Gemini API (gemini-2.5-flash)**: Model AI yang digunakan untuk menghasilkan responsive chat.
- **Cloudflare KV (Key-Value Store)**: Digunakan untuk menyimpan riwayat chat pengguna secara persisten.

## Struktur Proyek

```
├── _includes/
├── _layouts/
├── _posts/
├── assets/
├── index.html
├── chat-assistant.html         # Halaman utama dengan integrasi chat AI
├── checkout.html               # Halaman checkout untuk formulir pengiriman & pembayaran
├── worker.js                   # Kode Cloudflare Worker (backend API)
├── produk.json                 # Contoh data produk
└── README.md                   # Dokumen ini
```

## Persiapan & Instalasi

### 1. Cloudflare Worker (Backend)

#### Buat Cloudflare Worker:

- Masuk ke akun Cloudflare Anda.
- Navigasi ke bagian "Workers & Pages".
- Buat aplikasi baru (Deploy a Worker).

#### Konfigurasi Variabel Lingkungan:

- Di pengaturan Worker Anda, pergi ke tab `Settings` -> `Variables` -> `Environment Variables`.
- Tambahkan variabel baru:
  - `GEMINI_API_KEY`: Kunci API Google Gemini Anda.
  - `CORS_ORIGIN`: URL frontend Anda (misalnya, [https://your-domain.com](https://your-domain.com) atau \* untuk pengembangan).

#### Buat Binding KV Namespace:

- Di pengaturan Worker Anda, pergi ke tab `Settings` -> `KV Namespace Bindings`.
- Tambahkan binding baru:
  - Nama Variabel: `CHAT_HISTORY_KV`
  - KV Namespace: Buat Namespace baru (misalnya, `lyra-chat-history`) atau pilih yang sudah ada.

#### Deploy `worker.js`:

- Salin isi file `worker.js` ke editor Worker di Cloudflare Dashboard Anda.
- Deploy Worker.
- Pastikan Worker Anda dapat diakses melalui URL Worker (misalnya, `https://your-worker.your-username.workers.dev`).

### 2. Frontend (Jekyll/HTML)

#### Siapkan File HTML:

- Pastikan Anda memiliki `index.html`, `chat-assistant.html`, dan `checkout.html` di struktur proyek Anda.
- File `simpleCart.html` (jika Anda menggunakannya sebagai include) dan `product-section.html` juga harus ada.

#### Perbarui URL API:

- Di `chat-assistant.html`, cari semua kemunculan `https://gemini.sendaljepit.workers.dev` dan ganti dengan URL Cloudflare Worker Anda yang sebenarnya.

#### Pastikan CDN Ionic & Tailwind:

Pastikan Anda telah menyertakan CDN untuk Ionic v8 dan Tailwind CSS di semua file HTML yang relevan, seperti:

```html
<script src="https://cdn.tailwindcss.com"></script>
<script type="module" src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.esm.js"></script>
<script nomodule src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@ionic/core/css/ionic.bundle.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/marked/4.0.17/marked.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/2.3.6/purify.min.js"></script>
```

#### Data Produk:

- Pastikan file `produk.json` Anda dapat diakses oleh frontend (misalnya, di-host di GitHub Pages atau server statis lainnya). URL ini digunakan di `chat-assistant.html`.

#### simpleCart(js) Setup:

- Pastikan `simplecart.min.js` dimuat di halaman Anda. Sesuaikan path-nya jika perlu.
- Inisialisasi `simpleCart` di halaman yang relevan (misalnya, `index.html` atau `chat-assistant.html`).

## Cara Menggunakan

1. **Akses Aplikasi**: Buka `index.html` atau `chat-assistant.html` di browser Anda.
2. **Sapaan Awal**: AI akan otomatis menyapa Anda saat halaman dimuat (dan modal chat akan muncul di mobile).
3. **Interaksi Chat**: Ketik pertanyaan Anda di kolom input chat. Contoh:
   - "Ada masker apa saja?"
   - "Boleh lihat detail untuk Masker Bordir Setaman?"
   - "Tambahkan 2 Masker Bordir Ilalang ke keranjang."
   - "Lihat keranjang."
   - "Kosongkan keranjang."
   - "Aku mau bayar dong." (Ini akan mengarahkan ke `checkout.html` *manual)
4. **Hapus Riwayat**: Klik tombol "Hapus Riwayat Chat" untuk membersihkan percakapan Anda.

## Pengembangan Lanjutan

- **Integrasi Backend Checkout**: Kembangkan endpoint backend (misalnya, di Worker) untuk memproses data formulir checkout dan mengelola pesanan.
- **Notifikasi Pembayaran**: Otomatiskan notifikasi pembayaran ke admin setelah pengguna mengkonfirmasi transfer.
- **Manajemen Produk Dinamis**: Buat antarmuka admin untuk mengelola produk tanpa perlu mengedit `produk.json` secara manual.
- **Variasi Produk Lebih Lanjut**: Perluas kemampuan AI untuk memahami dan memproses variasi produk (ukuran, bahan, dll.) saat menambah ke keranjang.
- **Personalisasi AI**: Latih AI dengan data percakapan yang lebih spesifik untuk meningkatkan respons dan persona LYRA.
- **Pencarian Produk Lanjut**: Implementasikan fitur pencarian yang lebih canggih (misalnya, filter berdasarkan harga, kategori, stok).
- **Autentikasi Pengguna**: Jika diperlukan, tambahkan sistem login/registrasi untuk mengelola riwayat chat dan keranjang per pengguna secara lebih aman.

