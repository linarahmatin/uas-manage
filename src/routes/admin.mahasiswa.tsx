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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTable } from "@/hooks/use-table";
import { mahasiswaList, type Mahasiswa } from "@/lib/mock-data";

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

function MahasiswaPage() {
  const table = useTable<Mahasiswa>(
    mahasiswaList,
    (row, q) => row.nama.toLowerCase().includes(q) || row.nim.includes(q) || row.kelas.toLowerCase().includes(q),
  );
  const [kelas, setKelas] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [deleting, setDeleting] = useState<Mahasiswa | null>(null);

  const applyKelas = (v: string) => {
    setKelas(v);
    table.filter((row) => v === "all" || row.kelas === v);
  };

  return (
    <AppShell
      role="admin"
      breadcrumb={["Beranda", "Data Master", "Mahasiswa"]}
      title="Data Mahasiswa"
      description="Peserta ujian akhir semester per kelas dan semester."
      actions={
        <Button size="sm" onClick={() => setFormOpen(true)}>
          <Plus className="mr-2 size-4" /> Tambah Mahasiswa
        </Button>
      }
    >
      <Card className="shadow-card">
        <CardContent className="p-0">
          <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center">
            <SearchInput value={table.query} onChange={table.search} placeholder="Cari NIM atau nama..." />
            <div className="sm:ml-auto">
              <FilterSelect
                label="Kelas"
                value={kelas}
                onChange={applyKelas}
                options={["TI-2A", "TI-4A", "TI-4B", "TI-6A", "TI-6B", "TI-8A", "TI-8B"]}
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
                          <Button size="icon" variant="ghost" aria-label="Edit" onClick={() => setFormOpen(true)}>
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

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Form Mahasiswa</DialogTitle>
            <DialogDescription>Data peserta ujian akhir semester.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>NIM</Label>
              <Input placeholder="2211081001" />
            </div>
            <div className="space-y-2">
              <Label>Nama</Label>
              <Input placeholder="Nama mahasiswa" />
            </div>
            <div className="space-y-2">
              <Label>Kelas</Label>
              <Input placeholder="TI-6A" />
            </div>
            <div className="space-y-2">
              <Label>Semester</Label>
              <Input placeholder="6" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Email</Label>
              <Input placeholder="nama@student.ti.ac.id" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFormOpen(false)}>
              Batal
            </Button>
            <Button
              onClick={() => {
                setFormOpen(false);
                toast.success("Data mahasiswa disimpan.");
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
