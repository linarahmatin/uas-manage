import { useMemo, useState } from "react";

export function useTable<T>(
  rows: T[],
  match: (row: T, query: string) => boolean,
  pageSize = 6,
) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [extraFilter, setExtraFilter] = useState<(row: T) => boolean>(() => () => true);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => (q ? match(r, q) : true)).filter(extraFilter);
  }, [rows, query, match, extraFilter]);

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const current = Math.min(page, totalPages);
  const paged = filtered.slice((current - 1) * pageSize, current * pageSize);

  const search = (v: string) => {
    setQuery(v);
    setPage(1);
  };

  const filter = (fn: (row: T) => boolean) => {
    setExtraFilter(() => fn);
    setPage(1);
  };

  return {
    query,
    search,
    filter,
    paged,
    page: current,
    setPage,
    totalPages,
    total: filtered.length,
    pageSize,
    rowNo: (index: number) => (current - 1) * pageSize + index + 1,
  };
}
