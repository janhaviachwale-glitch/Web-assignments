
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";

type TeamPageProps = {
  params: Promise<{ id: string }>;
};

export default function TeamPage({ params }: TeamPageProps) {
  return (
    <Suspense fallback={<p>Loading project team...</p>}>
      <TeamContent params={params} />
    </Suspense>
  );
}

async function TeamContent({ params }: TeamPageProps) {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);

  if (!project) {
    notFound();
  }

  return (
    <section className="content-page">
      <Link href={`/projects/${project.id}`} className="back-link">
        ← Back to Project
      </Link>

      <h1 className="page-title">{project.name} — Team</h1>
      <p className="page-description">
        Meet the members working on this project.
      </p>

      <div className="project-tabs">
        <Link href={`/projects/${project.id}/overview`}>Overview</Link>
        <Link href={`/projects/${project.id}/team`}>Team</Link>
        <Link href={`/projects/${project.id}/tasks`}>Tasks</Link>
        <Link href={`/projects/${project.id}/activity`}>Activity</Link>
      </div>

      <div className="team-list">
        {project.team.map((member, index) => (
          <article className="card detail-card" key={member}>
            <h2>{member}</h2>
            <p>{index === 0 ? "Project Lead" : "Team Member"}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
