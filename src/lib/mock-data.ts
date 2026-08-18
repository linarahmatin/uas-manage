export type StatusTone = "success" | "warning" | "info" | "danger" | "neutral" | "brand";

export const statusTone: Record<string, StatusTone> = {
  Aktif: "success",
  "Tidak Aktif": "neutral",
  Terjadwal: "info",
  Selesai: "success",
  Draft: "warning",
  "Belum Diinput": "danger",
  "Sudah Dikumpulkan": "info",
  Diverifikasi: "success",
  Revisi: "warning",
  Tersedia: "success",
  Digunakan: "info",
  "Tidak tersedia": "danger",
  Ditugaskan: "success",
  Menunggu: "warning",
  Dibatalkan: "danger",
  Terbit: "success",
  Arsip: "neutral",
};

export type MataKuliah = {
  kode: string;
  nama: string;
  semester: number;
  kelas: string;
  sks: number;
  dosen: string;
  jenisUjian: "Tulis" | "Praktikum" | "Take Home" | "Online";
  status: "Aktif" | "Tidak Aktif";
};

export const mataKuliah: MataKuliah[] = [
  { kode: "TI2101", nama: "Algoritma & Pemrograman", semester: 2, kelas: "TI-2A", sks: 3, dosen: "Dr. Rahmat Hidayat, M.Kom", jenisUjian: "Praktikum", status: "Aktif" },
  { kode: "TI2103", nama: "Basis Data", semester: 4, kelas: "TI-4A", sks: 3, dosen: "Yulia Fatma, M.T", jenisUjian: "Tulis", status: "Aktif" },
  { kode: "TI2105", nama: "Jaringan Komputer", semester: 4, kelas: "TI-4B", sks: 2, dosen: "Ahmad Fauzi, M.Kom", jenisUjian: "Praktikum", status: "Aktif" },
  { kode: "TI3201", nama: "Rekayasa Perangkat Lunak", semester: 6, kelas: "TI-6A", sks: 3, dosen: "Sesy Tana Lina, M.Kom", jenisUjian: "Tulis", status: "Aktif" },
  { kode: "TI3203", nama: "Kecerdasan Artifisial", semester: 6, kelas: "TI-6B", sks: 3, dosen: "Dr. Indra Wijaya, M.Sc", jenisUjian: "Online", status: "Aktif" },
  { kode: "TI3205", nama: "Keamanan Informasi", semester: 6, kelas: "TI-6A", sks: 2, dosen: "Nur Aisyah, M.Kom", jenisUjian: "Tulis", status: "Aktif" },
  { kode: "TI4101", nama: "Data Mining", semester: 8, kelas: "TI-8A", sks: 3, dosen: "Dr. Indra Wijaya, M.Sc", jenisUjian: "Take Home", status: "Aktif" },
  { kode: "TI4103", nama: "Manajemen Proyek TI", semester: 8, kelas: "TI-8A", sks: 2, dosen: "Yulia Fatma, M.T", jenisUjian: "Tulis", status: "Tidak Aktif" },
  { kode: "TI2107", nama: "Sistem Operasi", semester: 2, kelas: "TI-2B", sks: 3, dosen: "Ahmad Fauzi, M.Kom", jenisUjian: "Tulis", status: "Aktif" },
  { kode: "TI2109", nama: "Struktur Data", semester: 4, kelas: "TI-4A", sks: 3, dosen: "Dr. Rahmat Hidayat, M.Kom", jenisUjian: "Praktikum", status: "Aktif" },
  { kode: "TI3207", nama: "Pemrograman Web Lanjut", semester: 6, kelas: "TI-6B", sks: 3, dosen: "Sesy Tana Lina, M.Kom", jenisUjian: "Praktikum", status: "Aktif" },
  { kode: "TI4105", nama: "Etika Profesi TI", semester: 8, kelas: "TI-8B", sks: 2, dosen: "Nur Aisyah, M.Kom", jenisUjian: "Take Home", status: "Aktif" },
];

