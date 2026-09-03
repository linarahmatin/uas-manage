# UAS Hub

Buatkan sebuah website Front-End untuk Sistem Manajemen Ujian Akhir Semester (UAS) berbasis web untuk Jurusan Teknologi Informasi.

Tujuan sistem:

Sistem digunakan untuk membantu panitia/admin dalam mengelola pelaksanaan UAS, mulai dari pendataan mata kuliah, data dosen, soal ujian, jadwal ujian, ruang ujian, dosen pengawas, hingga pengumuman UAS.

Gunakan desain yang:

- Modern

- Profesional

- Minimalis

- Bersih dan mudah digunakan

- Responsive untuk desktop, tablet, dan mobile

- Cocok digunakan oleh lingkungan kampus

- Gunakan warna utama biru dan putih

- Gunakan card, tabel, badge status, modal, dropdown, dan sidebar

- Gunakan ikon yang sederhana dan konsisten

Buat menggunakan React/Next.js dan Tailwind CSS.

ROLE PENGGUNA:

1. Admin/Panitia UAS

2. Dosen

3. Mahasiswa

================================

HALAMAN LOGIN

================================

Buat halaman login dengan:

- Logo/identitas Jurusan Teknologi Informasi

- Judul "Sistem Manajemen UAS"

- Input email/NIM

- Input password

- Tombol "Masuk"

- Link "Lupa Password?"

- Pilihan role pengguna

================================

DASHBOARD ADMIN

================================

Buat dashboard admin dengan sidebar navigation.

Sidebar:

- Dashboard

- Data Mata Kuliah

- Data Dosen

- Data Mahasiswa

- Data Soal Ujian

- Jadwal UAS

- Ruang Ujian

- Dosen Pengawas

- Pengumuman

- Laporan

- Pengaturan

- Logout

Dashboard menampilkan:

- Total Mata Kuliah

- Total Dosen

- Total Jadwal UAS

- Total Ruang

- Total Pengawas

- Jadwal UAS terdekat

- Status pendataan soal

- Pengumuman terbaru

Tambahkan grafik sederhana:

- Jumlah ujian berdasarkan hari

- Status pengumpulan soal

- Penggunaan ruang ujian

================================

HALAMAN DATA MATA KULIAH

================================

Buat halaman CRUD data mata kuliah.

Tabel:

- Kode Mata Kuliah

- Nama Mata Kuliah

- Semester

- Kelas

- SKS

- Dosen Pengampu

- Jenis Ujian

- Status

- Aksi

Fitur:

- Tambah data

- Edit

- Hapus

- Search

- Filter

- Pagination

================================

HALAMAN DATA DOSEN

================================

Tampilkan tabel:

- NIP/NIDN

- Nama Dosen

- Email

- Program Studi

- Mata Kuliah

- Status

Tambahkan tombol:

- Tambah Dosen

- Edit

- Hapus

- Detail

================================

HALAMAN SOAL UJIAN

================================

Buat halaman untuk pengelolaan soal UAS.

Tabel:

- Mata Kuliah

- Dosen Pengampu

- Jenis Ujian

- Bentuk Soal

- Jumlah Soal

- Status

- Tanggal Pengumpulan

- Aksi

Status:

- Belum Diinput

- Draft

- Sudah Dikumpulkan

- Diverifikasi

- Revisi

Tambahkan fitur upload file soal dan tombol download.

================================

HALAMAN JADWAL UAS

================================

Buat halaman jadwal UAS dengan tampilan tabel dan kalender.

Data:

- Tanggal

- Hari

- Jam

- Mata Kuliah

- Kelas

- Ruang

- Dosen Pengawas

- Jenis Ujian

- Status

Fitur:

- Tambah jadwal

- Edit

- Hapus

- Filter berdasarkan tanggal

- Filter kelas

- Filter semester

- Export jadwal

================================

HALAMAN RUANG UJIAN

================================

Tampilkan:

- Nama Ruang

- Gedung

- Lantai

- Kapasitas

- Status

- Jadwal penggunaan

Status ruang:

- Tersedia

- Digunakan

- Tidak tersedia

================================

HALAMAN DOSEN PENGAWAS

================================

Buat halaman penjadwalan dosen pengawas.

Tabel:

- Nama Dosen

- Tanggal

- Jam

- Ruang

- Mata Kuliah

- Kelas

- Status Penugasan

Tambahkan fitur:

- Assign pengawas

- Edit penugasan

- Hapus penugasan

- Filter tanggal

================================

HALAMAN PENGUMUMAN

================================

Buat halaman untuk membuat dan mengelola pengumuman UAS.

Tampilkan:

- Judul

- Isi pengumuman

- Tanggal

- Pembuat

- Status

- Aksi

Tambahkan tombol:

- Buat Pengumuman

- Edit

- Hapus

- Publikasikan

================================

HALAMAN LAPORAN

================================

Buat halaman laporan dengan beberapa card:

- Rekap Jadwal UAS

- Rekap Pengawas

- Rekap Ruang

- Rekap Soal

- Rekap Mata Kuliah

Tambahkan tombol:

- Export Excel

- Export PDF

- Print

================================

DASHBOARD DOSEN

================================

Dosen dapat melihat:

- Jadwal UAS

- Mata Kuliah yang diampu

- Status pengumpulan soal

- Jadwal menjadi pengawas

- Pengumuman

Tambahkan tombol:

"Input Soal UAS"

================================

DASHBOARD MAHASISWA

================================

Mahasiswa dapat melihat:

- Jadwal UAS

- Mata Kuliah

- Tanggal dan jam ujian

- Ruang ujian

- Pengumuman UAS

Buat tampilan jadwal yang mudah dibaca.

================================

KOMPONEN TAMBAHAN

================================

Buat:

- Sidebar responsive

- Navbar

- Breadcrumb

- Notification

- Modal konfirmasi hapus

- Toast notification

- Loading state

- Empty state

- Error state

- Search

- Filter

- Pagination

- Dropdown profile

Gunakan dummy data agar semua halaman dapat langsung ditampilkan.

Pastikan seluruh halaman memiliki desain yang konsisten dan dapat dinavigasikan dari sidebar.

Buat UI yang terlihat seperti sistem administrasi kampus profesional, bukan landing page.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f147f71d-d07a-4625-8a6f-68f12333fa2e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
