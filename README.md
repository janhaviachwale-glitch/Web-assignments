# Organization Management System

A simple Organization Management System built using TypeScript and Object-Oriented Programming concepts.

## Features

- Add employees
- Update employees
- Delete employees
- Retrieve all employees
- Retrieve an employee by ID
- Support Engineer, Lead, Manager, Director and CEO roles
- Validate unique employee IDs
- Allow only one CEO
- Validate reporting hierarchy
- Validate employee references
- Validate date of birth
- Prevent deletion of employees who have reportees

## Organization Hierarchy

The reporting hierarchy is:

CEO
↓
Director
↓
Manager
↓
Lead
↓
Engineer

The CEO does not report to anyone.

## Prerequisites

- Node.js
- npm
- Git

## Project Setup

Clone the repository:

```bash
git clone <repository-url>