export type Dosen = {
  nip: string;
  nama: string;
  email: string;
  prodi: string;
  mataKuliah: string[];
  status: "Aktif" | "Tidak Aktif";
  telepon: string;
};

export const dosenList: Dosen[] = [
  { nip: "198203122008011002", nama: "Dr. Rahmat Hidayat, M.Kom", email: "rahmat.hidayat@ti.ac.id", prodi: "Teknologi Informasi", mataKuliah: ["Algoritma & Pemrograman", "Struktur Data"], status: "Aktif", telepon: "0812-3344-5566" },
  { nip: "198711052012012004", nama: "Yulia Fatma, M.T", email: "yulia.fatma@ti.ac.id", prodi: "Teknologi Informasi", mataKuliah: ["Basis Data", "Manajemen Proyek TI"], status: "Aktif", telepon: "0813-2211-7788" },
  { nip: "199001152015011003", nama: "Ahmad Fauzi, M.Kom", email: "ahmad.fauzi@ti.ac.id", prodi: "Teknik Komputer", mataKuliah: ["Jaringan Komputer", "Sistem Operasi"], status: "Aktif", telepon: "0857-9900-1122" },
  { nip: "199205222017012005", nama: "Sesy Tana Lina, M.Kom", email: "sesy.lina@ti.ac.id", prodi: "Teknologi Informasi", mataKuliah: ["Rekayasa Perangkat Lunak", "Pemrograman Web Lanjut"], status: "Aktif", telepon: "0878-1122-3344" },
  { nip: "197908102005011001", nama: "Dr. Indra Wijaya, M.Sc", email: "indra.wijaya@ti.ac.id", prodi: "Sistem Informasi", mataKuliah: ["Kecerdasan Artifisial", "Data Mining"], status: "Aktif", telepon: "0812-7788-9900" },
  { nip: "199308172018012006", nama: "Nur Aisyah, M.Kom", email: "nur.aisyah@ti.ac.id", prodi: "Teknologi Informasi", mataKuliah: ["Keamanan Informasi", "Etika Profesi TI"], status: "Tidak Aktif", telepon: "0821-4455-6677" },
];

export type Mahasiswa = {
  nim: string;
  nama: string;
  kelas: string;
  semester: number;
  email: string;
  status: "Aktif" | "Tidak Aktif";
};

export const mahasiswaList: Mahasiswa[] = [
  { nim: "2211081001", nama: "Aditya Pratama", kelas: "TI-6A", semester: 6, email: "aditya@student.ti.ac.id", status: "Aktif" },
  { nim: "2211081002", nama: "Bunga Lestari", kelas: "TI-6A", semester: 6, email: "bunga@student.ti.ac.id", status: "Aktif" },
  { nim: "2211081003", nama: "Citra Amelia", kelas: "TI-6B", semester: 6, email: "citra@student.ti.ac.id", status: "Aktif" },
  { nim: "2311081010", nama: "Dimas Saputra", kelas: "TI-4A", semester: 4, email: "dimas@student.ti.ac.id", status: "Aktif" },
  { nim: "2311081011", nama: "Eka Nurhaliza", kelas: "TI-4B", semester: 4, email: "eka@student.ti.ac.id", status: "Tidak Aktif" },
  { nim: "2111081020", nama: "Fajar Ramadhan", kelas: "TI-8A", semester: 8, email: "fajar@student.ti.ac.id", status: "Aktif" },
  { nim: "2111081021", nama: "Gita Purnama", kelas: "TI-8B", semester: 8, email: "gita@student.ti.ac.id", status: "Aktif" },
  { nim: "2411081030", nama: "Hafiz Alfarizi", kelas: "TI-2A", semester: 2, email: "hafiz@student.ti.ac.id", status: "Aktif" },
];

export type Soal = {
  id: string;
  mataKuliah: string;
  dosen: string;
  jenisUjian: string;
  bentukSoal: "Pilihan Ganda" | "Esai" | "Studi Kasus" | "Praktik";
  jumlahSoal: number;
  status: "Belum Diinput" | "Draft" | "Sudah Dikumpulkan" | "Diverifikasi" | "Revisi";
  tanggal: string;
  file: string | null;
};

