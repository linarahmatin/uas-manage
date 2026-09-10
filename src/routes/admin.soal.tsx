import { createFileRoute } from "@tanstack/react-router";
import { Download, FileUp, Pencil, Plus, Trash2, Upload } from "lucide-react";
import { useMemo, useState } from "react";
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
import type { Soal } from "@/lib/mock-data";
import { dosenStore, mataKuliahStore, soalStore, useCollection, useCrud } from "@/lib/store";

export const Route = createFileRoute("/admin/soal")({
  head: () => ({
    meta: [
      { title: "Soal Ujian — Sistem Manajemen UAS TI" },
      {
        name: "description",
        content:
          "Kelola pengumpulan soal UAS: unggah berkas, unduh, ubah, dan hapus data soal beserta status verifikasinya.",
      },
      { property: "og:title", content: "Soal Ujian — Sistem Manajemen UAS TI" },
      { property: "og:description", content: "Pengelolaan berkas dan status soal ujian akhir semester." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SoalPage,
});

const statusOptions: Soal["status"][] = [
  "Belum Diinput",
  "Draft",
  "Sudah Dikumpulkan",
  "Diverifikasi",
  "Revisi",
];
const bentukOptions: Soal["bentukSoal"][] = ["Pilihan Ganda", "Esai", "Studi Kasus", "Praktik"];
const jenisOptions = ["Tulis", "Praktikum", "Online", "Take Home"];

const emptyForm: Soal = {
  id: "",
  mataKuliah: "",
  dosen: "",
  jenisUjian: "Tulis",
  bentukSoal: "Esai",
  jumlahSoal: 0,
  status: "Belum Diinput",
  tanggal: "—",
  file: null,
};

function tanggalHariIni() {
  return new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

function unduhBerkas(row: Soal) {
  if (!row.file) {
    toast.error("Berkas soal belum diunggah.");
    return;
  }
  const isi = [
    `Berkas Soal UAS`,
    `Mata Kuliah : ${row.mataKuliah}`,
    `Dosen       : ${row.dosen}`,
    `Jenis Ujian : ${row.jenisUjian}`,
    `Bentuk Soal : ${row.bentukSoal}`,
    `Jumlah Soal : ${row.jumlahSoal}`,
    `Status      : ${row.status}`,
    `Dikumpulkan : ${row.tanggal}`,
  ].join("\n");
  const url = URL.createObjectURL(new Blob([isi], { type: "text/plain;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = row.file.replace(/\.(pdf|docx)$/i, "") + ".txt";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  toast.success(`Mengunduh ${row.file}`);
}

function SoalPage() {
  const crud = useCrud<Soal>(soalStore, emptyForm);
  const mkRows = useCollection(mataKuliahStore);
  const dosenRows = useCollection(dosenStore);
  const [status, setStatus] = useState("all");
  const [catatan, setCatatan] = useState("");

  const table = useTable<Soal>(
    crud.rows,
    (row, q) =>
      row.mataKuliah.toLowerCase().includes(q) ||
      row.dosen.toLowerCase().includes(q) ||
      row.jenisUjian.toLowerCase().includes(q),
    8,
  );

  const ringkasan = useMemo(
    () => statusOptions.map((s) => [s, crud.rows.filter((r) => r.status === s).length] as const),
    [crud.rows],
  );

  const applyStatus = (v: string) => {
    setStatus(v);
    table.filter((row) => v === "all" || row.status === v);
  };

  const submit = () => {
    if (!crud.form.mataKuliah.trim() || !crud.form.dosen.trim()) {
      toast.error("Mata kuliah dan dosen pengampu wajib diisi.");
      return;
    }
    const row: Soal = {
      ...crud.form,
      id: crud.form.id || soalStore.nextId("SL"),
      jumlahSoal: Number(crud.form.jumlahSoal) || 0,
    };
    const isEdit = crud.save(row);
    setCatatan("");
    toast.success(isEdit ? "Data soal diperbarui." : "Data soal ditambahkan.");
  };

  return (
    <AppShell
      role="admin"
      breadcrumb={["Beranda", "Manajemen UAS", "Soal Ujian"]}
      title="Data Soal Ujian"
      description="Rekap pengumpulan dan verifikasi soal UAS dari setiap dosen pengampu."
      actions={
        <Button size="sm" onClick={crud.openCreate}>
          <Upload className="mr-2 size-4" /> Upload Soal
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {ringkasan.map(([label, count]) => (
          <Card key={label} className="shadow-card">
            <CardContent className="space-y-2 p-4">
              <StatusBadge status={label} />
              <p className="text-2xl font-bold">{count}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-card">
        <CardContent className="p-0">
          <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center">
            <SearchInput
              value={table.query}
              onChange={table.search}
              placeholder="Cari mata kuliah atau dosen..."
            />
            <div className="sm:ml-auto">
              <FilterSelect label="Status" value={status} onChange={applyStatus} options={statusOptions} />
            </div>
          </div>

          {table.paged.length === 0 ? (
            <EmptyState
              action={
                <Button size="sm" onClick={crud.openCreate}>
                  <Plus className="mr-2 size-4" /> Upload Soal
                </Button>
              }
            />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-14">No</TableHead>
                    <TableHead>Mata Kuliah</TableHead>
                    <TableHead>Dosen Pengampu</TableHead>
                    <TableHead>Jenis Ujian</TableHead>
                    <TableHead>Bentuk Soal</TableHead>
                    <TableHead>Jumlah</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Berkas</TableHead>
                    <TableHead>Tgl. Pengumpulan</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {table.paged.map((row, i) => (
                    <TableRow key={row.id}>
                      <TableCell className="text-sm text-muted-foreground">{table.rowNo(i)}</TableCell>
                      <TableCell className="font-medium">{row.mataKuliah}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{row.dosen}</TableCell>
                      <TableCell className="text-sm">{row.jenisUjian}</TableCell>
                      <TableCell className="text-sm">{row.bentukSoal}</TableCell>
                      <TableCell>{row.jumlahSoal}</TableCell>
                      <TableCell>
                        <StatusBadge status={row.status} />
                      </TableCell>
                      <TableCell className="max-w-40 truncate text-xs text-muted-foreground">
                        {row.file ?? "Belum ada berkas"}
                      </TableCell>
                      <TableCell className="text-sm">{row.tanggal}</TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            aria-label="Upload"
                            onClick={() => crud.openEdit(row)}
                          >
                            <FileUp className="size-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            aria-label="Download"
                            onClick={() => unduhBerkas(row)}
                          >
                            <Download className="size-4" />
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
            <DialogTitle>{crud.isEditing ? "Ubah Data Soal" : "Upload Soal UAS"}</DialogTitle>
            <DialogDescription>
              Lengkapi data soal UAS dan unggah berkasnya bila sudah tersedia.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[65vh] space-y-4 overflow-y-auto pr-1">
            <div className="space-y-2">
              <Label>Mata Kuliah</Label>
              <Select
                value={crud.form.mataKuliah}
                onValueChange={(v) => crud.set("mataKuliah", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih mata kuliah" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from(new Set(mkRows.map((m) => m.nama))).map((n) => (
                    <SelectItem key={n} value={n}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Dosen Pengampu</Label>
              <Select value={crud.form.dosen} onValueChange={(v) => crud.set("dosen", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih dosen" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from(new Set(dosenRows.map((d) => d.nama))).map((n) => (
                    <SelectItem key={n} value={n}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Jenis Ujian</Label>
                <Select value={crud.form.jenisUjian} onValueChange={(v) => crud.set("jenisUjian", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {jenisOptions.map((o) => (
                      <SelectItem key={o} value={o}>
                        {o}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Bentuk Soal</Label>
                <Select
                  value={crud.form.bentukSoal}
                  onValueChange={(v) => crud.set("bentukSoal", v as Soal["bentukSoal"])}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {bentukOptions.map((o) => (
                      <SelectItem key={o} value={o}>
                        {o}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Jumlah Soal</Label>
                <Input
                  type="number"
                  min={0}
                  value={crud.form.jumlahSoal}
                  onChange={(e) => crud.set("jumlahSoal", Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={crud.form.status}
                  onValueChange={(v) => crud.set("status", v as Soal["status"])}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((o) => (
                      <SelectItem key={o} value={o}>
                        {o}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Berkas Soal (PDF / DOCX)</Label>
              <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed px-4 py-8 text-center transition-colors hover:border-primary/50 hover:bg-accent/40">
                <Upload className="size-5 text-primary" />
                <span className="text-sm font-medium">
                  {crud.form.file ?? "Klik untuk memilih berkas"}
                </span>
                <span className="text-xs text-muted-foreground">Maksimal 10 MB</span>
                <input
                  type="file"
                  accept=".pdf,.docx,.doc"
                  className="sr-only"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;
                    crud.setForm((prev) => ({
                      ...prev,
                      file: f.name,
                      tanggal: tanggalHariIni(),
                      status: prev.status === "Belum Diinput" ? "Sudah Dikumpulkan" : prev.status,
                    }));
                    toast.success(`${f.name} siap disimpan.`);
                  }}
                />
              </label>
              {crud.form.file && (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => crud.setForm((prev) => ({ ...prev, file: null, tanggal: "—" }))}
                >
                  Hapus Berkas
                </Button>
              )}
            </div>
            <div className="space-y-2">
              <Label>Catatan untuk Panitia</Label>
              <Textarea
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                placeholder="Contoh: soal disertai lembar jawaban terpisah."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => crud.setOpen(false)}>
              Batal
            </Button>
            <Button onClick={submit}>Simpan Soal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDeleteDialog
        open={!!crud.deleting}
        onOpenChange={(v) => !v && crud.setDeleting(null)}
        itemName={crud.deleting?.mataKuliah}
        onConfirm={() => {
          crud.confirmDelete();
          toast.success("Data soal dihapus.");
        }}
      />
    </AppShell>
  );
}
