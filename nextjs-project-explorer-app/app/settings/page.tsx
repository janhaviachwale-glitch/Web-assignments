import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your workspace preferences and settings.",
};

const settingsGroups = [
  {
    title: "Workspace preferences",
    description: "Customize the way your team views updates and project activity.",
  },
  {
    title: "Notifications",
    description: "Choose which alerts are sent for deadlines, progress updates, and task changes.",
  },
  {
    title: "Team access",
    description: "Review who can view or contribute to each project in the workspace.",
  },
];

export default function SettingsPage() {
  return (
    <section className="content-page">
      <p className="section-label">WORKSPACE SETTINGS</p>

      <h1 className="page-title">Manage your workspace</h1>

      <p className="page-description">
        Configure the workspace to fit your delivery flow and keep your team aligned.
      </p>

      <div className="about-grid">
        {settingsGroups.map((group) => (
          <article className="card" key={group.title}>
            <span className="card-number">
              {settingsGroups.indexOf(group) + 1 < 10
                ? `0${settingsGroups.indexOf(group) + 1}`
                : settingsGroups.indexOf(group) + 1}
            </span>
            <h2>{group.title}</h2>
            <p>{group.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
