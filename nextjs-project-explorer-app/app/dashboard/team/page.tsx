import type { Metadata } from "next";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Dashboard Team",
  description: "Team overview for your workspace.",
};

export default function DashboardTeamPage() {
  const teamMembers = Array.from(
    new Set(projects.flatMap((project) => project.team)),
  );

  return (
    <section className="content-page">
      <p className="section-label">TEAM OVERVIEW</p>
      <h1 className="page-title">Workspace team</h1>
      <p className="page-description">
        Review the teammates contributing across your active and completed projects.
      </p>

      <div className="project-detail-grid">
        {teamMembers.map((member, index) => (
          <article className="card detail-card" key={member}>
            <p className="detail-label">TEAM MEMBER</p>
            <h2>{member}</h2>
            <p>{index === 0 ? "Project lead" : "Team contributor"}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
