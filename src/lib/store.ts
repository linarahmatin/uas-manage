
import { useCallback, useState, useSyncExternalStore } from "react";

import {
  dosenList,
  jadwalList,
  mahasiswaList,
  mataKuliah,
  pengawasList,
  pengumumanList,
  ruangList,
  soalList,
  type Dosen,
  type Jadwal,
  type Mahasiswa,
  type MataKuliah,
  type Pengawas,
  type Pengumuman,
  type Ruang,
  type Soal,
} from "./mock-data";

export type Collection<T> = {
  subscribe: (listener: () => void) => () => void;
  get: () => T[];
  id: (row: T) => string;
  add: (row: T) => void;
  update: (id: string, row: T) => void;
  remove: (id: string) => void;
  nextId: (prefix: string) => string;
};

function createCollection<T>(
  initial: T[],
  id: (row: T) => string,
  storageKey: string,
): Collection<T> {
  let rows: T[] = [...initial];
  let hydrated = false;
  const listeners = new Set<() => void>();

  const emit = () => listeners.forEach((listener) => listener());

  // Simpan perubahan ke browser.
  const persist = () => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(storageKey, JSON.stringify(rows));
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
    }
  };

  // Muat data tersimpan setelah aplikasi berjalan di browser.
  const hydrate = () => {
    if (typeof window === "undefined" || hydrated) return;

    hydrated = true;

    try {
      const saved = window.localStorage.getItem(storageKey);

      if (saved !== null) {
        const parsed: unknown = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          rows = parsed as T[];
        }
      }
    } catch (error) {
      console.error("Gagal membaca data tersimpan:", error);
    }
  };

  return {
    subscribe(listener) {
      listeners.add(listener);

      if (!hydrated && typeof window !== "undefined") {
        hydrate();
        emit();
      }

      return () => listeners.delete(listener);
    },

    get: () => rows,
    id,

    add(row) {
      rows = [row, ...rows];
      persist();
      emit();
    },

    update(rowId, row) {
      rows = rows.map((item) => (id(item) === rowId ? row : item));
      persist();
      emit();
    },

    remove(rowId) {
      rows = rows.filter((item) => id(item) !== rowId);
      persist();
      emit();
    },

    nextId(prefix) {
      const n = rows.length + 1;
      return `${prefix}-${String(n).padStart(2, "0")}-${Math.random().toString(36).slice(2, 5)}`;
    },
  };
}

export const mataKuliahStore = createCollection<MataKuliah>(
  mataKuliah,
  (r) => r.kode + r.kelas,
  "uas-mata-kuliah",
);

export const dosenStore = createCollection<Dosen>(
  dosenList,
  (r) => r.nip,
  "uas-dosen",
);

export const mahasiswaStore = createCollection<Mahasiswa>(
  mahasiswaList,
  (r) => r.nim,
  "uas-mahasiswa",
);

export const soalStore = createCollection<Soal>(
  soalList,
  (r) => r.id,
  "uas-soal",
);

export const jadwalStore = createCollection<Jadwal>(
  jadwalList,
  (r) => r.id,
  "uas-jadwal",
);

export const ruangStore = createCollection<Ruang>(
  ruangList,
  (r) => r.nama,
  "uas-ruang",
);

export const pengawasStore = createCollection<Pengawas>(
  pengawasList,
  (r) => r.id,
  "uas-pengawas",
);

export const pengumumanStore = createCollection<Pengumuman>(
  pengumumanList,
  (r) => r.id,
  "uas-pengumuman",
);

export function useCollection<T>(store: Collection<T>): T[] {
  return useSyncExternalStore(
    store.subscribe,
    store.get,
    store.get,
  );
}

export function useCrud<T extends object>(
  store: Collection<T>,
  emptyForm: T,
) {
  const rows = useCollection(store);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<T>(emptyForm);
  const [deleting, setDeleting] = useState<T | null>(null);

  const openCreate = useCallback(() => {
    setEditingId(null);
    setForm(emptyForm);
    setOpen(true);
  }, [emptyForm]);

  const openEdit = useCallback(
    (row: T) => {
      setEditingId(store.id(row));
      setForm({ ...row });
      setOpen(true);
    },
    [store],
  );

  const set = useCallback(
    <K extends keyof T>(key: K, value: T[K]) => {
      setForm((current) => ({ ...current, [key]: value }));
    },
    [],
  );

  const save = useCallback(
    (row?: T) => {
      const next = row ?? form;

      if (editingId) {
        store.update(editingId, next);
      } else {
        store.add(next);
      }

      setOpen(false);
      setEditingId(null);

      return !!editingId;
    },
    [editingId, form, store],
  );

  const confirmDelete = useCallback(() => {
    if (deleting) store.remove(store.id(deleting));
    setDeleting(null);
  }, [deleting, store]);

  return {
    rows,
    open,
    setOpen,
    isEditing: !!editingId,
    form,
    set,
    setForm,
    openCreate,
    openEdit,
    save,
    deleting,
    setDeleting,
    confirmDelete,
  };
}

export function todayLabel() {
  return new Date().toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
