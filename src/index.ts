import { Organization } from "./Organization";
import { CEO } from "./CEO";
import { Director } from "./Director";
import { Manager } from "./Manager";
import { Lead } from "./Lead";
import { Engineer } from "./Engineer";

const organization = new Organization();

function runTest(
  testName: string,
  test: () => void
): void {
  console.log(`\n========== ${testName} ==========`);

  try {
    test();
    console.log("Result: SUCCESS");
  } catch (error) {
    console.log(
      `Result: REJECTED - ${
        error instanceof Error
          ? error.message
          : "Unknown error"
      }`
    );
  }
}

/*
 * 1. ADD EMPLOYEES
 */

runTest("Add CEO", () => {
  organization.addEmployee(
    new CEO(
      "John Smith",
      "E001",
      "01/15/1975"
    )
  );
});

runTest("Add Director", () => {
  organization.addEmployee(
    new Director(
      "Sarah Wilson",
      "E002",
      "03/20/1980",
      "E001"
    )
  );
});

runTest("Add Manager", () => {
  organization.addEmployee(
    new Manager(
      "David Brown",
      "E003",
      "06/10/1985",
      "E002"
    )
  );
});

runTest("Add Lead", () => {
  organization.addEmployee(
    new Lead(
      "Michael Clark",
      "E004",
      "08/25/1990",
      "E003"
    )
  );
});

runTest("Add Engineer", () => {
  organization.addEmployee(
    new Engineer(
      "Emily Davis",
      "E005",
      "11/12/1995",
      "E004"
    )
  );
});

/*
 * 2. RETRIEVE ALL EMPLOYEES
 */

runTest("Retrieve All Employees", () => {
  console.log(organization.getAllEmployees());
});

/*
 * 3. RETRIEVE EMPLOYEE BY ID
 */

runTest("Retrieve Employee E005", () => {
  console.log(
    organization.getEmployeeById("E005")
  );
});

/*
 * 4. DUPLICATE ID VALIDATION
 */

runTest("Duplicate Employee ID", () => {
  organization.addEmployee(
    new Engineer(
      "Another Engineer",
      "E005",
      "12/10/1996",
      "E004"
    )
  );
});

/*
 * 5. SECOND CEO VALIDATION
 */

runTest("Second CEO Validation", () => {
  organization.addEmployee(
    new CEO(
      "Another CEO",
      "E006",
      "02/20/1970"
    )
  );
});

/*
 * 6. INVALID REPORTING RELATIONSHIP
 */

runTest("Invalid Reporting Relationship", () => {
  organization.addEmployee(
    new Engineer(
      "Invalid Engineer",
      "E007",
      "04/15/1997",
      "E002"
    )
  );
});

/*
 * 7. INVALID EMPLOYEE REFERENCE
 */

runTest("Invalid Manager Reference", () => {
  organization.addEmployee(
    new Engineer(
      "Unknown Manager Engineer",
      "E008",
      "05/20/1998",
      "E999"
    )
  );
});

/*
 * 8. INVALID DATE FORMAT
 */

runTest("Invalid Date Format", () => {
  organization.addEmployee(
    new Engineer(
      "Invalid Date Engineer",
      "E009",
      "1998-05-20",
      "E004"
    )
  );
});

/*
 * 9. UPDATE EMPLOYEE
 */

runTest("Update Employee", () => {
  organization.updateEmployee(
    "E005",
    {
      name: "Emily Updated",
      dateOfBirth: "12/05/1995"
    }
  );

  console.log(
    organization.getEmployeeById("E005")
  );
});

/*
 * 10. UPDATE NON-EXISTENT EMPLOYEE
 */

runTest("Update Non-existent Employee", () => {
  organization.updateEmployee(
    "E999",
    {
      name: "Unknown Employee"
    }
  );
});

/*
 * 11. DELETE EMPLOYEE WITH REPORTEES
 */

runTest("Delete Employee With Reportees", () => {
  organization.deleteEmployee("E004");
});

/*
 * 12. DELETE EMPLOYEE
 */

runTest("Delete Employee Without Reportees", () => {
  organization.deleteEmployee("E005");
});

/*
 * 13. FINAL EMPLOYEE LIST
 */

runTest("Final Employee List", () => {
  console.log(
    organization.getAllEmployees()
  );
});

runTest("Invalid Calendar Date", () => {
  organization.addEmployee(
    new Engineer(
      "Invalid Calendar Date Engineer",
      "E010",
      "02/31/1998",
      "E004"
    )
  );
});