export const soalList: Soal[] = [
  { id: "SL-001", mataKuliah: "Basis Data", dosen: "Yulia Fatma, M.T", jenisUjian: "Tulis", bentukSoal: "Esai", jumlahSoal: 8, status: "Diverifikasi", tanggal: "10 Agu 2026", file: "soal-basis-data.pdf" },
  { id: "SL-002", mataKuliah: "Algoritma & Pemrograman", dosen: "Dr. Rahmat Hidayat, M.Kom", jenisUjian: "Praktikum", bentukSoal: "Praktik", jumlahSoal: 4, status: "Sudah Dikumpulkan", tanggal: "12 Agu 2026", file: "soal-algoritma.pdf" },
  { id: "SL-003", mataKuliah: "Jaringan Komputer", dosen: "Ahmad Fauzi, M.Kom", jenisUjian: "Praktikum", bentukSoal: "Studi Kasus", jumlahSoal: 5, status: "Revisi", tanggal: "11 Agu 2026", file: "soal-jarkom.docx" },
  { id: "SL-004", mataKuliah: "Rekayasa Perangkat Lunak", dosen: "Sesy Tana Lina, M.Kom", jenisUjian: "Tulis", bentukSoal: "Esai", jumlahSoal: 6, status: "Draft", tanggal: "—", file: null },
  { id: "SL-005", mataKuliah: "Kecerdasan Artifisial", dosen: "Dr. Indra Wijaya, M.Sc", jenisUjian: "Online", bentukSoal: "Pilihan Ganda", jumlahSoal: 40, status: "Diverifikasi", tanggal: "09 Agu 2026", file: "soal-ai.pdf" },
  { id: "SL-006", mataKuliah: "Keamanan Informasi", dosen: "Nur Aisyah, M.Kom", jenisUjian: "Tulis", bentukSoal: "Esai", jumlahSoal: 7, status: "Belum Diinput", tanggal: "—", file: null },
  { id: "SL-007", mataKuliah: "Data Mining", dosen: "Dr. Indra Wijaya, M.Sc", jenisUjian: "Take Home", bentukSoal: "Studi Kasus", jumlahSoal: 3, status: "Sudah Dikumpulkan", tanggal: "13 Agu 2026", file: "soal-datamining.pdf" },
  { id: "SL-008", mataKuliah: "Pemrograman Web Lanjut", dosen: "Sesy Tana Lina, M.Kom", jenisUjian: "Praktikum", bentukSoal: "Praktik", jumlahSoal: 4, status: "Draft", tanggal: "—", file: null },
  { id: "SL-009", mataKuliah: "Sistem Operasi", dosen: "Ahmad Fauzi, M.Kom", jenisUjian: "Tulis", bentukSoal: "Pilihan Ganda", jumlahSoal: 35, status: "Belum Diinput", tanggal: "—", file: null },
  { id: "SL-010", mataKuliah: "Struktur Data", dosen: "Dr. Rahmat Hidayat, M.Kom", jenisUjian: "Praktikum", bentukSoal: "Praktik", jumlahSoal: 5, status: "Diverifikasi", tanggal: "08 Agu 2026", file: "soal-struktur-data.pdf" },
];

export type Jadwal = {
  id: string;
  tanggal: string;
  hari: string;
  jam: string;
  mataKuliah: string;
  kelas: string;
  semester: number;
  ruang: string;
  pengawas: string;
  jenisUjian: string;
  status: "Terjadwal" | "Selesai" | "Dibatalkan";
};

