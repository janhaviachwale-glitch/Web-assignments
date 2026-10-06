import { Employee } from "./Employee";

export class Manager extends Employee {
  private reportees: string[] = [];

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
      "Manager",
      reportsTo
    );
  }

  getReportees(): string[] {
    return [...this.reportees];
  }

  addReportee(employeeId: string): void {
    if (!this.reportees.includes(employeeId)) {
      this.reportees.push(employeeId);
    }
  }

  removeReportee(employeeId: string): void {
    this.reportees = this.reportees.filter(
      id => id !== employeeId
    );
  }
}