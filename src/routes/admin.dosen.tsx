import { createFileRoute } from "@tanstack/react-router";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
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
import { dosenList, type Dosen } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/dosen")({
  head: () => ({
    meta: [
      { title: "Data Dosen — Sistem Manajemen UAS TI" },
      {
        name: "description",
        content: "Kelola data dosen pengampu dan pengawas UAS: NIP/NIDN, email, program studi, dan mata kuliah.",
      },
      { property: "og:title", content: "Data Dosen — Sistem Manajemen UAS TI" },
      { property: "og:description", content: "Daftar dosen Jurusan Teknologi Informasi untuk pelaksanaan UAS." },
    ],
  }),
  component: DosenPage,
});

function DosenPage() {
  const table = useTable<Dosen>(
    dosenList,
    (row, q) =>
      row.nama.toLowerCase().includes(q) ||
      row.nip.includes(q) ||
      row.email.toLowerCase().includes(q),
    5,
  );
  const [prodi, setProdi] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Dosen | null>(null);
  const [detail, setDetail] = useState<Dosen | null>(null);
  const [deleting, setDeleting] = useState<Dosen | null>(null);

  const applyProdi = (v: string) => {
    setProdi(v);
    table.filter((row) => v === "all" || row.prodi === v);
  };

  return (
    <AppShell
      role="admin"
      breadcrumb={["Beranda", "Data Master", "Dosen"]}
      title="Data Dosen"
      description="Daftar dosen pengampu mata kuliah dan calon pengawas ujian."
      actions={
        <Button
          size="sm"
          onClick={() => {
            setEditing(null);
            setFormOpen(true);
          }}
        >
          <Plus className="mr-2 size-4" /> Tambah Dosen
        </Button>
      }
    >
      <Card className="shadow-card">
        <CardContent className="p-0">
          <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center">
            <SearchInput value={table.query} onChange={table.search} placeholder="Cari nama, NIP, email..." />
            <div className="sm:ml-auto">
              <FilterSelect
                label="Prodi"
                value={prodi}
                onChange={applyProdi}
                options={["Teknologi Informasi", "Teknik Komputer", "Sistem Informasi"]}
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
                    <TableHead>NIP / NIDN</TableHead>
                    <TableHead>Nama Dosen</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Program Studi</TableHead>
                    <TableHead>Mata Kuliah</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {table.paged.map((row) => (
                    <TableRow key={row.nip}>
                      <TableCell className="font-mono text-xs">{row.nip}</TableCell>
                      <TableCell className="font-medium">{row.nama}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{row.email}</TableCell>
                      <TableCell className="text-sm">{row.prodi}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {row.mataKuliah.map((mk) => (
                            <Badge key={mk} variant="neutral">
                              {mk}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={row.status} />
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1">
                          <Button size="icon" variant="ghost" aria-label="Detail" onClick={() => setDetail(row)}>
                            <Eye className="size-4" />
                          </Button>
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

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Dosen" : "Tambah Dosen"}</DialogTitle>
            <DialogDescription>Data dosen digunakan untuk pengampu dan penugasan pengawas.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>NIP / NIDN</Label>
              <Input defaultValue={editing?.nip} placeholder="1992..." />
            </div>
            <div className="space-y-2">
              <Label>Nama Lengkap</Label>
              <Input defaultValue={editing?.nama} placeholder="Nama, gelar" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue={editing?.email} placeholder="nama@ti.ac.id" />
            </div>
            <div className="space-y-2">
              <Label>Telepon</Label>
              <Input defaultValue={editing?.telepon} placeholder="08xx-xxxx-xxxx" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Program Studi</Label>
              <Input defaultValue={editing?.prodi} placeholder="Teknologi Informasi" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFormOpen(false)}>
              Batal
            </Button>
            <Button
              onClick={() => {
                setFormOpen(false);
                toast.success(editing ? "Data dosen diperbarui." : "Dosen baru ditambahkan.");
              }}
            >
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!detail} onOpenChange={(v) => !v && setDetail(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{detail?.nama}</DialogTitle>
            <DialogDescription>{detail?.prodi}</DialogDescription>
          </DialogHeader>
          <dl className="grid gap-3 text-sm">
            {[
              ["NIP / NIDN", detail?.nip],
              ["Email", detail?.email],
              ["Telepon", detail?.telepon],
              ["Mata Kuliah", detail?.mataKuliah.join(", ")],
              ["Status", detail?.status],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b pb-2">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="text-right font-medium">{v}</dd>
              </div>
            ))}
          </dl>
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
