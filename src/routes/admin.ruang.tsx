import { createFileRoute } from "@tanstack/react-router";
import { DoorOpen, Pencil, Plus, Trash2 } from "lucide-react";
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
import { ruangList, type Ruang } from "@/lib/mock-data";

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

function RuangPage() {
  const table = useTable<Ruang>(
    ruangList,
    (row, q) => row.nama.toLowerCase().includes(q) || row.gedung.toLowerCase().includes(q),
  );
  const [status, setStatus] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [deleting, setDeleting] = useState<Ruang | null>(null);

  const applyStatus = (v: string) => {
    setStatus(v);
    table.filter((row) => v === "all" || row.status === v);
  };

  return (
    <AppShell
      role="admin"
      breadcrumb={["Beranda", "Sarana", "Ruang Ujian"]}
      title="Ruang Ujian"
      description="Ketersediaan dan penggunaan ruang selama pekan UAS."
      actions={
        <Button size="sm" onClick={() => setFormOpen(true)}>
          <Plus className="mr-2 size-4" /> Tambah Ruang
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["Tersedia", ruangList.filter((r) => r.status === "Tersedia").length],
          ["Digunakan", ruangList.filter((r) => r.status === "Digunakan").length],
          ["Tidak tersedia", ruangList.filter((r) => r.status === "Tidak tersedia").length],
        ].map(([label, count]) => (
          <Card key={label as string} className="shadow-card">
            <CardContent className="flex items-center justify-between p-5">
              <div className="space-y-2">
                <StatusBadge status={label as string} />
                <p className="text-2xl font-bold">{count}</p>
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
            <EmptyState />
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
            <DialogTitle>Form Ruang Ujian</DialogTitle>
            <DialogDescription>Ruang digunakan saat penyusunan jadwal UAS.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Nama Ruang</Label>
              <Input placeholder="Lab TI 1" />
            </div>
            <div className="space-y-2">
              <Label>Gedung</Label>
              <Input placeholder="Gedung TI A" />
            </div>
            <div className="space-y-2">
              <Label>Lantai</Label>
              <Input placeholder="1" />
            </div>
            <div className="space-y-2">
              <Label>Kapasitas</Label>
              <Input placeholder="30" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFormOpen(false)}>
              Batal
            </Button>
            <Button
              onClick={() => {
                setFormOpen(false);
                toast.success("Data ruang disimpan.");
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
          toast.success("Ruang dihapus.");
          setDeleting(null);
        }}
      />
    </AppShell>
  );
}
