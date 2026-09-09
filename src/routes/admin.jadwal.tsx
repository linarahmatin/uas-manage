import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Download, Pencil, Plus, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/app-shell";
import {
  ConfirmDeleteDialog,
  EmptyState,
  FilterSelect,
  Pagination,
  SearchInput,
  StatusBadge,
} from "@/components/data-helpers";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTable } from "@/hooks/use-table";
import type { Jadwal } from "@/lib/mock-data";
import { jadwalStore, useCrud } from "@/lib/store";

export const Route = createFileRoute("/admin/jadwal")({
  head: () => ({
    meta: [
      { title: "Jadwal UAS — Sistem Manajemen UAS TI" },
      {
        name: "description",
        content: "Kelola jadwal UAS dalam tampilan tabel dan kalender: tanggal, jam, ruang, kelas, dan pengawas.",
      },
      { property: "og:title", content: "Jadwal UAS — Sistem Manajemen UAS TI" },
      { property: "og:description", content: "Penjadwalan ujian akhir semester Jurusan Teknologi Informasi." },
    ],
  }),
  component: JadwalPage,
});

const hariUrut = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

const emptyForm: Jadwal = {
  id: "",
  tanggal: "",
  hari: "",
  jam: "",
  mataKuliah: "",
  kelas: "",
  semester: 2,
  ruang: "",
  pengawas: "",
  jenisUjian: "Tulis",
  status: "Terjadwal",
};

function hariDari(tanggal: string) {
  if (!tanggal) return "";
  const d = new Date(`${tanggal}T00:00:00`);
  if (Number.isNaN(d.getTime())) return "";
  return ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"][d.getDay()]!;
}

