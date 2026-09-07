import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  ChevronRight,
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
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
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

type NavItem = { title: string; url: string; icon: LucideIcon };

type NavGroup = {
  label: string;
  items: NavItem[];
  icon?: LucideIcon;
  collapsible?: boolean;
};

const adminNavGroups: NavGroup[] = [
  {
    label: "Menu Utama",
    items: [{ title: "Dashboard", url: "/admin", icon: LayoutDashboard }],
  },
  {
    label: "Master Data",
    icon: Database,
    collapsible: true,
    items: [
      { title: "Data Mata Kuliah", url: "/admin/mata-kuliah", icon: BookOpen },
      { title: "Data Dosen", url: "/admin/dosen", icon: Users },
      { title: "Data Mahasiswa", url: "/admin/mahasiswa", icon: UserRound },
    ],
  },
  {
    label: "Manajemen UAS",
    icon: ClipboardList,
    collapsible: true,
    items: [
      { title: "Data Soal Ujian", url: "/admin/soal", icon: FileText },
      { title: "Jadwal UAS", url: "/admin/jadwal", icon: CalendarDays },
      { title: "Ruang Ujian", url: "/admin/ruang", icon: DoorOpen },
      { title: "Dosen Pengawas", url: "/admin/pengawas", icon: ShieldCheck },
    ],
  },
  {
    label: "Informasi",
    items: [{ title: "Pengumuman", url: "/admin/pengumuman", icon: Megaphone }],
  },
  {
    label: "Sistem",
    items: [
      { title: "Laporan", url: "/admin/laporan", icon: BarChart3 },
      { title: "Pengaturan", url: "/admin/pengaturan", icon: Settings },
    ],
  },
];

const roleProfile: Record<
  Role,
  { groups: NavGroup[]; nama: string; label: string; sub: string }
> = {
  admin: {
    groups: adminNavGroups,
    nama: "Panitia UAS",
    label: "Admin / Panitia",
    sub: "admin@ti.ac.id",
  },
};

function NavLinks({ items, pathname }: { items: NavItem[]; pathname: string }) {
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
            <Link to={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

function CollapsibleNavGroup({ group, pathname }: { group: NavGroup; pathname: string }) {
  const hasActive = group.items.some((item) => item.url === pathname);
  const [open, setOpen] = useState(hasActive);

  useEffect(() => {
    if (hasActive) setOpen(true);
  }, [hasActive]);

  const GroupIcon = group.icon ?? Database;

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="group/collapsible">
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                tooltip={group.label}
                isActive={hasActive && !open}
                className="font-semibold"
              >
                <GroupIcon />
                <span>{group.label}</span>
                <ChevronDown className="ml-auto size-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180 group-data-[collapsible=icon]:hidden" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
          </SidebarMenuItem>
        </SidebarMenu>
        <CollapsibleContent>
          <SidebarGroupContent className="pl-2 group-data-[collapsible=icon]:pl-0">
            <NavLinks items={group.items} pathname={pathname} />
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}

function AppSidebar({ role }: { role: Role }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { groups } = roleProfile[role];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-1 py-2">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <GraduationCap className="size-5" />
          </div>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-bold">Sistem UAS</p>
            <p className="truncate text-xs text-sidebar-foreground/70">Teknologi Informasi</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {groups.map((group) =>
          group.collapsible ? (
            <CollapsibleNavGroup key={group.label} group={group} pathname={pathname} />
          ) : (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <NavLinks items={group.items} pathname={pathname} />
              </SidebarGroupContent>
            </SidebarGroup>
          ),
        )}
      </SidebarContent>


      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Logout">
              <Link to="/">
                <LogOut />
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
  description?: string | undefined;
  actions?: ReactNode | undefined;
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
          <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b bg-card/85 px-3 backdrop-blur sm:px-5">
            <SidebarTrigger />
            <nav aria-label="Breadcrumb" className="hidden min-w-0 items-center gap-1.5 text-sm text-muted-foreground sm:flex">
              {breadcrumb.map((crumb, i) => (
                <span key={crumb} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="size-3.5 opacity-60" />}
                  <span className={i === breadcrumb.length - 1 ? "font-medium text-foreground" : ""}>
                    {crumb}
                  </span>
                </span>
              ))}
            </nav>

            <div className="ml-auto flex items-center gap-1.5">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative" aria-label="Notifikasi">
                    <Bell className="size-4.5" />
                    <span className="absolute right-2 top-2 size-2 rounded-full bg-destructive" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-80 p-0">
                  <div className="border-b px-4 py-3 text-sm font-semibold">Notifikasi</div>
                  <ul className="divide-y">
                    {notifikasi.map((n) => (
                      <li key={n.judul} className="px-4 py-3">
                        <div className="flex items-start gap-2">
                          <Badge variant={n.tone} className="mt-0.5 shrink-0">
                            •
                          </Badge>
                          <div className="min-w-0">
                            <p className="text-sm font-medium leading-snug">{n.judul}</p>
                            <p className="mt-0.5 text-xs text-muted-foreground">{n.waktu}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </PopoverContent>
              </Popover>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-9 gap-2 px-1.5 sm:px-2">
                    <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {initials}
                    </span>
                    <span className="hidden text-left leading-tight md:block">
                      <span className="block text-xs font-semibold">{profile.nama}</span>
                      <span className="block text-[11px] text-muted-foreground">{profile.label}</span>
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <p className="text-sm">{profile.nama}</p>
                    <p className="text-xs font-normal text-muted-foreground">{profile.sub}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profil Saya</DropdownMenuItem>
                  <DropdownMenuItem>Ubah Password</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/" className="text-destructive">
                      Logout
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <div className="flex-1 space-y-6 p-4 sm:p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold tracking-tight sm:text-2xl">{title}</h1>
                {description && (
                  <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>
                )}
              </div>
              {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
            </div>
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
