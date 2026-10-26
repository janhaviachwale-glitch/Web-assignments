
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";

type OverviewPageProps = {
  params: Promise<{ id: string }>;
};

export default function OverviewPage({ params }: OverviewPageProps) {
  return (
    <Suspense fallback={<p>Loading project overview...</p>}>
      <OverviewContent params={params} />
    </Suspense>
  );
}

async function OverviewContent({ params }: OverviewPageProps) {
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

      <h1 className="page-title">{project.name} — Overview</h1>
      <p className="page-description">{project.description}</p>

      <div className="project-detail-grid">
        <article className="detail-card">
          <h2>Status</h2>
          <p>{project.status}</p>
        </article>

        <article className="detail-card">
          <h2>Progress</h2>
          <p>{project.progress}% complete</p>
          <progress value={project.progress} max={100} />
        </article>

        <article className="detail-card">
          <h2>Category</h2>
          <p>{project.category}</p>
        </article>

        <article className="detail-card">
          <h2>Due Date</h2>
          <p>{project.dueDate}</p>
        </article>
      </div>
    </section>
  );
}
