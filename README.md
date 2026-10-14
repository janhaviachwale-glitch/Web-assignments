# React Todo List

A Todo List application built using **React** and **Vite**.

## Features

- Add new tasks.
- Edit pending tasks and confirm or cancel changes.
- Mark tasks as completed.
- Display completed tasks before pending tasks in the All view.
- Prevent completed tasks from being edited or unchecked.
- Delete completed tasks with a confirmation dialog.
- Filter tasks by All, Done and Todo.
- Display an empty-state message when no matching tasks are available.
- Hide filter buttons when the task list is empty.
- Responsive layout for smaller screens.

## Tech Stack

- React
- JavaScript (JSX)
- CSS
- Vite
- npm

## Prerequisites

Install Node.js and npm before running the project.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/janhaviachwale-glitch/Web-assignments.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Web-assignments
   ```

3. Switch to the assignment branch:

   ```bash
   git switch react-todo-app
   ```

4. Install the dependencies:

   ```bash
   npm install
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local URL displayed in the terminal, usually `http://localhost:5173/`.

## Production Build

Run the following command to build the application:

```bash
npm run build
```

Vite generates the production build in the `dist` directory.

## Testing Checklist

- Add tasks and verify their order.
- Edit a pending task and confirm the changes.
- Cancel editing and verify the original text is preserved.
- Complete a task and verify its strikethrough styling.
- Verify completed tasks cannot be edited or unchecked.
- Delete a completed task and test both confirmation-dialog options.
- Verify All, Done and Todo filters.
- Verify the empty-state message and hidden filters when the list is empty.

## Notes

Tasks are maintained in React component state. They are not persisted to a database or browser storage, so refreshing the page resets the list.
