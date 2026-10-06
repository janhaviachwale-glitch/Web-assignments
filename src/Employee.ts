export type Designation =
  | "Engineer"
  | "Lead"
  | "Manager"
  | "Director"
  | "CEO";

export abstract class Employee {
  constructor(
    public name: string,
    public id: string,
    public dateOfBirth: string,
    public readonly designation: Designation,
    public reportsTo: string | null
  ) {}

  abstract getReportees(): string[];

  abstract addReportee(employeeId: string): void;

  abstract removeReportee(employeeId: string): void;
}