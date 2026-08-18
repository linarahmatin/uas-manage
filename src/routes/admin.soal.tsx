import { createFileRoute } from "@tanstack/react-router";
import { Download, FileUp, Pencil, Trash2, Upload } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { useTable } from "@/hooks/use-table";
import { soalList, type Soal } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/soal")({
  head: () => ({
    meta: [
      { title: "Soal Ujian — Sistem Manajemen UAS TI" },
      {
        name: "description",
        content: "Pantau dan verifikasi pengumpulan soal UAS: bentuk soal, jumlah soal, status, dan berkas soal.",
      },
      { property: "og:title", content: "Soal Ujian — Sistem Manajemen UAS TI" },
      { property: "og:description", content: "Pengelolaan berkas dan status soal ujian akhir semester." },
    ],
  }),
  component: SoalPage,
});

function SoalPage() {
  const table = useTable<Soal>(
    soalList,
    (row, q) => row.mataKuliah.toLowerCase().includes(q) || row.dosen.toLowerCase().includes(q),
  );
  const [status, setStatus] = useState("all");
  const [uploadFor, setUploadFor] = useState<Soal | null>(null);
  const [deleting, setDeleting] = useState<Soal | null>(null);

  const applyStatus = (v: string) => {
    setStatus(v);
    table.filter((row) => v === "all" || row.status === v);
  };

  return (
    <AppShell
      role="admin"
      breadcrumb={["Beranda", "Ujian", "Soal Ujian"]}
      title="Data Soal Ujian"
      description="Rekap pengumpulan dan verifikasi soal UAS dari setiap dosen pengampu."
      actions={
        <Button size="sm" onClick={() => setUploadFor(soalList[0]!)}>
          <Upload className="mr-2 size-4" /> Upload Soal
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[
          ["Belum Diinput", 2],
          ["Draft", 2],
          ["Sudah Dikumpulkan", 2],
          ["Diverifikasi", 3],
          ["Revisi", 1],
        ].map(([label, count]) => (
          <Card key={label as string} className="shadow-card">
            <CardContent className="space-y-2 p-4">
              <StatusBadge status={label as string} />
              <p className="text-2xl font-bold">{count}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-card">
        <CardContent className="p-0">
          <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center">
            <SearchInput value={table.query} onChange={table.search} placeholder="Cari mata kuliah atau dosen..." />
            <div className="sm:ml-auto">
              <FilterSelect
                label="Status"
                value={status}
                onChange={applyStatus}
                options={["Belum Diinput", "Draft", "Sudah Dikumpulkan", "Diverifikasi", "Revisi"]}
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
                    <TableHead>Mata Kuliah</TableHead>
                    <TableHead>Dosen Pengampu</TableHead>
                    <TableHead>Jenis Ujian</TableHead>
                    <TableHead>Bentuk Soal</TableHead>
                    <TableHead>Jumlah</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tgl. Pengumpulan</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {table.paged.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium">{row.mataKuliah}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{row.dosen}</TableCell>
                      <TableCell className="text-sm">{row.jenisUjian}</TableCell>
                      <TableCell className="text-sm">{row.bentukSoal}</TableCell>
                      <TableCell>{row.jumlahSoal}</TableCell>
                      <TableCell>
                        <StatusBadge status={row.status} />
                      </TableCell>
                      <TableCell className="text-sm">{row.tanggal}</TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1">
                          <Button size="icon" variant="ghost" aria-label="Upload" onClick={() => setUploadFor(row)}>
                            <FileUp className="size-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            aria-label="Download"
                            disabled={!row.file}
                            onClick={() => toast.success(`Mengunduh ${row.file}`)}
                          >
                            <Download className="size-4" />
                          </Button>
                          <Button size="icon" variant="ghost" aria-label="Edit" onClick={() => setUploadFor(row)}>
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

      <Dialog open={!!uploadFor} onOpenChange={(v) => !v && setUploadFor(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Upload Soal UAS</DialogTitle>
            <DialogDescription>
              Unggah berkas soal untuk {uploadFor?.mataKuliah} ({uploadFor?.jenisUjian}).
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Bentuk Soal</Label>
              <Select defaultValue={uploadFor?.bentukSoal ?? "Esai"}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["Pilihan Ganda", "Esai", "Studi Kasus", "Praktik"].map((o) => (
                    <SelectItem key={o} value={o}>
                      {o}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Jumlah Soal</Label>
              <Input defaultValue={uploadFor?.jumlahSoal} />
            </div>
            <div className="space-y-2">
              <Label>Berkas Soal (PDF / DOCX)</Label>
              <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed px-4 py-8 text-center transition-colors hover:border-primary/50 hover:bg-accent/40">
                <Upload className="size-5 text-primary" />
                <span className="text-sm font-medium">Klik untuk memilih berkas</span>
                <span className="text-xs text-muted-foreground">Maksimal 10 MB</span>
                <input type="file" className="sr-only" onChange={() => toast.success("Berkas siap diunggah.")} />
              </label>
            </div>
            <div className="space-y-2">
              <Label>Catatan untuk Panitia</Label>
              <Textarea placeholder="Contoh: soal disertai lembar jawaban terpisah." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadFor(null)}>
              Batal
            </Button>
            <Button
              onClick={() => {
                setUploadFor(null);
                toast.success("Soal berhasil disimpan.");
              }}
            >
              Simpan Soal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDeleteDialog
        open={!!deleting}
        onOpenChange={(v) => !v && setDeleting(null)}
        itemName={deleting?.mataKuliah}
        onConfirm={() => {
          toast.success("Data soal dihapus.");
          setDeleting(null);
        }}
      />
    </AppShell>
  );
}
