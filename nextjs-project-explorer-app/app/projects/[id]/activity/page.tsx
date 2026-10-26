
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";

type ActivityPageProps = {
  params: Promise<{ id: string }>;
};

const sampleActivities = [
  {
    title: "Project created",
    description: "The project workspace was created.",
    date: "Oct 20, 2026",
  },
  {
    title: "Team members added",
    description: "Team members were added to the project.",
    date: "Oct 22, 2026",
  },
  {
    title: "Progress updated",
    description: "The project progress was reviewed and updated.",
    date: "Oct 25, 2026",
  },
];

export default function ActivityPage({ params }: ActivityPageProps) {
  return (
    <Suspense fallback={<p>Loading project activity...</p>}>
      <ActivityContent params={params} />
    </Suspense>
  );
}

async function ActivityContent({ params }: ActivityPageProps) {
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

      <h1 className="page-title">{project.name} — Activity</h1>
      <p className="page-description">
        Review recent updates and events for this project.
      </p>

      <nav className="project-tabs">
        <Link href={`/projects/${project.id}/overview`}>Overview</Link>
        <Link href={`/projects/${project.id}/team`}>Team</Link>
        <Link href={`/projects/${project.id}/tasks`}>Tasks</Link>
        <Link href={`/projects/${project.id}/activity`}>Activity</Link>
      </nav>

      <div className="activity-list">
        {sampleActivities.map((activity) => (
          <article className="card detail-card" key={activity.title}>
            <div>
              <h2>{activity.title}</h2>
              <p>{activity.description}</p>
            </div>
            <time>{activity.date}</time>
          </article>
        ))}
      </div>
    </section>
  );
}
