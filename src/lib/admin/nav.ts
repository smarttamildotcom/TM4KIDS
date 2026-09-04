import {
  Award,
  BarChart3,
  ClipboardList,
  CreditCard,
  HeartHandshake,
  LayoutDashboard,
  Settings,
  Users,
  Ticket,
  GraduationCap,
  Trophy,
  LifeBuoy,
  Newspaper,
  CalendarDays,
  School,
  type LucideIcon,
} from "lucide-react";

export type AdminNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

/** Primary admin navigation. Keep the order in sync with the sidebar design. */
export const adminNavItems: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Members", href: "/admin/members", icon: Users },
  { label: "Membership Requests", href: "/admin/requests", icon: ClipboardList },
  { label: "Payments", href: "/admin/payments", icon: CreditCard },
  { label: "Certificates", href: "/admin/certificates", icon: Award },
  { label: "CSR Reports", href: "/admin/csr", icon: HeartHandshake },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

/**
 * Planned modules shown as disabled placeholders. Add a real `href` and remove
 * it from here to promote any of these into a live section.
 */
export const adminFutureModules: AdminNavItem[] = [
  { label: "Schools", href: "/admin/schools", icon: School },
  { label: "Teachers", href: "/admin/teachers", icon: GraduationCap },
  { label: "Coupons & Promos", href: "/admin/coupons", icon: Ticket },
  { label: "Achievements", href: "/admin/achievements", icon: Trophy },
  { label: "Leaderboards", href: "/admin/leaderboards", icon: BarChart3 },
  { label: "Support Tickets", href: "/admin/support", icon: LifeBuoy },
  { label: "Blog & News", href: "/admin/blog", icon: Newspaper },
  { label: "Events", href: "/admin/events", icon: CalendarDays },
];
