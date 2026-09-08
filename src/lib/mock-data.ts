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

export const mahasiswaList: Mahasiswa[] = [
  {"nim": "234100001", "nama": "Aditya Pratama", "kelas": "TI1A", "semester": 2, "email": "aditya.pratama@student.polinema.ac.id", "status": "Tidak Aktif"},
  {"nim": "234100002", "nama": "Bunga Lestari", "kelas": "TI1B", "semester": 2, "email": "bunga.lestari@student.polinema.ac.id", "status": "Aktif"},
  {"nim": "234100003", "nama": "Citra Amelia", "kelas": "TI1C", "semester": 2, "email": "citra.amelia@student.polinema.ac.id", "status": "Aktif"},
  {"nim": "234100004", "nama": "Dimas Saputra", "kelas": "SIB1A", "semester": 2, "email": "dimas.saputra@student.polinema.ac.id", "status": "Aktif"},
  {"nim": "234100005", "nama": "Eka Nurhaliza", "kelas": "SIB1B", "semester": 2, "email": "eka.nurhaliza@student.polinema.ac.id", "status": "Aktif"},
  {"nim": "234100006", "nama": "Fajar Ramadhan", "kelas": "TI2A", "semester": 4, "email": "fajar.ramadhan@student.polinema.ac.id", "status": "Aktif"},
  {"nim": "234100007", "nama": "Gita Purnama", "kelas": "TI2B", "semester": 4, "email": "gita.purnama@student.polinema.ac.id", "status": "Aktif"},
  {"nim": "234100008", "nama": "Hafiz Alfarizi", "kelas": "SIB2A", "semester": 4, "email": "hafiz.alfarizi@student.polinema.ac.id", "status": "Aktif"},
  {"nim": "234100009", "nama": "Intan Maharani", "kelas": "TI3A", "semester": 6, "email": "intan.maharani@student.polinema.ac.id", "status": "Aktif"},
  {"nim": "234100010", "nama": "Joko Nugroho", "kelas": "TI3B", "semester": 6, "email": "joko.nugroho@student.polinema.ac.id", "status": "Tidak Aktif"},
  {"nim": "234100011", "nama": "Kirana Ayu", "kelas": "SIB3A", "semester": 6, "email": "kirana.ayu@student.polinema.ac.id", "status": "Aktif"},
  {"nim": "234100012", "nama": "Lukman Hakim", "kelas": "TI4A", "semester": 8, "email": "lukman.hakim@student.polinema.ac.id", "status": "Aktif"},
  {"nim": "234100013", "nama": "Mira Andini", "kelas": "TI4B", "semester": 8, "email": "mira.andini@student.polinema.ac.id", "status": "Aktif"},
  {"nim": "234100014", "nama": "Naufal Rizky", "kelas": "SIB4A", "semester": 8, "email": "naufal.rizky@student.polinema.ac.id", "status": "Aktif"},
  {"nim": "234100015", "nama": "Oktavia Sari", "kelas": "TI1A", "semester": 2, "email": "oktavia.sari@student.polinema.ac.id", "status": "Aktif"},
  {"nim": "234100016", "nama": "Putra Wijaya", "kelas": "TI1B", "semester": 2, "email": "putra.wijaya@student.polinema.ac.id", "status": "Aktif"},
  {"nim": "234100017", "nama": "Qori Amelia", "kelas": "TI1C", "semester": 2, "email": "qori.amelia@student.polinema.ac.id", "status": "Aktif"},
  {"nim": "234100018", "nama": "Rian Setiawan", "kelas": "SIB1A", "semester": 2, "email": "rian.setiawan@student.polinema.ac.id", "status": "Aktif"},
  {"nim": "234100019", "nama": "Salsabila Putri", "kelas": "SIB1B", "semester": 2, "email": "salsabila.putri@student.polinema.ac.id", "status": "Tidak Aktif"},
  {"nim": "234100020", "nama": "Taufik Hidayat", "kelas": "TI2A", "semester": 4, "email": "taufik.hidayat@student.polinema.ac.id", "status": "Aktif"},
  {"nim": "234100021", "nama": "Umi Kalsum", "kelas": "TI2B", "semester": 4, "email": "umi.kalsum@student.polinema.ac.id", "status": "Aktif"},
  {"nim": "234100022", "nama": "Vino Prasetyo", "kelas": "SIB2A", "semester": 4, "email": "vino.prasetyo@student.polinema.ac.id", "status": "Aktif"},
  {"nim": "234100023", "nama": "Wulan Sari", "kelas": "TI3A", "semester": 6, "email": "wulan.sari@student.polinema.ac.id", "status": "Aktif"},
  {"nim": "234100024", "nama": "Yoga Pratama", "kelas": "TI3B", "semester": 6, "email": "yoga.pratama@student.polinema.ac.id", "status": "Aktif"},
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
  {"id": "J-01", "tanggal": "2026-06-15", "hari": "Senin", "jam": "09.15 - 10.15", "mataKuliah": "Analisis Proses Bisnis", "kelas": "SIB1A", "semester": 2, "ruang": "Ruang Teori - 2(Sipil Lt5) 5-02", "pengawas": "Mamluatul Hani'ah, S.Kom., M.Kom.", "jenisUjian": "Praktikum", "status": "Terjadwal"},
  {"id": "J-02", "tanggal": "2026-06-15", "hari": "Senin", "jam": "10.30 - 11.30", "mataKuliah": "Kewarganegaraan", "kelas": "SIB1A", "semester": 2, "ruang": "Ruang Teori - 2(Sipil Lt5) 5-02", "pengawas": "Mamluatul Hani'ah, S.Kom., M.Kom.", "jenisUjian": "Tulis", "status": "Terjadwal"},
  {"id": "J-03", "tanggal": "2026-06-15", "hari": "Senin", "jam": "11.45 - 12.45", "mataKuliah": "Aljabar Linier", "kelas": "TI1A", "semester": 2, "ruang": "Ruang Teori - 2(Sipil Lt5) 5-02", "pengawas": "Mamluatul Hani'ah, S.Kom., M.Kom.", "jenisUjian": "Praktikum", "status": "Terjadwal"},
  {"id": "J-04", "tanggal": "2026-06-15", "hari": "Senin", "jam": "13.00 - 14.00", "mataKuliah": "Rekayasa Perangkat Lunak", "kelas": "TI1A", "semester": 2, "ruang": "Ruang Teori - 2(Sipil Lt5) 5-02", "pengawas": "Mamluatul Hani'ah, S.Kom., M.Kom.", "jenisUjian": "Tulis", "status": "Terjadwal"},
  {"id": "J-05", "tanggal": "2026-06-17", "hari": "Rabu", "jam": "09.15 - 10.15", "mataKuliah": "Agama", "kelas": "TI1A", "semester": 2, "ruang": "Ruang Teori - 2(Sipil Lt5) 5-02", "pengawas": "Dr. Yuri Ariyanto, S.Kom., M.Kom.", "jenisUjian": "Tulis", "status": "Terjadwal"},
  {"id": "J-06", "tanggal": "2026-06-17", "hari": "Rabu", "jam": "10.30 - 11.30", "mataKuliah": "Desain Antarmuka", "kelas": "TI1A", "semester": 2, "ruang": "Ruang Teori - 2(Sipil Lt5) 5-02", "pengawas": "Dr. Yuri Ariyanto, S.Kom., M.Kom.", "jenisUjian": "Tulis", "status": "Terjadwal"},
  {"id": "J-07", "tanggal": "2026-06-17", "hari": "Rabu", "jam": "11.45 - 12.45", "mataKuliah": "Pengenalan Sistem Informasi", "kelas": "SIB1A", "semester": 2, "ruang": "Ruang Teori - 2(Sipil Lt5) 5-02", "pengawas": "Titis Octary Satrio, S.ST., M.MT.", "jenisUjian": "Tulis", "status": "Terjadwal"},
  {"id": "J-08", "tanggal": "2026-06-17", "hari": "Rabu", "jam": "13.00 - 14.00", "mataKuliah": "Matematika Lanjut", "kelas": "SIB1A", "semester": 2, "ruang": "Ruang Teori - 2(Sipil Lt5) 5-02", "pengawas": "Titis Octary Satrio, S.ST., M.MT.", "jenisUjian": "Tulis", "status": "Terjadwal"},
  {"id": "J-09", "tanggal": "2026-06-18", "hari": "Kamis", "jam": "09.15 - 10.15", "mataKuliah": "Algoritma dan Struktur Data", "kelas": "SIB1A", "semester": 2, "ruang": "Ruang Teori - 2(Sipil Lt5) 5-02", "pengawas": "Dr. Yuri Ariyanto, S.Kom., M.Kom.", "jenisUjian": "Praktikum", "status": "Terjadwal"},
  {"id": "J-10", "tanggal": "2026-06-18", "hari": "Kamis", "jam": "10.30 - 11.30", "mataKuliah": "Basis Data", "kelas": "SIB1A", "semester": 2, "ruang": "Ruang Teori - 2(Sipil Lt5) 5-02", "pengawas": "Dr. Yuri Ariyanto, S.Kom., M.Kom.", "jenisUjian": "Praktikum", "status": "Terjadwal"},
  {"id": "J-11", "tanggal": "2026-06-19", "hari": "Jumat", "jam": "09.15 - 10.15", "mataKuliah": "Pengembangan Karir", "kelas": "TI3A", "semester": 6, "ruang": "Ruang Teori - 2(Sipil Lt5) 5-02", "pengawas": "Vivi Nur Wijayaningrum, S.Kom., M.Kom.", "jenisUjian": "Praktikum", "status": "Terjadwal"},
  {"id": "J-12", "tanggal": "2026-06-19", "hari": "Jumat", "jam": "10.30 - 11.30", "mataKuliah": "Komputasi Hijau", "kelas": "TI3A", "semester": 6, "ruang": "Ruang Teori - 2(Sipil Lt5) 5-02", "pengawas": "Vivi Nur Wijayaningrum, S.Kom., M.Kom.", "jenisUjian": "Praktikum", "status": "Terjadwal"},
  {"id": "J-13", "tanggal": "2026-06-15", "hari": "Senin", "jam": "09.15 - 10.15", "mataKuliah": "Analisis Proses Bisnis", "kelas": "SIB1B", "semester": 2, "ruang": "Ruang Teori - 4(Sipil Lt5) 5-04", "pengawas": "Ariadi Retno Tri Hayati Ririd, S.Kom., M.Kom.", "jenisUjian": "Praktikum", "status": "Terjadwal"},
  {"id": "J-14", "tanggal": "2026-06-15", "hari": "Senin", "jam": "10.30 - 11.30", "mataKuliah": "Kewarganegaraan", "kelas": "SIB1B", "semester": 2, "ruang": "Ruang Teori - 4(Sipil Lt5) 5-04", "pengawas": "Ariadi Retno Tri Hayati Ririd, S.Kom., M.Kom.", "jenisUjian": "Tulis", "status": "Terjadwal"},
  {"id": "J-15", "tanggal": "2026-06-15", "hari": "Senin", "jam": "11.45 - 12.45", "mataKuliah": "Aljabar Linier", "kelas": "TI1B", "semester": 2, "ruang": "Ruang Teori - 4(Sipil Lt5) 5-04", "pengawas": "Habibie Ed Dien, S.Kom., M.T.", "jenisUjian": "Praktikum", "status": "Terjadwal"},
  {"id": "J-16", "tanggal": "2026-06-15", "hari": "Senin", "jam": "13.00 - 14.00", "mataKuliah": "Rekayasa Perangkat Lunak", "kelas": "TI1B", "semester": 2, "ruang": "Ruang Teori - 4(Sipil Lt5) 5-04", "pengawas": "Habibie Ed Dien, S.Kom., M.T.", "jenisUjian": "Tulis", "status": "Terjadwal"},
  {"id": "J-17", "tanggal": "2026-06-17", "hari": "Rabu", "jam": "09.15 - 10.15", "mataKuliah": "Agama", "kelas": "TI1B", "semester": 2, "ruang": "Ruang Teori - 4(Sipil Lt5) 5-04", "pengawas": "Wilda Imama Sabilla, S.Kom., M.Kom.", "jenisUjian": "Tulis", "status": "Terjadwal"},
  {"id": "J-18", "tanggal": "2026-06-17", "hari": "Rabu", "jam": "10.30 - 11.30", "mataKuliah": "Desain Antarmuka", "kelas": "TI1B", "semester": 2, "ruang": "Ruang Teori - 4(Sipil Lt5) 5-04", "pengawas": "Wilda Imama Sabilla, S.Kom., M.Kom.", "jenisUjian": "Tulis", "status": "Terjadwal"},
  {"id": "J-19", "tanggal": "2026-06-17", "hari": "Rabu", "jam": "11.45 - 12.45", "mataKuliah": "Pengenalan Sistem Informasi", "kelas": "SIB1B", "semester": 2, "ruang": "Ruang Teori - 4(Sipil Lt5) 5-04", "pengawas": "Usman Nurhasan, S.Kom., M.T.", "jenisUjian": "Tulis", "status": "Terjadwal"},
  {"id": "J-20", "tanggal": "2026-06-17", "hari": "Rabu", "jam": "13.00 - 14.00", "mataKuliah": "Matematika Lanjut", "kelas": "SIB1B", "semester": 2, "ruang": "Ruang Teori - 4(Sipil Lt5) 5-04", "pengawas": "Usman Nurhasan, S.Kom., M.T.", "jenisUjian": "Tulis", "status": "Terjadwal"},
  {"id": "J-21", "tanggal": "2026-06-18", "hari": "Kamis", "jam": "09.15 - 10.15", "mataKuliah": "Algoritma dan Struktur Data", "kelas": "SIB1B", "semester": 2, "ruang": "Ruang Teori - 4(Sipil Lt5) 5-04", "pengawas": "Triana Fatmawati, S.T., M.T.", "jenisUjian": "Praktikum", "status": "Terjadwal"},
  {"id": "J-22", "tanggal": "2026-06-18", "hari": "Kamis", "jam": "10.30 - 11.30", "mataKuliah": "Basis Data", "kelas": "SIB1B", "semester": 2, "ruang": "Ruang Teori - 4(Sipil Lt5) 5-04", "pengawas": "Triana Fatmawati, S.T., M.T.", "jenisUjian": "Praktikum", "status": "Terjadwal"},
  {"id": "J-23", "tanggal": "2026-06-19", "hari": "Jumat", "jam": "09.15 - 10.15", "mataKuliah": "Pengembangan Karir", "kelas": "TI3B", "semester": 6, "ruang": "Ruang Teori - 4(Sipil Lt5) 5-04", "pengawas": "Rokhimatul Wakhidah, S.Pd., M.T.", "jenisUjian": "Praktikum", "status": "Terjadwal"},
  {"id": "J-24", "tanggal": "2026-06-19", "hari": "Jumat", "jam": "10.30 - 11.30", "mataKuliah": "Komputasi Hijau", "kelas": "TI3B", "semester": 6, "ruang": "Ruang Teori - 4(Sipil Lt5) 5-04", "pengawas": "Rokhimatul Wakhidah, S.Pd., M.T.", "jenisUjian": "Praktikum", "status": "Terjadwal"},
  {"id": "J-25", "tanggal": "2026-06-15", "hari": "Senin", "jam": "09.15 - 10.15", "mataKuliah": "Analisis Proses Bisnis", "kelas": "SIB1C", "semester": 2, "ruang": "Lab Proyek - 1 (Sipil Lt5-R 5-08)", "pengawas": "Dian Hanifudin Subhi, S.Kom., M.Kom.", "jenisUjian": "Praktikum", "status": "Terjadwal"},
  {"id": "J-26", "tanggal": "2026-06-15", "hari": "Senin", "jam": "10.30 - 11.30", "mataKuliah": "Kewarganegaraan", "kelas": "SIB1C", "semester": 2, "ruang": "Lab Proyek - 1 (Sipil Lt5-R 5-08)", "pengawas": "Dian Hanifudin Subhi, S.Kom., M.Kom.", "jenisUjian": "Tulis", "status": "Terjadwal"},
  {"id": "J-27", "tanggal": "2026-06-15", "hari": "Senin", "jam": "11.45 - 12.45", "mataKuliah": "Aljabar Linier", "kelas": "TI1C", "semester": 2, "ruang": "Lab Proyek - 1 (Sipil Lt5-R 5-08)", "pengawas": "Dian Hanifudin Subhi, S.Kom., M.Kom.", "jenisUjian": "Praktikum", "status": "Terjadwal"},
  {"id": "J-28", "tanggal": "2026-06-15", "hari": "Senin", "jam": "13.00 - 14.00", "mataKuliah": "Rekayasa Perangkat Lunak", "kelas": "TI1C", "semester": 2, "ruang": "Lab Proyek - 1 (Sipil Lt5-R 5-08)", "pengawas": "Dian Hanifudin Subhi, S.Kom., M.Kom.", "jenisUjian": "Tulis", "status": "Terjadwal"},
  {"id": "J-29", "tanggal": "2026-06-17", "hari": "Rabu", "jam": "09.15 - 10.15", "mataKuliah": "Agama", "kelas": "TI1C", "semester": 2, "ruang": "Lab Proyek - 1 (Sipil Lt5-R 5-08)", "pengawas": "Habibie Ed Dien, S.Kom., M.T.", "jenisUjian": "Tulis", "status": "Terjadwal"},
  {"id": "J-30", "tanggal": "2026-06-17", "hari": "Rabu", "jam": "10.30 - 11.30", "mataKuliah": "Desain Antarmuka", "kelas": "TI1C", "semester": 2, "ruang": "Lab Proyek - 1 (Sipil Lt5-R 5-08)", "pengawas": "Habibie Ed Dien, S.Kom., M.T.", "jenisUjian": "Tulis", "status": "Terjadwal"},
  {"id": "J-31", "tanggal": "2026-06-17", "hari": "Rabu", "jam": "11.45 - 12.45", "mataKuliah": "Pengenalan Sistem Informasi", "kelas": "SIB1C", "semester": 2, "ruang": "Lab Proyek - 1 (Sipil Lt5-R 5-08)", "pengawas": "Habibie Ed Dien, S.Kom., M.T.", "jenisUjian": "Tulis", "status": "Terjadwal"},
  {"id": "J-32", "tanggal": "2026-06-17", "hari": "Rabu", "jam": "13.00 - 14.00", "mataKuliah": "Matematika Lanjut", "kelas": "SIB1C", "semester": 2, "ruang": "Lab Proyek - 1 (Sipil Lt5-R 5-08)", "pengawas": "Habibie Ed Dien, S.Kom., M.T.", "jenisUjian": "Tulis", "status": "Terjadwal"},
  {"id": "J-33", "tanggal": "2026-06-18", "hari": "Kamis", "jam": "09.15 - 10.15", "mataKuliah": "Algoritma dan Struktur Data", "kelas": "SIB1C", "semester": 2, "ruang": "Lab Proyek - 1 (Sipil Lt5-R 5-08)", "pengawas": "Candra Bella Vista, S.Kom, M.T.", "jenisUjian": "Praktikum", "status": "Terjadwal"},
  {"id": "J-34", "tanggal": "2026-06-18", "hari": "Kamis", "jam": "10.30 - 11.30", "mataKuliah": "Basis Data", "kelas": "SIB1C", "semester": 2, "ruang": "Lab Proyek - 1 (Sipil Lt5-R 5-08)", "pengawas": "Candra Bella Vista, S.Kom, M.T.", "jenisUjian": "Praktikum", "status": "Terjadwal"},
  {"id": "J-35", "tanggal": "2026-06-19", "hari": "Jumat", "jam": "09.15 - 10.15", "mataKuliah": "Pengembangan Karir", "kelas": "TI3C", "semester": 6, "ruang": "Lab Proyek - 1 (Sipil Lt5-R 5-08)", "pengawas": "Dr. Ulla Delfana Rosiani, S.T., M.T.", "jenisUjian": "Praktikum", "status": "Terjadwal"},
  {"id": "J-36", "tanggal": "2026-06-19", "hari": "Jumat", "jam": "10.30 - 11.30", "mataKuliah": "Komputasi Hijau", "kelas": "TI3C", "semester": 6, "ruang": "Lab Proyek - 1 (Sipil Lt5-R 5-08)", "pengawas": "Dr. Ulla Delfana Rosiani, S.T., M.T.", "jenisUjian": "Praktikum", "status": "Terjadwal"},
  {"id": "J-37", "tanggal": "2026-06-15", "hari": "Senin", "jam": "09.15 - 10.15", "mataKuliah": "Analisis Proses Bisnis", "kelas": "SIB1D", "semester": 2, "ruang": "Ruang Teori - 6 (Sipil Lt5) 5-06", "pengawas": "Rudy Ariyanto, S.T., M.Cs.", "jenisUjian": "Praktikum", "status": "Terjadwal"},
  {"id": "J-38", "tanggal": "2026-06-15", "hari": "Senin", "jam": "10.30 - 11.30", "mataKuliah": "Kewarganegaraan", "kelas": "SIB1D", "semester": 2, "ruang": "Ruang Teori - 6 (Sipil Lt5) 5-06", "pengawas": "Rudy Ariyanto, S.T., M.Cs.", "jenisUjian": "Tulis", "status": "Terjadwal"},
  {"id": "J-39", "tanggal": "2026-06-15", "hari": "Senin", "jam": "11.45 - 12.45", "mataKuliah": "Aljabar Linier", "kelas": "TI1D", "semester": 2, "ruang": "Ruang Teori - 6 (Sipil Lt5) 5-06", "pengawas": "Ahmadi Yuli Ananta, S.T., M.M.", "jenisUjian": "Praktikum", "status": "Terjadwal"},
  {"id": "J-40", "tanggal": "2026-06-15", "hari": "Senin", "jam": "13.00 - 14.00", "mataKuliah": "Rekayasa Perangkat Lunak", "kelas": "TI1D", "semester": 2, "ruang": "Ruang Teori - 6 (Sipil Lt5) 5-06", "pengawas": "Ahmadi Yuli Ananta, S.T., M.M.", "jenisUjian": "Tulis", "status": "Terjadwal"},
  {"id": "J-41", "tanggal": "2026-06-17", "hari": "Rabu", "jam": "09.15 - 10.15", "mataKuliah": "Agama", "kelas": "TI1D", "semester": 2, "ruang": "Ruang Teori - 6 (Sipil Lt5) 5-06", "pengawas": "M. Hasyim Ratsanjani, S.Kom., M.Kom.", "jenisUjian": "Tulis", "status": "Terjadwal"},
  {"id": "J-42", "tanggal": "2026-06-17", "hari": "Rabu", "jam": "10.30 - 11.30", "mataKuliah": "Desain Antarmuka", "kelas": "TI1D", "semester": 2, "ruang": "Ruang Teori - 6 (Sipil Lt5) 5-06", "pengawas": "M. Hasyim Ratsanjani, S.Kom., M.Kom.", "jenisUjian": "Tulis", "status": "Terjadwal"},
  {"id": "J-43", "tanggal": "2026-06-17", "hari": "Rabu", "jam": "11.45 - 12.45", "mataKuliah": "Pengenalan Sistem Informasi", "kelas": "SIB1D", "semester": 2, "ruang": "Ruang Teori - 6 (Sipil Lt5) 5-06", "pengawas": "Moch. Zawaruddin Abdullah, S.ST., M.Kom.", "jenisUjian": "Tulis", "status": "Terjadwal"},
  {"id": "J-44", "tanggal": "2026-06-17", "hari": "Rabu", "jam": "13.00 - 14.00", "mataKuliah": "Matematika Lanjut", "kelas": "SIB1D", "semester": 2, "ruang": "Ruang Teori - 6 (Sipil Lt5) 5-06", "pengawas": "Moch. Zawaruddin Abdullah, S.ST., M.Kom.", "jenisUjian": "Tulis", "status": "Terjadwal"},
  {"id": "J-45", "tanggal": "2026-06-18", "hari": "Kamis", "jam": "09.15 - 10.15", "mataKuliah": "Algoritma dan Struktur Data", "kelas": "SIB1D", "semester": 2, "ruang": "Ruang Teori - 6 (Sipil Lt5) 5-06", "pengawas": "Farida Ulfa, S.Pd., M.Pd.", "jenisUjian": "Praktikum", "status": "Terjadwal"},
  {"id": "J-46", "tanggal": "2026-06-18", "hari": "Kamis", "jam": "10.30 - 11.30", "mataKuliah": "Basis Data", "kelas": "SIB1D", "semester": 2, "ruang": "Ruang Teori - 6 (Sipil Lt5) 5-06", "pengawas": "Farida Ulfa, S.Pd., M.Pd.", "jenisUjian": "Praktikum", "status": "Terjadwal"},
  {"id": "J-47", "tanggal": "2026-06-19", "hari": "Jumat", "jam": "09.15 - 10.15", "mataKuliah": "Pengembangan Karir", "kelas": "TI3D", "semester": 6, "ruang": "Ruang Teori - 6 (Sipil Lt5) 5-06", "pengawas": "Retno Damayanti, S.Pd., M.T.", "jenisUjian": "Praktikum", "status": "Terjadwal"},
  {"id": "J-48", "tanggal": "2026-06-19", "hari": "Jumat", "jam": "10.30 - 11.30", "mataKuliah": "Komputasi Hijau", "kelas": "TI3D", "semester": 6, "ruang": "Ruang Teori - 6 (Sipil Lt5) 5-06", "pengawas": "Retno Damayanti, S.Pd., M.T.", "jenisUjian": "Praktikum", "status": "Terjadwal"},
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
  {"nama": "Lab Proyek - 1 (Sipil Lt5-R 5-08)", "gedung": "Gedung Sipil", "lantai": 5, "kapasitas": 24, "status": "Digunakan", "penggunaan": "12 sesi UAS"},
  {"nama": "Ruang Teori - 1(Sipil Lt5) 5-01", "gedung": "Gedung Sipil", "lantai": 5, "kapasitas": 32, "status": "Tersedia", "penggunaan": "Belum terpakai"},
  {"nama": "Ruang Teori - 2(Sipil Lt5) 5-02", "gedung": "Gedung Sipil", "lantai": 5, "kapasitas": 32, "status": "Digunakan", "penggunaan": "12 sesi UAS"},
  {"nama": "Ruang Teori - 3(Sipil Lt5) 5-03", "gedung": "Gedung Sipil", "lantai": 5, "kapasitas": 32, "status": "Tersedia", "penggunaan": "Belum terpakai"},
  {"nama": "Ruang Teori - 4(Sipil Lt5) 5-04", "gedung": "Gedung Sipil", "lantai": 5, "kapasitas": 32, "status": "Digunakan", "penggunaan": "12 sesi UAS"},
  {"nama": "Ruang Teori - 5 (Sipil Lt5) 5-05", "gedung": "Gedung Sipil", "lantai": 5, "kapasitas": 32, "status": "Tersedia", "penggunaan": "Belum terpakai"},
  {"nama": "Ruang Teori - 6 (Sipil Lt5) 5-06", "gedung": "Gedung Sipil", "lantai": 5, "kapasitas": 32, "status": "Digunakan", "penggunaan": "12 sesi UAS"},
  {"nama": "Ruang Teori - 7(Sipil Lt5) 5-07", "gedung": "Gedung Sipil", "lantai": 5, "kapasitas": 32, "status": "Tersedia", "penggunaan": "Belum terpakai"},
  {"nama": "Lab Proyek - 2 (Sipil Lt6 - R 6-16)", "gedung": "Gedung Sipil", "lantai": 6, "kapasitas": 24, "status": "Tersedia", "penggunaan": "Belum terpakai"},
  {"nama": "Lab SI - 1 (Sipil Lt6 - R 6-15)", "gedung": "Gedung Sipil", "lantai": 6, "kapasitas": 24, "status": "Tersedia", "penggunaan": "Belum terpakai"},
  {"nama": "Lab SI - 2 (Sipil Lt6 - R 6-17)", "gedung": "Gedung Sipil", "lantai": 6, "kapasitas": 24, "status": "Tersedia", "penggunaan": "Belum terpakai"},
  {"nama": "Lab SI - 3 (Sipil Lt6 - R 6-19)", "gedung": "Gedung Sipil", "lantai": 6, "kapasitas": 24, "status": "Tersedia", "penggunaan": "Belum terpakai"},
  {"nama": "LPR - 8 (Sipil Lt7 - R 7-14)", "gedung": "Gedung Sipil", "lantai": 7, "kapasitas": 24, "status": "Tersedia", "penggunaan": "Belum terpakai"},
  {"nama": "LPR - 1 (Sipil Lt7 - R 7-01)", "gedung": "Gedung Sipil", "lantai": 7, "kapasitas": 24, "status": "Tersedia", "penggunaan": "Belum terpakai"},
  {"nama": "LPR - 2 (Sipil Lt7 - R 7-02)", "gedung": "Gedung Sipil", "lantai": 7, "kapasitas": 24, "status": "Tersedia", "penggunaan": "Belum terpakai"},
  {"nama": "LPR - 3 (Sipil Lt7 - R 7-03)", "gedung": "Gedung Sipil", "lantai": 7, "kapasitas": 24, "status": "Tersedia", "penggunaan": "Belum terpakai"},
  {"nama": "LPR - 4 (Sipil Lt7 - R 7-04)", "gedung": "Gedung Sipil", "lantai": 7, "kapasitas": 24, "status": "Tersedia", "penggunaan": "Belum terpakai"},
  {"nama": "LPR - 5 (Sipil Lt7 - R 7-05)", "gedung": "Gedung Sipil", "lantai": 7, "kapasitas": 24, "status": "Tersedia", "penggunaan": "Belum terpakai"},
  {"nama": "LPR - 6 (Sipil Lt7 - R 7-06)", "gedung": "Gedung Sipil", "lantai": 7, "kapasitas": 24, "status": "Tersedia", "penggunaan": "Belum terpakai"},
  {"nama": "LPR - 7 (Sipil Lt7 - R7-07)", "gedung": "Gedung Sipil", "lantai": 7, "kapasitas": 24, "status": "Tersedia", "penggunaan": "Belum terpakai"},
  {"nama": "Lab ERP (Sipil Lt7 - R 7-17)", "gedung": "Gedung Sipil", "lantai": 7, "kapasitas": 24, "status": "Tersedia", "penggunaan": "Belum terpakai"},
  {"nama": "Lab Proyek - 4 (Sipil Lt7 - R 7-19)", "gedung": "Gedung Sipil", "lantai": 7, "kapasitas": 24, "status": "Tersedia", "penggunaan": "Belum terpakai"},
  {"nama": "Lab Sist Komputer & Jaringan - 1 (Sipil Lt7 - R 7-08)", "gedung": "Gedung Sipil", "lantai": 7, "kapasitas": 24, "status": "Tersedia", "penggunaan": "Belum terpakai"},
  {"nama": "Lab Sist Komputer & Jaringan - 2 (Sipil Lt7 - R 7-13)", "gedung": "Gedung Sipil", "lantai": 7, "kapasitas": 24, "status": "Tersedia", "penggunaan": "Belum terpakai"},
  {"nama": "Lab Sist Komputer & Jaringan - 3 (Sipil Lt7 - R 7-15)", "gedung": "Gedung Sipil", "lantai": 7, "kapasitas": 24, "status": "Tersedia", "penggunaan": "Belum terpakai"},
  {"nama": "Lab Sistem Cerdas - 1 (LAI)(Sipil Lt7 - R 7-20)", "gedung": "Gedung Sipil", "lantai": 7, "kapasitas": 24, "status": "Tersedia", "penggunaan": "Belum terpakai"},
  {"nama": "Lab Visi Komputer(LIG) - 1 (Sipil Lt7 - R 7-16)", "gedung": "Gedung Sipil", "lantai": 7, "kapasitas": 24, "status": "Tersedia", "penggunaan": "Belum terpakai"},
  {"nama": "Lab Visi Komputer(LIG) - 2 (Sipil Lt7 - R 7-18)", "gedung": "Gedung Sipil", "lantai": 7, "kapasitas": 24, "status": "Tersedia", "penggunaan": "Belum terpakai"},
  {"nama": "Lab Riset xxx (Sipil Lt8 - R 8-04)", "gedung": "Gedung Sipil", "lantai": 8, "kapasitas": 24, "status": "Tersedia", "penggunaan": "Belum terpakai"},
  {"nama": "Lab Sistem Cerdas - 2 (Sipil Lt 8 - R 8-08)", "gedung": "Gedung Sipil", "lantai": 8, "kapasitas": 24, "status": "Tersedia", "penggunaan": "Belum terpakai"},
  {"nama": "Ruang Teori - 08 (Sipil Lt8 - R 8-13)", "gedung": "Gedung Sipil", "lantai": 8, "kapasitas": 32, "status": "Tersedia", "penggunaan": "Belum terpakai"},
  {"nama": "Ruang Teori - 09 (Sipil Lt8 - R 8-14)", "gedung": "Gedung Sipil", "lantai": 8, "kapasitas": 32, "status": "Tersedia", "penggunaan": "Belum terpakai"},
  {"nama": "Ruang Teori - 11 (Sipil Lt8 - R 8-06)", "gedung": "Gedung Sipil", "lantai": 8, "kapasitas": 32, "status": "Tersedia", "penggunaan": "Belum terpakai"},
  {"nama": "Ruang Teori - 12 (Sipil Lt8 - R 8-07)", "gedung": "Gedung Sipil", "lantai": 8, "kapasitas": 32, "status": "Tersedia", "penggunaan": "Belum terpakai"},
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
  {"id": "P-01", "nama": "Mamluatul Hani'ah, S.Kom., M.Kom.", "tanggal": "2026-06-15", "jam": "09.15 - 10.15", "ruang": "Ruang Teori - 2(Sipil Lt5) 5-02", "mataKuliah": "Analisis Proses Bisnis", "kelas": "SIB1A", "status": "Ditugaskan"},
  {"id": "P-02", "nama": "Mamluatul Hani'ah, S.Kom., M.Kom.", "tanggal": "2026-06-15", "jam": "10.30 - 11.30", "ruang": "Ruang Teori - 2(Sipil Lt5) 5-02", "mataKuliah": "Kewarganegaraan", "kelas": "SIB1A", "status": "Ditugaskan"},
  {"id": "P-03", "nama": "Mamluatul Hani'ah, S.Kom., M.Kom.", "tanggal": "2026-06-15", "jam": "11.45 - 12.45", "ruang": "Ruang Teori - 2(Sipil Lt5) 5-02", "mataKuliah": "Aljabar Linier", "kelas": "TI1A", "status": "Ditugaskan"},
  {"id": "P-04", "nama": "Mamluatul Hani'ah, S.Kom., M.Kom.", "tanggal": "2026-06-15", "jam": "13.00 - 14.00", "ruang": "Ruang Teori - 2(Sipil Lt5) 5-02", "mataKuliah": "Rekayasa Perangkat Lunak", "kelas": "TI1A", "status": "Ditugaskan"},
  {"id": "P-05", "nama": "Dr. Yuri Ariyanto, S.Kom., M.Kom.", "tanggal": "2026-06-17", "jam": "09.15 - 10.15", "ruang": "Ruang Teori - 2(Sipil Lt5) 5-02", "mataKuliah": "Agama", "kelas": "TI1A", "status": "Ditugaskan"},
  {"id": "P-06", "nama": "Dr. Yuri Ariyanto, S.Kom., M.Kom.", "tanggal": "2026-06-17", "jam": "10.30 - 11.30", "ruang": "Ruang Teori - 2(Sipil Lt5) 5-02", "mataKuliah": "Desain Antarmuka", "kelas": "TI1A", "status": "Ditugaskan"},
  {"id": "P-07", "nama": "Titis Octary Satrio, S.ST., M.MT.", "tanggal": "2026-06-17", "jam": "11.45 - 12.45", "ruang": "Ruang Teori - 2(Sipil Lt5) 5-02", "mataKuliah": "Pengenalan Sistem Informasi", "kelas": "SIB1A", "status": "Ditugaskan"},
  {"id": "P-08", "nama": "Titis Octary Satrio, S.ST., M.MT.", "tanggal": "2026-06-17", "jam": "13.00 - 14.00", "ruang": "Ruang Teori - 2(Sipil Lt5) 5-02", "mataKuliah": "Matematika Lanjut", "kelas": "SIB1A", "status": "Ditugaskan"},
  {"id": "P-09", "nama": "Dr. Yuri Ariyanto, S.Kom., M.Kom.", "tanggal": "2026-06-18", "jam": "09.15 - 10.15", "ruang": "Ruang Teori - 2(Sipil Lt5) 5-02", "mataKuliah": "Algoritma dan Struktur Data", "kelas": "SIB1A", "status": "Ditugaskan"},
  {"id": "P-10", "nama": "Dr. Yuri Ariyanto, S.Kom., M.Kom.", "tanggal": "2026-06-18", "jam": "10.30 - 11.30", "ruang": "Ruang Teori - 2(Sipil Lt5) 5-02", "mataKuliah": "Basis Data", "kelas": "SIB1A", "status": "Ditugaskan"},
  {"id": "P-11", "nama": "Vivi Nur Wijayaningrum, S.Kom., M.Kom.", "tanggal": "2026-06-19", "jam": "09.15 - 10.15", "ruang": "Ruang Teori - 2(Sipil Lt5) 5-02", "mataKuliah": "Pengembangan Karir", "kelas": "TI3A", "status": "Ditugaskan"},
  {"id": "P-12", "nama": "Vivi Nur Wijayaningrum, S.Kom., M.Kom.", "tanggal": "2026-06-19", "jam": "10.30 - 11.30", "ruang": "Ruang Teori - 2(Sipil Lt5) 5-02", "mataKuliah": "Komputasi Hijau", "kelas": "TI3A", "status": "Ditugaskan"},
  {"id": "P-13", "nama": "Ariadi Retno Tri Hayati Ririd, S.Kom., M.Kom.", "tanggal": "2026-06-15", "jam": "09.15 - 10.15", "ruang": "Ruang Teori - 4(Sipil Lt5) 5-04", "mataKuliah": "Analisis Proses Bisnis", "kelas": "SIB1B", "status": "Ditugaskan"},
  {"id": "P-14", "nama": "Ariadi Retno Tri Hayati Ririd, S.Kom., M.Kom.", "tanggal": "2026-06-15", "jam": "10.30 - 11.30", "ruang": "Ruang Teori - 4(Sipil Lt5) 5-04", "mataKuliah": "Kewarganegaraan", "kelas": "SIB1B", "status": "Ditugaskan"},
  {"id": "P-15", "nama": "Habibie Ed Dien, S.Kom., M.T.", "tanggal": "2026-06-15", "jam": "11.45 - 12.45", "ruang": "Ruang Teori - 4(Sipil Lt5) 5-04", "mataKuliah": "Aljabar Linier", "kelas": "TI1B", "status": "Ditugaskan"},
  {"id": "P-16", "nama": "Habibie Ed Dien, S.Kom., M.T.", "tanggal": "2026-06-15", "jam": "13.00 - 14.00", "ruang": "Ruang Teori - 4(Sipil Lt5) 5-04", "mataKuliah": "Rekayasa Perangkat Lunak", "kelas": "TI1B", "status": "Ditugaskan"},
  {"id": "P-17", "nama": "Wilda Imama Sabilla, S.Kom., M.Kom.", "tanggal": "2026-06-17", "jam": "09.15 - 10.15", "ruang": "Ruang Teori - 4(Sipil Lt5) 5-04", "mataKuliah": "Agama", "kelas": "TI1B", "status": "Ditugaskan"},
  {"id": "P-18", "nama": "Wilda Imama Sabilla, S.Kom., M.Kom.", "tanggal": "2026-06-17", "jam": "10.30 - 11.30", "ruang": "Ruang Teori - 4(Sipil Lt5) 5-04", "mataKuliah": "Desain Antarmuka", "kelas": "TI1B", "status": "Ditugaskan"},
  {"id": "P-19", "nama": "Usman Nurhasan, S.Kom., M.T.", "tanggal": "2026-06-17", "jam": "11.45 - 12.45", "ruang": "Ruang Teori - 4(Sipil Lt5) 5-04", "mataKuliah": "Pengenalan Sistem Informasi", "kelas": "SIB1B", "status": "Ditugaskan"},
  {"id": "P-20", "nama": "Usman Nurhasan, S.Kom., M.T.", "tanggal": "2026-06-17", "jam": "13.00 - 14.00", "ruang": "Ruang Teori - 4(Sipil Lt5) 5-04", "mataKuliah": "Matematika Lanjut", "kelas": "SIB1B", "status": "Ditugaskan"},
  {"id": "P-21", "nama": "Triana Fatmawati, S.T., M.T.", "tanggal": "2026-06-18", "jam": "09.15 - 10.15", "ruang": "Ruang Teori - 4(Sipil Lt5) 5-04", "mataKuliah": "Algoritma dan Struktur Data", "kelas": "SIB1B", "status": "Ditugaskan"},
  {"id": "P-22", "nama": "Triana Fatmawati, S.T., M.T.", "tanggal": "2026-06-18", "jam": "10.30 - 11.30", "ruang": "Ruang Teori - 4(Sipil Lt5) 5-04", "mataKuliah": "Basis Data", "kelas": "SIB1B", "status": "Ditugaskan"},
  {"id": "P-23", "nama": "Rokhimatul Wakhidah, S.Pd., M.T.", "tanggal": "2026-06-19", "jam": "09.15 - 10.15", "ruang": "Ruang Teori - 4(Sipil Lt5) 5-04", "mataKuliah": "Pengembangan Karir", "kelas": "TI3B", "status": "Ditugaskan"},
  {"id": "P-24", "nama": "Rokhimatul Wakhidah, S.Pd., M.T.", "tanggal": "2026-06-19", "jam": "10.30 - 11.30", "ruang": "Ruang Teori - 4(Sipil Lt5) 5-04", "mataKuliah": "Komputasi Hijau", "kelas": "TI3B", "status": "Ditugaskan"},
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
