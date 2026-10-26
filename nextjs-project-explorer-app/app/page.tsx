import Link from "next/link";

const overviewCards = [
  {
    number: "01",
    title: "Dashboard",
    description:
      "Get an overview of project progress, recent activity, and important updates.",
    href: "/dashboard",
    action: "Open Dashboard",
  },
  {
    number: "02",
    title: "Projects",
    description:
      "Browse projects, explore project details, and keep track of tasks and teams.",
    href: "/projects",
    action: "Explore Projects",
  },
  {
    number: "03",
    title: "Settings",
    description:
      "Manage your workspace preferences and customize your experience.",
    href: "/settings",
    action: "Manage Settings",
  },
];

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <span className="eyebrow">PROJECT MANAGEMENT WORKSPACE</span>

        <h1 className="hero-title">
          Every project.
          <br />
          <span>One clear view.</span>
        </h1>

        <p className="hero-description">
          Welcome to Project Explorer, your central workspace for discovering
          projects, following progress, and keeping your team aligned.
        </p>

        <div className="hero-actions">
          <Link href="/projects" className="button button-primary">
            Explore Projects <span aria-hidden="true">→</span>
          </Link>

          <Link href="/dashboard" className="button button-secondary">
            View Dashboard
          </Link>
        </div>

        <div className="hero-note">
          <span className="status-dot" />
          Your workspace for planning, tracking, and collaboration
        </div>
      </section>

      <section className="workspace-section">
        <div className="section-heading">
          <div>
            <p className="section-label">YOUR WORKSPACE</p>
            <h2>Everything starts here</h2>
          </div>

          <p className="section-description">
            Choose a section to get started.
          </p>
        </div>

        <div className="overview-grid">
          {overviewCards.map((card) => (
            <article className="card overview-card" key={card.title}>
              <span className="card-number">{card.number}</span>

              <h3>{card.title}</h3>

              <p>{card.description}</p>

              <Link href={card.href} className="card-link">
                {card.action} <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="home-info">
        <div>
          <p className="section-label">BUILT FOR CLARITY</p>
          <h2>Stay organized as work moves forward.</h2>
        </div>

        <p>
          Navigate project details, discover team information, review tasks,
          and follow project activity from one connected application.
        </p>
      </section>
    </div>
  );
}