
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Database,
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  Users,
  UserRound,
  FileText,
  CalendarDays,
  DoorOpen,
  ShieldCheck,
  Megaphone,
  BarChart3,
  Settings,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { notifikasi } from "@/lib/mock-data";

export type Role = "admin";

type NavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

type NavGroup = {
  label: string;
  items: NavItem[];
  icon?: LucideIcon;
  collapsible?: boolean;
};

const adminNavGroups: NavGroup[] = [
  {
    label: "Menu Utama",
    items: [
      { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    label: "Master Data",
    icon: Database,
    collapsible: true,
    items: [
      {
        title: "Data Mata Kuliah",
        url: "/admin/mata-kuliah",
        icon: BookOpen,
      },
      {
        title: "Data Dosen",
        url: "/admin/dosen",
        icon: Users,
      },
      {
        title: "Data Mahasiswa",
        url: "/admin/mahasiswa",
        icon: UserRound,
      },
    ],
  },
  {
    label: "Manajemen UAS",
    icon: ClipboardList,
    collapsible: true,
    items: [
      {
        title: "Data Soal Ujian",
        url: "/admin/soal",
        icon: FileText,
      },
      {
        title: "Jadwal UAS",
        url: "/admin/jadwal",
        icon: CalendarDays,
      },
      {
        title: "Ruang Ujian",
        url: "/admin/ruang",
        icon: DoorOpen,
      },
      {
        title: "Dosen Pengawas",
        url: "/admin/pengawas",
        icon: ShieldCheck,
      },
    ],
  },
  {
    label: "Informasi",
    items: [
      {
        title: "Pengumuman",
        url: "/admin/pengumuman",
        icon: Megaphone,
      },
    ],
  },
  {
    label: "Sistem",
    items: [
      {
        title: "Laporan",
        url: "/admin/laporan",
        icon: BarChart3,
      },
      {
        title: "Pengaturan",
        url: "/admin/pengaturan",
        icon: Settings,
      },
    ],
  },
];

const roleProfile: Record<
  Role,
  {
    groups: NavGroup[];
    nama: string;
    label: string;
    sub: string;
  }
> = {
  admin: {
    groups: adminNavGroups,
    nama: "Panitia UAS",
    label: "Admin / Panitia",
    sub: "admin@ti.ac.id",
  },
};

function NavLinks({
  items,
  pathname,
}: {
  items: NavItem[];
  pathname: string;
}) {
  return (
    <SidebarMenu className="gap-1">
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.url}
            tooltip={item.title}
            className="
              relative h-10 rounded-xl px-3
              text-slate-300 transition-all duration-200
              hover:bg-white/[0.08] hover:text-white
              data-[active=true]:bg-gradient-to-r
              data-[active=true]:from-blue-600
              data-[active=true]:to-teal-600
              data-[active=true]:font-semibold
              data-[active=true]:text-white
              data-[active=true]:shadow-md
              data-[active=true]:shadow-blue-950/20
            "
          >
            <Link to={item.url}>
              <item.icon className="size-[18px] shrink-0" />
              <span className="truncate">{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

function CollapsibleNavGroup({
  group,
  pathname,
}: {
  group: NavGroup;
  pathname: string;
}) {
  const hasActive = group.items.some(
    (item) => item.url === pathname,
  );

  const [open, setOpen] = useState(hasActive);
  const GroupIcon = group.icon ?? Database;

  useEffect(() => {
    if (hasActive) {
      setOpen(true);
    }
  }, [hasActive]);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="group/collapsible"
    >
      <SidebarGroup className="py-1">
        <SidebarMenu className="gap-1">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                tooltip={group.label}
                isActive={hasActive && !open}
                className="
                  h-10 rounded-xl px-3 font-semibold
                  text-slate-200 transition-colors duration-200
                  hover:bg-white/[0.08] hover:text-white
                  data-[active=true]:bg-white/10
                  data-[active=true]:text-white
                "
              >
                <GroupIcon className="size-[18px] shrink-0 text-teal-300" />

                <span className="truncate">{group.label}</span>

                <ChevronDown
                  className={`ml-auto size-4 shrink-0 transition-transform duration-200 ${
                    open ? "rotate-180 text-teal-200" : "text-slate-400"
                  } group-data-[collapsible=icon]:hidden`}
                />
              </SidebarMenuButton>
            </CollapsibleTrigger>
          </SidebarMenuItem>
        </SidebarMenu>

        <CollapsibleContent>
          <SidebarGroupContent className="relative mt-1 pl-2 group-data-[collapsible=icon]:pl-0">
            <div className="pointer-events-none absolute bottom-2 left-[19px] top-2 w-px bg-gradient-to-b from-teal-300/40 via-white/10 to-transparent group-data-[collapsible=icon]:hidden" />

            <NavLinks items={group.items} pathname={pathname} />
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}

function AppSidebar({ role }: { role: Role }) {
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });

  const { groups } = roleProfile[role];

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-[#263D60] bg-[#102548] text-slate-100"
    >
      <SidebarHeader className="border-b border-white/10 bg-[#102548] px-3 py-3">
        <div className="flex items-center gap-3 px-1 py-2">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-teal-500 text-white shadow-lg shadow-blue-950/30 ring-1 ring-white/15">
            <GraduationCap className="size-5" />
          </div>

          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-bold tracking-wide text-white">
              Sistem UAS
            </p>
            <p className="truncate text-xs text-slate-400">
              Teknologi Informasi
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-[#102548] px-2 py-3">
        {groups.map((group) =>
          group.collapsible ? (
            <CollapsibleNavGroup
              key={group.label}
              group={group}
              pathname={pathname}
            />
          ) : (
            <SidebarGroup key={group.label} className="py-1">
              <SidebarGroupLabel className="mb-1 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400 group-data-[collapsible=icon]:hidden">
                {group.label}
              </SidebarGroupLabel>

              <SidebarGroupContent>
                <NavLinks
                  items={group.items}
                  pathname={pathname}
                />
              </SidebarGroupContent>
            </SidebarGroup>
          ),
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-white/10 bg-[#102548] p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Logout"
              className="h-10 rounded-xl px-3 text-slate-300 transition-colors duration-200 hover:bg-red-500/10 hover:text-red-300"
            >
              <Link to="/">
                <LogOut className="size-[18px] shrink-0" />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export function AppShell({
  role,
  breadcrumb,
  title,
  description,
  actions,
  children,
}: {
  role: Role;
  breadcrumb: string[];
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const profile = roleProfile[role];

  const initials = profile.nama
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar role={role} />

        <SidebarInset className="min-w-0">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-border/70 bg-card/90 px-3 backdrop-blur-xl sm:px-5">
            <SidebarTrigger />

            <nav
              aria-label="Breadcrumb"
              className="hidden min-w-0 items-center gap-1.5 text-sm text-muted-foreground sm:flex"
            >
              {breadcrumb.map((crumb, i) => (
                <span
                  key={`${crumb}-${i}`}
                  className="flex items-center gap-1.5"
                >
                  {i > 0 && (
                    <ChevronRight className="size-3.5 opacity-60" />
                  )}

                  <span
                    className={
                      i === breadcrumb.length - 1
                        ? "font-semibold text-foreground"
                        : ""
                    }
                  >
                    {crumb}
                  </span>
                </span>
              ))}
            </nav>

            <div className="ml-auto flex items-center gap-1.5">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative rounded-xl"
                    aria-label="Notifikasi"
                  >
                    <Bell className="size-4.5" />
                    <span className="absolute right-2 top-2 size-2 rounded-full bg-destructive ring-2 ring-card" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent
                  align="end"
                  className="w-80 overflow-hidden rounded-xl p-0"
                >
                  <div className="border-b bg-muted/30 px-4 py-3 text-sm font-semibold">
                    Notifikasi
                  </div>

                  <ul className="divide-y">
                    {notifikasi.map((n) => (
                      <li
                        key={n.judul}
                        className="px-4 py-3 transition-colors hover:bg-muted/30"
                      >
                        <div className="flex items-start gap-2">
                          <Badge
                            variant={n.tone}
                            className="mt-0.5 shrink-0"
                          >
                            •
                          </Badge>

                          <div className="min-w-0">
                            <p className="text-sm font-medium leading-snug">
                              {n.judul}
                            </p>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                              {n.waktu}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </PopoverContent>
              </Popover>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-9 gap-2 rounded-xl px-1.5 sm:px-2"
                  >
                    <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary ring-1 ring-primary/10">
                      {initials}
                    </span>

                    <span className="hidden text-left leading-tight md:block">
                      <span className="block text-xs font-semibold">
                        {profile.nama}
                      </span>
                      <span className="block text-[11px] text-muted-foreground">
                        {profile.label}
                      </span>
                    </span>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-56 rounded-xl"
                >
                  <DropdownMenuLabel>
                    <p className="text-sm">{profile.nama}</p>
                    <p className="text-xs font-normal text-muted-foreground">
                      {profile.sub}
                    </p>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profil Saya</DropdownMenuItem>
                  <DropdownMenuItem>Ubah Password</DropdownMenuItem>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link to="/" className="text-destructive">
                      <LogOut className="mr-2 size-4" />
                      Logout
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="min-w-0 flex-1 space-y-6 bg-slate-50/70 p-4 sm:p-6">
            <section className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-r from-[#12377D] via-[#0866B5] to-[#0D9EAA] px-5 py-6 text-white shadow-[0_12px_35px_-18px_rgba(8,102,181,0.55)] sm:px-8 sm:py-7">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-24 size-72 rounded-full bg-cyan-200/15 blur-3xl"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-28 right-1/4 size-64 rounded-full bg-blue-300/15 blur-3xl"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 top-1/2 hidden size-64 -translate-y-1/2 rounded-full border border-white/10 sm:block"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-1 top-1/2 hidden size-44 -translate-y-1/2 rounded-full border border-white/10 sm:block"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-16 top-8 hidden size-3 rounded-full bg-white/30 sm:block"
              />

              <div className="relative z-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div className="min-w-0">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="h-px w-7 bg-cyan-200/80" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-100 sm:text-xs">
                      {breadcrumb.join(" / ")}
                    </p>
                  </div>

                  <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {title}
                  </h1>

                  {description && (
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-50/90 sm:text-base">
                      {description}
                    </p>
                  )}
                </div>

                {actions && (
                  <div className="hero-actions relative z-10 flex shrink-0 flex-wrap items-center gap-2">
                    {actions}
                  </div>
                )}
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
            </section>

            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
