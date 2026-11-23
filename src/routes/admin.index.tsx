
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  useCollection,
  mataKuliahStore,
  dosenStore,
  jadwalStore,
  ruangStore,
  pengawasStore,
  soalStore,
  pengumumanStore,
} from "@/lib/store";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      {
        title: "Dashboard Panitia — Sistem Manajemen UAS TI",
      },
      {
        name: "description",
        content:
          "Dashboard pengelolaan Ujian Akhir Semester Jurusan Teknologi Informasi.",
      },
    ],
  }),
  component: AdminDashboard,
});

const CHART_COLORS = [
  "var(--color-chart-3)",
  "var(--color-chart-2)",
  "var(--color-chart-4)",
  "var(--color-chart-1)",
  "var(--color-chart-5)",
];

const STATUS_SOAL = [
  { status: "Diverifikasi", label: "Diverifikasi" },
  { status: "Sudah Dikumpulkan", label: "Dikumpulkan" },
  { status: "Draft", label: "Draft" },
  { status: "Belum Diinput", label: "Belum Diinput" },
  { status: "Revisi", label: "Revisi" },
];

const HARI_UJIAN = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

function AdminDashboard() {
  // Data diambil dari store yang digunakan halaman pengelolaan.
  const mataKuliahData = useCollection(mataKuliahStore);
  const dosenData = useCollection(dosenStore);
  const jadwalData = useCollection(jadwalStore);
  const ruangData = useCollection(ruangStore);
  const pengawasData = useCollection(pengawasStore);
  const soalData = useCollection(soalStore);
  const pengumumanData = useCollection(pengumumanStore);

  // Statistik utama.
  const jadwalAktif = jadwalData.filter(
    (jadwal) => jadwal.status === "Terjadwal",
  );

  const ruangDigunakan = ruangData.filter(
    (ruang) =>
      jadwalAktif.some((jadwal) => jadwal.ruang === ruang.nama),
  ).length;

  const pengawasMenunggu = pengawasData.filter(
    (pengawas) => pengawas.status === "Menunggu",
  ).length;

  const diverifikasi = soalData.filter(
    (soal) => soal.status === "Diverifikasi",
  ).length;

  const progress = soalData.length
    ? Math.round((diverifikasi / soalData.length) * 100)
    : 0;

  const stats = [
    {
      label: "Total Mata Kuliah",
      value: mataKuliahData.length,
      note: "Mata kuliah terdaftar",
      icon: BookOpen,
      iconStyle: "bg-blue-50 text-blue-600",
      borderStyle: "border-t-blue-500",
      link: "/admin/mata-kuliah" as const,
    },
    {
      label: "Total Dosen",
      value: dosenData.length,
      note: "Dosen terdaftar",
      icon: Users,
      iconStyle: "bg-sky-50 text-sky-600",
      borderStyle: "border-t-sky-500",
      link: "/admin/dosen" as const,
    },
    {
      label: "Total Jadwal UAS",
      value: jadwalData.length,
      note: `${jadwalAktif.length} jadwal terjadwal`,
      icon: CalendarDays,
      iconStyle: "bg-teal-50 text-teal-600",
      borderStyle: "border-t-teal-500",
      link: "/admin/jadwal" as const,
    },
    {
      label: "Total Ruang",
      value: ruangData.length,
      note: `${ruangDigunakan} ruang memiliki jadwal aktif`,
      icon: DoorOpen,
      iconStyle: "bg-amber-50 text-amber-600",
      borderStyle: "border-t-amber-500",
      link: "/admin/ruang" as const,
    },
    {
      label: "Total Pengawas",
      value: pengawasData.length,
      note: pengawasMenunggu
        ? `${pengawasMenunggu} penugasan menunggu`
        : "Data pengawas terdaftar",
      icon: ShieldCheck,
      iconStyle: "bg-violet-50 text-violet-600",
      borderStyle: "border-t-violet-500",
      link: "/admin/pengawas" as const,
    },
  ];

  // Grafik dihitung dari jadwal aktual, bukan angka contoh.
  const ujianPerHari = HARI_UJIAN.map((hari) => ({
    hari,
    jumlah: jadwalData.filter(
      (jadwal) =>
        jadwal.hari.toLowerCase() === hari.toLowerCase() &&
        jadwal.status !== "Dibatalkan",
    ).length,
  }));

  // Grafik status mengikuti status soal yang ada di store.
  const statusSoalChart = STATUS_SOAL.map((item, index) => ({
    name: item.label,
    value: soalData.filter((soal) => soal.status === item.status).length,
    fill: CHART_COLORS[index],
  }));

  // Penggunaan ruang dihitung dari jadwal yang tidak dibatalkan.
  const penggunaanRuang = ruangData
    .map((ruang) => ({
      ruang: ruang.nama,
      sesi: jadwalData.filter(
        (jadwal) =>
          jadwal.ruang === ruang.nama &&
          jadwal.status !== "Dibatalkan",
      ).length,
      kapasitas: ruang.kapasitas,
    }))
    .sort((a, b) => b.sesi - a.sesi)
    .slice(0, 6);

  // Urutkan jadwal terdekat berdasarkan tanggal.
  const terdekat = [...jadwalAktif]
    .sort((a, b) => a.tanggal.localeCompare(b.tanggal))
    .slice(0, 5);

  const tooltipStyle = {
    borderRadius: 12,
    border: "1px solid var(--color-border)",
    background: "var(--color-card)",
    fontSize: 12,
    boxShadow: "0 8px 24px rgba(15, 35, 70, 0.08)",
  };

  return (
    <AppShell
      role="admin"
      breadcrumb={["Beranda", "Dashboard"]}
      title="Dashboard Panitia UAS"
      description="Ringkasan kesiapan pelaksanaan Ujian Akhir Semester Ganjil 2026/2027."
      actions={
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
          >
            <Download className="mr-2 size-4" />
            Unduh Ringkasan
          </Button>

          <Button size="sm" asChild>
            <Link to="/admin/jadwal">
              Kelola Jadwal
              <ArrowUpRight className="ml-2 size-4" />
            </Link>
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        {/* Statistik utama */}
        <section
          aria-label="Statistik utama"
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5"
        >
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className={`group overflow-hidden rounded-2xl border border-border/70 border-t-[3px] ${stat.borderStyle} bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg`}
            >
              <CardContent className="flex items-start justify-between gap-3 p-5">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>

                  <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                    {stat.value}
                  </p>

                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {stat.note}
                  </p>
                </div>

                <div
                  className={`flex size-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-200 group-hover:scale-105 ${stat.iconStyle}`}
                >
                  <stat.icon className="size-5" />
                </div>
              </CardContent>

              <div className="px-5 pb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-0 text-xs text-muted-foreground hover:text-primary"
                  asChild
                >
                  <Link to={stat.link}>
                    Lihat detail
                    <ArrowUpRight className="ml-1 size-3.5" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </section>

        {/* Grafik utama */}
        <section
          aria-label="Grafik pelaksanaan UAS"
          className="grid gap-5 lg:grid-cols-3"
        >
          <Card className="rounded-2xl border-border/70 shadow-sm transition-shadow hover:shadow-md lg:col-span-2">
            <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0 pb-2">
              <div>
                <CardTitle className="text-base font-semibold">
                  Jumlah Ujian Berdasarkan Hari
                </CardTitle>
                <CardDescription className="mt-1">
                  Distribusi jadwal UAS yang tidak dibatalkan
                </CardDescription>
              </div>

              <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                <CalendarDays className="size-5" />
              </div>
            </CardHeader>

            <CardContent className="pt-4">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={ujianPerHari}
                    margin={{ top: 12, right: 8, left: -16, bottom: 0 }}
                  >
                    <XAxis
                      dataKey="hari"
                      tickLine={false}
                      axisLine={false}
                      fontSize={12}
                      tick={{ fill: "var(--color-muted-foreground)" }}
                    />

                    <YAxis
                      allowDecimals={false}
                      tickLine={false}
                      axisLine={false}
                      fontSize={12}
                      width={36}
                      tick={{ fill: "var(--color-muted-foreground)" }}
                    />

                    <Tooltip
                      contentStyle={tooltipStyle}
                      formatter={(value) => [value, "Jumlah ujian"]}
                      cursor={{ fill: "rgba(8, 102, 198, 0.06)" }}
                    />

                    <Bar
                      dataKey="jumlah"
                      name="Jumlah ujian"
                      fill="var(--color-chart-1)"
                      radius={[7, 7, 0, 0]}
                      maxBarSize={42}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-2 flex items-center gap-2 border-t border-border/60 pt-4 text-xs text-muted-foreground">
                <CalendarDays className="size-4" />
                <span>
                  Total {jadwalData.filter(
                    (jadwal) => jadwal.status !== "Dibatalkan",
                  ).length}{" "}
                  jadwal yang tidak dibatalkan
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border/70 shadow-sm transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0 pb-2">
              <div>
                <CardTitle className="text-base font-semibold">
                  Status Pengumpulan Soal
                </CardTitle>
                <CardDescription className="mt-1">
                  {diverifikasi} dari {soalData.length} soal terverifikasi
                </CardDescription>
              </div>

              <div className="rounded-xl bg-teal-50 p-2.5 text-teal-600">
                <ClipboardCheck className="size-5" />
              </div>
            </CardHeader>

            <CardContent>
              <div className="relative h-48">
                {soalData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusSoalChart.filter((item) => item.value > 0)}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={52}
                        outerRadius={76}
                        paddingAngle={3}
                        stroke="none"
                      >
                        {statusSoalChart
                          .filter((item) => item.value > 0)
                          .map((item) => (
                            <Cell
                              key={item.name}
                              fill={item.fill}
                            />
                          ))}
                      </Pie>

                      <Tooltip contentStyle={tooltipStyle} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-muted-foreground">
                    <ClipboardCheck className="size-8 opacity-40" />
                    <p className="text-sm">Belum ada data soal</p>
                  </div>
                )}

                {soalData.length > 0 && (
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold">
                      {progress}%
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      Terverifikasi
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-3 space-y-3">
                {statusSoalChart.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between gap-3 text-xs"
                  >
                    <span className="flex min-w-0 items-center gap-2 text-muted-foreground">
                      <span
                        className="size-2.5 shrink-0 rounded-full"
                        style={{ background: item.fill }}
                      />
                      <span className="truncate">{item.name}</span>
                    </span>

                    <span className="font-semibold tabular-nums">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                className="mt-5 w-full"
                asChild
              >
                <Link to="/admin/soal">
                  <FileText className="mr-2 size-4" />
                  Kelola Soal
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Jadwal dan progres */}
        <section className="grid gap-5 lg:grid-cols-3">
          <Card className="overflow-hidden rounded-2xl border-border/70 shadow-sm lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0">
              <div>
                <CardTitle className="text-base font-semibold">
                  Jadwal UAS Terdekat
                </CardTitle>
                <CardDescription className="mt-1">
                  Maksimal lima jadwal berstatus Terjadwal
                </CardDescription>
              </div>

              <Button variant="ghost" size="sm" asChild>
                <Link to="/admin/jadwal">
                  Lihat semua
                  <ArrowUpRight className="ml-1 size-4" />
                </Link>
              </Button>
            </CardHeader>

            <CardContent className="px-0 pb-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                      <TableHead className="pl-6">Tanggal</TableHead>
                      <TableHead>Jam</TableHead>
                      <TableHead>Mata Kuliah</TableHead>
                      <TableHead>Kelas</TableHead>
                      <TableHead>Ruang</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {terdekat.map((jadwal) => (
                      <TableRow key={jadwal.id}>
                        <TableCell className="whitespace-nowrap pl-6 text-sm">
                          {jadwal.hari},{" "}
                          {jadwal.tanggal.split("-").reverse().join("/")}
                        </TableCell>

                        <TableCell className="whitespace-nowrap text-sm">
                          {jadwal.jam}
                        </TableCell>

                        <TableCell className="min-w-40 font-medium">
                          {jadwal.mataKuliah}
                        </TableCell>

                        <TableCell>{jadwal.kelas}</TableCell>
                        <TableCell>{jadwal.ruang}</TableCell>

                        <TableCell>
                          <StatusBadge status={jadwal.status} />
                        </TableCell>
                      </TableRow>
                    ))}

                    {terdekat.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="h-36 text-center"
                        >
                          <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                            <CalendarDays className="size-8 opacity-40" />
                            <p className="text-sm font-medium">
                              Belum ada jadwal UAS
                            </p>
                            <p className="text-xs">
                              Jadwal berstatus Terjadwal akan muncul di sini.
                            </p>
                            <Button size="sm" variant="outline" asChild>
                              <Link to="/admin/jadwal">
                                Kelola Jadwal
                              </Link>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-5">
            <Card className="rounded-2xl border-border/70 shadow-sm">
              <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
                <div>
                  <CardTitle className="text-base font-semibold">
                    Progres Verifikasi Soal
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Persentase soal yang telah diverifikasi
                  </CardDescription>
                </div>

                <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
                  <CheckCircle2 className="size-5" />
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold tracking-tight">
                    {progress}%
                  </span>
                  <span className="pb-1 text-xs text-muted-foreground">
                    {diverifikasi}/{soalData.length} soal
                  </span>
                </div>

                <Progress value={progress} className="h-2.5" />

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-emerald-50/80 p-3">
                    <p className="text-xs text-emerald-700">
                      Diverifikasi
                    </p>
                    <p className="mt-1 text-xl font-bold text-emerald-700">
                      {diverifikasi}
                    </p>
                  </div>

                  <div className="rounded-xl bg-amber-50/80 p-3">
                    <p className="text-xs text-amber-700">
                      Belum selesai
                    </p>
                    <p className="mt-1 text-xl font-bold text-amber-700">
                      {soalData.length - diverifikasi}
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  asChild
                >
                  <Link to="/admin/soal">
                    <FileText className="mr-2 size-4" />
                    Kelola Soal
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-border/70 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <div>
                  <CardTitle className="text-base font-semibold">
                    Pengumuman Terbaru
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Informasi untuk panitia UAS
                  </CardDescription>
                </div>

                <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                  <Megaphone className="size-5" />
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                {pengumumanData
                  .filter((item) => item.status === "Terbit")
                  .slice(0, 3)
                  .map((pengumuman) => (
                    <div
                      key={pengumuman.id}
                      className="rounded-xl border border-border/70 p-3 transition-colors hover:bg-muted/30"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold leading-snug">
                          {pengumuman.judul}
                        </p>

                        <Badge
                          variant="secondary"
                          className="shrink-0 text-[10px]"
                        >
                          {pengumuman.tanggal}
                        </Badge>
                      </div>

                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        {pengumuman.isi}
                      </p>
                    </div>
                  ))}

                {pengumumanData.filter(
                  (item) => item.status === "Terbit",
                ).length === 0 && (
                  <div className="py-5 text-center text-sm text-muted-foreground">
                    <Megaphone className="mx-auto mb-2 size-7 opacity-40" />
                    Belum ada pengumuman yang diterbitkan.
                  </div>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  asChild
                >
                  <Link to="/admin/pengumuman">
                    <Megaphone className="mr-2 size-4" />
                    Kelola Pengumuman
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Penggunaan ruang */}
        <Card className="rounded-2xl border-border/70 shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
            <div>
              <CardTitle className="text-base font-semibold">
                Penggunaan Ruang Ujian
              </CardTitle>
              <CardDescription className="mt-1">
                Jumlah sesi berdasarkan jadwal dan ruang terdaftar
              </CardDescription>
            </div>

            <div className="rounded-xl bg-amber-50 p-2.5 text-amber-600">
              <DoorOpen className="size-5" />
            </div>
          </CardHeader>

          <CardContent>
            {penggunaanRuang.length > 0 ? (
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={penggunaanRuang}
                    layout="vertical"
                    margin={{ top: 4, right: 20, left: 12, bottom: 4 }}
                  >
                    <XAxis
                      type="number"
                      allowDecimals={false}
                      tickLine={false}
                      axisLine={false}
                      fontSize={12}
                    />

                    <YAxis
                      type="category"
                      dataKey="ruang"
                      tickLine={false}
                      axisLine={false}
                      fontSize={11}
                      width={140}
                    />

                    <Tooltip
                      contentStyle={tooltipStyle}
                      formatter={(value, _name, item) => [
                        `${value} sesi`,
                        `Kapasitas ruang: ${item.payload.kapasitas}`,
                      ]}
                      cursor={{ fill: "rgba(8, 102, 198, 0.06)" }}
                    />

                    <Bar
                      dataKey="sesi"
                      name="Jumlah sesi"
                      fill="var(--color-chart-2)"
                      radius={[0, 7, 7, 0]}
                      maxBarSize={26}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex min-h-40 flex-col items-center justify-center gap-2 text-center text-muted-foreground">
                <DoorOpen className="size-8 opacity-40" />
                <p className="text-sm font-medium">
                  Belum ada data ruang ujian
                </p>
                <p className="text-xs">
                  Tambahkan ruang untuk melihat statistik penggunaan.
                </p>
              </div>
            )}

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock3 className="size-4" />
                <span>
                  {jadwalAktif.length} jadwal berstatus Terjadwal
                </span>
              </div>

              <Button variant="outline" size="sm" asChild>
                <Link to="/admin/ruang">
                  Kelola Ruang
                  <ArrowUpRight className="ml-1 size-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