function JadwalPage() {
  const crud = useCrud<Jadwal>(jadwalStore, emptyForm);
  const table = useTable<Jadwal>(
    crud.rows,
    useCallback(
      (row: Jadwal, q: string) =>
        row.mataKuliah.toLowerCase().includes(q) ||
        row.kelas.toLowerCase().includes(q) ||
        row.ruang.toLowerCase().includes(q),
      [],
    ),
    8,
  );
  const [kelas, setKelas] = useState("all");
  const kelasOptions = [...new Set(crud.rows.map((r) => r.kelas).filter(Boolean))].sort();

  const applyKelas = (v: string) => {
    setKelas(v);
    table.filter((row) => v === "all" || row.kelas === v);
  };

  const submit = () => {
    if (!crud.form.tanggal || !crud.form.mataKuliah.trim()) {
      toast.error("Tanggal dan mata kuliah wajib diisi.");
      return;
    }
    const wasEditing = crud.save({
      ...crud.form,
      id: crud.form.id || jadwalStore.nextId("J"),
      hari: hariDari(crud.form.tanggal),
      semester: Number(crud.form.semester) || 2,
    });
    toast.success(wasEditing ? "Jadwal diperbarui." : "Jadwal ujian ditambahkan.");
  };

  return (
    <AppShell
      role="admin"
      breadcrumb={["Beranda", "Ujian", "Jadwal UAS"]}
      title="Jadwal UAS"
      description="Kelola sesi ujian akhir semester per kelas dan ruang."
      actions={
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              crud.rows.length === 0
                ? toast.error("Belum ada jadwal yang bisa diexport.")
                : toast.success("Jadwal diexport ke Excel.")
            }
          >
            <Download className="mr-2 size-4" /> Export Jadwal
          </Button>
          <Button size="sm" onClick={crud.openCreate}>
            <Plus className="mr-2 size-4" /> Tambah Jadwal
          </Button>
        </>
      }
    >
      <Tabs defaultValue="tabel">
        <TabsList>
          <TabsTrigger value="tabel">Tampilan Tabel</TabsTrigger>
          <TabsTrigger value="kalender">Tampilan Kalender</TabsTrigger>
        </TabsList>

        <TabsContent value="tabel" className="mt-4">
          <Card className="shadow-card">
            <CardContent className="p-0">
              <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center">
                <SearchInput value={table.query} onChange={table.search} placeholder="Cari mata kuliah / ruang..." />
                <div className="flex flex-col gap-3 sm:ml-auto sm:flex-row">
                  <FilterSelect label="Kelas" value={kelas} onChange={applyKelas} options={kelasOptions} />
                </div>
              </div>

              {table.paged.length === 0 ? (
                <EmptyState
                  title="Belum ada jadwal UAS"
                  description="Tambahkan sesi ujian melalui tombol Tambah Jadwal."
                  action={
                    <Button size="sm" onClick={crud.openCreate}>
                      <Plus className="mr-2 size-4" /> Tambah Jadwal
                    </Button>
                  }
                />
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12 text-center">No</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Hari</TableHead>
                        <TableHead>Jam</TableHead>
                        <TableHead>Mata Kuliah</TableHead>
                        <TableHead>Kelas</TableHead>
                        <TableHead>Ruang</TableHead>
                        <TableHead>Pengawas</TableHead>
                        <TableHead>Jenis</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {table.paged.map((row, i) => (
                        <TableRow key={row.id}>
                          <TableCell className="text-center text-sm text-muted-foreground">{table.rowNo(i)}</TableCell>
                          <TableCell className="whitespace-nowrap text-sm">
                            {row.tanggal.split("-").reverse().join("/")}
                          </TableCell>
                          <TableCell className="text-sm">{row.hari}</TableCell>
                          <TableCell className="whitespace-nowrap text-sm">{row.jam}</TableCell>
                          <TableCell className="font-medium">{row.mataKuliah}</TableCell>
                          <TableCell>{row.kelas}</TableCell>
                          <TableCell>{row.ruang}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{row.pengawas}</TableCell>
                          <TableCell className="text-sm">{row.jenisUjian}</TableCell>
                          <TableCell>
                            <StatusBadge status={row.status} />
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-end gap-1">
                              <Button size="icon" variant="ghost" aria-label="Edit" onClick={() => crud.openEdit(row)}>
                                <Pencil className="size-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                aria-label="Hapus"
                                className="text-destructive"
                                onClick={() => crud.setDeleting(row)}
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              <Pagination page={table.page} totalPages={table.totalPages} total={table.total} onPage={table.setPage} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kalender" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {hariUrut.map((hari) => {
              const sesi = crud.rows.filter((j) => j.hari === hari && j.status !== "Dibatalkan");
              return (
                <Card key={hari} className="shadow-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <CalendarDays className="size-4 text-primary" /> {hari}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {sesi.length === 0 ? (
                      <p className="text-xs text-muted-foreground">Tidak ada ujian.</p>
                    ) : (
                      sesi.map((s) => (
                        <div key={s.id} className="rounded-lg border bg-accent/30 p-3">
                          <p className="text-xs font-semibold text-primary">{s.jam}</p>
                          <p className="mt-1 text-sm font-medium leading-snug">{s.mataKuliah}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {s.kelas} · {s.ruang}
                          </p>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={crud.open} onOpenChange={crud.setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{crud.isEditing ? "Edit Jadwal UAS" : "Tambah Jadwal UAS"}</DialogTitle>
            <DialogDescription>Pastikan ruang dan pengawas tidak bertabrakan jadwal.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Tanggal</Label>
              <Input type="date" value={crud.form.tanggal} onChange={(e) => crud.set("tanggal", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Jam</Label>
              <Input
                value={crud.form.jam}
                onChange={(e) => crud.set("jam", e.target.value)}
                placeholder="09.15 - 10.15"
              />
            </div>
            <div className="space-y-2">
              <Label>Mata Kuliah</Label>
              <Input
                value={crud.form.mataKuliah}
                onChange={(e) => crud.set("mataKuliah", e.target.value)}
                placeholder="Basis Data"
              />
            </div>
            <div className="space-y-2">
              <Label>Kelas</Label>
              <Input value={crud.form.kelas} onChange={(e) => crud.set("kelas", e.target.value)} placeholder="TI1A" />
            </div>
            <div className="space-y-2">
              <Label>Semester</Label>
              <Input
                type="number"
                min={1}
                value={crud.form.semester}
                onChange={(e) => crud.set("semester", Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Ruang</Label>
              <Input
                value={crud.form.ruang}
                onChange={(e) => crud.set("ruang", e.target.value)}
                placeholder="Ruang Teori - 2"
              />
            </div>
            <div className="space-y-2">
              <Label>Dosen Pengawas</Label>
              <Input
                value={crud.form.pengawas}
                onChange={(e) => crud.set("pengawas", e.target.value)}
                placeholder="Nama pengawas"
              />
            </div>
            <div className="space-y-2">
              <Label>Jenis Ujian</Label>
              <Select value={crud.form.jenisUjian} onValueChange={(v) => crud.set("jenisUjian", v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tulis">Tulis</SelectItem>
                  <SelectItem value="Praktikum">Praktikum</SelectItem>
                  <SelectItem value="Online">Online</SelectItem>
                  <SelectItem value="Take Home">Take Home</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Status</Label>
              <Select value={crud.form.status} onValueChange={(v) => crud.set("status", v as Jadwal["status"])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Terjadwal">Terjadwal</SelectItem>
                  <SelectItem value="Selesai">Selesai</SelectItem>
                  <SelectItem value="Dibatalkan">Dibatalkan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => crud.setOpen(false)}>
              Batal
            </Button>
            <Button onClick={submit}>Simpan Jadwal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDeleteDialog
        open={!!crud.deleting}
        onOpenChange={(v) => !v && crud.setDeleting(null)}
        itemName={crud.deleting?.mataKuliah}
        onConfirm={() => {
          crud.confirmDelete();
          toast.success("Jadwal dihapus.");
        }}
      />
    </AppShell>
  );
}
