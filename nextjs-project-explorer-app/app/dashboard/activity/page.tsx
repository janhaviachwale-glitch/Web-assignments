import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Activity",
  description: "Recent activity across the workspace.",
};

const activityItems = [
  {
    title: "Project Explorer moved to active sprint",
    description: "The project team reviewed milestones and updated delivery priorities.",
    date: "Oct 18, 2026",
  },
  {
    title: "Analytics dashboard shipped",
    description: "The latest reporting module was finalized and shared with stakeholders.",
    date: "Oct 20, 2026",
  },
  {
    title: "Design system milestone reached",
    description: "Reusable UI patterns were approved for the next release cycle.",
    date: "Oct 24, 2026",
  },
];

export default function DashboardActivityPage() {
  return (
    <section className="content-page">
      <p className="section-label">ACTIVITY FEED</p>
      <h1 className="page-title">Recent workspace activity</h1>
      <p className="page-description">
        Follow key updates, approvals, and milestones across active workstreams.
      </p>

      <div className="activity-list">
        {activityItems.map((activity) => (
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
