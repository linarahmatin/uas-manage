import { createFileRoute } from "@tanstack/react-router";
import { Megaphone, Pencil, Plus, Send, Trash2 } from "lucide-react";
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
import type { Pengumuman } from "@/lib/mock-data";
import { pengumumanStore, todayLabel, useCrud } from "@/lib/store";

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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PengumumanPage,
});

const emptyForm: Pengumuman = {
  id: "",
  judul: "",
  isi: "",
  tanggal: "",
  pembuat: "Panitia UAS",
  status: "Draft",
};

function PengumumanPage() {
  const crud = useCrud<Pengumuman>(pengumumanStore, emptyForm);
  const [status, setStatus] = useState("all");

  const table = useTable<Pengumuman>(
    crud.rows,
    (row, q) => row.judul.toLowerCase().includes(q) || row.isi.toLowerCase().includes(q),
    5,
  );

  const applyStatus = (v: string) => {
    setStatus(v);
    table.filter((row) => v === "all" || row.status === v);
  };

  const simpan = (statusBaru: Pengumuman["status"]) => {
    if (!crud.form.judul.trim() || !crud.form.isi.trim()) {
      toast.error("Judul dan isi pengumuman wajib diisi.");
      return;
    }
    const row: Pengumuman = {
      ...crud.form,
      id: crud.form.id || pengumumanStore.nextId("AN"),
      tanggal: crud.form.tanggal || todayLabel(),
      status: statusBaru,
    };
    const isEdit = crud.save(row);
    toast.success(
      statusBaru === "Terbit"
        ? "Pengumuman dipublikasikan."
        : isEdit
          ? "Perubahan disimpan sebagai draft."
          : "Pengumuman disimpan sebagai draft.",
    );
  };

  const publikasikanLangsung = (row: Pengumuman) => {
    if (row.status === "Terbit") {
      pengumumanStore.update(row.id, { ...row, status: "Arsip" });
      toast.success(`“${row.judul}” diarsipkan.`);
      return;
    }
    pengumumanStore.update(row.id, { ...row, status: "Terbit", tanggal: row.tanggal || todayLabel() });
    toast.success(`“${row.judul}” dipublikasikan.`);
  };

  return (
    <AppShell
      role="admin"
      breadcrumb={["Beranda", "Informasi", "Pengumuman"]}
      title="Pengumuman UAS"
      description="Informasi resmi panitia untuk dosen dan mahasiswa peserta ujian."
      actions={
        <Button size="sm" onClick={crud.openCreate}>
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
            <EmptyState
              action={
                <Button size="sm" onClick={crud.openCreate}>
                  <Plus className="mr-2 size-4" /> Buat Pengumuman
                </Button>
              }
            />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12 text-center">No</TableHead>
                    <TableHead>Judul</TableHead>
                    <TableHead className="min-w-64">Isi Pengumuman</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Pembuat</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {table.paged.map((row, i) => (
                    <TableRow key={row.id}>
                      <TableCell className="text-center text-sm text-muted-foreground">
                        {table.rowNo(i)}
                      </TableCell>
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
                            aria-label={row.status === "Terbit" ? "Arsipkan" : "Publikasikan"}
                            onClick={() => publikasikanLangsung(row)}
                          >
                            <Send className="size-4" />
                          </Button>
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

          <Pagination
            page={table.page}
            totalPages={table.totalPages}
            total={table.total}
            onPage={table.setPage}
          />
        </CardContent>
      </Card>

      <Dialog open={crud.open} onOpenChange={crud.setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{crud.isEditing ? "Edit Pengumuman" : "Buat Pengumuman"}</DialogTitle>
            <DialogDescription>
              Pengumuman berstatus Terbit akan tampil sebagai informasi resmi panitia.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Judul</Label>
              <Input
                value={crud.form.judul}
                onChange={(e) => crud.set("judul", e.target.value)}
                placeholder="Judul pengumuman"
              />
            </div>
            <div className="space-y-2">
              <Label>Isi Pengumuman</Label>
              <Textarea
                rows={5}
                value={crud.form.isi}
                onChange={(e) => crud.set("isi", e.target.value)}
                placeholder="Tulis isi pengumuman..."
              />
            </div>
            <div className="space-y-2">
              <Label>Pembuat</Label>
              <Input
                value={crud.form.pembuat}
                onChange={(e) => crud.set("pembuat", e.target.value)}
                placeholder="Nama pembuat"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => simpan("Draft")}>
              Simpan Draft
            </Button>
            <Button onClick={() => simpan("Terbit")}>Publikasikan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDeleteDialog
        open={!!crud.deleting}
        onOpenChange={(v) => !v && crud.setDeleting(null)}
        itemName={crud.deleting?.judul}
        onConfirm={() => {
          crud.confirmDelete();
          toast.success("Pengumuman dihapus.");
        }}
      />
    </AppShell>
  );
}
