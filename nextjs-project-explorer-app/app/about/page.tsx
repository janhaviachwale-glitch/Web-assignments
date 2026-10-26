import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about the Project Explorer workspace.",
};

export default function AboutPage() {
  return (
    <section className="content-page">
      <p className="section-label">ABOUT PROJECT EXPLORER</p>

      <h1 className="page-title">
        A clearer way to manage projects.
      </h1>

      <p className="page-description">
        Project Explorer brings project information, team collaboration,
        task tracking, and activity updates together in one workspace.
      </p>

      <div className="about-grid">
        <article className="card">
          <span className="card-number">01</span>
          <h2>Stay organized</h2>
          <p>
            Keep project details and important updates in one place.
          </p>
        </article>

        <article className="card">
          <span className="card-number">02</span>
          <h2>Track progress</h2>
          <p>
            Review tasks, monitor progress, and understand what needs attention.
          </p>
        </article>

        <article className="card">
          <span className="card-number">03</span>
          <h2>Work together</h2>
          <p>
            Explore team information and follow project activity.
          </p>
        </article>
      </div>
    </section>
  );
}
