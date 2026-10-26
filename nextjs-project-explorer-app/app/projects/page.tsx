import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse and filter projects in your workspace.",
};

type ProjectsPageProps = {
  searchParams: Promise<{
    search?: string;
    status?: string;
  }>;
};

function ProjectsLoading() {
  return (
    <section className="content-page">
      <p className="section-label">YOUR WORKSPACE</p>
      <h1 className="page-title">Projects</h1>
      <p className="page-description">Loading your projects...</p>
    </section>
  );
}

export default function ProjectsPage({ searchParams }: ProjectsPageProps) {
  return (
    <Suspense fallback={<ProjectsLoading />}>
      <ProjectsContent searchParams={searchParams} />
    </Suspense>
  );
}

async function ProjectsContent({ searchParams }: ProjectsPageProps) {
  const params = await searchParams;
  const search = params.search?.trim() ?? "";
  const status = params.status ?? "All";

  const filteredProjects = projects.filter((project) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      project.name.toLowerCase().includes(searchText) ||
      project.description.toLowerCase().includes(searchText) ||
      project.category.toLowerCase().includes(searchText);

    const matchesStatus =
      status === "All" ||
      project.status.toLowerCase() === status.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <section className="content-page">
      <p className="section-label">YOUR WORKSPACE</p>
      <h1 className="page-title">Projects</h1>
      <p className="page-description">
        Browse projects, check progress, and explore what your team is working on.
      </p>

      <form className="project-filters" action="/projects" method="GET">
        <input
          className="project-search"
          type="search"
          name="search"
          placeholder="Search projects..."
          defaultValue={search}
          aria-label="Search projects"
        />

        <select
          className="project-status-select"
          name="status"
          defaultValue={status}
          aria-label="Filter by project status"
        >
          <option value="All">All statuses</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="On Hold">On Hold</option>
        </select>

        <button className="button button-primary" type="submit">
          Apply filters
        </button>
      </form>

      <p className="project-result-count">
        Showing {filteredProjects.length} of {projects.length} projects
      </p>

      {filteredProjects.length > 0 ? (
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <article className="card project-card" key={project.id}>
              <div className="project-card-top">
                <span className="project-category">{project.category}</span>
                <span
                  className={`project-status status-${project.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {project.status}
                </span>
              </div>

              <h2>{project.name}</h2>
              <p className="project-description">{project.description}</p>

              <div className="project-progress-heading">
                <span>Progress</span>
                <strong>{project.progress}%</strong>
              </div>

              <div
                className="progress-track"
                role="progressbar"
                aria-label={`${project.name} progress`}
                aria-valuenow={project.progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="progress-fill"
                  style={{ width: `${project.progress}%` }}
                />
              </div>

              <div className="project-card-bottom">
                <span>{project.team.length} team members</span>
                <Link href={`/projects/${project.id}`} className="card-link">
                  View details →
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="card empty-projects">
          <h2>No projects found</h2>
          <p>Try another search term or change the status filter.</p>
          <Link href="/projects" className="card-link">
            Clear filters →
          </Link>
        </div>
      )}
    </section>
  );
}
