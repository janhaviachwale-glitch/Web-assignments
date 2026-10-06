# Organization Management System

A simple Organization Management System built using TypeScript and Object-Oriented Programming concepts.

## Features

* Add employees
* Update employees
* Delete employees
* Retrieve all employees
* Retrieve an employee by ID
* Support Engineer, Lead, Manager, Director and CEO roles
* Validate unique employee IDs
* Allow only one CEO
* Validate reporting hierarchy
* Validate employee references
* Validate date of birth
* Prevent deletion of employees who have reportees

## Organization Hierarchy

The reporting hierarchy is:

```text
CEO
 ↓
Director
 ↓
Manager
 ↓
Lead
 ↓
Engineer
```

The CEO does not report to anyone.

Each employee can report only to the required role:

* Engineer → Lead
* Lead → Manager
* Manager → Director
* Director → CEO
* CEO → No one

## Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Git

## Project Setup

Clone the repository:

```bash
git clone https://github.com/janhaviachwale-glitch/Web-assignments?utm_source=chatgpt.com
cd OrganizationManagement
```

Install the project dependencies:

```bash
npm install
```

## Build the Project

Compile the TypeScript code:

```bash
npm run build
```

The compiled JavaScript files will be generated inside the `dist` folder.

## Run the Application

Run the compiled application:

```bash
npm start
```

You can also build and run the application together:

```bash
npm run dev
```

## Project Structure

```text
OrganizationManagement/
├── src/
│   ├── Employee.ts
│   ├── Engineer.ts
│   ├── Lead.ts
│   ├── Manager.ts
│   ├── Director.ts
│   ├── CEO.ts
│   ├── Organization.ts
│   └── index.ts
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

### File Explanation

* `Employee.ts` - Defines the abstract base Employee class and common employee properties.
* `Engineer.ts` - Represents an Engineer.
* `Lead.ts` - Represents a Lead and manages Engineer reportees.
* `Manager.ts` - Represents a Manager and manages Lead reportees.
* `Director.ts` - Represents a Director and manages Manager reportees.
* `CEO.ts` - Represents the CEO and manages Director reportees.
* `Organization.ts` - Handles employee management, CRUD operations and validations.
* `index.ts` - Contains sample data and demonstrates the required operations and validations.

## Design Approach

The application uses Object-Oriented Programming concepts.

### Abstraction

`Employee` is an abstract class that contains common employee properties and operations.

### Inheritance

`Engineer`, `Lead`, `Manager`, `Director` and `CEO` extend the `Employee` class.

### Encapsulation

Employee reportees are stored internally and accessed through methods such as:

* `getReportees()`
* `addReportee()`
* `removeReportee()`

### Polymorphism

Each employee role provides its own implementation of the reportee-related methods defined in the `Employee` class.

### Organization Management

The `Organization` class maintains all employees using a `Map` with employee ID as the key.

It is responsible for:

* Adding employees
* Updating employees
* Deleting employees
* Retrieving employees
* Validating employee IDs
* Validating reporting relationships
* Validating the CEO rule
* Validating dates

## Assumptions

* Employee IDs must be unique.
* There can be only one CEO.
* The CEO does not report to anyone.
* Every non-CEO employee must have a valid manager.
* Employees can report only to the role defined by the organization hierarchy.
* An employee cannot report to themselves.
* Date of birth must follow `MM/DD/YYYY` format and must be a valid calendar date.
* An employee with reportees cannot be deleted.
* The application uses in-memory data storage. No database is used.
* Sample employee data is provided in `index.ts` to demonstrate the functionality.

## Validation and Testing

The application demonstrates successful and rejected operations, including:

* Adding employees
* Retrieving employees
* Updating employees
* Deleting employees
* Duplicate employee ID
* Multiple CEO validation
* Invalid reporting relationship
* Invalid manager reference
* Invalid date format
* Invalid calendar date
* Updating a nonexistent employee
* Deleting an employee who has reportees
* Deleting an employee without reportees
