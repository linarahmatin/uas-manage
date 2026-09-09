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
  {"nip": "198002012010011001", "nama": "Ahmadi Yuli Ananta, S.T, M.M.", "email": "ahmadi.yuli.ananta@polinema.ac.id", "prodi": "Sistem Informasi Bisnis", "mataKuliah": ["Analisis Proses Bisnis"], "status": "Aktif", "telepon": "081234567890"},
  {"nip": "198003082011011002", "nama": "Dr. Widaningsih Condrowardhani, SH, MH.", "email": "dr.widaningsih.condrowardhani@polinema.ac.id", "prodi": "Sistem Informasi Bisnis", "mataKuliah": ["Kewarganegaraan"], "status": "Aktif", "telepon": "081234581469"},
  {"nip": "198004152012011003", "nama": "Triana Fatmawati, S.T., M.T.", "email": "triana.fatmawati@polinema.ac.id", "prodi": "Sistem Informasi Bisnis", "mataKuliah": ["Aljabar Linier"], "status": "Aktif", "telepon": "081234595048"},
  {"nip": "198005222013011004", "nama": "Eka Larasati Amalia,. S.ST.,MT", "email": "eka.larasati.amalia@polinema.ac.id", "prodi": "Sistem Informasi Bisnis", "mataKuliah": ["Rekayasa Perangkat Lunak"], "status": "Aktif", "telepon": "081234608627"},
  {"nip": "198006012014011005", "nama": "Astrifidha Rahma Amalia,S.Pd., M.Pd.", "email": "astrifidha.rahma.amalia@polinema.ac.id", "prodi": "Sistem Informasi Bisnis", "mataKuliah": ["Agama"], "status": "Aktif", "telepon": "081234622206"},
  {"nip": "198007082015011006", "nama": "Anugrah Nur Rahmanto, S.Sn., M.Ds.", "email": "anugrah.nur.rahmanto@polinema.ac.id", "prodi": "Sistem Informasi Bisnis", "mataKuliah": ["Desain Antarmuka", "Pengembangan Karir"], "status": "Aktif", "telepon": "081234635785"},
  {"nip": "198008152016011007", "nama": "Ariadi Retno Tri H S.Kom M.Kom", "email": "ariadi.retno.tri.h.s.kom.m.kom@polinema.ac.id", "prodi": "Sistem Informasi Bisnis", "mataKuliah": ["Pengenalan Sistem Informasi"], "status": "Aktif", "telepon": "081234649364"},
  {"nip": "198009222017011008", "nama": "Adevian Fairuz Pratama,S.S.T.,M.Eng", "email": "adevian.fairuz.pratama@polinema.ac.id", "prodi": "Sistem Informasi Bisnis", "mataKuliah": ["Aljabar Linier", "Matematika Lanjut"], "status": "Aktif", "telepon": "081234662943"},
  {"nip": "198010012018011009", "nama": "Pramana Yoga Saputra SKom MMT", "email": "pramana.yoga.saputra.skom.mmt@polinema.ac.id", "prodi": "Sistem Informasi Bisnis", "mataKuliah": ["Algoritma dan Struktur Data"], "status": "Aktif", "telepon": "081234676522"},
  {"nip": "198011082010011010", "nama": "Prof. Ir. Yan Watequlis Syaifudin, ST., M.MT., Ph.D.", "email": "prof.ir.yan.watequlis.syaifudin@polinema.ac.id", "prodi": "Sistem Informasi Bisnis", "mataKuliah": ["Basis Data"], "status": "Aktif", "telepon": "081234690101"},
  {"nip": "198012152011011011", "nama": "M. Hasyim Ratsanjani, S.Kom., MKom", "email": "m.hasyim.ratsanjani@polinema.ac.id", "prodi": "Sistem Informasi Bisnis", "mataKuliah": ["Komputasi Hijau"], "status": "Aktif", "telepon": "081234703680"},
  {"nip": "198001222012011012", "nama": "Rokhimatul Wakhidah, S.Pd., M.T.", "email": "rokhimatul.wakhidah@polinema.ac.id", "prodi": "Sistem Informasi Bisnis", "mataKuliah": ["Rekayasa Perangkat Lunak"], "status": "Aktif", "telepon": "081234717259"},
  {"nip": "198002012013011013", "nama": "Elok Nur Hamdana,ST.,MT", "email": "elok.nur.hamdana@polinema.ac.id", "prodi": "Sistem Informasi Bisnis", "mataKuliah": ["Basis Data"], "status": "Aktif", "telepon": "081234730838"},
  {"nip": "198003082014011014", "nama": "Hendra Pradibta, SE., M.Sc.", "email": "hendra.pradibta@polinema.ac.id", "prodi": "Sistem Informasi Bisnis", "mataKuliah": ["Analisis Proses Bisnis"], "status": "Aktif", "telepon": "081234744417"},
  {"nip": "198004152015011015", "nama": "Vivi Nur Wijayaningrum, S.Kom., M.Kom.", "email": "vivi.nur.wijayaningrum@polinema.ac.id", "prodi": "Sistem Informasi Bisnis", "mataKuliah": ["Rekayasa Perangkat Lunak"], "status": "Aktif", "telepon": "081234757996"},
  {"nip": "198005222016011016", "nama": "Farid Angga Pribadi, S.Kom., M.Kom", "email": "farid.angga.pribadi@polinema.ac.id", "prodi": "Sistem Informasi Bisnis", "mataKuliah": ["Desain Antarmuka"], "status": "Aktif", "telepon": "081234771575"},
  {"nip": "198006012017011017", "nama": "Erfan Rohadi, ST., M. Eng., Ph. D", "email": "erfan.rohadi@polinema.ac.id", "prodi": "Sistem Informasi Bisnis", "mataKuliah": ["Matematika Lanjut"], "status": "Aktif", "telepon": "081234785154"},
  {"nip": "198007082018011018", "nama": "Vivin Ayu Lestari SPd MKom", "email": "vivin.ayu.lestari.spd.mkom@polinema.ac.id", "prodi": "Sistem Informasi Bisnis", "mataKuliah": ["Algoritma dan Struktur Data"], "status": "Aktif", "telepon": "081234798733"},
  {"nip": "198008152010011019", "nama": "Dhebys Suryani, S.Kom., MT", "email": "dhebys.suryani@polinema.ac.id", "prodi": "Sistem Informasi Bisnis", "mataKuliah": ["Pengembangan Karir"], "status": "Aktif", "telepon": "081234812312"},
  {"nip": "198009222011011020", "nama": "Ridwan Rismanto, S.ST., M.Kom., Ph.D", "email": "ridwan.rismanto@polinema.ac.id", "prodi": "Sistem Informasi Bisnis", "mataKuliah": ["Komputasi Hijau"], "status": "Aktif", "telepon": "081234825891"},
  {"nip": "198010012012011021", "nama": "Bagas Satya Dian Nugraha, ST., MT.", "email": "bagas.satya.dian.nugraha@polinema.ac.id", "prodi": "Sistem Informasi Bisnis", "mataKuliah": ["Desain Antarmuka"], "status": "Aktif", "telepon": "081234839470"},
  {"nip": "198011082013011022", "nama": "Ir. Deddy Kusbianto Purwokoaji, M.MKom", "email": "ir.deddy.kusbianto.purwokoaji@polinema.ac.id", "prodi": "Sistem Informasi Bisnis", "mataKuliah": ["Pengenalan Sistem Informasi"], "status": "Aktif", "telepon": "081234853049"},
  {"nip": "198012152014011023", "nama": "Triana Fatmawati ST MT", "email": "triana.fatmawati.st.mt@polinema.ac.id", "prodi": "Sistem Informasi Bisnis", "mataKuliah": ["Algoritma dan Struktur Data"], "status": "Aktif", "telepon": "081234866628"},
  {"nip": "198001222015011024", "nama": "Moch Zawaruddin Abdullah, S.ST., M.Kom.", "email": "moch.zawaruddin.abdullah@polinema.ac.id", "prodi": "Sistem Informasi Bisnis", "mataKuliah": ["Basis Data"], "status": "Aktif", "telepon": "081234880207"},
];

