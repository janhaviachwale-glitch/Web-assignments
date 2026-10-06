import { Employee } from "./Employee";

export class Engineer extends Employee {
  constructor(
    name: string,
    id: string,
    dateOfBirth: string,
    reportsTo: string
  ) {
    super(
      name,
      id,
      dateOfBirth,
      "Engineer",
      reportsTo
    );
  }

  getReportees(): string[] {
    return [];
  }

  addReportee(_employeeId: string): void {
    throw new Error("Engineer cannot have reportees.");
  }

  removeReportee(_employeeId: string): void {
    throw new Error("Engineer cannot have reportees.");
  }
}