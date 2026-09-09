import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Plus, Trash2 } from "lucide-react";
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
import type { Mahasiswa } from "@/lib/mock-data";
import { mahasiswaStore, useCrud } from "@/lib/store";

export const Route = createFileRoute("/admin/mahasiswa")({
  head: () => ({
    meta: [
      { title: "Data Mahasiswa — Sistem Manajemen UAS TI" },
      {
        name: "description",
        content: "Kelola data peserta UAS: NIM, nama, kelas, semester, dan status keaktifan mahasiswa.",
      },
      { property: "og:title", content: "Data Mahasiswa — Sistem Manajemen UAS TI" },
      { property: "og:description", content: "Daftar peserta ujian akhir semester Jurusan Teknologi Informasi." },
    ],
  }),
  component: MahasiswaPage,
});

const emptyForm: Mahasiswa = {
  nim: "",
  nama: "",
  kelas: "",
  semester: 2,
  email: "",
  status: "Aktif",
};

function MahasiswaPage() {
  const crud = useCrud<Mahasiswa>(mahasiswaStore, emptyForm);
  const table = useTable<Mahasiswa>(
    crud.rows,
    useCallback(
      (row: Mahasiswa, q: string) =>
        row.nama.toLowerCase().includes(q) || row.nim.includes(q) || row.kelas.toLowerCase().includes(q),
      [],
    ),
  );
  const [kelas, setKelas] = useState("all");
  const kelasOptions = [...new Set(crud.rows.map((r) => r.kelas).filter(Boolean))].sort();

  const applyKelas = (v: string) => {
    setKelas(v);
    table.filter((row) => v === "all" || row.kelas === v);
  };

  const submit = () => {
    if (!crud.form.nim.trim() || !crud.form.nama.trim()) {
      toast.error("NIM dan nama wajib diisi.");
      return;
    }
    const wasEditing = crud.save({ ...crud.form, semester: Number(crud.form.semester) || 2 });
    toast.success(wasEditing ? "Data mahasiswa diperbarui." : "Mahasiswa berhasil ditambahkan.");
  };

  return (
    <AppShell
      role="admin"
      breadcrumb={["Beranda", "Data Master", "Mahasiswa"]}
      title="Data Mahasiswa"
      description="Peserta ujian akhir semester per kelas dan semester."
      actions={
        <Button size="sm" onClick={crud.openCreate}>
          <Plus className="mr-2 size-4" /> Tambah Mahasiswa
        </Button>
      }
    >
      <Card className="shadow-card">
        <CardContent className="p-0">
          <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center">
            <SearchInput value={table.query} onChange={table.search} placeholder="Cari NIM atau nama..." />
            <div className="sm:ml-auto">
              <FilterSelect label="Kelas" value={kelas} onChange={applyKelas} options={kelasOptions} />
            </div>
          </div>

          {table.paged.length === 0 ? (
            <EmptyState
              title="Belum ada data mahasiswa"
              description="Tambahkan mahasiswa peserta UAS melalui tombol Tambah Mahasiswa."
              action={
                <Button size="sm" onClick={crud.openCreate}>
                  <Plus className="mr-2 size-4" /> Tambah Mahasiswa
                </Button>
              }
            />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12 text-center">No</TableHead>
                    <TableHead>NIM</TableHead>
                    <TableHead>Nama Mahasiswa</TableHead>
                    <TableHead>Kelas</TableHead>
                    <TableHead>Semester</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {table.paged.map((row, i) => (
                    <TableRow key={row.nim}>
                      <TableCell className="text-center text-sm text-muted-foreground">{table.rowNo(i)}</TableCell>
                      <TableCell className="font-mono text-xs">{row.nim}</TableCell>
                      <TableCell className="font-medium">{row.nama}</TableCell>
                      <TableCell>{row.kelas}</TableCell>
                      <TableCell>{row.semester}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{row.email}</TableCell>
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

      <Dialog open={crud.open} onOpenChange={crud.setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{crud.isEditing ? "Edit Mahasiswa" : "Tambah Mahasiswa"}</DialogTitle>
            <DialogDescription>Data peserta ujian akhir semester.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>NIM</Label>
              <Input
                value={crud.form.nim}
                onChange={(e) => crud.set("nim", e.target.value)}
                placeholder="2211081001"
              />
            </div>
            <div className="space-y-2">
              <Label>Nama</Label>
              <Input
                value={crud.form.nama}
                onChange={(e) => crud.set("nama", e.target.value)}
                placeholder="Nama mahasiswa"
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
            <div className="space-y-2 sm:col-span-2">
              <Label>Email</Label>
              <Input
                value={crud.form.email}
                onChange={(e) => crud.set("email", e.target.value)}
                placeholder="nama@student.polinema.ac.id"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Status</Label>
              <Select
                value={crud.form.status}
                onValueChange={(v) => crud.set("status", v as Mahasiswa["status"])}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Aktif">Aktif</SelectItem>
                  <SelectItem value="Tidak Aktif">Tidak Aktif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => crud.setOpen(false)}>
              Batal
            </Button>
            <Button onClick={submit}>Simpan</Button>
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