export type Mahasiswa = {
  nim: string;
  nama: string;
  kelas: string;
  semester: number;
  email: string;
  status: "Aktif" | "Tidak Aktif";
};

export const mahasiswaList: Mahasiswa[] = [];

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

export const jadwalList: Jadwal[] = [];

export type Ruang = {
  nama: string;
  gedung: string;
  lantai: number;
  kapasitas: number;
  status: "Tersedia" | "Digunakan" | "Tidak tersedia";
  penggunaan: string;
};

export const ruangList: Ruang[] = [];

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

export const pengawasList: Pengawas[] = [];

export type Pengumuman = {
  id: string;
  judul: string;
  isi: string;
  tanggal: string;
  pembuat: string;
  status: "Terbit" | "Draft" | "Arsip";
};

export const pengumumanList: Pengumuman[] = [
  {"id": "AN-01", "judul": "Jadwal Resmi UAS Semester Genap 2025/2026", "isi": "Jadwal UAS Jurusan Teknologi Informasi resmi dirilis. Ujian dilaksanakan 15 - 19 Juni 2026 di Gedung Sipil lantai 5 - 8. Mahasiswa wajib memeriksa ruang dan sesi masing-masing.", "tanggal": "05 Jun 2026", "pembuat": "Panitia UAS", "status": "Terbit"},
  {"id": "AN-02", "judul": "Batas Akhir Pengumpulan Soal UAS", "isi": "Dosen pengampu diminta mengunggah soal UAS paling lambat 10 Juni 2026 pukul 16.00 WIB melalui menu Soal Ujian.", "tanggal": "03 Jun 2026", "pembuat": "Koordinator Akademik", "status": "Terbit"},
  {"id": "AN-03", "judul": "Tata Tertib Pelaksanaan Ujian", "isi": "Peserta wajib hadir 15 menit sebelum ujian, membawa KTM, dan berpakaian rapi sesuai ketentuan jurusan.", "tanggal": "02 Jun 2026", "pembuat": "Panitia UAS", "status": "Terbit"},
  {"id": "AN-04", "judul": "Rekap Penugasan Dosen Pengawas", "isi": "Daftar pengawas per sesi mengikuti sheet List Pengawas. Dosen dengan kuota maksimal 3 sesi mohon konfirmasi ketersediaan.", "tanggal": "01 Jun 2026", "pembuat": "Admin Jurusan", "status": "Draft"},
  {"id": "AN-05", "judul": "Panduan Ujian Daring (Zoom/Gmeet)", "isi": "Beberapa sesi dilaksanakan daring melalui Zoom atau Google Meet. Pastikan koneksi stabil dan kamera aktif selama ujian.", "tanggal": "28 Mei 2026", "pembuat": "Panitia UAS", "status": "Arsip"},
];

