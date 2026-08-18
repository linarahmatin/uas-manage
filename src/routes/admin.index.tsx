import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen,
  CalendarDays,
  DoorOpen,
  Download,
  FileText,
  Megaphone,
  ShieldCheck,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AppShell } from "@/components/app-shell";
import { StatusBadge } from "@/components/data-helpers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  jadwalList,
  penggunaanRuang,
  pengumumanList,
  soalList,
  statusSoalChart,
  ujianPerHari,
} from "@/lib/mock-data";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Dashboard Panitia — Sistem Manajemen UAS TI" },
      {
        name: "description",
        content:
          "Ringkasan pelaksanaan UAS: total mata kuliah, dosen, jadwal, ruang, pengawas, status soal, dan pengumuman terbaru.",
      },
      { property: "og:title", content: "Dashboard Panitia — Sistem Manajemen UAS TI" },
      {
        property: "og:description",
        content: "Pantau kesiapan UAS Jurusan Teknologi Informasi dalam satu dashboard.",
      },
    ],
  }),
  component: AdminDashboard,
});

const stats = [
  { label: "Total Mata Kuliah", value: 12, icon: BookOpen, note: "10 aktif" },
  { label: "Total Dosen", value: 6, icon: Users, note: "5 aktif" },
  { label: "Total Jadwal UAS", value: 32, icon: CalendarDays, note: "24 - 28 Agustus" },
  { label: "Total Ruang", value: 9, icon: DoorOpen, note: "6 terpakai" },
  { label: "Total Pengawas", value: 8, icon: ShieldCheck, note: "2 menunggu" },
];

function AdminDashboard() {
  const terdekat = jadwalList.filter((j) => j.status === "Terjadwal").slice(0, 5);
  const diverifikasi = soalList.filter((s) => s.status === "Diverifikasi").length;
  const progress = Math.round((diverifikasi / soalList.length) * 100);

  return (
    <AppShell
      role="admin"
      breadcrumb={["Beranda", "Dashboard"]}
      title="Dashboard Panitia UAS"
      description="Ringkasan kesiapan pelaksanaan Ujian Akhir Semester Ganjil 2026/2027."
      actions={
        <>
          <Button variant="outline" size="sm">
            <Download className="mr-2 size-4" /> Unduh Ringkasan
          </Button>
          <Button size="sm" asChild>
            <Link to="/admin/jadwal">Kelola Jadwal</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((s) => (
          <Card key={s.label} className="shadow-card">
            <CardContent className="flex items-start justify-between gap-3 p-5">
              <div>
                <p className="text-xs font-medium text-muted-foreground">{s.label}</p>
                <p className="mt-1 text-3xl font-bold tracking-tight">{s.value}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{s.note}</p>
              </div>
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <s.icon className="size-4.5" />
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Jumlah Ujian Berdasarkan Hari</CardTitle>
            <CardDescription>Distribusi sesi ujian pekan UAS</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ujianPerHari}>
                <XAxis dataKey="hari" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} width={28} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid var(--color-border)",
                    background: "var(--color-card)",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="jumlah" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} maxBarSize={38} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Status Pengumpulan Soal</CardTitle>
            <CardDescription>{diverifikasi} dari {soalList.length} soal terverifikasi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusSoalChart}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={44}
                    outerRadius={68}
                    paddingAngle={2}
                  >
                    {statusSoalChart.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid var(--color-border)",
                      background: "var(--color-card)",
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="mt-2 space-y-1.5">
              {statusSoalChart.map((s) => (
                <li key={s.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <span className="size-2 rounded-full" style={{ background: s.fill }} />
                    {s.name}
                  </span>
                  <span className="font-semibold">{s.value}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="shadow-card lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Jadwal UAS Terdekat</CardTitle>
              <CardDescription>5 sesi ujian berikutnya</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/jadwal">Lihat semua</Link>
            </Button>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Jam</TableHead>
                    <TableHead>Mata Kuliah</TableHead>
                    <TableHead>Kelas</TableHead>
                    <TableHead>Ruang</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {terdekat.map((j) => (
                    <TableRow key={j.id}>
                      <TableCell className="whitespace-nowrap text-sm">
                        {j.hari}, {j.tanggal.split("-").reverse().join("/")}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-sm">{j.jam}</TableCell>
                      <TableCell className="font-medium">{j.mataKuliah}</TableCell>
                      <TableCell>{j.kelas}</TableCell>
                      <TableCell>{j.ruang}</TableCell>
                      <TableCell>
                        <StatusBadge status={j.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Status Pendataan Soal</CardTitle>
              <CardDescription>Progres verifikasi soal UAS</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Progress value={progress} />
              <p className="text-xs text-muted-foreground">{progress}% soal telah diverifikasi</p>
              <ul className="space-y-2">
                {soalList.slice(0, 4).map((s) => (
                  <li key={s.id} className="flex items-center justify-between gap-2 text-xs">
                    <span className="truncate font-medium">{s.mataKuliah}</span>
                    <StatusBadge status={s.status} />
                  </li>
                ))}
              </ul>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/admin/soal">
                  <FileText className="mr-2 size-4" /> Kelola Soal
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Pengumuman Terbaru</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pengumumanList.slice(0, 3).map((p) => (
                <div key={p.id} className="rounded-lg border p-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold leading-snug">{p.judul}</p>
                    <Badge variant="brand" className="shrink-0">
                      {p.tanggal}
                    </Badge>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{p.isi}</p>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/admin/pengumuman">
                  <Megaphone className="mr-2 size-4" /> Kelola Pengumuman
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-base">Penggunaan Ruang Ujian</CardTitle>
          <CardDescription>Jumlah sesi per ruang selama pekan UAS</CardDescription>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={penggunaanRuang} layout="vertical" margin={{ left: 12 }}>
              <XAxis type="number" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis
                type="category"
                dataKey="ruang"
                tickLine={false}
                axisLine={false}
                fontSize={12}
                width={90}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid var(--color-border)",
                  background: "var(--color-card)",
                  fontSize: 12,
                }}
              />
              <Bar dataKey="sesi" fill="var(--color-chart-2)" radius={[0, 6, 6, 0]} maxBarSize={22} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </AppShell>
  );
}
