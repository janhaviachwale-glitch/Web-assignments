import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Overview of your projects and workspace activity.",
};

const dashboardStats = [
  { label: "Total Projects", value: "12", detail: "Across your workspace" },
  { label: "Active Projects", value: "08", detail: "Currently in progress" },
  { label: "Completed", value: "24", detail: "Successfully delivered" },
  { label: "Team Members", value: "16", detail: "Collaborating together" },
];

export default function DashboardPage() {
  return (
    <section className="content-page">
      <p className="section-label">WORKSPACE OVERVIEW</p>

      <h1 className="page-title">Dashboard</h1>

      <p className="page-description">
        Get a quick overview of project progress, your team, and recent work.
      </p>

      <div className="dashboard-stats">
        {dashboardStats.map((stat) => (
          <article className="card stat-card" key={stat.label}>
            <p>{stat.label}</p>
            <h2>{stat.value}</h2>
            <span>{stat.detail}</span>
          </article>
        ))}
      </div>

      <section className="dashboard-panel card">
        <p className="section-label">GETTING STARTED</p>
        <h2>Your workspace at a glance</h2>
        <p>
          Use the Projects section to browse projects, review their details,
          explore team members, and track tasks.
        </p>
      </section>
    </section>
  );
}