export const ujianPerHari = [{"hari": "Senin", "jumlah": 16}, {"hari": "Rabu", "jumlah": 16}, {"hari": "Kamis", "jumlah": 8}, {"hari": "Jumat", "jumlah": 8}];

export const statusSoalChart = [
  { name: "Diverifikasi", value: 3, fill: "var(--color-chart-3)" },
  { name: "Dikumpulkan", value: 2, fill: "var(--color-chart-2)" },
  { name: "Draft", value: 2, fill: "var(--color-chart-4)" },
  { name: "Belum Diinput", value: 2, fill: "var(--color-chart-1)" },
  { name: "Revisi", value: 1, fill: "var(--color-chart-5)" },
];

export const penggunaanRuang = [{"ruang": "Lab Proyek - 1 (Sipil Lt5-R 5-08)", "sesi": 12, "kapasitas": 24}, {"ruang": "Ruang Teori - 2(Sipil Lt5) 5-02", "sesi": 12, "kapasitas": 32}, {"ruang": "Ruang Teori - 4(Sipil Lt5) 5-04", "sesi": 12, "kapasitas": 32}, {"ruang": "Ruang Teori - 6 (Sipil Lt5) 5-06", "sesi": 12, "kapasitas": 32}];

export const notifikasi = [
  { judul: "3 soal UAS belum diinput", waktu: "5 menit lalu", tone: "danger" as const },
  { judul: "Penugasan pengawas TI-6A menunggu konfirmasi", waktu: "1 jam lalu", tone: "warning" as const },
  { judul: "Jadwal UAS berhasil dipublikasikan", waktu: "Kemarin", tone: "success" as const },
];
