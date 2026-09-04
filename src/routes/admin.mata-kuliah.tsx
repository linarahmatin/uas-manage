import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Plus, Trash2 } from "lucide-react";
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
import { Card, CardContent } from "@/components/ui/card";
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
import { useTable } from "@/hooks/use-table";
import { type MataKuliah } from "@/lib/mock-data";
import { mataKuliahStore, useCrud } from "@/lib/store";

export const Route = createFileRoute("/admin/mata-kuliah")({
  head: () => ({
    meta: [
      { title: "Data Mata Kuliah — Sistem Manajemen UAS TI" },
      {
        name: "description",
        content: "Kelola data mata kuliah peserta UAS: kode, semester, kelas, SKS, dosen pengampu, dan jenis ujian.",
      },
      { property: "og:title", content: "Data Mata Kuliah — Sistem Manajemen UAS TI" },
      { property: "og:description", content: "CRUD data mata kuliah untuk pelaksanaan UAS Jurusan Teknologi Informasi." },
    ],
  }),
  component: MataKuliahPage,
});

const emptyMataKuliah: MataKuliah = {
  kode: "",
  nama: "",
  semester: 2,
  kelas: "",
  sks: 3,
  dosen: "",
  jenisUjian: "Tulis",
  status: "Aktif",
};

function MataKuliahPage() {
  const crud = useCrud<MataKuliah>(mataKuliahStore, emptyMataKuliah);
  const table = useTable<MataKuliah>(
    crud.rows,
    (row, q) =>
      row.nama.toLowerCase().includes(q) ||
      row.kode.toLowerCase().includes(q) ||
      row.dosen.toLowerCase().includes(q),
  );
  const [semester, setSemester] = useState("all");

  const applySemester = (v: string) => {
    setSemester(v);
    table.filter((row) => v === "all" || String(row.semester) === v);
  };

  const handleSave = () => {
    if (!crud.form.kode.trim() || !crud.form.nama.trim()) {
      toast.error("Kode dan nama mata kuliah wajib diisi.");
      return;
    }
    const wasEditing = crud.save();
    toast.success(wasEditing ? "Mata kuliah diperbarui." : "Mata kuliah ditambahkan.");
  };

  return (
    <AppShell
      role="admin"
      breadcrumb={["Beranda", "Data Master", "Mata Kuliah"]}
      title="Data Mata Kuliah"
      description="Daftar mata kuliah yang diujikan pada UAS semester ini."
      actions={
        <Button size="sm" onClick={crud.openCreate}>
          <Plus className="mr-2 size-4" /> Tambah Mata Kuliah
        </Button>
      }
    >
      <Card className="shadow-card">
        <CardContent className="p-0">
          <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center">
            <SearchInput
              value={table.query}
              onChange={table.search}
              placeholder="Cari kode, nama, atau dosen..."
            />
            <div className="sm:ml-auto">
              <FilterSelect
                label="Semester"
                value={semester}
                onChange={applySemester}
                options={["2", "4", "6", "8"]}
              />
            </div>
          </div>

          {table.paged.length === 0 ? (
            <EmptyState
              action={
                <Button size="sm" variant="outline" onClick={() => table.search("")}>
                  Reset pencarian
                </Button>
              }
            />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kode</TableHead>
                    <TableHead>Nama Mata Kuliah</TableHead>
                    <TableHead>Semester</TableHead>
                    <TableHead>Kelas</TableHead>
                    <TableHead>SKS</TableHead>
                    <TableHead>Dosen Pengampu</TableHead>
                    <TableHead>Jenis Ujian</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {table.paged.map((row) => (
                    <TableRow key={row.kode + row.kelas}>
                      <TableCell className="font-mono text-xs font-semibold">{row.kode}</TableCell>
                      <TableCell className="font-medium">{row.nama}</TableCell>
                      <TableCell>{row.semester}</TableCell>
                      <TableCell>{row.kelas}</TableCell>
                      <TableCell>{row.sks}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{row.dosen}</TableCell>
                      <TableCell>
                        <span className="text-sm">{row.jenisUjian}</span>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={row.status} />
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            aria-label="Edit"
                            onClick={() => crud.openEdit(row)}
                          >
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

      <Dialog open={crud.open} onOpenChange={crud.setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{crud.isEditing ? "Edit Mata Kuliah" : "Tambah Mata Kuliah"}</DialogTitle>
            <DialogDescription>Data mata kuliah dipakai saat penyusunan jadwal dan soal UAS.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Kode</Label>
              <Input
                value={crud.form.kode}
                onChange={(e) => crud.set("kode", e.target.value)}
                placeholder="TI3201"
              />
            </div>
            <div className="space-y-2">
              <Label>Nama Mata Kuliah</Label>
              <Input
                value={crud.form.nama}
                onChange={(e) => crud.set("nama", e.target.value)}
                placeholder="Basis Data"
              />
            </div>
            <div className="space-y-2">
              <Label>Semester</Label>
              <Input
                type="number"
                value={crud.form.semester}
                onChange={(e) => crud.set("semester", Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Kelas</Label>
              <Input
                value={crud.form.kelas}
                onChange={(e) => crud.set("kelas", e.target.value)}
                placeholder="TI-6A"
              />
            </div>
            <div className="space-y-2">
              <Label>SKS</Label>
              <Input
                type="number"
                value={crud.form.sks}
                onChange={(e) => crud.set("sks", Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Jenis Ujian</Label>
              <Select
                value={crud.form.jenisUjian}
                onValueChange={(v) => crud.set("jenisUjian", v as MataKuliah["jenisUjian"])}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["Tulis", "Praktikum", "Take Home", "Online"].map((o) => (
                    <SelectItem key={o} value={o}>
                      {o}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Dosen Pengampu</Label>
              <Input
                value={crud.form.dosen}
                onChange={(e) => crud.set("dosen", e.target.value)}
                placeholder="Nama, gelar"
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={crud.form.status}
                onValueChange={(v) => crud.set("status", v as MataKuliah["status"])}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["Aktif", "Tidak Aktif"].map((o) => (
                    <SelectItem key={o} value={o}>
                      {o}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => crud.setOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSave}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDeleteDialog
        open={!!crud.deleting}
        onOpenChange={(v) => !v && crud.setDeleting(null)}
        itemName={crud.deleting?.nama}
        onConfirm={() => {
          const nama = crud.deleting?.nama;
          crud.confirmDelete();
          toast.success(`${nama} dihapus.`);
        }}
      />
    </AppShell>
  );
}
