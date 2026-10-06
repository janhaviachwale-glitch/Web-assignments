import { Employee } from "./Employee";

export class CEO extends Employee {
  private reportees: string[] = [];

  constructor(
    name: string,
    id: string,
    dateOfBirth: string
  ) {
    super(
      name,
      id,
      dateOfBirth,
      "CEO",
      null
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