export const jadwalList: Jadwal[] = [
  { id: "J-01", tanggal: "2026-08-24", hari: "Senin", jam: "08.00 - 09.40", mataKuliah: "Basis Data", kelas: "TI-4A", semester: 4, ruang: "Lab TI 1", pengawas: "Yulia Fatma, M.T", jenisUjian: "Tulis", status: "Terjadwal" },
  { id: "J-02", tanggal: "2026-08-24", hari: "Senin", jam: "10.00 - 11.40", mataKuliah: "Algoritma & Pemrograman", kelas: "TI-2A", semester: 2, ruang: "Lab TI 2", pengawas: "Dr. Rahmat Hidayat, M.Kom", jenisUjian: "Praktikum", status: "Terjadwal" },
  { id: "J-03", tanggal: "2026-08-25", hari: "Selasa", jam: "08.00 - 09.40", mataKuliah: "Jaringan Komputer", kelas: "TI-4B", semester: 4, ruang: "Lab Jaringan", pengawas: "Ahmad Fauzi, M.Kom", jenisUjian: "Praktikum", status: "Terjadwal" },
  { id: "J-04", tanggal: "2026-08-25", hari: "Selasa", jam: "13.00 - 14.40", mataKuliah: "Rekayasa Perangkat Lunak", kelas: "TI-6A", semester: 6, ruang: "R. 301", pengawas: "Sesy Tana Lina, M.Kom", jenisUjian: "Tulis", status: "Terjadwal" },
  { id: "J-05", tanggal: "2026-08-26", hari: "Rabu", jam: "08.00 - 09.40", mataKuliah: "Kecerdasan Artifisial", kelas: "TI-6B", semester: 6, ruang: "R. 302", pengawas: "Dr. Indra Wijaya, M.Sc", jenisUjian: "Online", status: "Terjadwal" },
  { id: "J-06", tanggal: "2026-08-26", hari: "Rabu", jam: "10.00 - 11.40", mataKuliah: "Keamanan Informasi", kelas: "TI-6A", semester: 6, ruang: "R. 303", pengawas: "Nur Aisyah, M.Kom", jenisUjian: "Tulis", status: "Terjadwal" },
  { id: "J-07", tanggal: "2026-08-27", hari: "Kamis", jam: "08.00 - 09.40", mataKuliah: "Data Mining", kelas: "TI-8A", semester: 8, ruang: "R. 401", pengawas: "Dr. Indra Wijaya, M.Sc", jenisUjian: "Take Home", status: "Terjadwal" },
  { id: "J-08", tanggal: "2026-08-27", hari: "Kamis", jam: "13.00 - 14.40", mataKuliah: "Sistem Operasi", kelas: "TI-2B", semester: 2, ruang: "R. 201", pengawas: "Ahmad Fauzi, M.Kom", jenisUjian: "Tulis", status: "Terjadwal" },
  { id: "J-09", tanggal: "2026-08-28", hari: "Jumat", jam: "08.00 - 09.40", mataKuliah: "Struktur Data", kelas: "TI-4A", semester: 4, ruang: "Lab TI 1", pengawas: "Dr. Rahmat Hidayat, M.Kom", jenisUjian: "Praktikum", status: "Terjadwal" },
  { id: "J-10", tanggal: "2026-08-28", hari: "Jumat", jam: "10.00 - 11.40", mataKuliah: "Pemrograman Web Lanjut", kelas: "TI-6B", semester: 6, ruang: "Lab TI 2", pengawas: "Sesy Tana Lina, M.Kom", jenisUjian: "Praktikum", status: "Terjadwal" },
  { id: "J-11", tanggal: "2026-08-21", hari: "Jumat", jam: "08.00 - 09.40", mataKuliah: "Etika Profesi TI", kelas: "TI-8B", semester: 8, ruang: "R. 402", pengawas: "Nur Aisyah, M.Kom", jenisUjian: "Take Home", status: "Selesai" },
  { id: "J-12", tanggal: "2026-08-21", hari: "Jumat", jam: "13.00 - 14.40", mataKuliah: "Manajemen Proyek TI", kelas: "TI-8A", semester: 8, ruang: "R. 401", pengawas: "Yulia Fatma, M.T", jenisUjian: "Tulis", status: "Dibatalkan" },
];

export type Ruang = {
  nama: string;
  gedung: string;
  lantai: number;
  kapasitas: number;
  status: "Tersedia" | "Digunakan" | "Tidak tersedia";
  penggunaan: string;
};

