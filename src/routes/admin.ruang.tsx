import { createFileRoute } from "@tanstack/react-router";
import { DoorOpen, Pencil, Plus, Trash2 } from "lucide-react";
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
import type { Ruang } from "@/lib/mock-data";
import { ruangStore, useCrud } from "@/lib/store";

export const Route = createFileRoute("/admin/ruang")({
  head: () => ({
    meta: [
      { title: "Ruang Ujian — Sistem Manajemen UAS TI" },
      {
        name: "description",
        content: "Data ruang ujian UAS: gedung, lantai, kapasitas, status ketersediaan, dan jadwal penggunaan.",
      },
      { property: "og:title", content: "Ruang Ujian — Sistem Manajemen UAS TI" },
      { property: "og:description", content: "Kelola ketersediaan ruang ujian akhir semester." },
    ],
  }),
  component: RuangPage,
});

const emptyForm: Ruang = {
  nama: "",
  gedung: "",
  lantai: 1,
  kapasitas: 30,
  status: "Tersedia",
  penggunaan: "—",
};

function RuangPage() {
  const crud = useCrud<Ruang>(ruangStore, emptyForm);
  const table = useTable<Ruang>(
    crud.rows,
    useCallback(
      (row: Ruang, q: string) => row.nama.toLowerCase().includes(q) || row.gedung.toLowerCase().includes(q),
      [],
    ),
  );
  const [status, setStatus] = useState("all");

  const applyStatus = (v: string) => {
    setStatus(v);
    table.filter((row) => v === "all" || row.status === v);
  };

  const submit = () => {
    if (!crud.form.nama.trim()) {
      toast.error("Nama ruang wajib diisi.");
      return;
    }
    const wasEditing = crud.save({
      ...crud.form,
      lantai: Number(crud.form.lantai) || 1,
      kapasitas: Number(crud.form.kapasitas) || 0,
      penggunaan: crud.form.penggunaan.trim() || "—",
    });
    toast.success(wasEditing ? "Data ruang diperbarui." : "Ruang berhasil ditambahkan.");
  };

  return (
    <AppShell
      role="admin"
      breadcrumb={["Beranda", "Sarana", "Ruang Ujian"]}
      title="Ruang Ujian"
      description="Ketersediaan dan penggunaan ruang selama pekan UAS."
      actions={
        <Button size="sm" onClick={crud.openCreate}>
          <Plus className="mr-2 size-4" /> Tambah Ruang
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {(["Tersedia", "Digunakan", "Tidak tersedia"] as const).map((label) => (
          <Card key={label} className="shadow-card">
            <CardContent className="flex items-center justify-between p-5">
              <div className="space-y-2">
                <StatusBadge status={label} />
                <p className="text-2xl font-bold">{crud.rows.filter((r) => r.status === label).length}</p>
              </div>
              <DoorOpen className="size-8 text-primary/25" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-card">
        <CardContent className="p-0">
          <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center">
            <SearchInput value={table.query} onChange={table.search} placeholder="Cari ruang atau gedung..." />
            <div className="sm:ml-auto">
              <FilterSelect
                label="Status"
                value={status}
                onChange={applyStatus}
                options={["Tersedia", "Digunakan", "Tidak tersedia"]}
              />
            </div>
          </div>

          {table.paged.length === 0 ? (
            <EmptyState
              title="Belum ada data ruang"
              description="Tambahkan ruang ujian melalui tombol Tambah Ruang."
              action={
                <Button size="sm" onClick={crud.openCreate}>
                  <Plus className="mr-2 size-4" /> Tambah Ruang
                </Button>
              }
            />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12 text-center">No</TableHead>
                    <TableHead>Nama Ruang</TableHead>
                    <TableHead>Gedung</TableHead>
                    <TableHead>Lantai</TableHead>
                    <TableHead>Kapasitas</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Jadwal Penggunaan</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {table.paged.map((row, i) => (
                    <TableRow key={row.nama}>
                      <TableCell className="text-center text-sm text-muted-foreground">{table.rowNo(i)}</TableCell>
                      <TableCell className="font-medium">{row.nama}</TableCell>
                      <TableCell>{row.gedung}</TableCell>
                      <TableCell>{row.lantai}</TableCell>
                      <TableCell>{row.kapasitas} kursi</TableCell>
                      <TableCell>
                        <StatusBadge status={row.status} />
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{row.penggunaan}</TableCell>
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
            <DialogTitle>{crud.isEditing ? "Edit Ruang Ujian" : "Tambah Ruang Ujian"}</DialogTitle>
            <DialogDescription>Ruang digunakan saat penyusunan jadwal UAS.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Nama Ruang</Label>
              <Input
                value={crud.form.nama}
                onChange={(e) => crud.set("nama", e.target.value)}
                placeholder="Ruang Teori - 2"
              />
            </div>
            <div className="space-y-2">
              <Label>Gedung</Label>
              <Input
                value={crud.form.gedung}
                onChange={(e) => crud.set("gedung", e.target.value)}
                placeholder="Gedung Sipil"
              />
            </div>
            <div className="space-y-2">
              <Label>Lantai</Label>
              <Input
                type="number"
                min={1}
                value={crud.form.lantai}
                onChange={(e) => crud.set("lantai", Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Kapasitas</Label>
              <Input
                type="number"
                min={0}
                value={crud.form.kapasitas}
                onChange={(e) => crud.set("kapasitas", Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={crud.form.status} onValueChange={(v) => crud.set("status", v as Ruang["status"])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tersedia">Tersedia</SelectItem>
                  <SelectItem value="Digunakan">Digunakan</SelectItem>
                  <SelectItem value="Tidak tersedia">Tidak tersedia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Jadwal Penggunaan</Label>
              <Input
                value={crud.form.penggunaan}
                onChange={(e) => crud.set("penggunaan", e.target.value)}
                placeholder="15 Jun 2026 · 09.15 - 10.15"
              />
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
          crud.confirmDelete();
          toast.success("Ruang dihapus.");
        }}
      />
    </AppShell>
  );
}
