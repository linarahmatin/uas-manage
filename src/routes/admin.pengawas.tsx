import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Trash2, UserPlus } from "lucide-react";
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
import type { Pengawas } from "@/lib/mock-data";
import { pengawasStore, useCrud } from "@/lib/store";

export const Route = createFileRoute("/admin/pengawas")({
  head: () => ({
    meta: [
      { title: "Dosen Pengawas — Sistem Manajemen UAS TI" },
      {
        name: "description",
        content: "Penjadwalan dan penugasan dosen pengawas ujian per tanggal, jam, ruang, dan kelas.",
      },
      { property: "og:title", content: "Dosen Pengawas — Sistem Manajemen UAS TI" },
      { property: "og:description", content: "Assign dan pantau penugasan pengawas UAS Teknologi Informasi." },
    ],
  }),
  component: PengawasPage,
});

const emptyForm: Pengawas = {
  id: "",
  nama: "",
  tanggal: "",
  jam: "",
  ruang: "",
  mataKuliah: "",
  kelas: "",
  status: "Ditugaskan",
};

function PengawasPage() {
  const crud = useCrud<Pengawas>(pengawasStore, emptyForm);
  const table = useTable<Pengawas>(
    crud.rows,
    useCallback(
      (row: Pengawas, q: string) =>
        row.nama.toLowerCase().includes(q) ||
        row.mataKuliah.toLowerCase().includes(q) ||
        row.ruang.toLowerCase().includes(q),
      [],
    ),
  );
  const [status, setStatus] = useState("all");

  const applyStatus = (v: string) => {
    setStatus(v);
    table.filter((row) => v === "all" || row.status === v);
  };

  const submit = () => {
    if (!crud.form.nama.trim() || !crud.form.tanggal) {
      toast.error("Nama dosen dan tanggal wajib diisi.");
      return;
    }
    const wasEditing = crud.save({
      ...crud.form,
      id: crud.form.id || pengawasStore.nextId("P"),
    });
    toast.success(wasEditing ? "Penugasan diperbarui." : "Pengawas berhasil ditugaskan.");
  };

  return (
    <AppShell
      role="admin"
      breadcrumb={["Beranda", "Ujian", "Dosen Pengawas"]}
      title="Dosen Pengawas"
      description="Penugasan pengawas untuk setiap sesi ujian akhir semester."
      actions={
        <Button size="sm" onClick={crud.openCreate}>
          <UserPlus className="mr-2 size-4" /> Assign Pengawas
        </Button>
      }
    >
      <Card className="shadow-card">
        <CardContent className="p-0">
          <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center">
            <SearchInput value={table.query} onChange={table.search} placeholder="Cari dosen, ruang, mata kuliah..." />
            <div className="flex flex-col gap-3 sm:ml-auto sm:flex-row">
              <FilterSelect
                label="Status"
                value={status}
                onChange={applyStatus}
                options={["Ditugaskan", "Menunggu", "Dibatalkan"]}
              />
            </div>
          </div>

          {table.paged.length === 0 ? (
            <EmptyState
              title="Belum ada penugasan pengawas"
              description="Tugaskan dosen pengawas melalui tombol Assign Pengawas."
              action={
                <Button size="sm" onClick={crud.openCreate}>
                  <UserPlus className="mr-2 size-4" /> Assign Pengawas
                </Button>
              }
            />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12 text-center">No</TableHead>
                    <TableHead>Nama Dosen</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Jam</TableHead>
                    <TableHead>Ruang</TableHead>
                    <TableHead>Mata Kuliah</TableHead>
                    <TableHead>Kelas</TableHead>
                    <TableHead>Status Penugasan</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {table.paged.map((row, i) => (
                    <TableRow key={row.id}>
                      <TableCell className="text-center text-sm text-muted-foreground">{table.rowNo(i)}</TableCell>
                      <TableCell className="font-medium">{row.nama}</TableCell>
                      <TableCell className="whitespace-nowrap text-sm">{row.tanggal}</TableCell>
                      <TableCell className="whitespace-nowrap text-sm">{row.jam}</TableCell>
                      <TableCell>{row.ruang}</TableCell>
                      <TableCell className="text-sm">{row.mataKuliah}</TableCell>
                      <TableCell>{row.kelas}</TableCell>
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
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{crud.isEditing ? "Edit Penugasan" : "Assign Dosen Pengawas"}</DialogTitle>
            <DialogDescription>Satu dosen tidak boleh mengawas dua ruang pada jam yang sama.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label>Nama Dosen</Label>
              <Input
                value={crud.form.nama}
                onChange={(e) => crud.set("nama", e.target.value)}
                placeholder="Nama dosen pengawas"
              />
            </div>
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
              <Label>Ruang</Label>
              <Input
                value={crud.form.ruang}
                onChange={(e) => crud.set("ruang", e.target.value)}
                placeholder="Ruang Teori - 2"
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
              <Label>Status</Label>
              <Select value={crud.form.status} onValueChange={(v) => crud.set("status", v as Pengawas["status"])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ditugaskan">Ditugaskan</SelectItem>
                  <SelectItem value="Menunggu">Menunggu</SelectItem>
                  <SelectItem value="Dibatalkan">Dibatalkan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => crud.setOpen(false)}>
              Batal
            </Button>
            <Button onClick={submit}>Simpan Penugasan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDeleteDialog
        open={!!crud.deleting}
        onOpenChange={(v) => !v && crud.setDeleting(null)}
        itemName={crud.deleting?.nama}
        onConfirm={() => {
          crud.confirmDelete();
          toast.success("Penugasan dihapus.");
        }}
      />
    </AppShell>
  );
}
