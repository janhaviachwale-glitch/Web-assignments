export type ProjectStatus = "Active" | "Completed" | "On Hold";

export type Project = {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  team: string[];
  dueDate: string;
  category: string;
};

export const projects: Project[] = [
  {
    id: "1",
    name: "Project Explorer",
    description:
      "A project management portal for organizing projects, teams, tasks, and activity.",
    status: "Active",
    progress: 65,
    team: ["Janhavi", "Alex", "Sam"],
    dueDate: "2026-11-15",
    category: "Web Development",
  },
  {
    id: "2",
    name: "E-commerce Platform",
    description:
      "An online shopping experience with product discovery and cart management.",
    status: "Active",
    progress: 40,
    team: ["Taylor", "Morgan", "Jamie"],
    dueDate: "2026-12-01",
    category: "E-commerce",
  },
  {
    id: "3",
    name: "Team Workspace",
    description:
      "A shared workspace for team communication, collaboration, and updates.",
    status: "On Hold",
    progress: 25,
    team: ["Jordan", "Alex"],
    dueDate: "2026-12-20",
    category: "Productivity",
  },
  {
    id: "4",
    name: "Mobile App Redesign",
    description:
      "A refreshed mobile experience focused on usability and accessible design.",
    status: "Completed",
    progress: 100,
    team: ["Sam", "Taylor"],
    dueDate: "2026-09-30",
    category: "Mobile Development",
  },
  {
    id: "5",
    name: "Analytics Dashboard",
    description:
      "A dashboard for visualizing performance metrics and product insights.",
    status: "Active",
    progress: 80,
    team: ["Morgan", "Jamie", "Jordan"],
    dueDate: "2026-11-25",
    category: "Analytics",
  },
  {
    id: "6",
    name: "Design System",
    description:
      "Reusable UI components and design guidelines for consistent product experiences.",
    status: "Completed",
    progress: 100,
    team: ["Janhavi", "Taylor"],
    dueDate: "2026-10-10",
    category: "Design",
  },
];
