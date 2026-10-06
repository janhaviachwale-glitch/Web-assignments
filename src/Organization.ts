import { Employee, Designation } from "./Employee";
import { Engineer } from "./Engineer";
import { Lead } from "./Lead";
import { Manager } from "./Manager";
import { Director } from "./Director";
import { CEO } from "./CEO";

export class Organization {
  private employees: Map<string, Employee> = new Map();

  addEmployee(employee: Employee): void {
    if (!employee.name.trim()) {
      throw new Error("Employee name is required.");
    }

    if (!employee.id.trim()) {
      throw new Error("Employee ID is required.");
    }

    if (this.employees.has(employee.id)) {
      throw new Error(
        `Employee with ID ${employee.id} already exists.`
      );
    }

    this.validateDateOfBirth(employee.dateOfBirth);

    if (employee.designation === "CEO") {
      this.validateCEO();
    } else {
      this.validateReportsTo(employee);
    }

    this.employees.set(employee.id, employee);

    if (employee.reportsTo) {
      const manager = this.getEmployeeOrThrow(
        employee.reportsTo
      );

      manager.addReportee(employee.id);
    }
  }

  getAllEmployees(): Employee[] {
    return Array.from(this.employees.values());
  }

  getEmployeeById(id: string): Employee {
    return this.getEmployeeOrThrow(id);
  }

  updateEmployee(
    id: string,
    updates: {
      name?: string;
      dateOfBirth?: string;
      reportsTo?: string | null;
    }
  ): void {
    const employee = this.getEmployeeOrThrow(id);

    if (
      updates.name !== undefined &&
      !updates.name.trim()
    ) {
      throw new Error("Employee name cannot be empty.");
    }

    if (updates.dateOfBirth !== undefined) {
      this.validateDateOfBirth(updates.dateOfBirth);
    }

    if (updates.reportsTo !== undefined) {
      if (employee.designation === "CEO") {
        if (updates.reportsTo !== null) {
          throw new Error("CEO cannot report to anyone.");
        }
      } else {
        if (updates.reportsTo === null) {
          throw new Error(
            `${employee.designation} must report to someone.`
          );
        }

        this.validateReportsTo(
          employee,
          updates.reportsTo
        );
      }

      if (employee.reportsTo) {
        const oldManager =
          this.getEmployeeOrThrow(employee.reportsTo);

        oldManager.removeReportee(employee.id);
      }

      if (updates.reportsTo) {
        const newManager =
          this.getEmployeeOrThrow(updates.reportsTo);

        newManager.addReportee(employee.id);
      }

      employee.reportsTo = updates.reportsTo;
    }

    if (updates.name !== undefined) {
      employee.name = updates.name;
    }

    if (updates.dateOfBirth !== undefined) {
      employee.dateOfBirth = updates.dateOfBirth;
    }
  }

  deleteEmployee(id: string): void {
    const employee = this.getEmployeeOrThrow(id);

    if (employee.getReportees().length > 0) {
      throw new Error(
        `Cannot delete ${id} because the employee has reportees.`
      );
    }

    if (employee.designation === "CEO") {
      this.employees.delete(id);
      return;
    }

    if (employee.reportsTo) {
      const manager =
        this.getEmployeeOrThrow(employee.reportsTo);

      manager.removeReportee(employee.id);
    }

    this.employees.delete(id);
  }

  private validateCEO(): void {
    const existingCEO = this.getAllEmployees().some(
      employee => employee.designation === "CEO"
    );

    if (existingCEO) {
      throw new Error(
        "Only one CEO is allowed in the organization."
      );
    }
  }

  private validateReportsTo(
    employee: Employee,
    reportsTo: string | null = employee.reportsTo
  ): void {
    if (!reportsTo) {
      throw new Error(
        `${employee.designation} must have a reportsTo employee.`
      );
    }

    const manager = this.getEmployeeOrThrow(reportsTo);

    const expectedManagerDesignation =
      this.getExpectedManagerDesignation(
        employee.designation
      );

    if (
      manager.designation !== expectedManagerDesignation
    ) {
      throw new Error(
        `${employee.designation} must report to a ${expectedManagerDesignation}.`
      );
    }

    if (manager.id === employee.id) {
      throw new Error(
        "An employee cannot report to themselves."
      );
    }
  }

  private getExpectedManagerDesignation(
    designation: Designation
  ): Designation {
    switch (designation) {
      case "Engineer":
        return "Lead";

      case "Lead":
        return "Manager";

      case "Manager":
        return "Director";

      case "Director":
        return "CEO";

      case "CEO":
        throw new Error("CEO does not have a manager.");
    }
  }

  private validateDateOfBirth(date: string): void {
    const datePattern =
      /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;

    if (!datePattern.test(date)) {
      throw new Error(
        "Date of birth must be in MM/DD/YYYY format."
      );
    }

    const [month, day, year] = date
      .split("/")
      .map(Number);

    const actualDate = new Date(
      year,
      month - 1,
      day
    );

    if (
      actualDate.getFullYear() !== year ||
      actualDate.getMonth() !== month - 1 ||
      actualDate.getDate() !== day
    ) {
      throw new Error(
        "Date of birth is not a valid calendar date."
      );
    }
  }

  private getEmployeeOrThrow(id: string): Employee {
    const employee = this.employees.get(id);

    if (!employee) {
      throw new Error(
        `Employee with ID ${id} does not exist.`
      );
    }

    return employee;
  }
}