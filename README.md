<div align="center">
  <img src="https://github.com/user-attachments/assets/bc206a62-4b37-4064-a1af-872e7a157463" width="200" alt="MENTARI Logo">

  # MENTARI MOD v2.1 AUTOPILOT
  ### *Manajemen Terpadu Pembelajaran Daring — The Ultimate Automated Learning Assistant*

  [![Version](https://img.shields.io/badge/Version-v2.1%20Autopilot-0284c7?style=for-the-badge&logo=rocket&logoColor=white)](https://github.com/A-Isnandar/Mentari-Unpam)
  [![Manifest V3](https://img.shields.io/badge/Chrome%20Extension-Manifest%20V3-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)](https://developer.chrome.com/docs/extensions/mv3/intro/)
  [![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
</div>

---

## 🌟 Tentang Mentari Mod v2.1 Autopilot

**MENTARI** (*Manajemen Terpadu Pembelajaran Daring*) merupakan platform pembelajaran digital resmi Universitas Pamulang. 

**MENTARI MOD v2.1 Autopilot** adalah evolusi mutakhir dari browser extension Mentari Mod. Jika versi terdahulu hanya berfokus pada pelacakan forum secara pasif atau semi-manual, versi **v2.1 Autopilot** menghadirkan otomatisasi menyeluruh (*end-to-end*), asisten cerdas berbasis Google Gemini AI dengan etika jawaban natural, penyaringan jadwal cerdas, penyelesaian kuesioner absensi tuntas, serta pembaruan antarmuka modern lengkap dengan *interactive pixel playground*.

---

## 🚀 Fitur Baru & Peningkatan (v2.1 Autopilot vs Versi Asli)

Berikut adalah daftar komprehensif fitur-fitur baru dan modifikasi besar yang dihadirkan pada **Mentari Mod v2.1 Autopilot**:

### 1. 🤖 Mode Autopilot Cerdas (Full End-to-End Workflow)
- **Otomatisasi Komprehensif Berurutan**: Mengerjakan rangkaian aktivitas mingguan dari awal hingga akhir tanpa intervensi manual:
  1. **Pre-Test Otomatis**: Menjawab soal pretest menggunakan basis pengetahuan Gemini AI.
  2. **Materi & Bahan Ajar**: Membuka dan menandai materi perkuliahan sebagai selesai.
  3. **Forum Diskusi Cerdas**: Menyusun dan memposting argumen diskusi berkualitas akademis (minimal 2 balasan/reply per topik).
  4. **Post-Test / Tugas / Quiz**: Mengerjakan quiz dan latihan soal dengan penalaran AI akurat.
  5. **Pengisian Kuesioner Evaluasi**: Mengisi kuesioner evaluasi pembelajaran dosen secara otomatis.
- **Mekanisme Human-Like Delay**: Dilengkapi jeda waktu acak dinamis antar aksi untuk menjaga keamanan akun dan menghindari deteksi bot.

### 2. 🧹 Fitur "Sapu Bersih" Tuntas & Kuesioner Auto-Absensi
- **Penyelesaian 100% Hingga Kuesioner**: Memperbaiki kelemahan versi terdahulu di mana kuesioner sering terlewat. Di sistem e-learning UNPAM, kehadiran mahasiswa dihitung secara sistemik saat kuesioner telah terisi pada minggu berjalan. Fitur ini memastikan **tidak ada kuesioner yang tertinggal** sebelum batas waktu pertemuan ditutup.
- **Sinkronisasi Tab "Selesai"**: Aktivitas yang telah tuntas otomatis dipindahkan dengan status valid ke tab "Selesai".

### 3. 📅 Penyaringan Pintar Tab "Selesai" (Smart Schedule Filter)
- **Filter Perkuliahan Aktif**: Menyembunyikan pertemuan yang memang tidak memiliki jadwal kuliah pada minggu berjalan (seperti mata kuliah 3 SKS atau kloter pertama yang sedang perkuliahan tatap muka / offline).
- Menghindari kebingungan mahasiswa akibat tampilan mata kuliah kosong yang seharusnya tidak terjadwal di minggu tersebut.

### 4. ✍️ Aturan Etika & Jawaban Natural Forum Diskusi (AI Anti-Bot Rules)
- **Selalu Diawali "Izin menjawab,"**: Seluruh respon forum diskusi yang dihasilkan AI secara konsisten diawali dengan kalimat santun khas mahasiswa Indonesia: *"Izin menjawab, ..."*.
- **Pembersihan Identitas Mahasiswa/Dosen (Banned NIM & Nama)**: Menghapus total template kaku khas bot seperti *"Halo rekan 23101140xxxx"* atau *"Menanggapi pertanyaan rekan [Nama]"*. AI berfokus murni pada substansi argumen akademis.
- **Sanitasi Konten Cerdas (`cleanForumAnswer`)**: Menghilangkan format markdown berlebih, tanda petik pembungkus, kalimat pembuka meta-AI (seperti *"Tentu, ini jawaban Anda..."*), sehingga jawaban 100% natural dan tidak terdeteksi sebagai jawaban AI oleh dosen.

### 5. 🎨 Antarmuka (UI) Elegan, Rapi & Responsif
- **Restorasi Tampilan Asli yang Bersih**: Merapikan seluruh komponen popup, tata letak kartu mata kuliah, dan kontrol extension agar kembali rapi, proporsional, dan modern.
- **Perbaikan Toggle Button**: Memperbaiki fungsi tombol toggle dan kontrol pengaturan agar selalu responsif dan bebas macet.

### 6. 🚀 Animasi Roket Autopilot di Fox Playground (`pet.html` / `pet.js`)
- **Desain Pixel Art Vertikal (Retro Style)**: Roket dirancang dengan seni pixel klasik (*stepped pixels* & *crisp edges*) yang selaras dengan pet rubah dan ayam. Menggunakan moncong merah, tabung putih, 3 sirip pendaratan tripod merah, nozzle biru, dan jendela bulat kaca cyan dengan pantulan cahaya diagonal.
- **Dinamika Terbang Vertikal ala SpaceX (Falcon 9)**:
  - **Lepas Landas Vertikal**: Roket lepas landas tegak lurus dari bukit kiri dengan semburan api pendorong ke bawah.
  - **Gravity Turn**: Condong secara bertahap ke arah tujuan melintasi langit atas dalam lintasan parabola suborbital.
  - **Retro-Landing Burn**: Menegakkan kembali badan roket ke posisi tegak lurus saat mendekati bukit tujuan, melakukan pengereman vertikal, dan mendarat tegak bertengger di atas bukit kanan.
  - **Looping Bolak-Balik**: Mengulang penerbangan pulang ke bukit kiri secara mulus (*seamless continuous loop*).
- **Interaksi Klik Responsif**: Saat roket diklik (baik ketika terbang maupun mendarat), roket memantul (*bounce*) dan memunculkan gelembung reaksi:
  > **"Autopilot Siap!"**
- **Gaya Gelembung Identik**: Style bubble chat roket 100% identik dengan pet lain (background putih transparan membulat, font hijau hutan organik, tanpa border kaku).
- **100% Manifest V3 CSP Compliant**: Seluruh kode interaksi dipindahkan ke `pet.js`, bebas script inline, memastikan kompatibilitas penuh dengan aturan keamanan Google Chrome.

### 7. 🔑 Multi-Model Gemini AI & Secure API Key Manager
- Mendukung integrasi model Google Gemini terbaru (`gemini-1.5-flash`, `gemini-1.5-pro`, dan varian mutakhir lainnya).
- Penyimpanan API Key lokal yang aman dengan fitur validasi kuota otomatis.

---

## 🖥️ Tampilan Antarmuka

<div align="center">
  <img width="863" height="452" alt="Mentari Mod v2.1 Autopilot Screenshot" src="https://github.com/user-attachments/assets/18a7b96d-e472-4381-9ea2-1f421a04826e" />
  <img width="863" height="452" alt="Mentari Mod v2.1 Autopilot Playground" src="https://github.com/user-attachments/assets/aecbbf0a-1be0-4b7f-abe6-0a83767992aa" />
</div>

---

## 📥 Panduan Instalasi

Extension ini kompatibel dengan browser berbasis Chromium di **Windows, macOS, Linux**, dan browser mobile seperti **Mises Browser** / **Kiwi Browser**.

### Instalasi di Google Chrome / Microsoft Edge / Brave
1. Unduh atau clone repositori ini:
   ```bash
   git clone https://github.com/A-Isnandar/Mentari-Unpam.git
   ```
   *(atau unduh file ZIP repositori dan ekstrak ke folder komputer Anda)*.
2. Buka browser dan ketik alamat:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
   - Brave: `brave://extensions/`
3. Aktifkan **Developer Mode / Mode Pengembang** di pojok kanan atas.
4. Klik tombol **Load unpacked / Muat yang belum dikemas**.
5. Pilih folder hasil ekstraksi/clone **Mentari-Unpam**.
6. Extension **Mentari Mod v2.1 Autopilot** siap digunakan!

### Instalasi di Perangkat Android (Mises / Kiwi Browser)
1. Buka **Mises Browser** atau **Kiwi Browser**.
2. Masuk ke menu titik tiga $\rightarrow$ pilih **Extensions**.
3. Aktifkan **Developer Mode**.
4. Pilih **+ (from zip/dir)** lalu arahkan ke folder extension.
5. Buka situs [mentari.unpam.ac.id](https://mentari.unpam.ac.id/) dan extension akan otomatis aktif.

---

## ⚙️ Cara Menggunakan Fitur Autopilot

1. **Konfigurasi Gemini API Key**:
   - Dapatkan API Key gratis di [Google AI Studio](https://aistudio.google.com/).
   - Buka popup Mentari Mod $\rightarrow$ masuk ke menu Pengaturan $\rightarrow$ masukkan API Key Anda.
2. **Menjalankan Autopilot Mingguan**:
   - Buka dashboard perkuliahan e-learning MENTARI UNPAM.
   - Klik tombol **Autopilot** pada popup atau widget floating.
   - Sistem akan memindai aktivitas perkuliahan minggu berjalan dan menjalankannya secara berurutan.
3. **Fitur Sapu Bersih**:
   - Gunakan tombol **Sapu Bersih** untuk menuntaskan seluruh sisa tugas, fordis, kuis, dan kuesioner yang belum sempat terselesaikan.
4. **Fox Playground**:
   - Di bagian atas dashboard e-learning, nikmati kehadiran rubah santai, ayam, dan roket Autopilot SpaceX yang meluncur di angkasa. Klik roket untuk menyapanya!

---

## 📋 Struktur Berkas Proyek

```plaintext
Mentari-Unpam/
├── manifest.json              # Konfigurasi Extension Manifest V3
├── pet.html                   # Fox & Rocket Playground Scene
├── pet.js                     # Logika Pet, Interaksi Roket, dan Loop Animasi
├── src/
│   ├── assets/                # Aset gambar, ikon, dan background
│   ├── content/
│   │   ├── content.js         # Injektor utama e-learning UNPAM
│   │   ├── token.js           # Engine Autopilot, Forum Automation & Gemini API
│   │   ├── discus.js          # Pengelola Forum Diskusi & Sanitasi Jawaban
│   │   ├── quiz.js            # Asisten Pengerjaan Kuis Otomatis
│   │   ├── kuisioner.js       # Otomasi Pengisian Kuesioner Dosen
│   │   ├── presensi.js        # Pelacak & Manajemen Presensi Mahasiswa
│   │   ├── QuickSurvey.js     # Otomasi Survei Singkat
│   │   ├── apiKeyManager.js   # Pengelola Rotasi & Penyimpanan API Key
│   │   ├── home.js            # Kustomisasi Halaman Login & Dashboard
│   │   └── pw.js              # Utilitas Kredensial
│   └── popup/
│       ├── popup.html         # Antarmuka Pop-up Extension
│       ├── popup.js           # Logika Interaksi Pop-up
│       └── popup.css          # Styling Modern Pop-up
└── README.md                  # Dokumentasi Proyek
```

---

## ❓ FAQ (Frequently Asked Questions)

#### 1. Apakah fitur Autopilot aman digunakan?
*Ya. Mentari Mod v2.1 Autopilot dilengkapi mekanisme delay acak manusia (*human-like delay*), aturan jawaban sopan tanpa pencantuman NIM/nama bot, serta sanitasi jawaban untuk memastikan interaksi perkuliahan tetap natural dan aman.*

#### 2. Mengapa kuesioner dosen sangat penting diisi?
*Sistem e-learning MENTARI UNPAM secara otomatis mengunci dan memvalidasi absensi mingguan mahasiswa hanya setelah kuesioner evaluasi dosen selesai diisi. Fitur Sapu Bersih v2.1 memastikan kuesioner selalu terisi penuh agar kehadiran Anda tercatat 100%.*

#### 3. Mengapa beberapa pertemuan tidak muncul di tab "Selesai"?
*Fitur Smart Schedule Filter di v2.1 secara cerdas menyembunyikan pertemuan yang tidak memiliki jadwal aktif di minggu berjalan (misal mata kuliah 3 SKS atau kloter tatap muka offline), sehingga daftar mata kuliah Anda tetap rapi dan relevan.*

---

## ⚖️ Disclaimer

**Mentari Mod v2.1 Autopilot** dikembangkan sebagai proyek independen oleh mahasiswa untuk mempermudah manajemen perkuliahan dan meningkatkan efektivitas belajar. Proyek ini **tidak berafiliasi secara resmi dengan Universitas Pamulang**. Pengguna bertanggung jawab penuh atas penggunaan extension dan disarankan tetap memahami materi perkuliahan secara mandiri.

---

## 📄 Lisensi

Proyek ini didistribusikan di bawah lisensi **[MIT License](LICENSE)**.

---

<div align="center">
  <b>Mentari Mod v2.1 Autopilot</b> • Developed & Enhanced by <a href="https://github.com/A-Isnandar">A-Isnandar</a> & Community<br>
  <i>Original Base Project by <a href="https://github.com/lukman754">Lukman Muludin</a></i>
</div>
