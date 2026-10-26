
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";

type ProjectDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: ProjectDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);

  return {
    title: project ? project.name : "Project Not Found",
  };
}

function ProjectDetailsLoading() {
  return (
    <section className="content-page">
      <p className="section-label">PROJECT DETAILS</p>
      <h1 className="page-title">Loading project...</h1>
      <p className="page-description">
        Please wait while the project details load.
      </p>
    </section>
  );
}

export default function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  return (
    <Suspense fallback={<ProjectDetailsLoading />}>
      <ProjectDetailsContent params={params} />
    </Suspense>
  );
}

async function ProjectDetailsContent({
  params,
}: ProjectDetailsPageProps) {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);

  if (!project) {
    notFound();
  }

  return (
    <section className="content-page">
      <Link href="/projects" className="back-link">
        ← Back to Projects
      </Link>

      <div className="project-detail-header">
        <div>
          <p className="section-label">{project.category}</p>
          <h1 className="page-title">{project.name}</h1>
          <p className="page-description">{project.description}</p>
          <nav className="project-tabs">
            <Link href={`/projects/${project.id}/overview`}>Overview</Link>
            <Link href={`/projects/${project.id}/team`}>Team</Link>
            <Link href={`/projects/${project.id}/tasks`}>Tasks</Link>
            <Link href={`/projects/${project.id}/activity`}>Activity</Link>
          </nav>
        </div>

        <span
          className={`project-status status-${project.status
            .toLowerCase()
            .replace(" ", "-")}`}
        >
          {project.status}
        </span>
      </div>

      <div className="project-detail-grid">
        <article className="card detail-card">
          <p className="detail-label">PROJECT PROGRESS</p>
          <h2>{project.progress}%</h2>

          <div
            className="progress-track"
            role="progressbar"
            aria-label="Project progress"
            aria-valuenow={project.progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="progress-fill"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </article>

        <article className="card detail-card">
          <p className="detail-label">DUE DATE</p>
          <h2>
            {new Date(`${project.dueDate}T00:00:00`).toLocaleDateString(
              "en-US",
              { month: "short", day: "numeric", year: "numeric" },
            )}
          </h2>
        </article>

        <article className="card detail-card">
          <p className="detail-label">TEAM MEMBERS</p>
          <h2>{project.team.length}</h2>
          <div className="team-list">
            {project.team.map((member) => (
              <span className="team-member" key={member}>
                {member}
              </span>
            ))}
          </div>
        </article>
      </div>

      <div className="card project-detail-info">
        <p className="section-label">PROJECT OVERVIEW</p>
        <h2>About this project</h2>
        <p>{project.description}</p>
        <p>
          This project belongs to the {project.category} category and is
          currently {project.status.toLowerCase()}.
        </p>
      </div>
    </section>
  );
}