export const ruangList: Ruang[] = [
  { nama: "Lab TI 1", gedung: "Gedung TI A", lantai: 1, kapasitas: 30, status: "Digunakan", penggunaan: "24 & 28 Agu — 3 sesi" },
  { nama: "Lab TI 2", gedung: "Gedung TI A", lantai: 1, kapasitas: 30, status: "Digunakan", penggunaan: "24 & 28 Agu — 2 sesi" },
  { nama: "Lab Jaringan", gedung: "Gedung TI A", lantai: 2, kapasitas: 24, status: "Digunakan", penggunaan: "25 Agu — 1 sesi" },
  { nama: "R. 201", gedung: "Gedung TI B", lantai: 2, kapasitas: 40, status: "Tersedia", penggunaan: "27 Agu — 1 sesi" },
  { nama: "R. 301", gedung: "Gedung TI B", lantai: 3, kapasitas: 40, status: "Digunakan", penggunaan: "25 Agu — 1 sesi" },
  { nama: "R. 302", gedung: "Gedung TI B", lantai: 3, kapasitas: 40, status: "Tersedia", penggunaan: "26 Agu — 1 sesi" },
  { nama: "R. 303", gedung: "Gedung TI B", lantai: 3, kapasitas: 36, status: "Tersedia", penggunaan: "26 Agu — 1 sesi" },
  { nama: "R. 401", gedung: "Gedung TI C", lantai: 4, kapasitas: 48, status: "Digunakan", penggunaan: "27 Agu — 2 sesi" },
  { nama: "R. 402", gedung: "Gedung TI C", lantai: 4, kapasitas: 48, status: "Tidak tersedia", penggunaan: "Renovasi AC" },
];

export type Pengawas = {
  id: string;
  nama: string;
  tanggal: string;
  jam: string;
  ruang: string;
  mataKuliah: string;
  kelas: string;
  status: "Ditugaskan" | "Menunggu" | "Dibatalkan";
};

export const pengawasList: Pengawas[] = [
  { id: "P-01", nama: "Yulia Fatma, M.T", tanggal: "24 Agu 2026", jam: "08.00 - 09.40", ruang: "Lab TI 1", mataKuliah: "Basis Data", kelas: "TI-4A", status: "Ditugaskan" },
  { id: "P-02", nama: "Dr. Rahmat Hidayat, M.Kom", tanggal: "24 Agu 2026", jam: "10.00 - 11.40", ruang: "Lab TI 2", mataKuliah: "Algoritma & Pemrograman", kelas: "TI-2A", status: "Ditugaskan" },
  { id: "P-03", nama: "Ahmad Fauzi, M.Kom", tanggal: "25 Agu 2026", jam: "08.00 - 09.40", ruang: "Lab Jaringan", mataKuliah: "Jaringan Komputer", kelas: "TI-4B", status: "Ditugaskan" },
  { id: "P-04", nama: "Sesy Tana Lina, M.Kom", tanggal: "25 Agu 2026", jam: "13.00 - 14.40", ruang: "R. 301", mataKuliah: "Rekayasa Perangkat Lunak", kelas: "TI-6A", status: "Menunggu" },
  { id: "P-05", nama: "Dr. Indra Wijaya, M.Sc", tanggal: "26 Agu 2026", jam: "08.00 - 09.40", ruang: "R. 302", mataKuliah: "Kecerdasan Artifisial", kelas: "TI-6B", status: "Ditugaskan" },
  { id: "P-06", nama: "Nur Aisyah, M.Kom", tanggal: "26 Agu 2026", jam: "10.00 - 11.40", ruang: "R. 303", mataKuliah: "Keamanan Informasi", kelas: "TI-6A", status: "Menunggu" },
  { id: "P-07", nama: "Ahmad Fauzi, M.Kom", tanggal: "27 Agu 2026", jam: "13.00 - 14.40", ruang: "R. 201", mataKuliah: "Sistem Operasi", kelas: "TI-2B", status: "Ditugaskan" },
  { id: "P-08", nama: "Yulia Fatma, M.T", tanggal: "21 Agu 2026", jam: "13.00 - 14.40", ruang: "R. 401", mataKuliah: "Manajemen Proyek TI", kelas: "TI-8A", status: "Dibatalkan" },
];

