import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Trash2, UserPlus } from "lucide-react";
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
import { dosenList, pengawasList, ruangList, type Pengawas } from "@/lib/mock-data";

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

function PengawasPage() {
  const table = useTable<Pengawas>(
    pengawasList,
    (row, q) =>
      row.nama.toLowerCase().includes(q) ||
      row.mataKuliah.toLowerCase().includes(q) ||
      row.ruang.toLowerCase().includes(q),
  );
  const [status, setStatus] = useState("all");
  const [assignOpen, setAssignOpen] = useState(false);
  const [editing, setEditing] = useState<Pengawas | null>(null);
  const [deleting, setDeleting] = useState<Pengawas | null>(null);

  const applyStatus = (v: string) => {
    setStatus(v);
    table.filter((row) => v === "all" || row.status === v);
  };

  return (
    <AppShell
      role="admin"
      breadcrumb={["Beranda", "Ujian", "Dosen Pengawas"]}
      title="Dosen Pengawas"
      description="Penugasan pengawas untuk setiap sesi ujian akhir semester."
      actions={
        <Button
          size="sm"
          onClick={() => {
            setEditing(null);
            setAssignOpen(true);
          }}
        >
          <UserPlus className="mr-2 size-4" /> Assign Pengawas
        </Button>
      }
    >
      <Card className="shadow-card">
        <CardContent className="p-0">
          <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center">
            <SearchInput value={table.query} onChange={table.search} placeholder="Cari dosen, ruang, mata kuliah..." />
            <div className="flex flex-col gap-3 sm:ml-auto sm:flex-row">
              <Input type="date" className="w-full sm:w-40" aria-label="Filter tanggal" />
              <FilterSelect
                label="Status"
                value={status}
                onChange={applyStatus}
                options={["Ditugaskan", "Menunggu", "Dibatalkan"]}
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
                          <Button
                            size="icon"
                            variant="ghost"
                            aria-label="Edit"
                            onClick={() => {
                              setEditing(row);
                              setAssignOpen(true);
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

      <Dialog open={assignOpen} onOpenChange={setAssignOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Penugasan" : "Assign Dosen Pengawas"}</DialogTitle>
            <DialogDescription>Satu dosen tidak boleh mengawas dua ruang pada jam yang sama.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label>Dosen</Label>
              <Select defaultValue={editing?.nama ?? dosenList[0]!.nama}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dosenList.map((d) => (
                    <SelectItem key={d.nip} value={d.nama}>
                      {d.nama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tanggal</Label>
              <Input type="date" defaultValue="2026-08-24" />
            </div>
            <div className="space-y-2">
              <Label>Jam</Label>
              <Input defaultValue={editing?.jam} placeholder="08.00 - 09.40" />
            </div>
            <div className="space-y-2">
              <Label>Ruang</Label>
              <Select defaultValue={editing?.ruang ?? ruangList[0]!.nama}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ruangList.map((r) => (
                    <SelectItem key={r.nama} value={r.nama}>
                      {r.nama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Kelas</Label>
              <Input defaultValue={editing?.kelas} placeholder="TI-6A" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignOpen(false)}>
              Batal
            </Button>
            <Button
              onClick={() => {
                setAssignOpen(false);
                toast.success(editing ? "Penugasan diperbarui." : "Pengawas berhasil ditugaskan.");
              }}
            >
              Simpan Penugasan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDeleteDialog
        open={!!deleting}
        onOpenChange={(v) => !v && setDeleting(null)}
        itemName={deleting?.nama}
        onConfirm={() => {
          toast.success("Penugasan dihapus.");
          setDeleting(null);
        }}
      />
    </AppShell>
  );
}
