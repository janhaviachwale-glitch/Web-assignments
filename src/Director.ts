import { Employee } from "./Employee";

export class Director extends Employee {
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
      "Director",
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