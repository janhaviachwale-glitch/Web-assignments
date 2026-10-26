
import Link from "next/link";

const dashboardLinks = [
  { label: "Overview", href: "/dashboard" },
  { label: "Projects", href: "/projects" },
  { label: "Team", href: "/dashboard/team" },
  { label: "Activity", href: "/dashboard/activity" },
];

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <p className="sidebar-label">WORKSPACE</p>

        <nav aria-label="Dashboard navigation">
          {dashboardLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="sidebar-link"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="dashboard-main">{children}</div>
    </div>
  );
}
