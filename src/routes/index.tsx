import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { GraduationCap, Lock, Mail, ShieldCheck, UserRound, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Login — Sistem Manajemen UAS Teknologi Informasi" },
      {
        name: "description",
        content:
          "Masuk ke Sistem Manajemen Ujian Akhir Semester Jurusan Teknologi Informasi untuk mengelola jadwal, soal, ruang, dan pengawas UAS.",
      },
      { property: "og:title", content: "Login — Sistem Manajemen UAS Teknologi Informasi" },
      {
        property: "og:description",
        content: "Portal panitia, dosen, dan mahasiswa untuk pelaksanaan UAS Jurusan Teknologi Informasi.",
      },
    ],
  }),
  component: LoginPage,
});

const roles = [
  { value: "admin", label: "Admin / Panitia UAS", icon: ShieldCheck, path: "/admin" },
] as const;

function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<string>("admin");
  const [identity, setIdentity] = useState("admin@ti.ac.id");
  const [password, setPassword] = useState("uas2026");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identity || !password) {
      toast.error("Email/NIM dan password wajib diisi.");
      return;
    }
    setLoading(true);
    const target = roles.find((r) => r.value === role)!;
    setTimeout(() => {
      setLoading(false);
      toast.success(`Berhasil masuk sebagai ${target.label}`);
      navigate({ to: target.path });
    }, 700);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.1fr_1fr]">
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-brand-gradient p-12 text-primary-foreground lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-white/15">
            <GraduationCap className="size-6" />
          </div>
          <div>
            <p className="text-sm font-bold">Jurusan Teknologi Informasi</p>
            <p className="text-xs text-primary-foreground/75">Politeknik Negeri</p>
          </div>
        </div>

        <div>
          <p className="text-eyebrow text-primary-foreground/70">Semester Ganjil 2026/2027</p>
          <h2 className="mt-3 max-w-md text-4xl font-bold leading-tight">
            Kelola pelaksanaan Ujian Akhir Semester dalam satu portal.
          </h2>
          <p className="mt-4 max-w-md text-sm text-primary-foreground/80">
            Pendataan mata kuliah, soal ujian, jadwal, ruang, hingga penugasan dosen pengawas —
            terpusat, rapi, dan mudah dipantau panitia.
          </p>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
            {[
              { k: "Mata Kuliah", v: "12" },
              { k: "Jadwal UAS", v: "32" },
              { k: "Ruang Ujian", v: "9" },
            ].map((s) => (
              <div key={s.k} className="rounded-xl bg-white/10 px-4 py-3">
                <dt className="text-[11px] text-primary-foreground/75">{s.k}</dt>
                <dd className="text-2xl font-bold">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <p className="text-xs text-primary-foreground/65">
          © 2026 Panitia UAS Jurusan Teknologi Informasi
        </p>
      </aside>

      <main className="flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <GraduationCap className="size-6" />
            </div>
            <h1 className="mt-4 text-2xl font-bold tracking-tight">Sistem Manajemen UAS</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Jurusan Teknologi Informasi · Masuk untuk melanjutkan
            </p>
          </div>

          <form onSubmit={submit} className="space-y-4 rounded-2xl border bg-card p-6 shadow-card">
            <div className="space-y-2">
              <Label htmlFor="role">Masuk sebagai</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger id="role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="identity">Email / NIM</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="identity"
                  value={identity}
                  onChange={(e) => setIdentity(e.target.value)}
                  placeholder="nama@ti.ac.id atau 2211081001"
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-9"
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Memproses..." : "Masuk"}
            </Button>

            <div className="text-center">
              <button type="button" className="text-xs font-medium text-primary hover:underline">
                Lupa Password?
              </button>
            </div>
          </form>

          <div className="mt-6 grid grid-cols-3 gap-2">
            {roles.map((r) => (
              <Link
                key={r.value}
                to={r.path}
                className="flex flex-col items-center gap-1.5 rounded-xl border bg-card px-2 py-3 text-center text-[11px] font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <r.icon className="size-4" />
                {r.label.split(" / ")[0]}
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
