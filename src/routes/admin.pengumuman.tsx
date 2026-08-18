import { createFileRoute } from "@tanstack/react-router";
import { Megaphone, Pencil, Send, Trash2 } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { useTable } from "@/hooks/use-table";
import { pengumumanList, type Pengumuman } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/pengumuman")({
  head: () => ({
    meta: [
      { title: "Pengumuman UAS — Sistem Manajemen UAS TI" },
      {
        name: "description",
        content: "Buat, edit, dan publikasikan pengumuman resmi pelaksanaan UAS untuk dosen dan mahasiswa.",
      },
      { property: "og:title", content: "Pengumuman UAS — Sistem Manajemen UAS TI" },
      { property: "og:description", content: "Kanal informasi resmi panitia UAS Jurusan Teknologi Informasi." },
    ],
  }),
  component: PengumumanPage,
});

function PengumumanPage() {
  const table = useTable<Pengumuman>(
    pengumumanList,
    (row, q) => row.judul.toLowerCase().includes(q) || row.isi.toLowerCase().includes(q),
    5,
  );
  const [status, setStatus] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Pengumuman | null>(null);
  const [deleting, setDeleting] = useState<Pengumuman | null>(null);

  const applyStatus = (v: string) => {
    setStatus(v);
    table.filter((row) => v === "all" || row.status === v);
  };

  return (
    <AppShell
      role="admin"
      breadcrumb={["Beranda", "Informasi", "Pengumuman"]}
      title="Pengumuman UAS"
      description="Informasi resmi panitia untuk dosen dan mahasiswa peserta ujian."
      actions={
        <Button
          size="sm"
          onClick={() => {
            setEditing(null);
            setFormOpen(true);
          }}
        >
          <Megaphone className="mr-2 size-4" /> Buat Pengumuman
        </Button>
      }
    >
      <Card className="shadow-card">
        <CardContent className="p-0">
          <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center">
            <SearchInput value={table.query} onChange={table.search} placeholder="Cari pengumuman..." />
            <div className="sm:ml-auto">
              <FilterSelect
                label="Status"
                value={status}
                onChange={applyStatus}
                options={["Terbit", "Draft", "Arsip"]}
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
                    <TableHead>Judul</TableHead>
                    <TableHead className="min-w-64">Isi Pengumuman</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Pembuat</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {table.paged.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium">{row.judul}</TableCell>
                      <TableCell className="max-w-sm text-sm text-muted-foreground">
                        <span className="line-clamp-2">{row.isi}</span>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-sm">{row.tanggal}</TableCell>
                      <TableCell className="text-sm">{row.pembuat}</TableCell>
                      <TableCell>
                        <StatusBadge status={row.status} />
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            aria-label="Publikasikan"
                            onClick={() => toast.success(`“${row.judul}” dipublikasikan.`)}
                          >
                            <Send className="size-4" />
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
            <DialogTitle>{editing ? "Edit Pengumuman" : "Buat Pengumuman"}</DialogTitle>
            <DialogDescription>Pengumuman terbit akan tampil di dashboard dosen dan mahasiswa.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Judul</Label>
              <Input defaultValue={editing?.judul} placeholder="Judul pengumuman" />
            </div>
            <div className="space-y-2">
              <Label>Isi Pengumuman</Label>
              <Textarea rows={5} defaultValue={editing?.isi} placeholder="Tulis isi pengumuman..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFormOpen(false)}>
              Simpan Draft
            </Button>
            <Button
              onClick={() => {
                setFormOpen(false);
                toast.success("Pengumuman dipublikasikan.");
              }}
            >
              Publikasikan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDeleteDialog
        open={!!deleting}
        onOpenChange={(v) => !v && setDeleting(null)}
        itemName={deleting?.judul}
        onConfirm={() => {
          toast.success("Pengumuman dihapus.");
          setDeleting(null);
        }}
      />
    </AppShell>
  );
}
