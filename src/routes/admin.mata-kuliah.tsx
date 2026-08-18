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
import { mataKuliah, type MataKuliah } from "@/lib/mock-data";

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

function MataKuliahPage() {
  const table = useTable<MataKuliah>(
    mataKuliah,
    (row, q) =>
      row.nama.toLowerCase().includes(q) ||
      row.kode.toLowerCase().includes(q) ||
      row.dosen.toLowerCase().includes(q),
  );
  const [semester, setSemester] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<MataKuliah | null>(null);
  const [deleting, setDeleting] = useState<MataKuliah | null>(null);

  const applySemester = (v: string) => {
    setSemester(v);
    table.filter((row) => v === "all" || String(row.semester) === v);
  };

  return (
    <AppShell
      role="admin"
      breadcrumb={["Beranda", "Data Master", "Mata Kuliah"]}
      title="Data Mata Kuliah"
      description="Daftar mata kuliah yang diujikan pada UAS semester ini."
      actions={
        <Button
          size="sm"
          onClick={() => {
            setEditing(null);
            setFormOpen(true);
          }}
        >
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

          <Pagination
            page={table.page}
            totalPages={table.totalPages}
            total={table.total}
            onPage={table.setPage}
          />
        </CardContent>
      </Card>

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Mata Kuliah" : "Tambah Mata Kuliah"}</DialogTitle>
            <DialogDescription>
              Lengkapi data mata kuliah yang akan diujikan pada UAS.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Kode Mata Kuliah</Label>
              <Input defaultValue={editing?.kode} placeholder="TI3201" />
            </div>
            <div className="space-y-2">
              <Label>Nama Mata Kuliah</Label>
              <Input defaultValue={editing?.nama} placeholder="Rekayasa Perangkat Lunak" />
            </div>
            <div className="space-y-2">
              <Label>Semester</Label>
              <Input defaultValue={editing?.semester} placeholder="6" />
            </div>
            <div className="space-y-2">
              <Label>Kelas</Label>
              <Input defaultValue={editing?.kelas} placeholder="TI-6A" />
            </div>
            <div className="space-y-2">
              <Label>SKS</Label>
              <Input defaultValue={editing?.sks} placeholder="3" />
            </div>
            <div className="space-y-2">
              <Label>Jenis Ujian</Label>
              <Select defaultValue={editing?.jenisUjian ?? "Tulis"}>
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
            <div className="space-y-2 sm:col-span-2">
              <Label>Dosen Pengampu</Label>
              <Input defaultValue={editing?.dosen} placeholder="Nama dosen pengampu" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFormOpen(false)}>
              Batal
            </Button>
            <Button
              onClick={() => {
                setFormOpen(false);
                toast.success(editing ? "Mata kuliah diperbarui." : "Mata kuliah ditambahkan.");
              }}
            >
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDeleteDialog
        open={!!deleting}
        onOpenChange={(v) => !v && setDeleting(null)}
        itemName={deleting?.nama}
        onConfirm={() => {
          toast.success(`${deleting?.nama} dihapus.`);
          setDeleting(null);
        }}
      />
    </AppShell>
  );
}
