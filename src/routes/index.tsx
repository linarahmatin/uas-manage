
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  GraduationCap,
  Lock,
  Mail,
  ShieldCheck,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";
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
          "Portal Sistem Manajemen Ujian Akhir Semester Jurusan Teknologi Informasi.",
      },
    ],
  }),
  component: LoginPage,
});

const roles = [
  {
    value: "admin",
    label: "Admin / Panitia UAS",
    icon: ShieldCheck,
    path: "/admin",
  },
] as const;

function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<string>("admin");
  const [identity, setIdentity] = useState("admin@ti.ac.id");
  const [password, setPassword] = useState("uas2026");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!identity.trim() || !password) {
      toast.error("Email/NIM dan password wajib diisi.");
      return;
    }

    const target = roles.find((r) => r.value === role);

    if (!target) {
      toast.error("Role pengguna tidak valid.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success(`Berhasil masuk sebagai ${target.label}`);
      navigate({ to: target.path });
    }, 700);
  };

  return (
    <main className="grid min-h-screen bg-[#F5F9FE] lg:grid-cols-[1.08fr_0.92fr]">
      {/* PANEL KIRI DENGAN BACKGROUND KAMPUS */}
      <aside
        className="relative flex min-h-[440px] flex-col justify-between overflow-hidden bg-[#064C99] bg-cover bg-center px-7 py-9 text-white sm:px-12 sm:py-12 lg:min-h-screen lg:px-14 lg:py-10"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(3, 45, 100, 0.92), rgba(0, 100, 185, 0.82), rgba(0, 153, 190, 0.72)), url('/kampus.jpg')",
        }}
      >
        {/* Dekorasi tambahan */}
        <div className="pointer-events-none absolute -right-28 -top-36 size-[360px] rounded-full border-[65px] border-white/[0.08]" />
        <div className="pointer-events-none absolute -bottom-36 -left-28 size-[350px] rounded-full bg-white/[0.06]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#033A80]/50 to-transparent" />

        {/* Identitas kampus */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/15 shadow-lg backdrop-blur-sm">
            <GraduationCap className="size-7" />
          </div>

          <div>
            <p className="text-sm font-bold tracking-tight sm:text-base">
              Jurusan Teknologi Informasi
            </p>
            <p className="mt-0.5 text-xs text-white/80 sm:text-sm">
              Politeknik Negeri
            </p>
          </div>
        </div>

        {/* Informasi aplikasi */}
        <div className="relative z-10 my-12 max-w-2xl lg:my-0 lg:-translate-y-3">
          <div className="mb-5 flex items-center gap-2">
            <span className="h-1 w-7 rounded-full bg-cyan-300" />

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100 sm:text-sm">
              Semester Ganjil 2026/2027
            </p>
          </div>

          <h1 className="max-w-xl text-3xl font-bold leading-[1.2] tracking-tight sm:text-4xl lg:text-[46px]">
            Kelola pelaksanaan Ujian Akhir Semester dalam satu portal.
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-7 text-blue-50/95 sm:text-base">
            Pendataan mata kuliah, soal ujian, jadwal, ruang, hingga penugasan
            dosen pengawas — terpusat, rapi, dan mudah dipantau panitia.
          </p>

          <div className="mt-8 flex items-center gap-3 text-sm text-white/95">
            <CheckCircle2 className="size-5 shrink-0 text-cyan-200" />
            <span>Satu portal untuk pengelolaan UAS yang lebih teratur.</span>
          </div>

          <div className="mt-3 flex items-center gap-3 text-sm text-white/95">
            <CheckCircle2 className="size-5 shrink-0 text-cyan-200" />
            <span>Informasi akademik terpusat dan mudah dipantau.</span>
          </div>

          <div className="mt-9 h-px max-w-md bg-gradient-to-r from-white/50 to-transparent" />
        </div>

        {/* Footer panel kiri */}
        <p className="relative z-10 text-xs text-white/80 sm:text-sm">
          © 2026 Panitia UAS Jurusan Teknologi Informasi
        </p>
      </aside>

      {/* PANEL KANAN */}
      <section className="relative flex min-h-[600px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#F0F7FD] via-white to-[#F4F9FF] px-5 py-12 sm:px-10 lg:min-h-screen lg:px-12">
        {/* Dekorasi background */}
        <div className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-[#D9EDFF]/60" />
        <div className="pointer-events-none absolute -bottom-28 -left-24 size-72 rounded-full bg-[#DFF6FC]/60" />

        <div className="relative z-10 w-full max-w-[450px]">
          {/* Logo dan judul */}
          <div className="mb-8">
            <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0865C5] to-[#078FC7] text-white shadow-lg shadow-blue-900/20">
              <GraduationCap className="size-7" />
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-[#17243A] sm:text-3xl">
              Sistem Manajemen UAS
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
              Jurusan Teknologi Informasi · Masuk untuk melanjutkan
            </p>
          </div>

          {/* Form login */}
          <form
            onSubmit={submit}
            className="space-y-5 rounded-3xl border border-[#DCE7F3] bg-white/95 p-6 shadow-[0_18px_55px_-25px_rgba(20,65,120,0.22)] backdrop-blur-sm sm:p-8"
          >
            <div className="space-y-2">
              <Label
                htmlFor="role"
                className="text-sm font-semibold text-[#26364B]"
              >
                Masuk sebagai
              </Label>

              <Select value={role} onValueChange={setRole}>
                <SelectTrigger
                  id="role"
                  className="h-11 rounded-xl border-slate-200 bg-white px-3.5 shadow-sm focus:ring-blue-500"
                >
                  <SelectValue placeholder="Pilih role pengguna" />
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
              <Label
                htmlFor="identity"
                className="text-sm font-semibold text-[#26364B]"
              >
                Email / NIM
              </Label>

              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-slate-400" />

                <Input
                  id="identity"
                  type="text"
                  autoComplete="username"
                  value={identity}
                  onChange={(e) => setIdentity(e.target.value)}
                  placeholder="nama@ti.ac.id atau NIM"
                  className="h-11 rounded-xl border-slate-200 bg-white pl-10 shadow-sm transition focus-visible:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-semibold text-[#26364B]"
              >
                Password
              </Label>

              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-slate-400" />

                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="h-11 rounded-xl border-slate-200 bg-white pl-10 pr-11 shadow-sm transition focus-visible:ring-blue-500"
                />

                <button
                  type="button"
                  aria-label={
                    showPassword
                      ? "Sembunyikan password"
                      : "Tampilkan password"
                  }
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:text-blue-600"
                >
                  {showPassword ? (
                    <EyeOff className="size-[18px]" />
                  ) : (
                    <Eye className="size-[18px]" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="h-11 w-full rounded-xl bg-gradient-to-r from-[#0865C5] to-[#087CCB] font-semibold text-white shadow-md shadow-blue-700/15 transition hover:from-[#0758AD] hover:to-[#066DB4]"
              disabled={loading}
            >
              {loading ? "Memproses..." : "Masuk"}
            </Button>

            <div className="pt-1 text-center">
              <button
                type="button"
                onClick={() =>
                  toast.info(
                    "Silakan hubungi administrator untuk mengatur ulang password.",
                  )
                }
                className="text-sm font-medium text-[#0872CF] transition hover:text-[#064F99] hover:underline"
              >
                Lupa Password?
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-xs leading-5 text-slate-400">
            Portal resmi pengelolaan Ujian Akhir Semester
            <br />
            Jurusan Teknologi Informasi
          </p>
        </div>
      </section>
    </main>
  );
}
