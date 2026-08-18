import { AlertTriangle, Inbox, Loader2, Search, SlidersHorizontal } from "lucide-react";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { statusTone } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: string }) {
  return <Badge variant={statusTone[status] ?? "neutral"}>{status}</Badge>;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Cari data...",
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string | undefined;
}) {
  return (
    <div className={cn("relative w-full sm:max-w-xs", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-9"
        aria-label={placeholder}
      />
    </div>
  );
}

export function FilterSelect({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  label: string;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full sm:w-44">
        <SlidersHorizontal className="mr-2 size-3.5 text-muted-foreground" />
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Semua {label}</SelectItem>
        {options.map((o) => (
          <SelectItem key={o} value={o}>
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function Pagination({
  page,
  totalPages,
  total,
  onPage,
}: {
  page: number;
  totalPages: number;
  total: number;
  onPage: (p: number) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3">
      <p className="text-xs text-muted-foreground">
        Menampilkan halaman {Math.min(page, Math.max(totalPages, 1))} dari {Math.max(totalPages, 1)} · {total} data
      </p>
      <div className="flex items-center gap-1">
        <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => onPage(page - 1)}>
          Sebelumnya
        </Button>
        {Array.from({ length: Math.max(totalPages, 1) }).map((_, i) => (
          <Button
            key={i}
            size="sm"
            variant={page === i + 1 ? "default" : "outline"}
            className="w-9"
            onClick={() => onPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => onPage(page + 1)}
        >
          Berikutnya
        </Button>
      </div>
    </div>
  );
}

export function EmptyState({
  title = "Belum ada data",
  description = "Data yang kamu cari tidak ditemukan. Coba ubah kata kunci atau filter.",
  action,
}: {
  title?: string;
  description?: string;
  action?: ReactNode | undefined;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-14 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Inbox className="size-6" />
      </div>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="mx-auto mt-1 max-w-sm text-xs text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function LoadingState({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-3 p-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" /> Memuat data...
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-full" />
      ))}
    </div>
  );
}

export function ErrorState({ onRetry }: { onRetry?: (() => void) | undefined }) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle className="size-6" />
      </div>
      <div>
        <p className="text-sm font-semibold">Gagal memuat data</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Terjadi kesalahan pada server. Silakan coba beberapa saat lagi.
        </p>
      </div>
      {onRetry && (
        <Button size="sm" variant="outline" onClick={onRetry}>
          Coba Lagi
        </Button>
      )}
    </div>
  );
}

export function ConfirmDeleteDialog({
  open,
  onOpenChange,
  itemName,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  itemName?: string | undefined;
  onConfirm: () => void;
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus data ini?</AlertDialogTitle>
          <AlertDialogDescription>
            {itemName ? `“${itemName}” ` : "Data ini "}
            akan dihapus permanen dari sistem UAS dan tidak dapat dikembalikan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Ya, Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