export type Pengumuman = {
  id: string;
  judul: string;
  isi: string;
  tanggal: string;
  pembuat: string;
  status: "Terbit" | "Draft" | "Arsip";
};

export const pengumumanList: Pengumuman[] = [
  { id: "AN-01", judul: "Jadwal Resmi UAS Semester Ganjil 2026/2027", isi: "Jadwal UAS Jurusan Teknologi Informasi resmi dirilis. Ujian dilaksanakan 24 - 28 Agustus 2026. Mahasiswa wajib memeriksa ruang dan sesi masing-masing.", tanggal: "14 Agu 2026", pembuat: "Panitia UAS", status: "Terbit" },
  { id: "AN-02", judul: "Batas Akhir Pengumpulan Soal UAS", isi: "Dosen pengampu diminta mengunggah soal UAS paling lambat 18 Agustus 2026 pukul 16.00 WIB melalui menu Soal Ujian.", tanggal: "12 Agu 2026", pembuat: "Koordinator Akademik", status: "Terbit" },
  { id: "AN-03", judul: "Tata Tertib Pelaksanaan Ujian", isi: "Peserta wajib hadir 15 menit sebelum ujian, membawa KTM, dan berpakaian rapi sesuai ketentuan jurusan.", tanggal: "11 Agu 2026", pembuat: "Panitia UAS", status: "Terbit" },
  { id: "AN-04", judul: "Perubahan Ruang Ujian Kelas TI-8B", isi: "Ruang 402 sedang dalam perbaikan AC. Ujian kelas TI-8B dipindahkan ke Ruang 401.", tanggal: "10 Agu 2026", pembuat: "Admin Sarana", status: "Draft" },
  { id: "AN-05", judul: "Panduan Ujian Online", isi: "Ujian daring menggunakan platform kampus. Pastikan koneksi stabil dan kamera aktif selama ujian berlangsung.", tanggal: "05 Agu 2026", pembuat: "Panitia UAS", status: "Arsip" },
];

export const ujianPerHari = [
  { hari: "Senin", jumlah: 6 },
  { hari: "Selasa", jumlah: 8 },
  { hari: "Rabu", jumlah: 5 },
  { hari: "Kamis", jumlah: 7 },
  { hari: "Jumat", jumlah: 4 },
  { hari: "Sabtu", jumlah: 2 },
];

export const statusSoalChart = [
  { name: "Diverifikasi", value: 3, fill: "var(--color-chart-3)" },
  { name: "Dikumpulkan", value: 2, fill: "var(--color-chart-2)" },
  { name: "Draft", value: 2, fill: "var(--color-chart-4)" },
  { name: "Belum Diinput", value: 2, fill: "var(--color-chart-1)" },
  { name: "Revisi", value: 1, fill: "var(--color-chart-5)" },
];

export const penggunaanRuang = [
  { ruang: "Lab TI 1", sesi: 3, kapasitas: 30 },
  { ruang: "Lab TI 2", sesi: 2, kapasitas: 30 },
  { ruang: "Lab Jaringan", sesi: 1, kapasitas: 24 },
  { ruang: "R. 201", sesi: 1, kapasitas: 40 },
  { ruang: "R. 301", sesi: 1, kapasitas: 40 },
  { ruang: "R. 401", sesi: 2, kapasitas: 48 },
];

export const notifikasi = [
  { judul: "3 soal UAS belum diinput", waktu: "5 menit lalu", tone: "danger" as const },
  { judul: "Penugasan pengawas TI-6A menunggu konfirmasi", waktu: "1 jam lalu", tone: "warning" as const },
  { judul: "Jadwal UAS berhasil dipublikasikan", waktu: "Kemarin", tone: "success" as const },
];
