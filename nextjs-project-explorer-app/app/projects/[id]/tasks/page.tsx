
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";

type TasksPageProps = {
  params: Promise<{ id: string }>;
};

const sampleTasks = [
  { title: "Review project requirements", status: "Completed" },
  { title: "Build the user interface", status: "In Progress" },
  { title: "Test project functionality", status: "Pending" },
  { title: "Review and finalize changes", status: "Pending" },
];

export default function TasksPage({ params }: TasksPageProps) {
  return (
    <Suspense fallback={<p>Loading project tasks...</p>}>
      <TasksContent params={params} />
    </Suspense>
  );
}

async function TasksContent({ params }: TasksPageProps) {
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

      <h1 className="page-title">{project.name} — Tasks</h1>
      <p className="page-description">
        Track the tasks associated with this project.
      </p>

      <nav className="project-tabs">
        <Link href={`/projects/${project.id}/overview`}>Overview</Link>
        <Link href={`/projects/${project.id}/team`}>Team</Link>
        <Link href={`/projects/${project.id}/tasks`}>Tasks</Link>
        <Link href={`/projects/${project.id}/activity`}>Activity</Link>
      </nav>

      <div className="tasks-list">
        {sampleTasks.map((task, index) => (
          <article className="card detail-card" key={task.title}>
            <div>
              <h2>{task.title}</h2>
              <p>Task {index + 1}</p>
            </div>
            <span
              className={`task-status task-status-${task.status
                .toLowerCase()
                .replace(" ", "-")}`}
            >
              {task.status}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
