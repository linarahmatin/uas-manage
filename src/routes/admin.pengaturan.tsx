import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/admin/pengaturan")({
  head: () => ({
    meta: [
      { title: "Pengaturan Sistem — Sistem Manajemen UAS TI" },
      {
        name: "description",
        content: "Atur periode UAS, batas pengumpulan soal, dan preferensi notifikasi sistem manajemen UAS.",
      },
      { property: "og:title", content: "Pengaturan Sistem — Sistem Manajemen UAS TI" },
      { property: "og:description", content: "Konfigurasi periode ujian dan notifikasi panitia UAS." },
    ],
  }),
  component: PengaturanPage,
});

function PengaturanPage() {
  return (
    <AppShell
      role="admin"
      breadcrumb={["Beranda", "Pengaturan"]}
      title="Pengaturan"
      description="Konfigurasi periode ujian, identitas jurusan, dan notifikasi sistem."
      actions={
        <Button size="sm" onClick={() => toast.success("Pengaturan disimpan.")}>
          Simpan Perubahan
        </Button>
      }
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Periode UAS</CardTitle>
            <CardDescription>Rentang tanggal pelaksanaan ujian akhir semester.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Tahun Akademik</Label>
              <Input defaultValue="2026/2027" />
            </div>
            <div className="space-y-2">
              <Label>Semester</Label>
              <Input defaultValue="Ganjil" />
            </div>
            <div className="space-y-2">
              <Label>Tanggal Mulai</Label>
              <Input type="date" defaultValue="2026-08-24" />
            </div>
            <div className="space-y-2">
              <Label>Tanggal Selesai</Label>
              <Input type="date" defaultValue="2026-08-28" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Batas Pengumpulan Soal</Label>
              <Input type="date" defaultValue="2026-08-18" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Identitas Jurusan</CardTitle>
            <CardDescription>Ditampilkan pada dokumen dan halaman login.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Nama Jurusan</Label>
              <Input defaultValue="Jurusan Teknologi Informasi" />
            </div>
            <div className="space-y-2">
              <Label>Email Panitia</Label>
              <Input defaultValue="panitia.uas@ti.ac.id" />
            </div>
            <div className="space-y-2">
              <Label>Ketua Panitia UAS</Label>
              <Input defaultValue="Dr. Rahmat Hidayat, M.Kom" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Notifikasi</CardTitle>
            <CardDescription>Pengingat otomatis untuk dosen dan mahasiswa.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            {[
              ["Pengingat batas pengumpulan soal", "Email 3 hari sebelum tenggat", true],
              ["Notifikasi penugasan pengawas", "Kirim saat penugasan dibuat", true],
              ["Pengumuman ke mahasiswa", "Kirim otomatis saat pengumuman terbit", false],
              ["Ringkasan harian panitia", "Rekap kesiapan setiap pukul 07.00", false],
            ].map(([title, desc, on], i, arr) => (
              <div key={title as string}>
                <div className="flex items-center justify-between gap-4 py-3">
                  <div>
                    <p className="text-sm font-medium">{title as string}</p>
                    <p className="text-xs text-muted-foreground">{desc as string}</p>
                  </div>
                  <Switch defaultChecked={on as boolean} />
                </div>
                {i < arr.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
