import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpen,
  CalendarDays,
  DoorOpen,
  FileSpreadsheet,
  FileText,
  Printer,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
    ],
  }),
  component: LaporanPage,
});

const laporan = [
  {
    title: "Rekap Jadwal UAS",
    icon: CalendarDays,
    desc: "32 sesi ujian, 5 hari pelaksanaan, 8 kelas.",
    rows: [
      ["Total sesi", "32"],
      ["Sesi selesai", "4"],
      ["Sesi dibatalkan", "1"],
    ],
  },
  {
    title: "Rekap Pengawas",
    icon: ShieldCheck,
    desc: "Penugasan pengawas per dosen dan per sesi.",
    rows: [
      ["Total penugasan", "8"],
      ["Ditugaskan", "5"],
      ["Menunggu konfirmasi", "2"],
    ],
  },
  {
    title: "Rekap Ruang",
    icon: DoorOpen,
    desc: "Pemakaian ruang dan kapasitas selama UAS.",
    rows: [
      ["Total ruang", "9"],
      ["Ruang terpakai", "6"],
      ["Kapasitas total", "302 kursi"],
    ],
  },
  {
    title: "Rekap Soal",
    icon: FileText,
    desc: "Status pengumpulan dan verifikasi soal.",
    rows: [
      ["Diverifikasi", "3"],
      ["Sudah dikumpulkan", "2"],
      ["Belum diinput", "2"],
    ],
  },
  {
    title: "Rekap Mata Kuliah",
    icon: BookOpen,
    desc: "Mata kuliah yang diujikan per semester.",
    rows: [
      ["Total mata kuliah", "12"],
      ["Mata kuliah aktif", "11"],
      ["Total SKS", "32"],
    ],
  },
];

function LaporanPage() {
  return (
    <AppShell
      role="admin"
      breadcrumb={["Beranda", "Laporan"]}
      title="Laporan UAS"
      description="Rekapitulasi pelaksanaan UAS untuk arsip jurusan dan pelaporan akademik."
      actions={
        <>
          <Button variant="outline" size="sm" onClick={() => toast.success("Laporan diexport ke Excel.")}>
            <FileSpreadsheet className="mr-2 size-4" /> Export Excel
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast.success("Laporan diexport ke PDF.")}>
            <FileText className="mr-2 size-4" /> Export PDF
          </Button>
          <Button size="sm" onClick={() => toast.success("Menyiapkan halaman cetak...")}>
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
                  onClick={() => toast.success(`${l.title} diexport ke Excel.`)}
                >
                  Excel
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => toast.success(`${l.title} diexport ke PDF.`)}
                >
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
