import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Download, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTable } from "@/hooks/use-table";
import { jadwalList, type Jadwal } from "@/lib/mock-data";

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

function JadwalPage() {
  const table = useTable<Jadwal>(
    jadwalList,
    (row, q) =>
      row.mataKuliah.toLowerCase().includes(q) ||
      row.kelas.toLowerCase().includes(q) ||
      row.ruang.toLowerCase().includes(q),
    8,
  );
  const [kelas, setKelas] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Jadwal | null>(null);
  const [deleting, setDeleting] = useState<Jadwal | null>(null);

  const applyKelas = (v: string) => {
    setKelas(v);
    table.filter((row) => v === "all" || row.kelas === v);
  };

  return (
    <AppShell
      role="admin"
      breadcrumb={["Beranda", "Ujian", "Jadwal UAS"]}
      title="Jadwal UAS"
      description="Pekan UAS 24 - 28 Agustus 2026. Kelola sesi ujian per kelas dan ruang."
      actions={
        <>
          <Button variant="outline" size="sm" onClick={() => toast.success("Jadwal diexport ke Excel.")}>
            <Download className="mr-2 size-4" /> Export Jadwal
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setEditing(null);
              setFormOpen(true);
            }}
          >
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
                  <Input type="date" className="w-full sm:w-40" aria-label="Filter tanggal" />
                  <FilterSelect
                    label="Kelas"
                    value={kelas}
                    onChange={applyKelas}
                    options={["TI-2A", "TI-2B", "TI-4A", "TI-4B", "TI-6A", "TI-6B", "TI-8A", "TI-8B"]}
                  />
                </div>
              </div>

              {table.paged.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
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
                      {table.paged.map((row) => (
                        <TableRow key={row.id}>
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
                              <Button
                                size="icon"
                                variant="ghost"
                                aria-label="Edit"
                                onClick={() => {
                                  setEditing(row);
                                  setFormOpen(true);
                                }}
                              >
                                <Pencil className="size-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                aria-label="Hapus"
                                className="text-destructive"
                                onClick={() => setDeleting(row)}
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
              const sesi = jadwalList.filter((j) => j.hari === hari && j.status !== "Dibatalkan");
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

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Jadwal UAS" : "Tambah Jadwal UAS"}</DialogTitle>
            <DialogDescription>Pastikan ruang dan pengawas tidak bertabrakan jadwal.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Tanggal</Label>
              <Input type="date" defaultValue={editing?.tanggal ?? "2026-08-24"} />
            </div>
            <div className="space-y-2">
              <Label>Jam</Label>
              <Input defaultValue={editing?.jam} placeholder="08.00 - 09.40" />
            </div>
            <div className="space-y-2">
              <Label>Mata Kuliah</Label>
              <Input defaultValue={editing?.mataKuliah} placeholder="Basis Data" />
            </div>
            <div className="space-y-2">
              <Label>Kelas</Label>
              <Input defaultValue={editing?.kelas} placeholder="TI-4A" />
            </div>
            <div className="space-y-2">
              <Label>Ruang</Label>
              <Input defaultValue={editing?.ruang} placeholder="Lab TI 1" />
            </div>
            <div className="space-y-2">
              <Label>Dosen Pengawas</Label>
              <Input defaultValue={editing?.pengawas} placeholder="Nama pengawas" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFormOpen(false)}>
              Batal
            </Button>
            <Button
              onClick={() => {
                setFormOpen(false);
                toast.success(editing ? "Jadwal diperbarui." : "Jadwal ujian ditambahkan.");
              }}
            >
              Simpan Jadwal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDeleteDialog
        open={!!deleting}
        onOpenChange={(v) => !v && setDeleting(null)}
        itemName={deleting?.mataKuliah}
        onConfirm={() => {
          toast.success("Jadwal dihapus.");
          setDeleting(null);
        }}
      />
    </AppShell>
  );
}
