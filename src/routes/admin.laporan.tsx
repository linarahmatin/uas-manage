import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpen,
  CalendarDays,
  DoorOpen,
  FileSpreadsheet,
  FileText,
  Printer,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useMemo } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  dosenStore,
  jadwalStore,
  mahasiswaStore,
  mataKuliahStore,
  pengawasStore,
  ruangStore,
  soalStore,
  useCollection,
} from "@/lib/store";

export const Route = createFileRoute("/admin/laporan")({
  head: () => ({
    meta: [
      { title: "Laporan UAS — Sistem Manajemen UAS TI" },
      {
        name: "description",
        content: "Rekapitulasi jadwal, pengawas, ruang, soal, dan mata kuliah UAS beserta ekspor Excel dan PDF.",
      },
      { property: "og:title", content: "Laporan UAS — Sistem Manajemen UAS TI" },
      { property: "og:description", content: "Rekap dan ekspor laporan pelaksanaan ujian akhir semester." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LaporanPage,
});

function unduhCsv(namaFile: string, baris: (string | number)[][]) {
  if (baris.length <= 1) {
    toast.error("Belum ada data untuk diexport.");
    return;
  }
  const csv = baris
    .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(";"))
    .join("\n");
  const url = URL.createObjectURL(new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = namaFile;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  toast.success(`${namaFile} berhasil diunduh.`);
}

function LaporanPage() {
  const mk = useCollection(mataKuliahStore);
  const dosen = useCollection(dosenStore);
  const mahasiswa = useCollection(mahasiswaStore);
  const soal = useCollection(soalStore);
  const jadwal = useCollection(jadwalStore);
  const ruang = useCollection(ruangStore);
  const pengawas = useCollection(pengawasStore);

  const laporan = useMemo(
    () => [
      {
        title: "Rekap Jadwal UAS",
        icon: CalendarDays,
        desc: "Sesi ujian, hari pelaksanaan, dan status sesi.",
        rows: [
          ["Total sesi", String(jadwal.length)],
          ["Hari pelaksanaan", String(new Set(jadwal.map((j) => j.tanggal)).size)],
          ["Kelas terlibat", String(new Set(jadwal.map((j) => j.kelas)).size)],
        ],
        csv: [
          ["No", "Tanggal", "Hari", "Jam", "Mata Kuliah", "Kelas", "Ruang", "Pengawas", "Status"],
          ...jadwal.map((j, i) => [
            i + 1,
            j.tanggal,
            j.hari,
            j.jam,
            j.mataKuliah,
            j.kelas,
            j.ruang,
            j.pengawas,
            j.status,
          ]),
        ],
        file: "rekap-jadwal-uas.csv",
      },
      {
        title: "Rekap Pengawas",
        icon: ShieldCheck,
        desc: "Penugasan pengawas per dosen dan per sesi.",
        rows: [
          ["Total penugasan", String(pengawas.length)],
          ["Dosen bertugas", String(new Set(pengawas.map((p) => p.nama)).size)],
          ["Ruang dijaga", String(new Set(pengawas.map((p) => p.ruang)).size)],
        ],
        csv: [
          ["No", "Nama", "Tanggal", "Jam", "Ruang", "Mata Kuliah", "Kelas", "Status"],
          ...pengawas.map((p, i) => [
            i + 1,
            p.nama,
            p.tanggal,
            p.jam,
            p.ruang,
            p.mataKuliah,
            p.kelas,
            p.status,
          ]),
        ],
        file: "rekap-pengawas-uas.csv",
      },
      {
        title: "Rekap Ruang",
        icon: DoorOpen,
        desc: "Pemakaian ruang dan kapasitas selama UAS.",
        rows: [
          ["Total ruang", String(ruang.length)],
          ["Ruang terpakai", String(ruang.filter((r) => r.status !== "Tersedia").length)],
          ["Kapasitas total", `${ruang.reduce((a, r) => a + Number(r.kapasitas || 0), 0)} kursi`],
        ],
        csv: [
          ["No", "Nama Ruang", "Gedung", "Lantai", "Kapasitas", "Status", "Penggunaan"],
          ...ruang.map((r, i) => [i + 1, r.nama, r.gedung, r.lantai, r.kapasitas, r.status, r.penggunaan]),
        ],
        file: "rekap-ruang-uas.csv",
      },
      {
        title: "Rekap Soal",
        icon: FileText,
        desc: "Status pengumpulan dan verifikasi soal.",
        rows: [
          ["Diverifikasi", String(soal.filter((s) => s.status === "Diverifikasi").length)],
          ["Sudah dikumpulkan", String(soal.filter((s) => s.status === "Sudah Dikumpulkan").length)],
          ["Belum diinput", String(soal.filter((s) => s.status === "Belum Diinput").length)],
        ],
        csv: [
          ["No", "Mata Kuliah", "Dosen", "Jenis Ujian", "Bentuk Soal", "Jumlah", "Status", "Berkas", "Tanggal"],
          ...soal.map((s, i) => [
            i + 1,
            s.mataKuliah,
            s.dosen,
            s.jenisUjian,
            s.bentukSoal,
            s.jumlahSoal,
            s.status,
            s.file ?? "-",
            s.tanggal,
          ]),
        ],
        file: "rekap-soal-uas.csv",
      },
      {
        title: "Rekap Mata Kuliah",
        icon: BookOpen,
        desc: "Mata kuliah yang diujikan per semester.",
        rows: [
          ["Total mata kuliah", String(mk.length)],
          ["Mata kuliah aktif", String(mk.filter((m) => m.status === "Aktif").length)],
          ["Total SKS", String(mk.reduce((a, m) => a + Number(m.sks || 0), 0))],
        ],
        csv: [
          ["No", "Kode", "Nama", "Semester", "Kelas", "SKS", "Dosen", "Jenis Ujian", "Status"],
          ...mk.map((m, i) => [
            i + 1,
            m.kode,
            m.nama,
            m.semester,
            m.kelas,
            m.sks,
            m.dosen,
            m.jenisUjian,
            m.status,
          ]),
        ],
        file: "rekap-mata-kuliah.csv",
      },
      {
        title: "Rekap Dosen & Mahasiswa",
        icon: Users,
        desc: "Data induk peserta dan pengampu ujian.",
        rows: [
          ["Total dosen", String(dosen.length)],
          ["Total mahasiswa", String(mahasiswa.length)],
          ["Mahasiswa aktif", String(mahasiswa.filter((m) => m.status === "Aktif").length)],
        ],
        csv: [
          ["No", "Tipe", "Identitas", "Nama", "Email", "Status"],
          ...dosen.map((d, i) => [i + 1, "Dosen", d.nip, d.nama, d.email, d.status]),
          ...mahasiswa.map((m, i) => [
            dosen.length + i + 1,
            "Mahasiswa",
            m.nim,
            m.nama,
            m.email,
            m.status,
          ]),
        ],
        file: "rekap-dosen-mahasiswa.csv",
      },
    ],
    [jadwal, pengawas, ruang, soal, mk, dosen, mahasiswa],
  );

  const exportSemua = () => {
    const semua: (string | number)[][] = [["Laporan Pelaksanaan UAS — Jurusan Teknologi Informasi"]];
    laporan.forEach((l) => {
      semua.push([], [l.title]);
      l.rows.forEach((r) => semua.push(r));
    });
    unduhCsv("laporan-uas-lengkap.csv", semua);
  };

  return (
    <AppShell
      role="admin"
      breadcrumb={["Beranda", "Laporan"]}
      title="Laporan UAS"
      description="Rekapitulasi pelaksanaan UAS untuk arsip jurusan dan pelaporan akademik."
      actions={
        <>
          <Button variant="outline" size="sm" onClick={exportSemua}>
            <FileSpreadsheet className="mr-2 size-4" /> Export Excel
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <FileText className="mr-2 size-4" /> Export PDF
          </Button>
          <Button size="sm" onClick={() => window.print()}>
            <Printer className="mr-2 size-4" /> Print
          </Button>
        </>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {laporan.map((l) => (
          <Card key={l.title} className="shadow-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <l.icon className="size-4.5" />
                </span>
                <div>
                  <CardTitle className="text-base">{l.title}</CardTitle>
                  <CardDescription>{l.desc}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <dl className="space-y-2">
                {l.rows.map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between text-sm">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
              <Separator />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => unduhCsv(l.file, l.csv)}
                >
                  Excel
                </Button>
                <Button variant="outline" size="sm" className="flex-1" onClick={() => window.print()}>
                  PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
